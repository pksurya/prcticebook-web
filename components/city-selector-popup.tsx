import { connect } from 'react-redux'
import React from 'react';
import { getCityList, updateSetting, updateFilter } from '../asyncActions/commonAsyncActions';
import { Dispatchable } from '../lib/with-redux-store';
import { deepClone, getRoute, loadLeadForms } from '../utility';
import Router from 'next/router';
import { glink } from '../constant';

interface Props { getCityList, cities, setting, updateSetting, updateFilter, filters, router, website }
type MyState = { input: string, areaObj: any, area: boolean, subArea: boolean, accept: boolean, cityIndex: number, areaIndex: number, isHovering: boolean, areaText: string };
let initState = { input: '', areaObj: [], area: true, subArea: false, accept: false, cityIndex: null, areaIndex: null, isHovering: false, areaText: '' }

class CitySelectorPopup extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props);
        this.state = deepClone(initState);
    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }
    componentDidMount() {
        this.props.getCityList();

        //sets location  from url
        let { asPath, pathname } = Router;
        if (pathname != glink.href.home && pathname != glink.href.blog && pathname != glink.href.project && pathname != glink.href.property) {
            let url = decodeURIComponent(asPath.trim()).split("/");
            if (this.props.setting.location != url[2] && url[2]) {
                this.props.updateSetting(this.props.setting, ['location', 'subArea'], [unescape(url[2]), unescape((url[3]) ? url[3] : 'All')], false, null);
            }
        }

    }
    getArea(index) {
        this.setState({
            areaObj: this.props.cities[index].area || [],
            area: false,
            subArea: true,
            cityIndex: index
        }, function () {
            if (this.state.areaObj.length == 0) {
                this.setState({
                    areaObj: [],
                    area: false,
                    subArea: false,
                    accept: true
                });
            }
        });
    }
    getAccept(index) {
        this.setState({
            area: false,
            subArea: false,
            accept: true,
            areaIndex: index
        });
    }
    back() {
        this.setState({
            areaObj: [],
            area: true,
            subArea: false
        });
    }
    backToSub() {
        if (this.state.areaObj.length == 0) {
            this.setState({
                area: true,
                subArea: false,
                accept: false
            });
        }
        else {
            this.setState({
                area: false,
                subArea: true,
                accept: false
            });
        }
    }
    skip() {
        this.setState({
            area: false,
            subArea: false,
            accept: true
        });
    }
    accept() {
        this.setState({
            area: true,
            subArea: false,
            accept: false
        }, function () {
            //debugger;
            let location = "All";
            let subArea = "All";
            if (this.state.cityIndex != null && typeof this.state.cityIndex != 'undefined' && this.state.cityIndex >= 0) {
                location = this.props.cities[this.state.cityIndex].name!;
            }
            if (this.state.areaIndex != null && typeof this.state.areaIndex != 'undefined' && this.state.areaIndex >= 0) {
                subArea = this.state.areaObj[this.state.areaIndex].name!;
            }

            let url = getRoute(this.props.router, this.props.filters.country, location, subArea, this.props.filters.propType);
            //Router.push(url);
            this.props.updateSetting(this.props.setting, ['location', 'subArea'], [location, subArea], false, url);
            this.props.updateFilter(this.props.filters, ['location', 'subArea'], [location, subArea], false, 0);
            loadLeadForms();
        });
    }
    handleMouseHover(i) {
        this.setState(this.toggleHoverState(i));
    }

    toggleHoverState(i) {
        return {
            isHovering: !this.state.isHovering,
            areaText: this.state.areaObj[i].details!
        };
    }
    render() {
        //console.log(this.props.router);
        const { cities, setting, website } = this.props;
        return (
            <div>
                {this.state &&
                    <>
                        <div className="modal fade" id="cityModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {this.state.area &&
                                            <h5 className="modal-title" id="exampleModalLabel">Pick a City</h5>
                                        }
                                        {this.state.subArea &&
                                            <h5 className="modal-title" id="exampleModalLabel">Pick an area in {setting.location}</h5>
                                        }
                                        {this.state.accept &&
                                            <h5 className="modal-title" id="exampleModalLabel">Read Disclaimer and click "Accept & Visit"</h5>
                                        }
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {this.state.area &&
                                            <p>To find awesome properties around you</p>
                                        }
                                        {this.state.subArea &&
                                            <p>To find awesome properties in {setting.location}</p>
                                        }
                                        {this.state.accept &&
                                            <p>To find awesome properties in {setting.location} {setting.subArea}</p>
                                        }

                                        <ul>
                                            {cities && this.state.area && cities.map((x, i) =>
                                                <>
                                                    {website.code == 'w14' && x.name == 'Greater Noida' &&
                                                        <li key={i}><a className={(x.name == this.props.setting.location) ? 'city-active' : ''} onClick={() => this.getArea(i)}>{x.name}</a></li>
                                                    }
                                                    {website.code != 'w14' &&
                                                        <li key={i}><a className={(x.name == this.props.setting.location) ? 'city-active' : ''} onClick={() => this.getArea(i)}>{x.name}</a></li>
                                                    }
                                                </>
                                            )}
                                            {this.state.subArea && this.state.areaObj && this.state.areaObj.map((x, i) =>
                                                <li key={i}>
                                                    <a className={`${(x.name == this.props.setting.subArea) ? 'city-active' : ''}`} onClick={() => this.getAccept(i)}
                                                        onMouseEnter={() => this.handleMouseHover(i)} onMouseLeave={() => this.handleMouseHover(i)}
                                                    >{x.name}</a>
                                                </li>
                                            )}
                                        </ul>
                                        {this.state.subArea &&
                                            <div className="area-details">
                                                {this.state.isHovering &&
                                                    <p>{this.state.areaText}</p>
                                                }
                                            </div>
                                        }

                                        {this.state.accept &&
                                            <>
                                                {/* <h3>Read Disclaimer and click "Accept & Visit"</h3> */}
                                                <p>All the details displayed on the website are for informational purposes to the viewers/visitors of this website. All.Information displayed regarding all properties/real estate projects weather fresh sale or resale, including property/project details, listings, floor area ratio, super area, carpet area, layout plans of units, project layout, location information etc has been updated from multiple sources as per the best of knowledge and effort.Nothing contained herein shall be deemed to constitute legal advice,solicitations, promotion, marketing, offer for sale, invitation to offer, invitation to acquire/invest/make financial commitments/make legal agreements by any entity.You are hereby advised to visit the relevant RERA website/ take all RERA registered relevant details from the appropriate authorities/entity before taking any decision based on the contents displayed on the website.</p>
                                                <p>I the viewer/visitor to this website here by solemnly declare in my full senses and consciousness that I will not take any legal action against any person/entity associated with this website for any reason regarding the data/content /information displayed on this website.</p>
                                            </>
                                        }

                                    </div>
                                    {(this.state.subArea || this.state.accept) &&
                                        <div className="modal-footer">
                                            {this.state.subArea &&
                                                <>
                                                    <button type="button" onClick={() => this.back()} className="btn btn-secondary">Back</button>
                                                    <button type="button" onClick={() => this.skip()} className="btn btn-secondary">Skip</button>
                                                </>
                                            }
                                            {this.state.accept &&
                                                <button type="button" onClick={() => this.backToSub()} className="btn btn-secondary">Back</button>
                                            }
                                            {this.state.accept &&
                                                <button type="button" onClick={() => this.accept()} className="btn btn-secondary" data-dismiss="modal">Accept & Visit</button>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        cities: state.cities.data,
        setting: state.setting,
        filters: state.filters,
        website: state.website.data
    }
    return obj;
}

const mapDispatchToProps = {
    getCityList, updateSetting, updateFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySelectorPopup)




















