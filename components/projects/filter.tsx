import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../../lib/with-redux-store';
import { deepClone, addOrRemoveInFIlter, priceMap, MapFilterToSetting } from '../../utility';
import { getCategoryList, getFiltersData } from '../../asyncActions/commonAsyncActions';
import InputRange from 'react-input-range';


interface Props {
    website, setting, keyword, saveQueryToStore, UpdateFilter, filters, filterList, domain, showAll,
    getCategoryList, category, getFiltersData, fd, resetInput
}

class PropFilter extends React.PureComponent<Dispatchable<Props>, any> {
    constructor(props) {
        super(props);
        let ar = this.getState();
        this.state = ar[1];
        this.reset = this.reset.bind(this);
    }
    componentWillReceiveProps() {

        //This logic resets /uncheck, if capsule is clicked 
        if (this.props.filters.capReset) {
            console.log(this.props.filters)
            let keys = Object.keys(this.props.filters);
            keys.forEach(x => {
                if (this.props.filters[x] != this.state[x] && x != 'capReset') {
                    var obj = {};
                    if (x == 'budget' || x == 'rent' || x == 'size') {
                        obj[`${x}C`] = false;
                        obj[`${x}R`] = this.props.filters[x];
                    }
                    else {
                        obj[x] = this.props.filters[x];
                    }
                    this.setState(obj);
                };
            });
        }



        if (!this.state.init) {
            let obj = this.props.fd;

            //# logic 10 : Logic to show rent related filters on proptyp "Pre lEased"
            if (obj && obj.data && obj.data["15"]) {
                let change = false;
                let a = this.state.propType.split(",");
                a.forEach(x => {
                    if (x.trim().toUpperCase() == "Pre Leased".toUpperCase()) {
                        change = true;
                        obj.data["14"].display = true;
                        obj.data["15"].display = true;
                        obj.data["16"].display = true;
                        obj.data["17"].display = true;
                    }
                });
                if (this.props.website && !change && this.props.website.code != 'w12') {
                    obj.data["14"].display = false;
                    obj.data["15"].display = false;
                    obj.data["16"].display = false;
                    obj.data["17"].display = false;
                }

                this.setState({ fd: obj, init: true }, function () {
                    if (this.state.propType != "All" && this.state.propType != "")
                        this.updateCat('propType', true);
                });
            }
            //Logic 10 ends here
        }
    }
    componentDidMount() {
        let ar = this.getState();
        this.setState(ar[1]);
        this.props.getCategoryList();
        this.props.getFiltersData();
    }
    handleChange = (evt) => {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    handleCheck = (evt, key) => {

        let eVal = evt.target.value;
        let nVal: any = '';

        // If Checked
        if (evt.target.checked) {
            if (this.state[key] != "") {
                if (eVal == "All") { // If Checked & Value is 'All'
                    nVal = eVal;
                }
                else if (eVal == "Between") { // If Checked & Value is 'All'                
                    key = `${key}C`;
                    nVal = true;
                }
                else {// If Checked & Value is Not 'All'
                    if (this.state[key]) {
                        let a = this.state[key].split(',').filter(x => { return x != "All" });
                        a.push(eVal);
                        nVal = a.join(",");
                    }
                }
            }
            else {// If Checked & Value is empty ''
                nVal = eVal
            }
        }
        // If Un Checked
        else {
            if (eVal == "Between") { // If Checked & Value is 'All'
                key = `${key}C`;
                nVal = false;
            }
            else {
                let a = this.state[key].split(',').filter(x => { return x != eVal });
                nVal = a.join(',');
                if (nVal == "") {
                    nVal = "All";
                }
            }
        }
        ////console.log(nVal);
        this.setState({
            ...this.state,
            [key]: nVal
        }, function () {
            this.updateCat(key, false);
        });
        //this.props.filterList(addOrRemoveInFIlter(this.props.filters, [key], [nVal], false), this.props.domain);
        this.props.filterList(addOrRemoveInFIlter(this.props.filters, [key, 'capReset'], [nVal, false], false));
    }

    updateCat(key, init) {
        let val = this.state[key];
        // Update for cascading of propTypes
        if (key == 'propType' && this.state.fd.data["1"]) {
            let a = val.split(",");
            let fd = deepClone(this.state.fd);
            let bkp = fd.data["1"].child[0];
            let newCat = [bkp];
            let change = false;
            a.forEach(x => {
                if (this.props.category.data) {
                    this.props.category.data.forEach(e => {
                        if (x == e.name) {
                            //to update filtersData for category
                            newCat = newCat.concat(e.childNodes);
                        }
                    });
                }

                //show hide rent related filters if "Pre Rented" is selected
                if (x.trim().toUpperCase() == "Pre Leased".toUpperCase()) {
                    change = true;
                    fd.data["14"].display = true;
                    fd.data["15"].display = true;
                    fd.data["16"].display = true;
                    fd.data["17"].display = true;
                    //console.log(["111", fd]);
                }

            });
            if (this.props.website && !change && this.props.website.code != 'w12') {
                fd.data["14"].display = false;
                fd.data["15"].display = false;
                fd.data["16"].display = false;
                fd.data["17"].display = false;
            }
            fd.data["1"].child = newCat;
            ////console.log(["222", fd]);
            this.setState({
                fd: fd
            }, function () {
                if (init && this.state.category != "All" && this.state.category != "") {
                    this.updateCat('category', false);
                }
            });
        }
        else if (key == 'category' && this.state.fd.data["2"]) {
            let a = val.split(",");
            let fd = this.state.fd;
            let bkp = fd.data["2"].child[0];
            let newSubCat = [bkp];
            a.forEach(x => {
                this.state.fd.data["1"].child.forEach(e => {
                    if (x == e.name) {
                        //to update filtersData for subcategory
                        newSubCat = newSubCat.concat(e.childNodes);
                    }
                });
            });
            fd.data["2"].child = newSubCat;
            this.setState({
                fd: fd
            });
        }
    }

    getState() {
        //initialFilterState
        let a = addOrRemoveInFIlter(this.props.filters, ['propType', 'subArea', 'location'], [this.props.setting.propType, this.props.setting.subArea, this.props.setting.location], false);
        let b = deepClone(a);
        b.fd = this.props.fd;
        b.init = false;
        b.budgetR = { min: 1, max: 2000 };
        b.budgetC = false;
        b.rentR = { min: 5000, max: 25000 };
        b.rentC = false;
        b.sizeR = { min: 50, max: 25000 };
        b.sizeC = false;
        return [a, b];
    }
    reset = () => {
        let [a, b] = this.getState();

        this.setState(b, function () {
            a.reset = false;
            this.props.resetList(a, this.props.domain);
            this.props.resetInput();
        });
    }

    sss(val, key) {
        let result = false;
        if (this.state[key] != null && typeof this.state[key] != 'undefined') {
            try {
                let a = this.state[key].split(',').filter(x => { return x == val });
                if (a.length > 0) {
                    result = true;
                }
                else {
                    result = false;
                }
            }
            catch (err) {
                result = false;
            }
        }
        else if (typeof this.state[key] != 'boolean') {
            result = this.state[key];
        }
        else {
            result = false;
        }
        ////console.log(["---sss-------", val, key, result]);
        return result;
    }
    setRange(value, key) {
        this.setState({ [`${key}R`]: value }, function () {
            this.props.filterList(addOrRemoveInFIlter(this.props.filters, [key, 'capReset'], [`${value.min},${value.max}`as any, false], false));
        });
    }

    render() {
        const { showAll, filters, website } = this.props;

        //showall =true for properties & false for projects page
        if (!showAll) {
            let a = this.state.fd.data["0"];
            this.state.fd.data = {};
            this.state.fd.keys = ["propType"];
            this.state.fd.data["0"] = a;
        }

        return (
            <div>
                {website &&
                    <aside className="sidebar with-filter">
                        <div className="sidebar-inner">
                            <div className="sidebar-header clearfix">
                                <h4>Filter Results</h4>
                                {filters.reset &&
                                    <a href="#" onClick={() => this.reset()} className="sidebar-reset-filter"><i className="fa fa-times"></i> reset filter</a>
                                }
                            </div>
                            {this.state.fd && this.state.fd.data && this.state.fd.keys.map((x, i) =>
                                <>
                                    {this.state.fd.data[i] && this.state.fd.data[i].websites.indexOf(website.code) > -1 &&
                                        <div key={i} id={x}>
                                            {this.state.fd.data[i] && this.state.fd.data[i].display &&
                                                <>
                                                    <div className="clear"></div>
                                                    <div className="sidebar-module">
                                                        <div className="panel-group" id="accordion">
                                                            <div className="panel panel-default">
                                                                <div className="panel-heading">
                                                                    <h4 className="panel-title">
                                                                        <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${x}`} aria-expanded="true">{this.state.fd.data[i].title}  </a>
                                                                    </h4>
                                                                </div>
                                                                <div id={`collapse${x}`} className={`panel-collapse collapse in ${(i == website.openFilterIndex) ? 'show' : ''}`}>
                                                                    <div className="panel-body">
                                                                        <div className="sidebar-module-inner">
                                                                            {this.state.fd.data[i].child && this.state.fd.data[i].child.map((c, j) =>
                                                                                <div className="checkbox-block" key={j}>
                                                                                    {c && c.name == "Between" &&
                                                                                        <>
                                                                                            <input id={`filter${i}${j}`} name={`filter${i}${j}`} value={c.name} type="checkbox" className="checkbox" onChange={(e) => this.handleCheck(e, x)} defaultChecked={this.state[`${x}C`]} checked={this.state[`${x}C`]}></input>
                                                                                            <label htmlFor={`filter${i}${j}`}>{c.name}</label>

                                                                                            {this.state.budgetC && x == "budget" &&
                                                                                                <div className="range">
                                                                                                    <InputRange
                                                                                                        formatLabel={value => `${priceMap(value, 0)}`}
                                                                                                        maxValue={2000}
                                                                                                        minValue={1}
                                                                                                        step={10}
                                                                                                        value={this.state.budgetR}
                                                                                                        onChange={value => this.setState({ budgetR: value })}
                                                                                                        onChangeComplete={(value) => this.setRange(value, x)} />
                                                                                                </div>
                                                                                            }
                                                                                            {this.state.rentC && x == "rent" &&

                                                                                                <div className="range">
                                                                                                    <InputRange
                                                                                                        //formatLabel={value => `₹ ${value}`}
                                                                                                        maxValue={200000}
                                                                                                        minValue={2000}
                                                                                                        step={1000}
                                                                                                        value={this.state.rentR}
                                                                                                        onChange={value => this.setState({ rentR: value })}
                                                                                                        onChangeComplete={(value) => this.setRange(value, x)} />
                                                                                                </div>
                                                                                            }
                                                                                            {this.state.sizeC && x == "size" &&
                                                                                                <div className="range">
                                                                                                    <InputRange
                                                                                                        formatLabel={value => `${value} sq ft`}
                                                                                                        maxValue={25000}
                                                                                                        minValue={50}
                                                                                                        step={50}
                                                                                                        value={this.state.sizeR}
                                                                                                        onChange={value => this.setState({ sizeR: value })}
                                                                                                        onChangeComplete={(value) => this.setRange(value, x)} />
                                                                                                </div>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                    {c && c.name != "Between" &&
                                                                                        <>
                                                                                            <input id={`filter${i}${j}`} name={`filter${i}${j}`} value={c.value || c.name} type="checkbox" className="checkbox" onChange={(e) => this.handleCheck(e, x)} defaultChecked={this.sss(c.value || c.name, x)} checked={this.sss(c.value || c.name, x)}></input>
                                                                                            <label htmlFor={`filter${i}${j}`}>{c.name}</label>
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    }
                                </>
                            )}
                        </div>
                    </aside>
                }
                <style jsx>{`
                .range{margin:20px 10px 20px 10px;}
                `}

                </style>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        category: state.category,
        filters: state.filters,
        fd: Mapfd(state.filtersData.data, state.category.data)
    }
    return obj;
    //return MapFilterToSetting(obj, state.setting);

    /*
      We ahve to use MapFilterToSetting here oterwiise the selected cat/subcat from home filtrs not gets bind, also from routers query
      But if we bid it here, it gives error where this filter is called.
    */
}

const mapDispatchToProps = {
    getCategoryList, getFiltersData
}
export const Mapfd = (obj, cat) => {
    let res: any = { keys: [], data: {} };
    let c = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            //if (obj[key].for != "rent") {
            //let order = obj[key].order;
            let newObj = obj[key];
            res.keys.push(key);
            res.data[c] = newObj;
            c = c + 1;
            //}
        }
    }
    if (cat && res.data["0"] && res.data["0"].child && res.data["0"].child.length == 1) {
        cat.forEach((x, i) => {
            let a = { id: i + 1, name: x.name }
            res.data["0"].child.push(a);
        })
    }
    return res;
}
export default connect(mapStateToProps, mapDispatchToProps)(PropFilter)
