import React from 'react'
import { connect } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { Dispatchable } from '../../../../../lib/with-redux-store';
import { Contact, BreadCrumb, Meta } from '../../../../../components';
import { getProjectDetail, getProjectList } from '../../../../../asyncActions/projectAsyncActions'
import { getCategoryList } from '../../../../../asyncActions/commonAsyncActions';
import { createMarkup, MapFilterToSetting, loadJquery } from '../../../../../utility';
import { StatusList, NBI, glink } from '../../../../../constant';
import GoogleMapReact from 'google-map-react';
import { DiscussionEmbed } from 'disqus-react';
export const AnyReactComponent = ({ text }) => <div style={{
  color: 'white',
  background: 'red',
  padding: '15px 10px',
  display: 'inline-flex',
  opacity: '.6',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  transform: 'translate(-50%, -50%)'
}}>{text}</div>;
interface Props { getProjectDetail, slug, projObj, getCategoryList, category, center, zoom, projectList, getProjectList, filters }


class Project extends React.Component<Dispatchable<Props>> {


  static async getInitialProps(obj) {
    await obj.reduxStore.dispatch(getCategoryList());
    await obj.reduxStore.dispatch(getProjectDetail(obj.query.slug));
    return {
      slug: obj.query.slug,
      seo: 'projectDetail'
    }
  }
  async  componentDidMount() {
    //await this.props.getCategoryList();
    //await this.props.getProjectDetail(this.props.slug);
    if ((this.props.projectList == null || this.props.projectList.length == 0) && this.props.projObj) {
      let filters = {
        propType: this.props.projObj.propType.name,
        category: this.props.projObj.category.name,
        subCategory: this.props.projObj.subCategory.name,
        projectStatus: this.props.projObj.projectStatus,
        page: 1,
        limit: 9
      }
      this.props.getProjectList(filters);
    }
    loadJquery();
  }

  componentWillUnmount() {

  }
  getCatNameById(id) {
    let name = "";
    if (this.props.category) {
      ////console.log([this.props.category,id]);
      this.props.category.forEach(x => {
        if (x._id == id) {
          ////console.log([x,id]);
          name = x.name;
        }
      });
    }
    return name;
  }

