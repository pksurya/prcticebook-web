import { connect } from 'react-redux'
import React from 'react';
import { createMarkup } from '../../utility';

const mapStateToProps = (state: any) => state

const About: React.SFC<any> = (props) => {
    return (
        <div>
            <section id="aboutus_homepage">
                <div className="container">
                    <div className="row" id="padding_closed">
                        {/* <div className="col-md-4 col-sm-4">
                        <div className="home_aboutus">
                            <img src="/assets/images/aboutus-img.jpg" alt="" className="img-responsive"></img>
                        </div>
                    </div> */}
                        <div className="col-md-12 col-sm-12">
                            <div className="home_aboutus_data">
                                <h3>About Us</h3>
                                {(props.website && props.website.data) ? <div key="22" ref={props.myRefElem} dangerouslySetInnerHTML={createMarkup(props.website.data.about)} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>
                {`
                  .img-responsive{height: fit-content !important;}
                  
                `}
            </style>
        </div>
    )
}

export default connect<any>(mapStateToProps)(About)
