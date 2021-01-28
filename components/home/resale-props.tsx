import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { priceMap, shorten, getWATemplateOfProperty, deepClone, loadOwl } from '../../utility';
import { glink } from '../../constant';
import { getPropertyList } from '../../asyncActions/propertyAsyncActions';
import { Dispatchable } from '../../lib/with-redux-store';

interface Props {
    getPropertyList, filters, properties, website, setting
}
type MyState = {};

class ResaleProps extends React.Component<Dispatchable<Props>, MyState> {

    async componentDidMount() {
        // if (this.props.website) {
        //     let f = deepClone(this.props.filters);
        //     f.limit = 500;
        //     f.websites = this.props.website.code;
        //     await this.props.getPropertyList(f);
        //     loadOwl();
        // }
        if (this.props.properties) {
            loadOwl();
        }
    }
    render() {
        const { filters, properties, website, setting } = this.props;
        let forsale = (website && website.code == 'w12') ? 'rent' : 'sale';
        return (
            <div>
                <section id="featured_commercial">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title text-center" id="resale_properties">
                                    <h2>{(website) ? website.text : "Property"} for {forsale} in {setting.location}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="services-items services-carousel-3-col owl-carousel owl-theme text-center inc-overlay most_reads">
                                    {properties && properties.map((x, i) =>
                                        <div className="item" key={i}>
                                            <div className="property-block-two" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                                <div className="inner-box">
                                                    <div className="image-box">
                                                        <figure className="image">
                                                            <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.projectName}></img></a></Link></figure>
                                                        <span className="for"><i className="fa fa-building-o"></i>&nbsp;{(x.category) ? x.category.name : ''}</span>
                                                    </div>
                                                    <div className="box_content" id="product_price">
                                                        <h3 className="owl-h3"><Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a>{x.title}</a></Link></h3>
                                                        {/* <h4>Prime Associates</h4> */}
                                                        <p className="capital owl-loc" title={x.location}><i className="icon fa fa-map-marker"></i>&nbsp;{shorten(x.location, 60, '..', false)}</p>
                                                        {/* <p><i className="fa fa-building-o"></i>&nbsp;{x.category.name}</p> */}
                                                        {/* {getPriceTag(x)} */}

                                                        {!x.IsForRent &&
                                                            <>
                                                                {x.costDistress != 0 &&
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
                                                                {x.costDistress == 0 &&
                                                                    <span><b>₹ {priceMap(x.cost)}</b></span>
                                                                }
                                                            </>
                                                        }
                                                        {x.IsForRent &&
                                                            <>
                                                                <span><b>₹ {x.rent}/-</b></span>
                                                            </>
                                                        }


                                                        {/* <b>₹ {priceMap(x.cost)}</b> */}



                                                        {/* <span>onwards</span> */}
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

                                                        {/* <b className="marketing_by">Marketed by Prime Ass.....</b> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="view_btns">
                                    <Link href="/[country]/[location]/[area]/properties/[...all]" as={`/${filters.country}/${filters.location}/${filters.subArea}/properties/${filters.propType}`}><a>View All {(website) ? website.text : "Property"} </a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx>
                    {`
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
    `}
                </style>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        properties: state.properties.data,
        filters: state.filters,
        setting: state.setting,
        website: state.website.data,
    }
    return obj;
}

const mapDispatchToProps = {
    getPropertyList
}

export default connect(mapStateToProps, mapDispatchToProps)(ResaleProps)

