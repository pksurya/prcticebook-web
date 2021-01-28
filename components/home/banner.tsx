import { connect } from 'react-redux'
import React from 'react';
import citySelectorPopup from '../city-selector-popup';

const mapStateToProps = (state: any) => state

const Banner: React.SFC<any> = (props) => {
    const { website, setting } = props;
    return (
        <div>
            < section id="property_image">
                <div className="container">
                    <div className="row">
                        {website.data.banners.map((x, i) =>
                            <>
                                {(setting.location == x.city || x.city == '' || x.city == null || typeof x.city == 'undefined') &&
                                    <div className="col-md-6 col-ms-6" key={i}>
                                        <div className="property_data_image">
                                            <a href={x.url} target="_blank">
                                                <img src={x.image} alt={props.domain} className="img-responsive"></img>
                                            </a>
                                            {/* <img src="/assets/images/sale.jpg" alt="" className="img-responsive"></img> */}
                                        </div>
                                    </div>
                                }
                            </>
                        )}
                        {/* <div className="col-md-6 col-ms-6">
                                <div className="property_data_image">
                                    <img src="/assets/images/property-2.jpg" alt="" className="img-responsive"></img>
                                </div>
                            </div> */}
                    </div>
                </div>
            </section>
            <style jsx>
                {`.property_data_image{margin-bottom:15px;}`}
            </style>
        </div >
    )
}

export default connect<any>(mapStateToProps)(Banner)
