import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { getPropertyList } from '../asyncActions/propertyAsyncActions';
import { priceMap, setWebsites, deepClone, shorten, getWATemplateOfProperty, verifyWebsiteCode } from '../utility';
import Link from 'next/link';
import { glink, constant } from '../constant';

interface Props {
    getPropertyList, filters, properties, domain, auth, search, website
}
type MyState = { prop: any, selected: any, selectAll: number, count: number, keyword: string };


class DistressTable extends React.Component<Dispatchable<Props>, MyState> {
    private ref: React.RefObject<HTMLElement>;
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            prop: this.props.properties,
            selected: {},
            selectAll: 0,
            count: 0,
            keyword: ''
        }
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }
    handleChange = (e) => {
        this.setState({ keyword: e.target.value });
    }
    async componentDidMount() {
        if (this.props.website) {
            let f = deepClone(this.props.filters);
            f.limit = 500;
            f.websites = this.props.website.code;
            await this.props.getPropertyList(f);
        }
    }
    handleCheck = (evt, key) => { }

    toggleRow(id) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[id] = !this.state.selected[id];
        if (!newSelected[id]) { delete newSelected[id]; }

        this.setState({
            selected: newSelected,
            selectAll: 2,
            count: Object.keys(newSelected).length
        });
    }
    toggleSelectAll(e) {
        let newSelected = {};
        if (this.state.selectAll === 0) {
            this.state.prop.forEach(x => {
                newSelected[x._id] = true;
            });
        }
        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0,
            count: Object.keys(newSelected).length
        });
    }
    sendTable() {
        let txt = "";
        let keys = Object.keys(this.state.selected);
        this.props.properties.forEach((x, i) => {
            if (keys.indexOf(x._id) > -1) {
                let a =
                    `${x.title}
${x.size} Sq. ft. | ${(x.subCategory) ? x.subCategory.name : ""} ${(x.category) ? x.category.name : ""} | Floor: ${x.floor}/ ${x.totalFloor}
Market Price: ₹ ${priceMap(x.cost)}
Distress Price: ₹ ${priceMap(x.costDistress)}
https://${this.props.domain}/${this.props.filters.country}/${this.props.filters.location.replace(/ /g, '%20')}/${this.props.filters.subArea}/property/${x.slug} 
                          
`;
                txt = txt + a;
            }
        })
        let msg =
            `${this.props.website.text} sale (website: https://${this.props.domain})
------------------------------------------------------------------
        
${txt}

For ${this.props.website.text} Sale visit website "${this.props.domain}",

Prashant Surya,
(+91) 8745891014
practicebook.in@gmail.com
    `
        return encodeURIComponent(msg.trim());
    }
    render() {
        const { properties, filters, auth, website } = this.props;
        let forsale = (website && website.code == 'w12') ? 'rent' : 'sale';
        return (
            <div>
                {/* <section>
                    <div className="container"> */}
                <div className="sugetn">
                    <div className="sugne_in">
                        <h3>{(website) ? website.text : "Property"} for {forsale}
                            {auth.logined && this.state.count > 0 &&
                                <span className="pull-right ML20">
                                    <a target="_blank"
                                        href={`https://api.whatsapp.com/send?phone=+91${auth.data.user.Phone}&text=${this.sendTable()}`}><i className="fa fa-whatsapp hwp"></i> ( {this.state.count} )</a>
                                </span >
                            }

                            {(this.props.search) ? <input type="text" className="pull-right desktop srch" onChange={(e) => this.handleChange(e)} placeholder="Search here..."></input> : null}
                        </h3 >
                        <table id="customers" >
                            <thead>
                                <tr>
                                    <th>
                                        {(auth.logined) ? <input id={`dph1`} name={`dph1`} value={1} type="checkbox" className="checkbox"
                                            onChange={(e) => this.toggleSelectAll(e)} defaultChecked={this.state.selectAll === 1}
                                            checked={this.state.selectAll === 1}></input> : null}
                                                Property Name</th>
                                    {website && website.code != 'w12' &&
                                        <>
                                            <th>Market Price</th>
                                            <th>Distress Price</th>
                                        </>
                                    }
                                    {website && website.code == 'w12' &&
                                        <th>Rent</th>
                                    }
                                    {(auth.logined) ? <th>Share</th> : <th>Book Now</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {properties && properties.map((x, i) =>
                                    <>
                                        {x.title && x.title.toUpperCase().indexOf(this.state.keyword.toUpperCase()) > -1 &&
                                            <tr className={(x.recommented) ? 'exclusive' : ''}>
                                                <td>
                                                    {auth.logined &&
                                                        <input id={`dp${i}`} name={`dp${i}`} value={x.name} type="checkbox" className="checkbox"
                                                            onChange={() => this.toggleRow(x._id)} defaultChecked={this.state.selected[x._id] === true}
                                                            checked={this.state.selected[x._id] === true}></input>
                                                    }

                                                    <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a>{x.title}</a></Link></td>
                                                {!x.IsForRent &&
                                                    <>
                                                        <td>₹ {priceMap(x.cost)}</td>
                                                        <td>₹ {priceMap(x.costDistress || x.cost)} </td>
                                                    </>
                                                }
                                                {x.IsForRent &&
                                                    <>
                                                        <td>₹ {x.rent}/-</td>
                                                    </>
                                                }
                                                {/* {
                                                            auth.logined &&
                                                            <td className="text-center">
                                                                <a target="_blank"
                                                                    href={`https://api.whatsapp.com/send?phone=+91${auth.data.user.Phone}&text=${getWATemplateOfProperty(x,this.props)}`}><i className="fa fa-whatsapp"></i></a>
                                                            </td>
                                                        } */}
                                                {
                                                    auth.logined &&
                                                    <td className="text-center action-td">
                                                        <a target="_blank" className="action"
                                                            href={`https://api.whatsapp.com/send?phone=+91${auth.data.user.Phone || constant.whatsappNumber}&text=${getWATemplateOfProperty(x, this.props)}`}><i className="fa fa-whatsapp"></i></a>
                                                    </td>
                                                }
                                                {!auth.logined &&
                                                    <td className="text-center action-td">
                                                        <a target="_blank" className="action"
                                                            href={`https://api.whatsapp.com/send?phone=+91${constant.whatsappNumber}&text=I am interested in property ${x.code} => ${getWATemplateOfProperty(x, this.props)}`}><i className="fa fa-whatsapp"></i></a>&nbsp;&nbsp;
                                                        <a href="tel:+91-8745891014" className="action" target="_blank"><i className="icon fa fa-phone fa-white"></i></a>
                                                    </td>
                                                }
                                            </tr>
                                        }
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div >
                </div >
                {/* </div >
                </section > */}
                <style jsx>
                    {`
                    .srch{font-size: 18px;margin-top: 6px;}
                    .hwp{
                        color:white;font-size: 25px;
                    }
                     #customers .fa-whatsapp,#customers .fa-phone{font-size: 11px;}
                     .package-list-item .price .uk-link, a {
                        font-weight: bold;
                    }
                    .sugne_in h3 {color:white;}
                    .sugne_in{
                        max-height: 484px;
                        min-height:auto;
                        margin: 0 auto;
                        overflow: hidden;
                    }
                    .sugne_in:hover {
                        overflow-y: scroll;
                      }
                      .sugne_in::-webkit-scrollbar {
                        width: .3em;
                      }
                    
                      .sugne_in::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                      }
                      .sugne_in::-webkit-scrollbar-thumb {
                        background-color: var(--secondary);
                        outline: 1px solid slategrey;
                      }
                      input[type='checkbox'] {
                        opacity: 1;
                        display: block;
                        float: left;
                        width: 24px;
                        margin-top: 3px;
                    }
                    .ML20{margin-left: 20px;}
                    .action{
                        background: var(--primary);
                        padding-right: 5px;
                        padding-left: 5px;
                        border-radius: 50%;
                        color:white;
                    }
                    .action:hover{background-color:var(--secondary);}
                    .action-td{display:flex;}
                    `}
                </style>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        properties: state.properties.data,
        filters: state.filters,
        auth: state.auth,
        website: state.website.data,
    }
    return obj;
}

const mapDispatchToProps = {
    getPropertyList
}

export default connect(mapStateToProps, mapDispatchToProps)(DistressTable)
