import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Dispatchable } from '../../../../../lib/with-redux-store';
import { saveQueryToStore } from '../../../../../actions/contactActions';
import { UpdateFilter } from '../../../../../actions/filterActions';
import { getProjectList, getProjectCount, filterList, resetList, getHotProjectList } from '../../../../../asyncActions/projectAsyncActions';
import { getCategoryList, getWebsiteData } from '../../../../../asyncActions/commonAsyncActions';
//import { convertISOStringToMonthDay, viewsFormat, priceMap } from '../utility';
import ReduxLazyScroll from 'redux-lazy-scroll';
import { deepClone, addOrRemoveInFIlter, MapFilterToSetting, getLocationAreaText, viewsFormat, convertISOStringToMonthDay, createMarkup, shorten, getInitialPropsU, setWebsiteCode, MapWebsiteCode } from '../../../../../utility';
import { PropFilter, BreadCrumb } from '../../../../../components';
import { StatusList, glink } from '../../../../../constant';
import {
  // BrowserView,
  // MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
interface Props {
  domain, website, getWebsiteData,
  setting, getProjectList, getProjectCount, data, count, currentPage, isFetching, getHotProjectList, hotProp, getCategoryList, category, countLoading,
  errorMessage, hasMore, keyword, saveQueryToStore, resetList, UpdateFilter, filters, filterList, showAll
}
type SortState = {
  keyword: string, websiteLoaded: boolean
};

let initailState = {
  keyword: '', websiteLoaded: false
}

class Projects extends React.Component<Dispatchable<Props>, SortState> {
  async getInitialProps(appContext) {
    await getInitialPropsU(appContext, appContext.domain);
  }
  async componentDidMount() {
    if (!this.props.website) {
      await this.props.getWebsiteData(this.props.domain);
    }
  }
  constructor(props) {
    super(props);
    this.state = deepClone(initailState);
    this.loadMore = this.loadMore.bind(this);
  }
  onInit() {
    window.scrollTo(0, 0);
    let f = addOrRemoveInFIlter(this.props.filters, ['propType', 'subArea', 'location'], [this.props.setting.propType, this.props.setting.subArea, this.props.setting.location], false);
    f.websites = (this.props.website.code == 'w1') ? "w1,'',null" : this.props.website.code;
    this.props.getHotProjectList(f);
    if (this.props.currentPage == 1) {
      this.props.getProjectList(f);
    }
    this.setState({ websiteLoaded: true });
  }
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }
  getData = () => {
    this.props.filterList(addOrRemoveInFIlter(this.props.filters, ['keyword'], [this.state.keyword], false));
  }
  loadMore() {
    if (this.props.website && this.state.websiteLoaded && this.props.data.length >= this.props.filters.limit) {
      let f = deepClone(this.props.filters);
      f.page = this.props.currentPage + 1;
      f.websites = (this.props.website.code == 'w1') ? "w1,'',null" : this.props.website.code;
      this.props.getProjectList(f);
    }
  }
  getCatNameById(id) {
    let name = "";
    if (this.props.category) {
      this.props.category.forEach(x => {
        if (x._id == id) {
          name = x.name;
        }
      });
    }
    return name;
  }



  render() {

    if (!this.state.websiteLoaded && this.props.website) {
      this.onInit();
    }

    const { data, isFetching, errorMessage, hasMore, saveQueryToStore, hotProp, filters, countLoading } = this.props;
    return (
      <div>

        <BreadCrumb id="2" />
        <div className="content-wrapper">
          <div className="container">
            <div className="row">

              <div className="col-sm-12 col-md-3 desktop">
                {isBrowser &&
                  <PropFilter key={99} {...this.props} resetInput={() => this.setState({ keyword: '' })} />
                }
                <div className="sugetn">
                  <div className="sugne_in" id="new_properties">
                    <h3>Hot Projects</h3>
                    <div className="sidebar-module">
                      <div className="sidebar-module-inner">
                        <ul className="sidebar-post">
                          {hotProp && hotProp.map((x, i) =>
                            <li className="clearfix" key={i}>
                              <Link href={glink.href.project} as={`/${filters.country}/${filters.location}/${filters.subArea}/project/${x.slug}`} ><a>
                                <div className="image">
                                  <img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.projectName}></img>
                                </div>
                                <div className="content">
                                  <h6>{x.projectName}</h6>
                                  <span>₹ {x.priceRange || '-'} Lakhs</span>
                                </div>
                              </a></Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-9" style={{ padding: "0" }}>
                <div className="searching_searchbar">
                  <form className="form-inline">
                    <a className="btn btn-success mobile" data-toggle="modal" data-target="#filterPopup">
                      <i className="fa fa-filter"></i>
                    </a>
                    <input className="form-control mr-sm-2" type="search" value={this.state.keyword} name="keyword" onChange={this.handleChange} placeholder="Search by Location / Project name / Keyword..." aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => this.getData()}>
                      Search
                    </button>
                    {/* {(countLoading) ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}  */}
                    {/* <i className="fa fa-search"></i> */}
                  </form>
                </div>
                {/* {(countLoading) ? <i className="fa fa-circle-o-notch fa-spin"></i> : null} */}
                <div className="new_listing_projects">
                  <h1 className="title_heading"> {filters.propType} Projects in {getLocationAreaText(filters)}</h1>
                  {!countLoading &&
                    <div className="iner_projects_listing">
                      <div className="col-md-12 listing_content">
                        <ReduxLazyScroll
                          isFetching={isFetching}
                          errorMessage={errorMessage}
                          loadMore={this.loadMore}
                          hasMore={hasMore}
                        >
                          {data && data.map((x, i) =>
                            <div className="row package-list-item">
                              <div className="left_images">
                                <img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.projectName} className="img-responsive"></img>
                                <span className="offer_design">Special Offer - {x.specialOffer || 'Contact Agent'}</span>
                              </div>
                              <div className="content">
                                <h5>

                                  <Link href={glink.href.project} as={`/${this.props.filters.country}/${this.props.filters.location}/${this.props.filters.subArea}/project/${x.slug}`} >
                                    <a>{x.projectName}</a>
                                  </Link>
                                  <span>{convertISOStringToMonthDay(x.listingDtae)}  | <b>Views: {viewsFormat(x.view, 2)}</b></span></h5>

                                <div className="row gap-10">
                                  <div className="col-sm-12 col-md-12">
                                    {/* <a href="#">Read More</a> */}
                                    {x.projectDetails &&
                                      <p
                                        dangerouslySetInnerHTML={createMarkup(shorten(x.projectDetails, 300, '...', false))}
                                      />
                                    }
                                    <ul className="list-info">
                                      <li>
                                        <span className="font600"><b>Property Type: </b> <span></span> {x.propType.name || '-'}</span>
                                      </li>
                                      <li>
                                        <span className="font600"><b>Project Type: </b> <span>{x.projectType || '-'}</span></span>
                                      </li>
                                      <li>
                                        <span className="font600"><b>No. of Units: </b> <span>{x.units || '-'}</span></span>
                                      </li>
                                      <li>
                                        <span className="font600"><b>Area Range: </b><span>{x.areaRange || '-'} Sq. Ft</span></span>
                                      </li>
                                      <li>
                                        <span className="font600"><b>Price Range: </b><span>₹ {x.priceRange || '-'} Lakhs</span></span>
                                      </li>
                                    </ul>
                                    <div className="second_bhk_data">
                                      <ul>
                                        {x.layouts && x.layouts.map((l, j) =>
                                          <li key={j}>
                                            <div className="proDescColm1">
                                              <span>{this.getCatNameById(l.subCategory)} &nbsp;{this.getCatNameById(l.category)}</span>
                                            </div>
                                            <div className="proDescColm1">
                                              <span>{l.superArea} sqft</span>
                                            </div>
                                            <div className="proDescColm1">
                                              <span>₹ {l.priceRange} Lakhs</span>
                                            </div>
                                            <div className="proDescColm1">
                                              <a href="#" onClick={() => saveQueryToStore(x.publisher.email)} data-toggle="modal" data-target="#ContactPopup" >Contact Now</a>
                                            </div>
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                    <div className="iner_social_icons">
                                      <ul>
                                        {x.amenities && x.amenities.map((x, i) =>
                                          <li key={i}><img src={x.iconUrl} alt={x.name} title={x.name} className="img-responsive"></img></li>
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12 text-right text-left-sm">
                                    <div className="contact_buttons">
                                      <span className="top_views">
                                        <Link href={glink.href.project} as={`/${this.props.filters.country}/${this.props.filters.location}/${this.props.filters.subArea}/project/${x.slug}`} >
                                          <a className="btn btn-primary btn-sm">View Details</a>
                                        </Link>
                                        <a onClick={() => x.saveQueryToStore(x.publisher.email)} data-toggle="modal" data-target="#ContactPopup" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>


























                            // <ProjCard key={i} {...x} {...this.props}/>
                            //       <div className="col-md-12 listing_content" key={i}>
                            //         <div className="row">
                            //           <div className="left_images">
                            //             <img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.projectName} className="img-responsive"></img>
                            //           </div>
                            //           <div className="right_project_listing">
                            //             <div className="listing_small">
                            //               <p>
                            //                 <Link href={glink.href.project} as={`/${filters.country}/${filters.location}/${filters.subArea}/project/${x.slug}`} ><a>
                            //                   <strong>{x.projectName}</strong></a>
                            //                 </Link>
                            //               </p>
                            //               <p><span className="capital">{x.location}</span></p>
                            //               <p><span>by, {x.builderName}</span></p>
                            //               <div className="proDetailLine proOffer">
                            //                 <span className="proOfferIco">OFFER</span>
                            // 	View Deal by 1 Advertiser(s)
                            // </div>
                            //             </div>
                            //             <div className="proPrice">
                            //               <p>
                            //                 {x.priceRange && <b>₹ {x.priceRange || '-'} Lakhs</b>}
                            //                 {!x.priceRange && <b>Price on Request</b>}
                            //               </p>
                            //             </div>
                            //             <div className="listing_biger">
                            //               <h3>{StatusList[x.projectStatus]}</h3>
                            //               <p>{x.metaDesc}</p>
                            //             </div>
                            //             <div className="second_bhk_data">
                            //               <ul>
                            //                 {x.layouts && x.layouts.map((l, j) =>
                            //                   <li key={j}>
                            //                     <div className="proDescColm1">
                            //                       <span>{this.getCatNameById(l.subCategory)} &nbsp;{this.getCatNameById(l.category)}</span>
                            //                     </div>
                            //                     <div className="proDescColm1">
                            //                       <span>{l.superArea} sqft</span>
                            //                     </div>
                            //                     <div className="proDescColm1">
                            //                       <span>₹ {l.priceRange} Lakhs</span>
                            //                     </div>
                            //                     <div className="proDescColm1">
                            //                       <a href="#" onClick={() => saveQueryToStore(x.publisher.email)} data-toggle="modal" data-target="#ContactPopup" >Contact Now</a>
                            //                     </div>
                            //                   </li>
                            //                 )}
                            //               </ul>
                            //             </div>
                            //           </div>
                            //         </div>
                            //       </div>
                          )}
                        </ReduxLazyScroll>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`

            /* Medium Devices, Desktops */
            @media only screen and (min-width : 992px) {
              .iner_projects_listing{
                margin-left:-20px;margin-right: -15px;
              }
            }

            /* Large Devices, Wide Screens */
            @media only screen and (min-width : 1200px) {
              .iner_projects_listing{
                margin-left:-20px;margin-right: -15px;
              }
            }
         
            @media only screen and (min-width : 992px) {
              .iner_social_icons ul li img {
                  width: 30px;
                  height: 30px;
              }
              .package-list-item{
                  margin-left:5px;
                  margin-right: 5px;
              }
              .second_bhk_data ul li .proDescColm1 {
                width: 25% !important;
              }
          }
          @media only screen and (min-width : 1200px) {
              .iner_social_icons ul li img {
                  width: 30px;
                  height: 30px;
              }
              .package-list-item{
                  margin-left:5px;
                  margin-right: 5px;
              }
              .second_bhk_data ul li .proDescColm1 {
                width: 25% !important;
              }
          }
          .top_views{color:white;}
        .fa-filter{color:white;}
          `}
        </style>



        <div className="modal fade" id="filterPopup" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-body">
                <button type="button" className="close" id="filterPopClose" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                {isMobile &&
                  <PropFilter key={100} {...this.props} resetInput={() => this.setState({ keyword: '' })} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.projects) {
    let obj = {
      data: state.projects.data,
      count: state.projects.count,
      countLoading: state.projects.loading,
      currentPage: state.projects.currentPage,
      filters: MapWebsiteCode(state.filters, state.website.data),
      showAll: false,
      category: state.category.flat,
      hotProp: state.projects.hotPropList,
      website: state.website.data,
      setting: state.setting
    }
    return MapFilterToSetting(obj, state.setting);
  }
  else { return null; }


}


const mapDispatchToProps = {
  getProjectList, getProjectCount, saveQueryToStore, UpdateFilter, filterList, resetList, getHotProjectList, getCategoryList, getWebsiteData
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)

