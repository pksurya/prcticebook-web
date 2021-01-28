import { connect } from 'react-redux';
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { getHotPropertyList } from '../asyncActions/propertyAsyncActions';
import { loadOwl, priceMap, shorten, getWATemplateOfProperty } from '../utility';
import Link from 'next/link';
import { glink } from '../constant';

interface Props {
    getHotPropertyList, hotPropList, filters, website
}

class HotProp extends React.Component<Dispatchable<Props>> {

    async componentDidMount() {
        if (this.props.website) {
            await this.props.getHotPropertyList(this.props.website.code);
            loadOwl();
        }
    }
    render() {
        const { hotPropList, filters, website } = this.props;
        // let data = {
        //     filters: filters,
        //     properties: hotPropList
        // }
        return (
            <div>
                <section id="blog" className="blog-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title text-center">
                                    <h2>Hot Properties</h2>
                                </div>
                                <div className="section-separator text-center">
                                    <img src="/assets/images/Hexo-LTD-dens.png" alt=""></img>
                                    <i className="fa fa-th-large"></i>
                                    <img src="/assets/images/Hexo-LTD-dens.png" alt=""></img>
                                </div>
                                <div className="section-content text-center">
                                    <p>Hot properties you may interested to buy</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="services-items services-carousel-3-col owl-carousel owl-theme  text-center inc-overlay">
                                    <>
                                        {hotPropList && hotPropList.map((x, i) =>
                                            <div className="item" key={i}>
                                                <div className="property-block-two" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                                    <div className="inner-box">
                                                        <div className="image-box">
                                                            <figure className="image">
                                                                <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.projectName}></img></a></Link></figure>
                                                            <span className="for"><i className="fa fa-building-o"></i>&nbsp;{(x.category)?x.category.name:''}</span>
                                                        </div>
                                                        <div className="box_content" id="product_price">
                                                            <h3 className="owl-h3"><Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a>{x.title}</a></Link></h3>
                                                            <p className="capital owl-loc" title={x.location}><i className="icon fa fa-map-marker"></i>&nbsp;{shorten(x.location, 60, '..', false)}</p>
                                                            {website && website.code != 'w12' &&
                                                                <>
                                                                    {(x.costDistress && x.costDistress !== 0) != false &&
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <del>
                                                                                    <span className="amount"><b> {'₹ ' + priceMap(x.cost)}</b></span>
                                                                                </del>

                                                                            </div>
                                                                            <div className="col-6">
                                                                                <ins>
                                                                                    <span className="amount"><b>{'₹ ' + priceMap(x.costDistress || x.cost)}</b></span>
                                                                                </ins>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {(!x.costDistress || x.costDistress === 0) &&
                                                                        <span><b>₹ {priceMap(x.cost)}</b></span>
                                                                    }
                                                                </>
                                                            }
                                                            {website && website.code == 'w12' &&
                                                                <span><b>₹ {x.rent}/-</b></span>
                                                            }




                                                            <div className="row footer">
                                                                <div className="col-7">
                                                                    <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a className="see_details">Details</a></Link>
                                                                </div>
                                                                <div className="col-2">
                                                                    <a href="tel:+91-8745891014" className="see_details" target="_blank"><i className="icon fa fa-phone fa-white"></i></a>
                                                                </div>
                                                                <div className="col-2">
                                                                    <a href={"https://wa.me/+918745891014?text=I am interested in property " + x.code + " => " + getWATemplateOfProperty(x, this.props)} className="see_details" target="_blank"><i className="icon fa fa-whatsapp fa-white"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>

                                    {/* {hotPropList && hotPropList.map((x, i) =>
                                        <div className="item" key={i}>
                                            <div className="property-block-two" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                                <div className="inner-box">
                                                    <div className="image-box">
                                                        <figure className="image">
                                                            <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a>
                                                                <img src={x.profilePic || '/assets/images/ps.jpg'} alt=""></img></a></Link>
                                                        </figure>
                                                        <span className="for">FOR SALE</span>
                                                    </div>
                                                    <div className="lower-content">
                                                        <ul className="property-info clearfix">
                                                            <li><span className="icon fa fa-expand"></span>&nbsp;{x.size} Sq Ft</li>
                                                            <li><span className="icon fa fa-bed"></span> Bedroom 3</li>
                                                            <li><span className="icon fa fa-bath"></span> Bathroom 2</li>
                                                        </ul>
                                                        <h3>
                                                            <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a>{x.title}</a></Link>
                                                        </h3>
                                                        <div className="text">{shorten(x.metaDesc, 200, '...', false)} </div>
                                                    </div>
                                                    <div className="property-price clearfix">
                                                        <div className="location"><span className="icon fa fa-map-marker"></span>&nbsp;<span className="capital">{x.location}</span></div>
                                                        <div className="price">₹ {priceMap(x.cost)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx>{
                    `
                        .image{background: #222222;}
                        .image img{opacity:0.9;}
                        figure img{min-height:140px;max-height:140px;}
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
                           ins span {
                              color: green !important;
                              font-size: 15px;
                              text-decoration: none;
                          }
                          img{opacity: .9;}
                          .see_details {
                            background: var(--primary);
                            color: #fff;
                            padding: 5px 15px;
                            margin: 10px 0 0;
                            display: block;
                            width: 100% !important;
                            border-radius: 2em;
                            text-align: center;
                            opacity: .8;
                        }
                        .see_details:hover{background-color:var(--secondary)}
                        #product_price b {
                            font-size: 12px !important;
                        }
                        .box_content h3 a {
                            font-size: 13px !important;
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
                    `

                }</style>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let obj = {
        hotPropList: state.properties.hotPropList,
        filters: state.filters
    }
    return obj;
}

const mapDispatchToProps = {
    getHotPropertyList
}

export default connect(mapStateToProps, mapDispatchToProps)(HotProp)
