import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { BreadCrumb, Msg, Uploader } from '../components';
import { getCategoryList, getCityList, getFiltersData, updateMsg } from '../asyncActions/commonAsyncActions';
import { addProp } from '../asyncActions/propertyAsyncActions';
import { deepClone, openModal, openLogin, loadGoogleMap } from '../utility';
import { constant, registry } from '../constant';
declare var google: any;

interface Props {
    getCategoryList, category, getCityList, cities, getFiltersData, fd, addProp, auth, updateMsg, website
}
type MyState = {
    IsDistress: boolean,
    reasonDistress: string,
    costDistress: number, cityIndex: number, areaIndex: number, propTypeIndex: number, catIndex: number, subCatIndex: number, title: string, cities: any, subArea: any, loading: boolean,
    propType: any, category: any, subCategory: any, description: string, constructionStatus: string, status: string, furnished: string, size: string, msg: string,
    regper: string, carpetArea: string, builder: string, floor: string, totalFloor: string, facing: string, location: string, locationId: string, btnLogin: boolean,
    cost: string, longitude: null, latitude: null, profilePic: string, shopFor: string, postedBy: string, roadSize: string, publisher: any
};
let initState = {
    btnLogin: false,
    msg: constant.msg.addPropSuccess,
    cityIndex: null, areaIndex: null, propTypeIndex: null, catIndex: null, subCatIndex: null, loading: false,
    title: "",
    cities: {
        id: "",
        name: ""
    },
    subArea: {
        id: "",
        name: ""
    },
    propType: {
        id: "",
        name: ""
    },
    category: {
        id: "",
        name: ""
    },
    subCategory: {
        id: "",
        name: ""
    },
    description: "",
    constructionStatus: "Ready to move",
    status: "Ready to move",
    furnished: "Semi Furnished",
    size: "",
    regper: ".06",
    carpetArea: ""
    , builder: "Builder"
    , floor: ""
    , totalFloor: ""
    , facing: "Not Known"
    , location: ""
    , locationId: ""
    , cost: null
    , longitude: null
    , latitude: null
    , profilePic: "",
    shopFor: "Sale",
    postedBy: "Broker",
    roadSize: "Wide",
    publisher: null,
    IsDistress: false,
    reasonDistress: "",
    costDistress: null,
    plotSize: null,
};

