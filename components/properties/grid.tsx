import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { convertISOStringToMonthDay, priceMap, viewsFormat, getWATemplateOfProperty, shorten } from '../../utility';
import Link from 'next/link';
import { glink } from '../../constant';

const mapStateToProps = (state: any) => state
// id="exclusive"
const PropGrid: React.SFC<any> = (prop) => {
    const obj = prop.properties.data;
    //const [location, setName] = useState(prop.setting.location);
    //useEffect(() => { prop.locChange(prop.filters) }, [location]);
    const getPriceTag = (x) => {
        if (x.costDistress && x.costDistress != 0) {
            return (<>
                <del>
                    <span className="amount">₹ {priceMap(x.cost)}</span>
                </del>

                <ins>
                    <span className="amount">₹ {priceMap(x.costDistress || x.cost)}</span>
                </ins>
            </>)
        }
        else {
            return (<span>₹ {priceMap(x.cost)}</span>)
        }
    }

    return (
        <div>
            {obj && obj.map((x, i) =>

                <div className="package-list-item clearfix" key={i}>
                    <div className="image">
                        <div className="image-bg">
                            <a href="#">
                                <img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title} ></img>
                            </a>
                        </div>
                        <div className="absolute-in-image">
                            <div className="duration">
                                <span>RERA REGISTERED</span>
                            </div>
                        </div>
                        <div className="absolute-in-images">
                            <div className="durations">
                                <span>{convertISOStringToMonthDay(x.listingDtae) || '-'}</span>
                            </div>
                        </div>
                        <div className="price_costing">
                            <div className="property_id">
                                <ul>
                                    <li>
                                        <div className="listing_data">
                                            {/* {getPriceTag(x)} */}
                                            {!x.IsForRent &&
                                                <>
                                                    {x.costDistress && x.costDistress != 0 &&
                                                        <>
                                                            <del>
                                                                <span className="amount">₹ {priceMap(x.cost)}</span>
                                                            </del>

                                                            <ins>
                                                                <span className="amount">₹ {priceMap(x.costDistress || x.cost)}</span>
                                                            </ins>
                                                        </>
                                                    }
                                                    {!x.costDistress || x.costDistress == 0 &&
                                                        <span className="amount">₹ {priceMap(x.cost)}</span>
                                                    }
                                                </>
                                            }
                                            {x.IsForRent &&
                                                <ins>
                                                    <span><b>₹ {x.rent}/-</b></span>
                                                </ins>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="listing_data"><b>Property Id: </b>
                                            <span>{x.code}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <h5><Link href={glink.href.property} as={`/${prop.filters.country}/${prop.setting.location}/${prop.filters.subArea}/property/${x.slug}`}><a>{x.title}</a></Link>
                            <span className="capital">{shorten(x.location, 80, '..', false)}</span>
                        </h5>
                        <div className="row gap-10">
                            <div className="col-sm-12 col-md-12">

                                <ul className="list-info">
                                    <li>
                                        <span className="font600"><b>Property Type:</b> <span> {x.category.name}</span></span>
                                    </li>
                                    <li>
                                        <span className="font600"><b>Builder Type:</b> <span>{x.builder || '-'}</span></span>
                                    </li>
                                    <li>
                                        <span className="font600"><b>Listed By:</b> <span>{x.postedBy || '-'}</span></span>
                                    </li>
                                    <li>
                                        <span className="font600"><b>Listed On: </b><span>{convertISOStringToMonthDay(x.listingDtae) || '-'}</span></span>
                                    </li>
                                    <li>
                                        <span className="font600"><b>Floor: </b><span>{x.floor || '-'} / {x.totalFloor || '-'}</span></span>
                                    </li>
                                    <li>
                                        <span className="font600"><b>Total Area: </b><span>{x.size || '-'} Sq ft</span></span>
                                    </li>
                                    <li>
                                        <span className="font600"><b>Carpet Area: </b><span>{x.carpetArea || '-'} Sq ft</span></span>
                                    </li>
                                    <li>
                                        <span className="font600"><b>Facing: </b><span>{x.facing || '-'}</span></span>
                                    </li>
                                </ul>

                            </div>
                            <div className="col-sm-12 col-md-12 text-right text-left-sm">
                                <div className="contact_buttons">
                                    {/* <span className="top_views">
                                        <b className="sigle_tag">Posted On:- {convertISOStringToMonthDay(x.listingDtae) || '-'}</b>
                                        <b className="sigle_tag"><i className="fa fa-eye"></i>{viewsFormat(x.view, 2)}</b></span> */}

                                    <a href={"https://wa.me/+918375924100?text=I am interested in property " + x.code + " => " + getWATemplateOfProperty(x, prop)} className="btn btn-primary btn-sm contact_btn" target="_blank"><i className="icon fa fa-whatsapp fa-white"></i></a>
                                    <Link href={glink.href.property} as={`/${prop.filters.country}/${prop.setting.location}/${prop.filters.subArea}/property/${x.slug}`}><a className="btn btn-primary btn-sm">{viewsFormat(x.view, 2)}&nbsp;<i className="icon fa fa-eye"></i></a></Link>
                                    <a href="#" onClick={() => prop.saveQueryToStore(x.publisher.email)} data-toggle="modal" data-target="#ContactPopup" className="btn btn-primary btn-sm contact_btn"><i className="icon fa fa-envelope"></i></a>
                                    <a href="tel:+91-8375924100" className="btn btn-primary btn-sm contact_btn ML" target="_blank"><i className="icon fa fa-phone fa-white"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>
                {`
                
                     del span{
                      color: rgba(red, 0.5)  !important;
                      text-decoration: none;
                      position: relative;
                    }
                     del span:before {
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
                    ins{
                        // position: absolute;
                        // top: -16px;
                        // left:50%;
                        // margin-left:-35px;
                    }
                    ins span {
                        color: green !important;
                        font-size: 15px;
                        text-decoration: none;
                        padding: 1em 1em 1em .5em;
                    }
                    .listing_data{
                        position:relative;
                    }
                    .image-bg{background-color:#222222}
                    .image img{opacity:0.9;}
                    .contact_buttons .btn.btn-primary.btn-sm {
                        width: auto !important;
                    }
                    .fa-white{color: mediumspringgreen;}
                    .ML{margin-left:0px !important;}
                    .package-list-item .absolute-in-images .durations span{background-color:#2323!important;background-image: none !important;}
                    .btn:hover{background-color:var(--primary);}
                `}
            </style>
        </div>
    )
}

export default connect<any>(mapStateToProps)(PropGrid)
