import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const Testimonial: React.SFC<any> = (props) => {
    const { website } = props;
    return (
        <div>
            {website && website.data.testimonials && website.data.testimonials.length>0 &&
                <section id="start_testimonial">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <h3 className="testimonial_heading">Testimonials</h3>

                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            {website.data.testimonials.map((x, i) =>
                                <div className={`item carousel-item ${(i == 0) ? 'active' : ''}`} key={i}>
                                    <div className="img-box"><img src={x.image || "/assets/images/avatar.jpg"} alt="" className="img-responsive"></img></div>
                                    <p className="overview"><b>{x.name}</b>{x.location}</p>
                                    <p className="testimonial">{x.content}</p>
                                </div>
                            )}
                            {/* <a href="#">OsCorp Tech.</a> */}
                            {/* <div className="item carousel-item active">
                           
                            <div className="img-box"><img src="/assets/images/avatar.jpg" alt="" className="img-responsive"></img></div>
                            <p className="overview"><b>Rajeev Singh</b>Greater Noida </p>
                            <p className="testimonial">Buying a kothi in Noida is made easy by this team, Thanks for the super
                                        advices and support.</p>
                        </div>
                        <div className="item carousel-item">
                            <div className="img-box"><img src="/assets/images/avatar.jpg" alt="" className="img-responsive"></img></div>
                            <p className="overview"><b>Prashant Surya</b>New Delhi</p>
                            <p className="testimonial">Thanks Team for serving the best services, Keep it up !</p>
                        </div>
                        <div className="item carousel-item">
                            <div className="img-box"><img src="/assets/images/avatar.jpg" alt="" className="img-responsive"></img></div>
                            <p className="overview"><b>Mukul Jain</b>Gurgaon</p>
                            <p className="testimonial">Kothi for sale here are at very affordable rates with easy booking and all.</p>
                        </div> */}
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}

export default connect<any>(mapStateToProps)(Testimonial)