  render() {
    const { projObj, projectList, filters } = this.props;

    let cen = {
      lat: '',
      lng: '',
    }
    if (projObj != null) {
      cen = {
        lat: projObj.latitude || '',
        lng: projObj.longitude || '',
      }
    }
    return (
      <div>
        {projObj &&
          <>
            {/* <Meta {...this.props.projObj} /> */}
            <BreadCrumb id="4" />
            <div className="content-wrapper">

              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-3">

                    <Contact  msg="" title="Contact Agent" {...this.props} />


                    {/* <div className="contact_agent">
                  <h3>Contact Agent</h3>
                  <form action="">
                    <div className="form-group">
                      <label htmlFor="name">Full Name:</label>
                      <input type="text" className="form-control" placeholder="Enter Name"></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email:</label>
                      <input type="email" className="form-control" placeholder="Enter Email"></input>
                    </div>
                    <div className="form-group" id="full_width">
                      <label htmlFor="contact no">Your Contact No:</label>
                      <input type="contact" className="form-control" placeholder="Enter Conatct No"></input>
                    </div>
                    <div className="form-group" id="full_width">
                      <label htmlFor="query">Your Query:</label>
                       type="contact" 
                      <textarea className="form-control" placeholder="Enter Query"></textarea>
                    </div>
                    <button type="submit" className="btn btn-default">Send Query </button>
                  </form>
                </div> */}
                    <div className="sugetn">
                      <div className="sugne_in" id="new_properties">
                        <h3>Similar Projects</h3>
                        <div className="sidebar-module">
                          <div className="sidebar-module-inner">
                            <ul className="sidebar-post">
                              {projectList && projectList.map((x, i) =>
                                // { i < 10 &&
                                <li className="clearfix" key={i}>
                                  <Link href={glink.href.project} as={`/${filters.country}/${filters.location}/${filters.subArea}/project/${x.slug}`} ><a onClick={() => this.props.getProjectDetail(x.slug)}>
                                    <div className="image">
                                      <img src={x.profilePic || '/assets/images/ps.jpg'}></img>
                                    </div>
                                    <div className="content">
                                      <h6>{x.projectName}</h6>
                                      <span>₹ {x.priceRange} Lakhs</span>
                                    </div>
                                  </a></Link>
                                </li>
                                // }
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact_details_more">
                      <h3>Contact Details</h3>
                      <ul>
                        <li><i className="fa fa-user"></i><span>{projObj.publisher.name}</span></li>
                        <li><i className="fa fa-phone"></i><span>(+91) {projObj.publisher.Phone}</span></li>
                        <li><i className="fa fa-envelope"></i><span>{projObj.publisher.email}</span></li>
                      </ul>
                    </div>
                    <div className="whatsapp_callingbtn">
                      <a href="https://wa.me/+918745891014" className="contact_btn"><i className="fa fa-whatsapp"></i>8745891014</a>
                      <a href="tel:+91-8745891014" className="phn_btn"><i className="fa fa-phone"></i>8745891014</a>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-9" style={{ padding: 0 }}>
                    <div className="new_listing_projects" id="listing_project_details">
                      <h1 className="title_heading">{projObj.projectName}</h1>
                      <div className="starting_table">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Project Details</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="qualification-tab" data-toggle="tab" href="#qualification" role="tab" aria-controls="qualification" aria-selected="true">Project Layout</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#pricelist" role="tab" aria-controls="exprience" aria-selected="true">Price List</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#locationmap" role="tab" aria-controls="exprience" aria-selected="true">Location Map</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#layoutdetails" role="tab" aria-controls="exprience" aria-selected="true">Layout Details</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#amenities" role="tab" aria-controls="exprience" aria-selected="true">Amenities</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#nearfacilities" role="tab" aria-controls="exprience" aria-selected="true">Near By Facilities</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#specification" role="tab" aria-controls="exprience" aria-selected="true">Specification</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#photosgallery" role="tab" aria-controls="exprience" aria-selected="true">Photos gallery</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#maplocation" role="tab" aria-controls="exprience" aria-selected="true">Map Location</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#downloads" role="tab" aria-controls="exprience" aria-selected="true">Downloads</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="exprience-tab" data-toggle="tab" href="#analysis" role="tab" aria-controls="exprience" aria-selected="true">Analysis</a>
                          </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                          <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                            <div className="iner_projects_details_listing">
                              <div className="col-md-12 listing_content">
                                <div className="row">
                                  <div className="left_images">
                                    <img src={projObj.profilePic || '/assets/images/ps.jpg'} alt={projObj.projectName} className="img-responsive"></img>
                                  </div>
                                  <div className="right_data_details">
                                    <div className="start_table">
                                      <table className="table" id="myTable">
                                        <tbody>
                                          <tr>
                                            <td>Location</td>
                                            <td className="capital">{projObj.location}</td>
                                          </tr>
                                          <tr>
                                            <td>Project Type</td>
                                            <td>{projObj.projectType || '-'}</td>
                                          </tr>
                                          <tr>
                                            <td>No. of Units</td>
                                            <td>{projObj.units || '-'}</td>
                                          </tr>
                                          <tr>
                                            <td>Area Range</td>
                                            <td>{projObj.areaRange || "-"} Sq. Ft.</td>
                                          </tr>
                                          <tr>
                                            <td>Price Range</td>
                                            <td>₹ {projObj.priceRange || '-'} Lakhs</td>
                                          </tr>
                                          <tr>
                                            <td>Status</td>
                                            <td>{StatusList[projObj.projectStatus]}</td>
                                          </tr>
                                          <tr>
                                            <td>Special Offer</td>
                                            <td>{projObj.location}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="more_details_datas_content">
                              <h3>About</h3>
                              <div dangerouslySetInnerHTML={createMarkup(projObj.projectDetails)} />
                            </div>
                          </div>

                          <div className="tab-pane fade" id="qualification" role="tabpanel" aria-labelledby="qualification-tab">
                            <div className="iner_projects_details_listing">
                              <div className="col-md-12 listing_content">
                                <div className="row">
                                  {projObj.projectLayout && projObj.projectLayout.map((x, i) =>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 image" key={i}>
                                      <div className="img-wrapperf">
                                        <img src={x} className="img-responsive"></img>
                                      </div>
                                    </div>
                                  )}
                                  <div dangerouslySetInnerHTML={createMarkup(projObj.projectLayoutComment)} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="pricelist" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="iner_projects_details_listing">
                              <div className="col-md-12 listing_content">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="col-md-12 listing_content">
                                      <div className="row">
                                        <div className="map_images">
                                          <img src={projObj.priceList} alt={projObj.projectName} className="img-responsive"></img>
                                        </div>
                                      </div>
                                    </div>
                                    <div dangerouslySetInnerHTML={createMarkup(projObj.priceListComment)} />

                                    {/* <div className="price_listing">
                                      <ul>
                                        <li>
                                          <h3>2 BHK Flat</h3>
                                          <p>1085 sqft - 1095 sqft</p>
                                          <p>For Sale:<a href="#">- 1095 sqft For Sale:₹ 50.9 Lac - ₹ 51.3 Lac</a></p>
                                          <p>For Rent: -- --</p>
                                        </li>
                                        <li>
                                          <h3>3 BHK Flat</h3>
                                          <p>1395 sqft - 2190 sqft</p>
                                          <p>For Sale:<a href="#">- 1095 sqft For Sale:₹ 50.9 Lac - ₹ 51.3 Lac</a></p>
                                          <p>For Rent: -- --</p>
                                        </li>
                                      </ul>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="locationmap" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="iner_projects_details_listing">
                              <div className="col-md-12 listing_content">
                                <div className="row">
                                  <div className="map_images">
                                    <img src={projObj.loctionMap} alt={projObj.projectName} className="img-responsive"></img>
                                  </div>
                                  <div dangerouslySetInnerHTML={createMarkup(projObj.loctionMapComment)} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="layoutdetails" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="iner_projects_details_listing">
                              <div className="col-md-12 listing_content">
                                <div className="row" id="table_start">
                                  <table className="table" style={{ "background": "#f8f8f8" }}>
                                    <thead>
                                      <tr><th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Price Range</th>
                                        <th>Super Area</th>
                                        <th>Carpet Area</th>
                                        <th>Specifications</th>
                                        <th>Layout</th>
                                      </tr></thead>
                                    <tbody>
                                      {projObj.layouts && projObj.layouts.map((x, i) =>
                                        <tr key={i}>
                                          <td> {this.getCatNameById(x.category)} </td>
                                          <td>{this.getCatNameById(x.subCategory)}  </td>
                                          <td>₹ {x.priceRange} Lakhs </td>
                                          <td> {x.superArea} Sq ft. </td>
                                          <td> {x.carpetArea} Sq ft. </td>
                                          <td> {x.details} </td>
                                          <td>
                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">View</button>
                                            {/* tabindex="-1" */}
                                            <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                              <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <h4 className="modal-title">Layout</h4>
                                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                                  </div>
                                                  <div className="modal-body">
                                                    <img src={x.layout} alt={projObj.projectName} className="img-responsive"></img>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                  <div dangerouslySetInnerHTML={createMarkup(projObj.layoutDetailsComment)} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="amenities" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="start_more_details">
                              <div className="start_iner_detas" id="more_menu_list" style={{ marginTop: "0" }}>
                                <ul style={{ marginTop: "0" }}>
                                  {projObj.amenities && projObj.amenities.map((x, i) =>
                                    <li key={i}>
                                      <img src={x.iconUrl || '/assets/images/ps.jpg'} alt={x.name} className="img-responsive"></img>
                                      <span>{x.name}</span>
                                    </li>
                                  )}
                                </ul>
                                <div dangerouslySetInnerHTML={createMarkup(projObj.amenitiesComment)} />
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="nearfacilities" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="start_more_details">
                              <div className="start_iner_detas" id="more_menu_list" style={{ marginTop: "0" }}>
                                <ul style={{ marginTop: "0" }}>
                                  {projObj.nearBy && projObj.nearBy.map((x, i) =>
                                    <li key={i}>
                                      {/* {NBI[x.id]} */}
                                      <img src={NBI[x.id].url || '/assets/images/ps.jpg'} alt={x.name} className="img-responsive"></img>
                                      <span>{x.name} &nbsp;within {x.details} km</span>
                                    </li>
                                  )}
                                </ul>
                                <div dangerouslySetInnerHTML={createMarkup(projObj.nearByComment)} />
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="specification" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="project_details_pages">
                              <div className="more_details_datas_content">
                                <div className="col-md-12 listing_content">
                                  <div className="row">
                                    <div className="map_images">
                                      <img src={projObj.specification} alt={projObj.specification} className="img-responsive"></img>
                                    </div>
                                  </div>
                                </div>
                                {/* <div dangerouslySetInnerHTML={createMarkup(projObj.specification)} /> */}
                                <div dangerouslySetInnerHTML={createMarkup(projObj.specificationComment)} />
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="photosgallery" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="iner_projects_details_listing">
                              <div className="col-md-12 listing_content">
                                <div className="col-md-12" id="gallery">
                                  <div id="image-gallery">
                                    <div className="row">
                                      {projObj.pictures && projObj.pictures.map((x, i) =>
                                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 image" key={i}>
                                          <div className="img-wrapper">
                                            <a href={x}><img src={x} className="img-responsive"></img></a>
                                            <div className="img-overlay">
                                              <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div id="overlay" style={{ display: "none" }}>
                                    <div id="prevButton"><i className="fa fa-chevron-left"></i></div><img></img><div id="nextButton"><i className="fa fa-chevron-right"></i></div><div id="exitButton"><i className="fa fa-times"></i></div></div></div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="maplocation" role="tabpanel" aria-labelledby="exprience-tab">
                            <div className="map_location">
                              <div style={{ height: '100vh', width: '100%' }}>
                                <GoogleMapReact
                                  bootstrapURLKeys={{ key: 'AIzaSyAkI8Sh7XXwpjbaUi-1S1mOIRehs7KLu0w' }}
                                  defaultCenter={cen}
                                  yesIWantToUseGoogleMapApiInternals
                                  defaultZoom={this.props.zoom}
                                >
                                  <AnyReactComponent
                                    text='Project Location'
                                  />
                                </GoogleMapReact>
                              </div>
                              {/* frameborder="0"  */}
                              {/* <iframe src="./property.sale.com_files/embed.html" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="discuss">
                      <DiscussionEmbed
                        shortname='https-www-property-sale'
                        config={
                          {
                            url: projObj.slug,
                            identifier: projObj.slug,
                            title: projObj.projectName
                          }
                        }
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </>
        }
        <style jsx>
          {`
          
.iner_projects_details_listing .left_images {
    width: 45%;
}.iner_projects_details_listing .right_data_details #myTable {
    margin-bottom: 0;
}.iner_projects_details_listing .left_images img.img-responsive {
    width: 100%;
    min-height: 280px;
}.iner_projects_details_listing .right_data_details {
    margin-left: 15px;
    width: 53%;
}.iner_projects_details_listing .right_data_details tbody td {
    padding: 9px 15px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid #eee;
}.more_details_datas_content {
    background: #fff;
    padding: 30px;
    box-shadow: 1px 2px 10px #ccc;
}.more_details_datas_content p {
    font-size: 15px;
    line-height: 25px;
}.more_details_datas_content ul {
    padding: 0 30px;
}.more_details_datas_content ul li {
    border-bottom: 1px solid #eee;
}.more_details_datas_content ul li p {
    margin-bottom: 0;
    padding: 6px;
}.project_details_pages h3 {
    font-size: 26px;
    border-bottom: 2px solid var(--primary);
    margin-bottom: 8px;
    padding-bottom: 5px;
    background: #fff;
    padding-left: 15px;
    font-weight: bold;
}#listing_project_details .title_heading {
    background: #fff;
    border-bottom: 1px solid #b15c5c;
    padding: 10px;
    text-transform: capitalize;
    font-weight: bold;
}.contact_agent h3 {
    font-size: 18px;
    border-bottom: 2px solid var(--primary);
    padding: 9px;
    background: #fff;
    padding-left: 7px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 0;
}.contact_agent form {
    background: #fff;
    padding: 15px;
    box-shadow: 1px 2px 10px #ccc;
}.contact_agent form .form-group {
    width: 100%;
    display: inline-block;
    margin: 4px 0;
}#full_width {
    width: 98%;
}.contact_agent form .form-group input.form-control {
    border: 1px solid #cccccc52;
    border-radius: 0;
    box-shadow: none;
    padding: 6px 10px;
    font-size: 13px;
}.contact_agent form .form-group label {
    margin-bottom: 2px;
    font-size: 12px;
}.contact_agent form button.btn.btn-default {
    background: var(--primary);
    color: #fff;
    padding: 5px 40px;
    margin: 5px 0;
    width: 99%;
}#full_width textarea.form-control {
    border: 1px solid #cccccc52;
    border-radius: 0;
    box-shadow: none;
    padding: 6px 10px;
    font-size: 13px;
}.contact_details_more {
    background: #fff;
    padding: 10px;
    margin-top: 25px;
    box-shadow: 1px 0px 13px #cccccc6b;
}.contact_details_more h3 {
    font-size: 22px;
    border-bottom: 2px solid var(--primary);
    background: #fff;
    padding: 0 0 10px 0;
    font-weight: bold;
    margin-top: 0;
}.contact_details_more ul {
    padding: 0 10px;
}.contact_details_more ul li {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    list-style: none;
    font-size: 14px;
}.contact_details_more ul li .fa {
    margin-right: 10px;
    color: var(--primary);
    font-size: 18px;
}.whatsapp_callingbtn {
    background: #fff;
    margin-top: 25px;
    padding: 15px;
    box-shadow: 1px 1px 10px #cacaca;
}.whatsapp_callingbtn a.contact_btn {
    display: block;
    text-align: center;
    padding: 10px;
    background: #248639;
    color: #fff;
    font-size: 18px;
}.whatsapp_callingbtn a.contact_btn .fa.fa-whatsapp {
    font-size: 22px;
    margin-right: 8px;
}.whatsapp_callingbtn a.phn_btn {
    display: block;
    text-align: center;
    padding: 10px;
    background: #399bd4;
    color: #fff;
    font-size: 18px;
    margin-top: 15px;
}.whatsapp_callingbtn a.phn_btn .fa.fa-whatsapp {
    font-size: 22px;
    margin-right: 8px;
}.whatsapp_callingbtn a.phn_btn .fa.fa-phone {
    font-size: 22px;
    margin-right: 8px;
}#listing_project_details .starting_table ul li a {
    font-size: 13px;
    border-radius: 0 !important;
    font-weight: 600;
    padding: 10px 6px; text-transform: capitalize;
}.map_location {
    background: #fff;
    padding: 15px;
}.map_images img {
    width: 100%;
}.price_listing ul {
    padding: 0;
    list-style: none;
}.price_listing ul li {
    display: inline-block;
    border: 1px solid #eee;
    padding: 15px 25px;
    margin-right: 25px;
    border-radius: 10px;
    box-shadow: 1px 2px 10px #cccccc6b;
}.price_listing ul li h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0;
    color: #c32a2a;
}.price_listing ul li p {
    margin: 7px 0;
    font-size: 14px;
}.price_listing ul li p a {
    color: #267be4;
}#nearfacilities #more_menu_list ul li img {
    width: 10%;
}.gallery {
  width: 600px;
  margin: auto;
  border-radius: 3px;
  overflow: hidden;
}

.img-c {
  width: 200px;
  height: 200px;
  float: left;
  position: relative;
  overflow: hidden;
}

.img-w {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform ease-in-out 300ms;
}

.img-w img {
  display: none;
}

.img-c {
  transition: width ease 400ms, height ease 350ms, left cubic-bezier(0.4, 0, 0.2, 1) 420ms, top cubic-bezier(0.4, 0, 0.2, 1) 420ms;
}

.img-c:hover .img-w {
  transform: scale(1.08);
  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 450ms;
}

.img-c.active {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  z-index: 2;
}

.img-c.postactive {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}

.img-c.active.positioned {
  left: 0 !important;
  top: 0 !important;
  transition-delay: 50ms;
}

#gallery {
    padding: 0;
}

.img-wrapper {
  position: relative;
  margin-top: 15px;
}
.img-wrapper img {
  width: 100%;
}

.img-overlay {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}
.img-overlay i {
  color: #fff;
  font-size: 3em;
}

#overlay {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#overlay img {
  margin: 0;
  width: 80%;
  height: auto;
  object-fit: contain;
  padding: 5%;
}
@media screen and (min-width: 768px) {
  #overlay img {
    width: 70%;
    border: 10px solid #fff;
    padding: 0;
    margin: 30px;
}
}
@media screen and (min-width: 1200px) {
  #overlay img {
    width: 70%;
    border: 10px solid #fff;
    padding: 0;
    margin: 30px;
}
}

#nextButton {
  color: #fff;
  font-size: 2em;
  transition: opacity 0.8s;
}
#nextButton:hover {
  opacity: 0.7;
}
@media screen and (min-width: 768px) {
  #nextButton {
    font-size: 3em;
  }
}

#prevButton {
  color: #fff;
  font-size: 2em;
  transition: opacity 0.8s;
}
#prevButton:hover {
  opacity: 0.7;
}
@media screen and (min-width: 768px) {
  #prevButton {
    font-size: 3em;
  }
}

#exitButton {
  color: #fff;
  font-size: 2em;
  transition: opacity 0.8s;
  position: absolute;
  top: 15px;
  right: 15px;
}
#exitButton:hover {
  opacity: 0.7;
}
@media screen and (min-width: 768px) {
  #exitButton {
    font-size: 3em;
  }
}
#table_start .table th, .table td {
    padding: 5px 12px;
    vertical-align: middle;
    border: 1px solid #ececec;
    font-size: 13px;
}.img-wrapperf img {
    width: 100%;
}.modal-dialog.modal-lg .modal-body img {
    width: 100%;
}



ul li .img-responsive{width: 20px !important;height: 20px !important;}
            #myTab{
              display: inline-block;
              overflow: auto;
              overflow-y: hidden;

              max-width: 100%;
              margin: 0 0 1em;

              white-space: nowrap;
            }
            #myTab li{
              display: inline-block;
              vertical-align: top;
            }
            #myTab::-webkit-scrollbar{
                height: .3em;
            }
            #myTab::-webkit-scrollbar-track {
              -webkit-box-shadow: inset 0 0 4px darkgrey;
            }
            #myTab::-webkit-scrollbar-thumb:horizontal{
              background-color: red;
              outline: 1px solid red;
            }

          `}
        </style>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  //console.log(state);
  let obj = {
    projectList: state.projects.data,
    projObj: state.projectDetail.data,
    category: state.category.flat,
    filters: state.filters,
    zoom: 11
  }
  return MapFilterToSetting(obj, state.setting);
}

const mapDispatchToProps = {
  getProjectDetail, getCategoryList, getProjectList
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
