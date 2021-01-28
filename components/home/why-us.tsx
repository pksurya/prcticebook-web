import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const WhyUs: React.SFC<any> = () => {
    return (
        <div>
            <section id="four_ser">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="heading_now">
                                <h3>What Makes Us The Preferred Choice</h3>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="chil_box_content">
                                <img src="/assets/images/ser2.png" alt="" className="img-responsive"></img>
                                <h3>Maximum Choices</h3>
                                <p>We have the latest projects and properties listed with us, which help us to deliver the best making us moste preferable choice in real estate world.</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="chil_box_content">
                                <img src="/assets/images/ser1.png" alt="" className="img-responsive"></img>
                                <h3>Buyers Trust Us</h3>
                                <p>Million of our users trust on us for their buying and renting needs and refers us to the others.</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="chil_box_content">
                                <img src="/assets/images/ser3.png" alt="" className="img-responsive"></img>
                                <h3>Seller Prefer Us</h3>
                                <p>Due to trust build and top page ranking, sellers prefer our portal to add 1000+ properties on daily basis.</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="chil_box_content">
                                <img src="/assets/images/ser4.png" alt="" className="img-responsive"></img>
                                <h3>Expert Guidance</h3>
                                <p>Contact our expert on (+91) 8376048600 to get best guidance by real estate expert, will guide you the best in your budget.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default connect<any>(mapStateToProps)(WhyUs)
