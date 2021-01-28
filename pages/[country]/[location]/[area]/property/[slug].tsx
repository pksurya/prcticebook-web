import React from 'react'
import { connect } from 'react-redux';
import { Dispatchable } from '../../../../../lib/with-redux-store';
import { getPropertyDetail, getPropertyList } from '../../../../../asyncActions/propertyAsyncActions';
import { SimilarProp, SuggestedProp, RecentBlog, HotSale, LatestPost, WhatsAppGrp, Contact, BreadCrumb, Meta, DistressTable, ContactCard } from '../../../../../components';
import { priceMap, convertISOStringToMonthDay, createMarkup, loadFlex, loadOwl, verifyWebsiteCode } from '../../../../../utility';
import { NBI } from '../../../../../constant';
import { DiscussionEmbed } from 'disqus-react';
import Head from 'next/head';
import GoogleMapReact from 'google-map-react';
import { AnyReactComponent } from '../project/[slug]';

interface Props {
  getPropertyDetail, propList, getPropertyList,
  propObj, slug, zoom, domain, website,setMsg
}

class Property extends React.Component<Dispatchable<Props>> {
  private myRefElem: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.myRefElem = React.createRef();
  }
  static async getInitialProps(obj) {
    await obj.reduxStore.dispatch(getPropertyDetail(obj.query.slug));
    return {
      slug: obj.query.slug,
      seo: 'propertyDetail'
    }
  }
  updateInnerHTMLFromProps() {
    this.myRefElem = this.props.propObj.description;
  }


  async componentDidMount() {
    //await this.props.getPropertyDetail(this.props.slug);
    loadFlex();
    // if ((this.props.propList == null || this.props.propList.length == 0) && this.props.propObj) {
    //   console.log("getting similar");
      let filters = {
        propType: this.props.propObj.propType.name,
        category: this.props.propObj.category.name,
        subCategory: this.props.propObj.subCategory.name,
        projectStatus: this.props.propObj.projectStatus,
        page: 1,
        limit: 9,
        websites: verifyWebsiteCode(this.props.website)
      }
      await this.props.getPropertyList(filters);
      loadOwl();
      //}
      this.updateInnerHTMLFromProps();
  }

  render() {
    const { propObj, website } = this.props;
    let cen = {
      lat: '',
      lng: '',
    }
    if (propObj != null) {
      cen = {
        lat: propObj.latitude || '',
        lng: propObj.longitude || '',
      }
    }
    return (
      <div>
        {propObj &&
          <>
            {/* <Meta {...this.props.propObj} /> */}
            <BreadCrumb id="3" />

            <section id="start_data">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-sm-8">
                    <div className="left_side_content">
                      {website && website.code != 'w12' &&
                        <div className="left_side_data">
                          <h1>
                            <img src="/assets/images/icon-img.png" alt={propObj.title} className="img-responsive"></img>free gold coin
                          </h1>
                        </div>
                      }
                      <div className="slider">
                        <div id="slider" className="flexslider">
                          <ul className="slides">
                            <li className="MB20">
                              <img src={propObj.profilePic || '/assets/images/ps.jpg'} alt={propObj.title} ></img>
                            </li>
                            {propObj.pictures.map((x, i) =>
                              <li key={i}>
                                <img src={x || '/assets/images/ps.jpg'} alt={propObj.title} ></img>
                              </li>
                            )}
                          </ul>
                        </div>
                        <div id="carousel" className="flexslider">
                          <ul className="slides">
                            <li>
                              <img src={propObj.profilePic || '/assets/images/ps.jpg'} alt={propObj.title} ></img>
                            </li>
                            {propObj.pictures.map((x, i) =>
                              <li key={i}>
                                <img src={x || '/assets/images/ps.jpg'} alt={propObj.title} ></img>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="start_details">
                        <div className="start_iner_deta">
                          <h3>{propObj.title || ''}</h3>
                          <b className="capital">{propObj.location}</b>

                          {website && website.code != 'w12' &&
                            <>
                              {propObj.costDistress &&
                                <>
                                  <ins>
                                    <h5 className="amount">₹ {priceMap(propObj.costDistress || propObj.cost)}</h5>
                                  </ins>
                                  <del>
                                    <h5 className="amount">₹ {priceMap(propObj.cost)}</h5>
                                  </del>
                                </>
                              }
                              {!propObj.costDistress &&
                                <h5>₹ {priceMap(propObj.cost)}</h5>
                              }
                            </>
                          }

                          {website && website.code == 'w12' &&
                            <h5 className="amount">₹ {propObj.rent}/-</h5>
                          }

                          {/* <h5>₹ {priceMap(propObj.cost)}</h5> */}
                          <strong> {propObj.carpetArea} Sq. Ft Carpet Area</strong>
                          <ul className="start_mor_data">
                            <h4><b>Status:</b> {propObj.status}</h4>
                            {/* <li>2 BHK-3 BHK Apartment from 1296 Sq. Ft. to 1917 Sq. Ft.</li>
                            <li>Spreads over 21.7 acres</li>
                            <li>23, 000 sq. ft. club house</li>
                            <li>Designed by global architects</li>
                            <li>Attractive payment plans</li> */}
                          </ul>
                        </div>
                      </div>
                      <div className="start_more_details">
                        <div className="start_iner_detas">
                          <h3>Properties Detail</h3>
                          {/* <p>{propObj.description || ''}</p> */}
                          <div key="22" ref={this.myRefElem}dangerouslySetInnerHTML={createMarkup(propObj.description)} />
                        </div>
                      </div>
                      <div className="start_more_details">
                        <div className="start_iner_detas" id="table_deta">
                          <h3>Property Information</h3>
                          <table className="table" id="myTable">
                            <tbody>
                              <tr>
                                <td>Property Type</td>
                                <td>{propObj.category.name || '-'}</td>
                              </tr>
                              <tr>
                                <td>Construction Status </td>
                                <td>{propObj.status || '-'}</td>
                              </tr>
                              {!propObj.rent &&
                                <tr>
                                  <td>Return on Investment</td>
                                  <td>{propObj.roi || '-'} %</td>
                                </tr>
                              }
                              {propObj.category.id == '5ce99b371db99b2f82234955' &&
                                <tr>
                                  <td>Plot size</td>
                                  <td>{propObj.plotSize || '-'} sq. yard</td>
                                </tr>
                              }
                              {propObj.cost &&
                                <tr>
                                  <td>Cost</td>
                                  {website && website.code != 'w12' &&
                                    <td>
                                      {propObj.costDistress &&
                                        <>
                                          <del>
                                            <span className="amount">₹ {priceMap(propObj.cost)}</span>
                                          </del>&nbsp;&nbsp;
                                        <ins>
                                            <span className="amount">₹ {priceMap(propObj.costDistress || propObj.cost)}</span>
                                          </ins>
                                        </>
                                      }
                                      {!propObj.costDistress &&
                                        <span>₹ {priceMap(propObj.cost)}</span>
                                      }
                                    </td>
                                  }

                                  {website && website.code == 'w12' &&
                                    <td>
                                      <span>₹ {propObj.rent}/-</span>
                                    </td>
                                  }

                                </tr>
                              }
                              {propObj.rent &&
                                <tr>
                                  <td>Rent</td>
                                  <td>₹ {propObj.rent || '-'}/-</td>
                                </tr>
                              }

                              <tr>
                                <td>Size</td>
                                <td>{propObj.size || '-'} sq. ft.</td>
                              </tr>
                              <tr>
                                <td>Carpet Area </td>
                                <td>{propObj.carpetArea || '-'} Sq ft &nbsp;(tentative value, not confirmed)</td>
                              </tr>
                              <tr>
                                <td>Floor</td>
                                <td>{propObj.floor || '-'} / {propObj.totalFloor || '-'}</td>
                              </tr>
                              <tr>
                                <td>Builder Type</td>
                                <td>{(propObj.builder == 3) ? 'Builder' : 'Authority' || '-'}</td>
                              </tr>
                              <tr>
                                <td>Listed By</td>
                                <td>{propObj.postedBy || '-'}</td>
                              </tr>
                              <tr>
                                <td>Listed On</td>
                                <td>{convertISOStringToMonthDay(propObj.listingDtae) || '-'}</td>
                              </tr>
                              <tr>
                                <td>Facing</td>
                                <td>{propObj.facing || '-'}</td>
                              </tr>
                              <tr>
                                <td>Verified</td>
                                <td>{(propObj.IsVerified) ? "Yes" : "No"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {propObj.amenities.length > 0 &&
                        <div className="start_more_details">
                          <div className="start_iner_detas" id="more_menu_list">
                            <h3>Amenities</h3>
                            <ul>
                              {propObj.amenities.map((x, i) =>
                                <li key={i}>
                                  <img src={x.iconUrl || '/assets/images/ps.jpg'} alt={x.name} className="img-responsive"></img>
                                  <span>{x.name}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      }
                      {propObj.nearBy.length > 0 &&
                        <div className="start_more_details">
                          <div className="start_iner_detas" id="more_menu_list">
                            <h3>Near By Facilities</h3>
                            <ul>
                              {propObj.nearBy.map((x, i) =>
                                <li key={i}>
                                  {/* {NBI[x.id]} */}
                                  <img src={NBI[x.id].url || '/assets/images/ps.jpg'} alt={x.name} className="img-responsive"></img>
                                  <span>{x.name} &nbsp;{x.details}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      }
                      {(propObj.layoutPic || propObj.layoutComment) &&
                        <div className="start_more_details" id="pro_details">
                          <div className="start_iner_detas">
                            <h3>Properties Detail</h3>
                            <img src={propObj.layoutPic || '/assets/images/ps.jpg'} alt={propObj.title} className="img-responsive"></img>
                          </div>
                          <div dangerouslySetInnerHTML={createMarkup(propObj.layoutComment)} />
                        </div>
                      }

                      <div className="start_more_details">
                        <div className="start_iner_detas" id="maps">
                          <div style={{ height: '60vh', width: '100%' }}>
                            <GoogleMapReact
                              bootstrapURLKeys={{ key: 'AIzaSyAkI8Sh7XXwpjbaUi-1S1mOIRehs7KLu0w' }}
                              defaultCenter={cen}
                              yesIWantToUseGoogleMapApiInternals
                              defaultZoom={this.props.zoom}
                            >
                              <AnyReactComponent
                                text='!'
                              />
                            </GoogleMapReact>
                          </div>
                          {/* <img src="/assets/images/map.jpg" alt="" className="img-responsive"></img> */}
                        </div>
                      </div>
                      {/* <div className="start_more_details">
                        <div className="start_iner_detas" id="maps">
                          <img src="/assets/images/chart.jpg" alt="" className="img-responsive"></img>
                        </div>
                      </div> */}
                      <ContactCard />
                    </div>
                    <div className="discuss">
                      <DiscussionEmbed
                        shortname='https-www-property-sale'
                        config={
                          {
                            url: propObj.slug,
                            identifier: propObj.slug,
                            title: propObj.title
                          }
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="start_right_sidebar">
                      <Contact  msg="" title="Contact Agent" {...this.props} />
                      <ContactCard />
                      <WhatsAppGrp />
                      <div className="advertisements_deta">
                        <h3>Advertisements</h3>
                        <img src="/assets/images/assignment-img.png" alt="" className="img-responsive"></img>
                      </div>
                      <SuggestedProp {...this.props} />
                      {/* <HotSale /> */}
                      <DistressTable {...this.props} search={false} />
                      <LatestPost {...this.props} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        }
        <SimilarProp {...this.props} />
        <RecentBlog {...this.props} />
        <style jsx>
          {`
          #more_menu_list img{width:20px !important;}
          del h5,del span{
            color: rgba(red, 0.5)  !important;
            text-decoration: none;
            position: relative;
          }
           del h5:before,del span:before {
              content: " ";
              display: block;
              width: 100%;
              border-top: 2px solid rgba(red, 0.8) !important;
              height: 12px;
              position: absolute;
              bottom: 0;
              left: 0;
              transform: rotate(-7deg);
            } 
           ins h5, ins span {
              color: green !important;
              text-decoration: none;
          }
          ins{
            text-decoration: none;
          }
          .start_right_sidebar{positopn:relative;}
        .MB20{margin-bottom:20px;}
        .MB20 img{min-height:350px;height:350px;max-height:350px;}
        #carousel ul li img{min-height:130px;height:130px;max-height:130px;}
        .slides li {background-color: #222222;}
        .slides li img{opacity:.9;}
          `}
        </style>

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    propList: state.properties.data,
    propObj: state.propertyDetail.data,
    website: state.website.data,
    zoom: 11
  }
}

const mapDispatchToProps = {
  getPropertyDetail, getPropertyList
}
export default connect(mapStateToProps, mapDispatchToProps)(Property)