class PostProp extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props);
        this.state = deepClone(initState);
        this.setIndex = this.setIndex.bind(this);
        this.saveProp = this.saveProp.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.initAutocomplete = this.initAutocomplete.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
    }
    handleChange = (e) => {
        let obj = this.state;
        var val;
        if (e.target.name == 'IsDistress') {
            val = e.target.value === 'true' ? true : false;
        }
        else {
            val = e.target.value;
        }
        obj[e.target.name] = val;
        this.setState(obj);
    }
    handleFocus = (event) => event.target.select();
    componentDidMount() {
        this.gaurd();
        this.props.getCategoryList();
        this.props.getCityList();
        this.props.getFiltersData();
        loadGoogleMap(this.initAutocomplete);
    }
    async gaurd() {
        if (this.props.auth && !this.props.auth.logined) {
            await this.props.updateMsg({ msg: constant.msg.needLogin, btnLogin: true });
            //this.setState({ msg: constant.msg.needLogin, btnLogin: true })
            openModal('msgbox');
            this.setState({ loading: false });
            return false;
        }
        else {
            return true;
        }
    }

    setIndex(e, key) {
        let obj = this.state;
        obj[key] = e.target.value;
        this.setState(obj);
    }
    saveProp(e) {
        e.preventDefault();
        if (this.gaurd()) {
            this.setState({ loading: true });
            let obj = deepClone(this.state);

            if (this.state.cityIndex) {
                let city = this.props.cities.data[this.state.cityIndex];
                obj.cities = {
                    id: city._id,
                    name: city.name
                }
                if (this.state.areaIndex) {
                    let area = city.area[this.state.areaIndex];
                    obj.subArea = {
                        id: area._id,
                        name: area.name
                    }
                }
            }
            if (this.state.propTypeIndex) {
                let pt = this.props.category.data[this.state.propTypeIndex];
                obj.propType = {
                    id: pt._id,
                    name: pt.name
                }
                if (this.state.catIndex) {
                    let cat = pt.childNodes[this.state.catIndex];
                    obj.category = {
                        id: cat._id,
                        name: cat.name
                    }
                    if (this.state.subCatIndex) {
                        let subCat = cat.childNodes[this.state.subCatIndex];
                        obj.subCategory = {
                            id: subCat._id,
                            name: subCat.name
                        }
                    }
                }
            }
            if (this.props.auth.data) {
                obj.publisher = this.props.auth.data.user;
                this.props.addProp(obj);
                e.target.reset();
                let base = this;
                this.setState(deepClone(initState), async function () {
                    await base.props.updateMsg({ msg: constant.msg.addPropSuccess, btnLogin: false });
                    openModal('msgbox');
                });
            }
        }
    }
    openLogin() {
        openLogin();
    }
    IsChecked(lt, rt) {
        let result = false
        if (lt == rt) {
            result = true;
        }
        return result;
    }

    initAutocomplete() {
        var autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('autocomplete')),
            { types: ['geocode'] });
        let base = this;
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            base.setState({ latitude: lat, longitude: lng, location: place.formatted_address });
        });
    }
    updatePhoto(pic) {
        this.setState({ profilePic: pic });
    }
    render() {
        const { category, cities, fd, auth, website } = this.props;

        return (
            <div>
                <BreadCrumb id="8" />
                <section id="add_basic_details_page">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="register_forming">
                                <h3>Add Property Details</h3>
                                <form onSubmit={this.saveProp}>
                                    <div className="form-group property_data">
                                        <p><span>I am a</span>
                                            <select name="" >
                                                {fd && fd.listedBy && fd.listedBy.child.map((x, i) =>
                                                    (x.for == 'both') ?
                                                        <option key={i} value={x.name}>{x.name}</option> : null
                                                )}
                                            </select>
                                            <span>and I want to {( website && website.code == 'w12') ? 'rent' : 'sell'} a </span>
                                            <select name="propTypeIndex" onChange={this.handleChange} required>
                                                <option value="Select Property Type">Select Property Type</option>
                                                {category && category.data && category.data.map((x, i) =>
                                                    <option key={i} value={i}>{x.name}</option>
                                                )}

                                            </select> <span>property in city</span>
                                            <select name="cityIndex" onChange={this.handleChange} required>
                                                <option value="">Select City</option>
                                                {cities && cities.data && cities.data.map((x, i) =>
                                                    <option key={i} value={i}>{x.name}</option>
                                                )}
                                            </select>&nbsp;
                                            <select name="areaIndex" onChange={this.handleChange}>
                                                <option value="">Select Sub Area</option>
                                                {cities && cities.data && cities.data[this.state.cityIndex] && cities.data[this.state.cityIndex].area.map((x, i) =>
                                                    <option key={i} value={i}>{x.name}</option>
                                                )}
                                            </select>
                                            <span>It is </span>
                                            <select name="catIndex" onChange={this.handleChange}>
                                                <option value="Select Category">Select Category</option>
                                                {category && category.data && category.data[this.state.propTypeIndex] && category.data[this.state.propTypeIndex].childNodes.map((x, i) =>
                                                    <option key={i} value={i}>{x.name}</option>
                                                )}
                                            </select>&nbsp;
                                            <select name="subCatIndex" onChange={this.handleChange}>
                                                <option value="Select Category">Select Category</option>
                                                {category && category.data && category.data[this.state.propTypeIndex] && category.data[this.state.propTypeIndex].childNodes[this.state.catIndex] && category.data[this.state.propTypeIndex].childNodes[this.state.catIndex].childNodes.map((x, i) =>
                                                    <option key={i} value={i}>{x.name}</option>
                                                )}
                                            </select>
                                            <span>Of Super area </span>
                                            <input type="text" name="size" onChange={this.handleChange} className="form-control" placeholder="eg.1200"></input>
                                            <span>Sqft. and carpet area</span>
                                            <input type="text" name="carpetArea" onChange={this.handleChange} className="form-control" placeholder="eg.1000"></input>
                                            <span>Sqft. on a</span>
                                            <select name="floor" onChange={this.handleChange}>
                                                <option value="">Select Floor of Property</option>
                                                {fd && fd.floor && fd.floor.child.map((x, i) =>
                                                    (x.for == 'both' || x.for == 'admin') ?
                                                        <option key={i} value={x.value}>{x.name}</option> : null
                                                )}
                                            </select>
                                            <span>floor your out of total</span>
                                            <select name="totalFloor" onChange={this.handleChange}>
                                                <option value="">Total Floor of property</option>
                                                {fd && fd.floor && fd.floor.child.map((x, i) =>
                                                    (x.for == 'both' || x.for == 'admin') ?
                                                        <option key={i} value={x.value}>{x.name}</option> : null
                                                )}
                                            </select>
                                            <span>Floors. It is on a</span>
                                            <select name="roadSize" onChange={this.handleChange}>
                                                {fd && fd.roadSize && fd.roadSize.child.map((x, i) =>
                                                    <option key={i} value={i}>{x.name}</option>
                                                )}
                                            </select>
                                            <span>Road and the {( website && website.code == 'w12') ? 'rent' : 'price'} of property is</span>
                                            <input type="text" name="cost" onChange={this.handleChange} className="form-control" placeholder={( website && website.code == 'w12') ? 'eg. 12,000' : 'eg. 500'}></input>
                                            <span>in {( website && website.code == 'w12') ? 'thousand' : 'lakh'}.</span>
                                        </p>
                                        {this.state.propTypeIndex && this.state.catIndex && category.data[this.state.propTypeIndex].childNodes[this.state.catIndex]._id == '5ce99b371db99b2f82234955' &&
                                            <p>
                                                <span>Villa plot size is</span>
                                                <input type="text" name="plotSize" onChange={this.handleChange} className="form-control" placeholder="eg. 450"></input>
                                                <span>sq. yard.</span>
                                            </p>
                                        }
                                    </div>

                                    {/* <div className="form_feild_satart">
                                        
                                    </div> */}

                                    {/* <div class="row easy" *ngIf="newProperty.category.id=='5ce99b371db99b2f82234955'">
                                    Villa plot size is
                                    <input type="text" id="txtPlotSize" class="form-control" mask="0000000"
                                        name="newProperty.plotSize" [(ngModel)]="newProperty.plotSize"
                                        placeholder="eg. 450" required> sq. yard.
                                </div> */}

                                    <div className="form_feild_satart">
                                        <label className="heading_bd">It is a :</label>

                                        {fd && fd.furnished && fd.furnished.child.map((x, i) =>
                                            (x.for == 'both') ?
                                                <label className="radio-box" key={i}><input type="radio" defaultChecked={this.IsChecked(this.state.furnished, x.value || x.name)} checked={this.IsChecked(this.state.furnished, x.value || x.name)} name="furnished" value={x.value || x.name} onChange={this.handleChange}></input><span className="outside"><span className="inside"></span></span>{x.name}</label> : null
                                        )}
                                        &nbsp;
                                        <label className="heading_bd">Property and is:</label>
                                        {fd && fd.constructionStatus && fd.constructionStatus.child.map((x, i) =>
                                            (x.for == 'both') ?
                                                <label className="radio-box" key={i}><input type="radio" defaultChecked={this.IsChecked(this.state.constructionStatus, x.value || x.name)} checked={this.IsChecked(this.state.constructionStatus, x.value || x.name)} name="constructionStatus" value={x.value || x.name} onChange={this.handleChange}></input><span className="outside"><span className="inside"></span></span>{x.name}</label> : null
                                        )}
                                    </div>
                                    <div className="form_feild_satart">
                                        <label className="heading_bd">Property is Facing in :</label>
                                        {fd && fd.facing && fd.facing.child.map((x, i) =>
                                            (x.for == 'both') ?
                                                <label className="radio-box" key={i}><input type="radio" defaultChecked={this.IsChecked(this.state.facing, x.value || x.name)} checked={this.IsChecked(this.state.facing, x.value || x.name)} name="facing" value={x.value || x.name} onChange={this.handleChange}></input><span className="outside"><span className="inside"></span></span>{x.name}</label> : null
                                        )}
                                    </div>
                                    {website && website.code != 'w12' &&
                                        <>
                                            <div className="form_feild_satart">
                                                <label className="heading_bd" style={{ color: 'red' }}>Is this a distress sale :
                                            </label>

                                                <label className="radio-box" key={'dist_checkbox_1'}>
                                                    <input type="radio" defaultChecked={this.state.IsDistress === true} checked={this.state.IsDistress === true} name="IsDistress" value="true" onChange={this.handleChange}>
                                                    </input><span className="outside"><span className="inside"></span></span>Yes</label>

                                                <label className="radio-box" key={'dist_checkbox_2'}>
                                                    <input type="radio" defaultChecked={this.state.IsDistress === false} checked={this.state.IsDistress === false} name="IsDistress" value="false" onChange={this.handleChange}>
                                                    </input><span className="outside"><span className="inside"></span></span>No</label>

                                                {this.state.IsDistress &&
                                                    <>
                                                        <select name="reasonDistress" onChange={this.handleChange}>
                                                            <option value="">Reason for distress</option>
                                                            <option value="Medical">Medical</option>
                                                            <option value="Moving Abroad">Moving Abroad</option>
                                                            <option value="Buy property">Buy property</option>
                                                            <option value="Funds required">Funds required</option>
                                                            <option value="Family issues">Family issues</option>
                                                        </select>
                                            &nbsp;&nbsp;
                                                <input type="text" id="txtPropCost2" name="costDistress"
                                                            onChange={this.handleChange}
                                                            placeholder="Distress sale price | eg. 500"></input>&nbsp;&nbsp; Lakhs
                                           </>
                                                }
                                            </div>



                                            <div className="form_feild_satart">
                                                <label className="heading_bd">registry :</label>
                                                {registry.map((x, i) =>
                                                    <label className="radio-box" key={i}><input type="radio" name="regper" defaultChecked={this.IsChecked(this.state.regper, x.value || x.name)} checked={this.IsChecked(this.state.regper, x.value || x.name)} value={x.value} onChange={this.handleChange}></input><span className="outside"><span className="inside"></span></span>{x.name} %</label>
                                                )}
                                            </div>
                                        </>
                                    }
                                    <div className="form-group full_width">
                                        <label htmlFor="Location" className="heading_bd">Location:</label>
                                        <input type="text" id="autocomplete" onFocus={this.handleFocus}
                                            onChange={this.handleChange} name="location" className="form-control" placeholder="Enter property location"></input>
                                    </div>
                                    <div className="form-group full_width">
                                        <label htmlFor="Title" className="heading_bd">Title:</label>
                                        <input type="text" name="title" onChange={this.handleChange} className="form-control" placeholder="Enter a Suitable title for property" required></input>
                                    </div>
                                    <div className="form-group full_width">
                                        <label htmlFor="Message" className="heading_bd">Description:</label>
                                        <textarea name="description" onChange={this.handleChange} className="form-control" rows={3} placeholder="Enter property details"></textarea>
                                    </div>

                                    <div className="form-group full_width">
                                        <a href="#" data-toggle="modal" data-target="#uploadbox"><img className="img-upload" src={this.state.profilePic || '/assets/images/ps.jpg'}></img></a>
                                    </div>
                                    <button type="submit" className="btn btn-default next">  {this.state.loading &&
                                        <i className="fa fa-circle-o-notch fa-spin"></i>
                                    }
                    &nbsp;Save</button>
                                    <div className="clear-both"></div>
                                </form>
                            </div>
                        </div>
                    </div >
                </section >


                <section id="add_basic_details_page">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="form-group full_width">
                                <label>Rough Text</label>
                                <textarea className="form-control" rows={5} placeholder="Paste text here to help you put data above"></textarea>
                            </div>

                            {auth && auth.logined && <div className="col-md-12 register_forming">
                                <div className="form-group full_width text-center">
                                    <a className="btn btn-default" href="https://admin.property.sale/" target="_blank" >My Admin Dashboard</a>
                                </div>
                                <div className="clear-both"></div>
                            </div>
                            }

                        </div>
                    </div>
                </section>


                <style jsx>
                    {`
                      input[type='radio'] {
                        opacity: 1 !important; 
                        display: block !important;
                        margin-top: 5px;
                        float: left;
                        width: 18px;
                        margin-right:0px !important;
                    }
                    .next{float:right; margin-top:10px;}
                    .radio-box:after{content: '|';margin-right:5px;margin-left:5px;}
                    .form-group.property_data p input.form-control {
                        padding: 1px 5px !important;
                    }
                    .img-upload{width:150px;height:150px;}



                    .property_data select{background: white !important;}
                    .property_data input{box-shadow: none;border:0px;border-bottom:1px solid #333;}
                    `}
                </style>
                <Msg {...this.props} openLogin={this.openLogin} />
                <Uploader {...this.props} updatePhoto={this.updatePhoto} />
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        cities: state.cities,
        category: state.category,
        fd: state.filtersData.data,
        auth: state.auth,
        website: state.website.data
    }
    return obj;
}

const mapDispatchToProps = {
    getCategoryList, getCityList, getFiltersData, addProp, updateMsg
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProp)
