import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { glink } from '../../constant';

const mapStateToProps = (state: any) => state

const MostRecom: React.SFC<any> = (props) => {
    const { properties, filters } = props;
    let recom = properties.data.filter(x => x.recommented);
    return (
        <div>
            <section id="property_alt">
                <div className="container">
                    <div className="row">
                        {recom.map((x, i) =>
                            <>
                                {i == 0 &&
                                    <>
                                        <div className="col-md-6 col-ms-6 image">
                                            <div className="property_data_image">
                                                <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title} className="img-responsive"></img></a></Link>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-ms-6 text">
                                            {x.description}
                                            <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a className="rm" target="_blank">Read More</a></Link>
                                        </div>
                                    </>
                                }
                                {i == 1 &&
                                    <>
                                        <div className="col-md-6 col-ms-6 text">
                                            {x.description}
                                            <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a className="rm" target="_blank">Read More</a></Link>
                                        </div>
                                        <div className="col-md-6 col-ms-6 image">
                                            <div className="property_data_image">
                                                <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title} className="img-responsive"></img></a></Link>
                                            </div>
                                        </div>
                                    </>
                                }
                                {i == 2 &&
                                    <>
                                        <div className="col-md-6 col-ms-6 image">
                                            <div className="property_data_image">
                                                <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title} className="img-responsive"></img></a></Link>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-ms-6 text">
                                            {x.description}
                                            <Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a className="rm" target="_blank">Read More</a></Link>
                                        </div>
                                    </>
                                }
                            </>
                        )}
                    </div>
                </div>
            </section>
            <style jsx>
                {`.property_data_image{margin-bottom:15px;background-color: #222222;}

                #property_alt .container .row .image {
                   display: table-cell
                }
                #property_alt .container .row .text {
                   display: table-cell;
                   vertical-align: top;
                }
                #property_alt .container .row:nth-child(even) .image {
                   float: right;
                }
                #property_alt .container .row {
                   clear: both;
                }
                #property_alt{margin-top:70px;}
                .rm{
                    color:var(--primary);
                }
                img{opacity:.9;}
                
                `}
            </style>
        </div >
    )
}

export default connect<any>(mapStateToProps)(MostRecom)
