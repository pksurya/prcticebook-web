import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { constant, glink } from '../../constant';
import { viewsFormat, getWATemplateOfProperty } from '../../utility';

interface Props {
    setting: any, projects, title
}

const mapStateToProps = (state: Props) => state

const Recommented: React.SFC<any> = (props) => {
    const { setting, projects, title, filters } = props;
    return (
        <div>
            <section id="most_read" className="most-recom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                            <div className="section-title text-left">
                                <h2 className="capital" >{(title == 'recommended') ? 'Most' : 'Featured'} {title} Projects in {setting.location}</h2>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 desktop">
                            <div className="view-btn-all">
                                <Link href={glink.href.projects} as={`/${setting.country}/${setting.location}/${setting.subArea}/projects/${setting.propType}`}><a>View All Projects</a></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row ff">
                        <div className="col-md-12">
                            <div className="services-items services-carousel-3-col owl-carousel owl-theme text-center inc-overlay most_reads">
                                {projects.group && projects.group[title].map((x, i) =>
                                    <div className="item" key={i}>
                                        <div className="property-block-two" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                            <div className="inner-box">
                                                <div className="image-box">
                                                    <figure className="image">
                                                        <Link href={glink.href.project} as={`/${setting.country}/${setting.location}/${setting.subArea}/project/${x.slug}`}><a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.projectName}></img></a></Link>
                                                    </figure>
                                                    <span className="for">{x.builderName}</span>
                                                </div>
                                                <div className="box_content">
                                                    <h3>
                                                        <Link href={glink.href.project} as={`/${setting.country}/${setting.location}/${setting.subArea}/project/${x.slug}`}><a>{x.projectName}</a></Link>
                                                    </h3>
                                                    {/* <h4><i className="fa fa-building-o"></i>&nbsp;{x.builderName}</h4> */}
                                                    <p className="capital"><i className="icon fa fa-map-marker"></i>&nbsp;{x.location}</p>

                                                    <div className="row footer">
                                                        <div className="col-7">
                                                            <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a className="see_details">Details</a></Link>
                                                        </div>
                                                        <div className="col-2">
                                                            <a href="tel:+91-8375924100" className="see_details" target="_blank"><i className="icon fa fa-phone fa-white"></i></a>
                                                        </div>
                                                        <div className="col-2">
                                                            <a href={"https://wa.me/+918375924100?text=I am interested in property " + x.code + " => " + x.projectName} className="see_details" target="_blank"><i className="icon fa fa-whatsapp fa-white"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="views_number">
                                                    <ul>
                                                        <li><i className="fa fa-eye"></i><span> {viewsFormat(x.view, 2)}</span></li>
                                                        <li className="number_right">
                                                            <a href={'tel:+91-' + constant.contactNumber} target="_blank"><i className="fa fa-phone"></i><span> {constant.contactNumber}</span></a>
                                                        </li>
                                                    </ul>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>
                            <div className="view_btns mobile">
                                <Link href={glink.href.projects} as={`/${setting.country}/${setting.location}/${setting.subArea}/projects/${setting.propType}`}><a>View All Projects</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>
                {`
                .view_btns a{background-color:var(--primary)}
                figure img{max-height:140px;max-height:140px;height: 140px !important;}
                .box_content h3 a{ color:black;font-size:12px !important;}
                .box_content h4{ color:dimgray;}
                .box_content p{ color:darkgray;}
                .views_number li {color:gray}
                img{opacity: .9;}
                .see_details {
                  background: var(--secondary);
                  color: #fff;
                  padding: 5px 15px;
                  margin: 10px 0 0;
                  display: block;
                  width: 100% !important;
                  border-radius: 2em;
                  text-align: center;
                  opacity: .8;
              }
              .see_details:hover{background-color:var(--primary)}
              #product_price b {
                  font-size: 12px !important;
              }
              .box_content h3 a {
                  font-size: 12px !important;
              }
              .box_content h3 {
                min-height: 60px !important;
              }
              .box_content p {
                  font-size: 12px;
                  margin-bottom: 5px;
                  margin-top: 15px;
              }
              .fa-white{color:white;margin-left: -5px;}
              .footer{
                  background: #eee;
                  margin: -10px;
                  padding-bottom: 10px;
                  margin-top: 0px;
              }
              .ff {
                min-height: 250px;
                background-color: #f3f3f3 !important;
                padding-top: 15px;
                background: url("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/ajax-loader.gif") no-repeat center center;
              }
              .owl-theme{margin-bottom: -12px;}
              h2{margin-bottom: 10px !important;}
              .view-btn-all{
                color: #0404049e;
                text-decoration: underline;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                line-height: 18px;
                float: right;
              }
    `}
            </style>
        </div>
    )
}

export default connect<Props>(mapStateToProps)(Recommented)
