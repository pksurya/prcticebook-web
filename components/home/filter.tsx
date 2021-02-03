import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../../lib/with-redux-store';
import { getProjectList } from '../../asyncActions/projectAsyncActions';
import { getPropertyList } from '../../asyncActions/propertyAsyncActions';
import { getCategoryList, updateFilter, updateSetting, getRouteList } from '../../asyncActions/commonAsyncActions';
import { getRecordByIdFromArray, deepClone, verifyWebsiteCode } from '../../utility';
import Router from 'next/router';
import $ from 'jquery';
import Link from 'next/link';
import { glink } from '../../constant';
import AdSense from 'react-adsense';

interface Props {
    website, domain, filters, getCategoryList,
    category, updateFilter, setting, updateSetting,
    getRouteList, routeList, properties,
    projects, getProjectList, getPropertyList,
    routes
}

type MyState = {
    loading: boolean, client: boolean,
    input: string, showPanel: boolean, cat: any, subCat: any,
    selctedCat: string, selectedSubCat: any,
    propTypeChanged: boolean, searchType: string
};

class HomeFilter extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            input: '', showPanel: false, cat: [], subCat: [], searchType: "0", loading: false
            , selctedCat: '', selectedSubCat: '', propTypeChanged: false, client: false
        }
        this.setSubCategory = this.setSubCategory.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.updateBudget = this.updateBudget.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.setPropType = this.setPropType.bind(this);
        this.toggleRoutes = this.toggleRoutes.bind(this);
        this.setSearchType = this.setSearchType.bind(this);
        this.autoComplete = this.autoComplete.bind(this);
        this.loading = this.loading.bind(this);

        this.submit = this.submit.bind(this);
    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }
    componentDidMount() {
        this.props.getCategoryList();
        //let base = this;
        $(document).mouseup(function (e: any) {
            var container = $("#slider_start #routes");
            var input = $("#slider_start #search");

            // If the target of the click isn't the container
            if (!container.is(e.target) && container.has(e.target).length === 0 && !input.is(e.target) && input.has(e.target).length === 0) {
                container.hide();
                //base.toggleRoutes();
            }
        });
        this.setState({ client: true });
    }
    setPropType(val, i) {
        //this.props.updatePropTypeToStore(this.props.filters, val);
        //this.props.updateFilter(this.props.filters, ['propType'], [val], false);
        this.props.updateSetting(this.props.setting, ['propType'], [val], false);
        this.setState({
            cat: (val == "All") ? [] : this.props.category.data[i].childNodes,
            subCat: [],
            propTypeChanged: true
        }, function () {
            this.props.getRouteList(this.props.filters);
        });
    }
    toggleFilterBox(e) {
        //console.log(e.target);
        $("#box #form").toggle("slow");
        ////console.log([this.state, this.props.filters.propType, this.state.propTypeChanged, this.props.category]);
        this.setState({ showPanel: !this.state.showPanel }, function () {
            ////console.log(this.state);
        });

        if (this.props.filters.propType != '' && this.props.filters.propType != 'All' && !this.state.propTypeChanged) {
            let cats = [];
            this.props.category.data.forEach(e => {
                if (e.name == this.props.filters.propType) {
                    cats = e.childNodes;
                }
            });
            ////console.log(cats);
            this.setState({ propTypeChanged: !this.state.propTypeChanged, cat: cats }, function () {
                ////console.log(this.state);
            });
        }
    }
    setSubCategory(e) {
        let a: any = getRecordByIdFromArray(this.state.cat, '_id', e.target.value);
        let subCat = [];
        if (a) {
            subCat = a.childNodes
        }
        this.setState({
            selctedCat: a.name,
            subCat: subCat
        });
    }
    updateFilter(e) {
        this.setState({ selectedSubCat: e.target.value }, function () {
            this.props.updateFilter(this.props.filters, ['category', 'subCategory'], [this.state.selctedCat, this.state.selectedSubCat], false);
        });
    }
    updateSize(e: any, i) {
        let size = this.props.filters.size.split(',');
        size[i] = e.target.value;
        this.props.updateFilter(this.props.filters, ['size'], [size.join(',')], false);
    }
    updateBudget(e: any, i) {
        let budget = this.props.filters.budget.split(',');
        budget[i] = e.target.value;
        this.props.updateFilter(this.props.filters, ['budget'], [budget.join(',')], false);
    }
    submit(e) {
        Router.push(`/${this.props.filters.country}/${this.props.filters.location}/${this.props.filters.subArea}/properties/${this.props.filters.propType}`);
        e.preventDefault();
    }
    updateRadioFilter(e, key) {
        //console.log([e.target.value, key]);
        if (e.target.checked) {
            this.props.updateFilter(this.props.filters, [key], [e.target.value], false);
        }
        else {
            this.props.updateFilter(this.props.filters, [key], ['All'], false);
        }
        //console.log(this.props);
    }
    getURL(name) {
        let a = name.split("@");
        return a.join('/');
    }
    setQuery(q) {
        this.props.updateFilter(this.props.filters, ['query'], [q], false);
    }
    toggleRoutes() {
        $("#slider_start #routes").toggle("slow");
        if (this.props.routeList == null || typeof this.props.routeList == 'undefined') {
            this.props.getRouteList(Object.assign({ websites: verifyWebsiteCode(this.props.website) }, this.props.filters));
        }
    }
    autoComplete(e) {
        let val = e.target.value;
        let f = deepClone(this.props.filters);
        f.keyword = val;
        f.page = 1;
        f.websites = verifyWebsiteCode(this.props.website);
        if (this.state.searchType == "0") {
            this.props.getRouteList(f);
        }
        else if (this.state.searchType == "1") {//project           
            this.props.getProjectList(f);
        }
        else {
            this.props.getPropertyList(f);
        }
    }
    setSearchType(e) {
        let val = e.target.value;
        let f = deepClone(this.props.filters);
        f.websites = verifyWebsiteCode(this.props.website);
        if (val == "0") {
            if (this.props.routeList == null || typeof this.props.routeList == 'undefined') {
                this.props.getRouteList(f);
            }
        }
        else if (val == "1") {//project
            if (this.props.projects == null || typeof this.props.projects == 'undefined' || this.props.projects.length == 0) {
                this.props.getProjectList(f);
            }
        }
        else {
            if (this.props.properties == null || typeof this.props.properties == 'undefined') {
                this.props.getPropertyList(f);
            }
        }
        this.setState({ searchType: val });

    }
    loading() {
        this.setState({ loading: true });
    }
    getHeader(routes, website, setting, forsale) {
        let h = "";
        if (routes.data && typeof routes.data.header != 'undefined' && routes.data.header != null && routes.data.header != '') {
            h = routes.data.header;
        }
        else {
            h = `${(website.propType) ? (setting.propType == 'All') ? '' : setting.propType : ''}  ${website.text} for ${forsale} in ${setting.location}`
        }
        return h;
    }
    render() {
        const { category, setting, routeList, properties, projects, filters, domain, website, routes } = this.props;
        let forsale = (website && website.code == 'w12') ? 'rent' : 'sale';
        let header = this.getHeader(routes, website, setting, forsale);

        return (
            <div>
                {website &&
                    <section id="slider_start" style={{ backgroundImage: `url(${website.filterBanner || "/assets/images/banner-image.jpg"})`, backgroundRepeat: 'no-repeat' }}>
                        {/* backgroundPosition: 'center',backgroundSize: 'cover', */}

                        <div className="container">
                            <div className="row">
                                <AdSense.Google
                                    client='ca-pub-3106891907091599'
                                    slot='8132624741'
                                    format='auto'
                                    responsive='true'
                                />
                            </div>

                            <div className="col-md-12">
                                <div className="banner_text">
                                    {/* <h1 className="h1"> {header}</h1> */}
                                    {/* <h1 className="h1"> {(website.propType) ? (setting.propType == 'All') ? '' : setting.propType : ''}  {website.text} for {forsale} in {setting.location}</h1> */}
                                </div>
                                {/* <div className="banner_search_bar">
                                    {website.propType &&
                                        <div className="tabing_details">
                                            {this.state.client &&
                                                <ul>
                                                    <li><a className={`${(setting.propType == 'All') ? 'city-active' : ''}`} onClick={() => this.setPropType('All', '')}>All</a></li>
                                                    {category && category.data && category.data.map((x, i) =>
                                                        <li key={i}><a className={`${(x.name == setting.propType) ? 'city-active' : ''}`} onClick={() => this.setPropType(x.name, i)}>{x.name}</a></li>
                                                    )}
                                                </ul>
                                            }
                                        </div>
                                    }
                                    <div className="iner_search_bar">
                                        <form onSubmit={this.submit}>
                                            <div className="form-group half_width">
                                                <select id="select_options" onChange={(e) => this.setSearchType(e)}>
                                                    <option value="0">Search Your Requirements</option>
                                                    {website.code == 'w1' && <option value="1">Search any Project</option>}
                                                    <option value="2">Search any {website.text}</option>
                                                </select>
                                            </div>
                                            <div className="form-group full-width routes-box">
                                                <input type="text" id="search" onFocus={this.toggleRoutes} onChange={(e) => this.autoComplete(e)} className="form-control" placeholder="Type Location or Project/Society or Keyword"></input>
                                                <div id="routes" >
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <ul>
                                                                {this.state.searchType == "0" && routeList && routeList.map((x, i) =>
                                                                    <li key={i}>
                                                                        <Link href="/[country]/[location]/[area]/properties/[...all]" as={this.getURL(x.name)}><a onClick={() => this.setQuery(x.query)}>{x.title}</a></Link>
                                                                    </li>
                                                                )}
                                                                {this.state.searchType == "1" && projects && projects.map((x, i) =>
                                                                    <li key={i}>
                                                                        <Link href={glink.href.project} as={`/${filters.country}/${filters.location}/${filters.subArea}/project/${x.slug}`} ><a>{x.projectName}</a></Link>
                                                                    </li>
                                                                )}
                                                                {this.state.searchType == "2" && properties && properties.map((x, i) =>
                                                                    <li key={i}>
                                                                        <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a>{x.title}</a></Link>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <div className="form-group half_width responsive_full_width">
                                                <div id="box">
                                                    {this.state.showPanel &&
                                                        <span id="button" onClick={() => this.toggleFilterBox('a')}>Less Filters</span>
                                                    }
                                                    {!this.state.showPanel &&
                                                        <span id="button" onClick={() => this.toggleFilterBox('b')}>More Filters</span>
                                                    }
                                                    <div id="form">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-check-inline">

                                                                    <label className="customradio">
                                                                        <span className="radiotextsty">All</span>
                                                                        <input type="radio" name="condition" value="All" onChange={(e) => this.updateRadioFilter(e, 'condition')} defaultChecked={this.props.filters.condition == 'All'} checked={this.props.filters.condition == 'All'} ></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="customradio">
                                                                        <span className="radiotextsty">Fresh</span>
                                                                        <input type="radio" name="condition" value="Fresh" onChange={(e) => this.updateRadioFilter(e, 'condition')} defaultChecked={this.props.filters.condition == 'Fresh'} checked={this.props.filters.condition == 'Fresh'} ></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="customradio">
                                                                        <span className="radiotextsty">Resale</span>
                                                                        <input type="radio" name="condition" value="Resale" onChange={(e) => this.updateRadioFilter(e, 'condition')} defaultChecked={this.props.filters.condition == 'Resale'} checked={this.props.filters.condition == 'Resale'} ></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>&nbsp;

                                                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                                                <label className="customradio">
                                                                        <span className="radiotextsty">All</span>
                                                                        <input type="radio" name="listedBy" value="All" onChange={(e) => this.updateRadioFilter(e, 'listedBy')} defaultChecked={this.props.filters.listedBy == 'All'} checked={this.props.filters.listedBy == 'All'} ></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="customradio">
                                                                        <span className="radiotextsty">Broker</span>
                                                                        <input type="radio" name="listedBy" value="Broker" onChange={(e) => this.updateRadioFilter(e, 'listedBy')} defaultChecked={this.props.filters.listedBy == 'Broker'} checked={this.props.filters.listedBy == 'Broker'}></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="customradio">
                                                                        <span className="radiotextsty">Owner</span>
                                                                        <input type="radio" name="listedBy" value="Owner" onChange={(e) => this.updateRadioFilter(e, 'listedBy')} defaultChecked={this.props.filters.listedBy == 'Owner'} checked={this.props.filters.listedBy == 'Owner'}></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>

                                                                &nbsp;&nbsp;|&nbsp;&nbsp;


                                                                <label className="customradio">
                                                                        <span className="radiotextsty">All</span>
                                                                        <input type="radio" name="constructionStatus" value="All" onChange={(e) => this.updateRadioFilter(e, 'constructionStatus')} defaultChecked={this.props.filters.constructionStatus == 'All'} checked={this.props.filters.constructionStatus == 'All'}></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="customradio">
                                                                        <span className="radiotextsty">Ready to Move</span>
                                                                        <input type="radio" name="constructionStatus" value="Ready to move" onChange={(e) => this.updateRadioFilter(e, 'constructionStatus')} defaultChecked={this.props.filters.constructionStatus == 'Ready to move'} checked={this.props.filters.constructionStatus == 'Ready to move'}></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="customradio">
                                                                        <span className="radiotextsty">Under Construction</span>
                                                                        <input type="radio" name="constructionStatus" value="Under Construction" onChange={(e) => this.updateRadioFilter(e, 'constructionStatus')} defaultChecked={this.props.filters.constructionStatus == 'Under Construction'} checked={this.props.filters.constructionStatus == 'Under Construction'}></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="customradio">
                                                                        <span className="radiotextsty" >Pre Rented</span>
                                                                        <input type="radio" name="constructionStatus" value="Pre Rented" onChange={(e) => this.updateRadioFilter(e, 'constructionStatus')} defaultChecked={this.props.filters.constructionStatus == 'Pre Rented'} checked={this.props.filters.constructionStatus == 'Pre Rented'}></input>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <select id="select_options" onChange={this.setSubCategory}>
                                                                        <option value="Show Less Filters">Select category</option>
                                                                        {this.state.cat && this.state.cat.map((x, i) =>
                                                                            <option key={i} value={x._id}>{x.name}</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <select id="select_options" onChange={this.updateFilter}>
                                                                        <option value="Show Less Filters">Select sub category</option>
                                                                        {this.state.subCat && this.state.subCat.map((x, i) =>
                                                                            <option key={i} value={x.name}>{x.name}</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                <div className="form-group" id="full_width_group" >
                                                                    <label>Budget:</label>
                                                                    <select id="select_options" onChange={(e) => this.updateBudget(e, 0)}>
                                                                        <option value="0">Min</option><option value="1">1 Lakh </option><option value="5">5 Lakh </option><option value="10">10 Lakh </option><option value="20">20 Lakh </option><option value="30">30 Lakh </option><option value="40">40 Lakh </option><option value="50">50 Lakh </option><option value="60">60 Lakh </option><option value="70">70 Lakh </option><option value="80">80 Lakh </option><option value="90">90 Lakh </option><option value="100">1 Crore </option><option value="150">1.5 Crore </option><option value="200">2 Crore </option><option value="250">2.5 Crore </option><option value="500">5 Crore </option><option value="1000">10 Crore </option><option value="1500">15 Crore </option><option value="2000">20 Crore </option>
                                                                    </select>
                                                                    <select id="select_options" onChange={(e) => this.updateBudget(e, 1)}>
                                                                        <option value="0">Max</option><option value="1">1 Lakh </option><option value="5">5 Lakh </option><option value="10">10 Lakh </option><option value="20">20 Lakh </option><option value="30">30 Lakh </option><option value="40">40 Lakh </option><option value="50">50 Lakh </option><option value="60">60 Lakh </option><option value="70">70 Lakh </option><option value="80">80 Lakh </option><option value="90">90 Lakh </option><option value="100">1 Crore </option><option value="150">1.5 Crore </option><option value="200">2 Crore </option><option value="250">2.5 Crore </option><option value="500">5 Crore </option><option value="1000">10 Crore </option><option value="1500">15 Crore </option><option value="2000">20 Crore </option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group" id="full_width_group">
                                                                    <label>Area:</label>
                                                                    <select id="select_options" onChange={(e) => this.updateSize(e, 0)}>
                                                                        <option value="0">Min</option><option value="100">100 </option><option value="300">300 </option><option value="500">500 </option><option value="800">800 </option><option value="1000">1000 </option><option value="1500">1500 </option><option value="2000">2000 </option><option value="2500">2500 </option><option value="3000">3000 </option><option value="3500">3500 </option><option value="4000">4000 </option><option value="4500">4500 </option><option value="5000">5000 </option><option value="10000">10000 </option><option value="20000">20000 </option><option value="30000">30000 </option><option value="40000">40000 </option><option value="50000">50000 </option><option value="100000">100000 </option>
                                                                    </select>
                                                                    <select id="select_options" onChange={(e) => this.updateSize(e, 1)}>
                                                                        <option value="0">Max</option><option value="100">100 </option><option value="300">300 </option><option value="500">500 </option><option value="800">800 </option><option value="1000">1000 </option><option value="1500">1500 </option><option value="2000">2000 </option><option value="2500">2500 </option><option value="3000">3000 </option><option value="3500">3500 </option><option value="4000">4000 </option><option value="4500">4500 </option><option value="5000">5000 </option><option value="10000">10000 </option><option value="20000">20000 </option><option value="30000">30000 </option><option value="40000">40000 </option><option value="50000">50000 </option><option value="100000">100000 </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link href="/[country]/[location]/[area]/properties/[...all]" as={`/${setting.country}/${setting.location}/${setting.subArea}/properties/${setting.propType}`}><button type="button" onClick={this.loading} className="btn btn-default responsive_small">
                                                {(this.state.loading) ?
                                                    <i className="fa fa-circle-o-notch fa-spin"></i> : 'Submit'}
                                            </button></Link>
                                        </form>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </section>
                }
                <style jsx>
                    {`.customradio{margin-right:12px !important;}
                    // .iner_search_bar {
                    //     margin: 15px 12px 10px 52px !important;
                    // }
                    .tabing_details ul{
                        padding-left:0px;
                    }
                    #form {
                        left: -713px !important;
                        top: 47px !important;
                        width: 1016px !important;
                    }
                    .routes-box{
                        position:relative;
                    }
                    #routes{
                        background: #fff;
                        padding: 15px;
                        display: none;
                        position: absolute;
                        width: 100%;
                        right: 0;
                        height: 250px;
                        z-index: 1;
                        overflow-y: scroll;
                    }
                    #routes ul li{
                        text-decoration:none;
                        font-size:11px;
                        border-bottom:1px solid lightgray;
                        margin:0px 0px 0px 0px;
                        list-style-type:none;
                        cursor:pointer;
                    }
                    #routes ul li a{
                      font-size:11px !important;
                      text-decoration: none !important;
                      line-height: 25px !important;
                      color:gray;
                    }
                    #routes ul li:hover{
                        background-color:lightgray;
                        color:black;
                    }
                    #routes ul li a:hover{
                        font-size:12px !important;
                        color:black;
                    }
                    #routes ul{
                        padding-left: 0px;
                    }



                      #routes::-webkit-scrollbar {
                        width: .3em;
                      }
                    
                      #routes::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                      }
                    
                      #routes::-webkit-scrollbar-thumb {
                        background-color: var(--secondary);
                        outline: 1px solid slategrey;
                      }

                    .iner_search_bar .form-group {
                        margin-right: 4px !important;
                     }
                    `}
                </style>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        projects: state.projects.data,
        properties: state.properties.data,
        filters: state.filters,
        setting: state.setting,
        category: state.category,
        routeList: state.routes.list,
        routes: state.routes,
    }
    return obj;
}

const mapDispatchToProps = {
    getCategoryList, updateFilter, updateSetting, getRouteList, getProjectList, getPropertyList
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilter)


// IsActive: true
// filters: []
// level: "7"
// listingDtae: "1582869943878"
// metaDesc: "Residential Flats 3bhk + servent room Kothi for sale in Noida | Ph - 8745891014"
// metaKey: "3bhk plus servent room in noida,↵3bhk plus servent room in noida extension,↵3bhk flat in noida on emi,↵3bhk flat in noida under 20 lakhs,↵3bhk flat in noida extension,↵3bhk flats in noida low price,↵3bhk flat in noida extension ready to move under 20 lakhs,↵3bhk servent room,↵3bhk flat for sale in noida within 15 lakhs"
// name: "@in@Noida@All@properties@Residential@Flats@3BHK + servant room"
// query: "{"cities.name":"Noida","subArea.name":"All","propType.name":"Residential","category.name":"Flats","subCategory.name":"3BHK + servant room"}"
// sorting: []
// title: "3bhk flat for sale in Noida - 3bhk plus servent room in Noida"
// type: "properties"
// __v: 0
// _id: "5e0ecd93a78a38345dbc0f91"