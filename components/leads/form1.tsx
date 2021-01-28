import { connect } from 'react-redux'
import React, { useEffect } from 'react';
import { Dispatchable } from '../../lib/with-redux-store';
import { Contact, PropFilter } from '../index';
import { setMsg } from '../../asyncActions/contactAsyncActions';
import InputRange, { InputRangeClassNames } from 'react-input-range';
import { priceMap, loadLeadFormsHide, loadLeadForms } from '../../utility';

interface Props {
    setting, website, category, setMsg, contact, auth
}

class LeadForm1 extends React.Component<Dispatchable<Props>, any> {
    constructor(props) {
        super(props);

        this.state = {
            proptype: null,
            cat: null,
            subcat: null,
            budgetR: { min: 80, max: 400 },
            budgetC: false,
            rentR: { min: 4000, max: 30000 },
            rentC: false,
            sizeR: { min: 500, max: 2000 },
            sizeC: false
        };

    }
    getPropIndexOnINit() {
        let x = null;
        if (this.props.setting && this.props.category.data) {
            this.props.category.data.forEach((e, i) => {
                if (e.name == this.props.setting.propType) {
                    x = i;
                }
            });
        }
        return x
    }
    getInitialState = () => {

    }
    handleChange = (e) => {
        this.setState({
            budgetR: { min: 80, max: 400 },
            budgetC: false,
            rentR: { min: 5000, max: 25000 },
            rentC: false,
            sizeR: { min: 500, max: 2000 },
            sizeC: false
        });
    }
    componentDidMount() {
        this.props.setMsg(this.getMsg());
        //this.setState({ proptype: this.getPropIndexOnINit() });
    }
    setRange(value, key) {
        this.setState({ [`${key}R`]: value }, function () {
            this.props.setMsg(this.getMsg());
        });
    }
    setIndex(value, key) {
        this.setState({ [key]: value }, function () {
            this.props.setMsg(this.getMsg());
        });
    }
    getMsg() {

        let prop = "";
        let cat = "";
        let subcat = "";

        let price = "";

        if (this.state.proptype && this.props.category.data[this.state.proptype]) {
            let p = this.props.category.data[this.state.proptype];
            prop = p.name;
            if (this.state.cat && p.childNodes[this.state.cat]) {
                let c = p.childNodes[this.state.cat];
                cat = c.name;
                if (this.state.subcat && c.childNodes[this.state.subcat]) {
                    subcat = c.childNodes[this.state.subcat].name;
                }
            }
        }
        if (this.props.website && this.props.website.code == 'w12') {
            price = `rent should be between ₹ ${this.state.rentR.min} - ${this.state.rentR.max} K`;
        }
        else {
            price = `budget is between ₹ ${this.state.budgetR.min} - ${this.state.budgetR.max} Lakhs`;
        }

        return `I am looking for a ${prop} Property > ${cat} > ${subcat} in ${this.props.setting.location} ${(this.props.setting.subArea != 'All') ? this.props.setting.subArea : ''}, ${price} and area should be between ${this.state.sizeR.min} - ${this.state.sizeR.max} sq. ft.`;
    }
    hide() {
        loadLeadFormsHide();
        loadLeadForms();
    }
    render() {
        const { setting, category, website, auth } = this.props;
        // let css: InputRangeClassNames = {
        //     slider: 'css-slider',
        //     activeTrack: '',
        //     disabledInputRange: '',
        //     inputRange: '',
        //     labelContainer: '',
        //     maxLabel: '',
        //     minLabel: '',
        //     sliderContainer: '',
        //     track: '',
        //     valueLabel: ''
        // }

        return (
            <div>
                {auth.data == null && !auth.logined &&
                    <>
                        <div className="modal fade" id="leadForm1Modal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {/* Help us to find a best property for you :) */}
                               Help us finding the best property for you in {this.props.setting.location} :)
                            </div>

                                    <div className="modal-body">
                                        <div className="row">
                                            {category && category.data &&
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    <div className="capsules">
                                                        <ul className="row">
                                                            {category.data.map((x, i) =>
                                                                <li key={i} className={`col-md-1 col-sm-2 col-xs-2 text-center ${(i == this.state.proptype) ? 'active' : ''}`} onClick={() => this.setIndex(i, 'proptype')}>{x.name}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                    {this.state.proptype && category.data[this.state.proptype] &&
                                                        <div className="capsules">
                                                            <ul className="row">
                                                                {category && category.data && category.data[this.state.proptype].childNodes.map((x, i) =>
                                                                    <li key={i} className={`col-md-1 col-sm-2 col-xs-2 text-center ${(i == this.state.cat) ? 'active' : ''}`} onClick={() => this.setIndex(i, 'cat')}>{x.name}</li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    }
                                                    {this.state.cat && category.data[this.state.proptype] && category.data[this.state.proptype].childNodes[this.state.cat] &&
                                                        <div className="capsules">
                                                            <ul className="row">
                                                                {category && category.data && this.state.cat && category.data[this.state.proptype].childNodes[this.state.cat].childNodes.map((x, i) =>
                                                                    <li key={i} className={`col-md-1 col-sm-2 col-xs-2 text-center ${(i == this.state.subcat) ? 'active' : ''}`} onClick={() => this.setIndex(i, 'subcat')}>{x.name}</li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    }
                                                    {this.props.website && this.props.website.code != 'w12' &&
                                                        <div className=" range">
                                                            <InputRange
                                                                formatLabel={value => `₹ ${priceMap(value, 0)}`}
                                                                maxValue={2000}
                                                                minValue={1}
                                                                step={10}
                                                                value={this.state.budgetR}
                                                                onChange={value => this.setState({ budgetR: value })}
                                                                onChangeComplete={(value) => this.setRange(value, 'budget')} />
                                                        </div>
                                                    }
                                                    {this.props.website && this.props.website.code == 'w12' &&

                                                        <div className=" range">
                                                            <InputRange
                                                                formatLabel={value => `₹ ${value}`}
                                                                maxValue={200000}
                                                                minValue={2000}
                                                                step={1000}
                                                                value={this.state.rentR}
                                                                onChange={value => this.setState({ rentR: value })}
                                                                onChangeComplete={(value) => this.setRange(value, 'rent')} />
                                                        </div>
                                                    }
                                                    <hr />
                                                    <div className=" range">
                                                        <InputRange
                                                            formatLabel={value => `${value} sq ft`}
                                                            maxValue={8000}
                                                            minValue={100}
                                                            step={100}
                                                            value={this.state.sizeR}
                                                            onChange={value => this.setState({ sizeR: value })}
                                                            onChangeComplete={(value) => this.setRange(value, 'size')} />
                                                    </div>
                                                </div>
                                            }
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <Contact msg={this.props.contact.msg} title="" {...this.props} />
                                                <a className="skip" onClick={this.hide}>Skip for now </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="modal-footer">
                            </div> */}
                                </div>
                            </div>
                        </div>
                        <style jsx>
                            {`
               .modal-header{font-weight: 500;}
               .capsules{
                  border-bottom: 1px solid #ebebeb;
               }
              .capsules ul{
                 display: inline-flex;
                 width: 100%;
                 margin-left: -10px;
                //  margin-right: -5px;
                 margin-bottom: 5px;
                 margin-top: 10px;
                 padding: 5px;
              }
              .capsules ul li{
                border: 1px solid var(--secondary);
                border-radius: 10px;
                padding: 2px 7px;
                font-size: 9px;
                margin-right: 5px;
                list-style:none;
                display:inline-block;
                margin-bottom: 5px;
                cursor: pointer;
                max-width: unset !important;
                white-space:nowrap;
                padding-bottom: 4px;
                width: auto;
                font-weight:500;
              }
              .capsules ul li:hover,.capsules ul li.active{
                background: var(--secondary);
                color:white;
              }
             .skip{float:right;text-decoration:underline !important;}
              .range{
                  margin:30px 20px;
              }
              `}
                        </style>
                    </>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        cities: state.cities.data,
        setting: state.setting,
        filters: state.filters,
        website: state.website.data,
        category: state.category,
        contact: state.contact,
        auth: state.auth
    }
    return obj;
}

const mapDispatchToProps = {
    setMsg
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadForm1)
