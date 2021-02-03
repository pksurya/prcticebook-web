import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { glink } from '../constant';
import AdSense from 'react-adsense';
const mapStateToProps = (state: any) => state

const Footer: React.SFC<any> = (props) => {
    const { setting } = props;
    return (
        <div>
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='9218475703'
                format='auto'
                responsive='true'
            />
            {props.website && props.website.data &&
                <>
                    {/* <section id="footer_end">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="disclemar_deta">
                                    <h3>Disclaimer</h3>
                                    <p>All the details displayed on the website are for informational purposes to the viewers/visitors of this website. All.Information displayed regarding all properties/real estate projects weather fresh sale or resale, including property/project details, listings, floor area ratio, super area, carpet area, layout plans of units, project layout,location information etc has been updated from multiple sources as per the best of knowledge and effort.Nothing contained herein shall be deemed to constitute legal advice,solicitations, promotion, marketing, offer for sale, invitation to ffer, invitation to acquire/invest/make financial commitments/make legal agreements by any entity.You are hereby advised to visit the relevant RERA website/ take all RERA registered relevant details from the appropriate authorities/entity before taking any decision based on the contents displayed on the website.</p>
                                </div>
                            </div>
                        </div>
                    </section> */}

                    <div className="main_footer">
                        <footer>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4 col-sm-12">
                                        <div className="footer_about social_about">

                                            {/* <img src="/assets/images/footer-logo.png" alt="" className="img-responsive"></img> */}
                                            <h4 className="capital">{props.domain}</h4>
                                            <p>We are team of real estate experts having experience of many years. We provide a web platform to find or list your kothi for sale. As of now we have presence in Delhi-NCR (Delhi, Gurgaon, Noida, Ghaziabad, Faridabad etc) and Chandigarh Tri city. We mostly deal with high end residential properties, commercial properties and pre-rented properties.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer_menu partner">
                                            <ul>
                                                <h4>Partner Sites</h4>
                                                <li><i className="fa fa-angle-right"></i><a href="https://property.sale/" target="_blank">Property.Sale</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="https://property.rent/" target="_blank">Property.Rent</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="https://kothi.forsale/" target="_blank">Kothi.forsale</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="https://foodcourt.forsale/" target="_blank">FoodCourt.forsale</a></li>
                                                {/* <li><i className="fa fa-angle-right"></i><a href="https://property.golf/" target="_blank">Property.Golf</a></li>                                               
                                                <li><i className="fa fa-angle-right"></i><a href="https://property.work/" target="_blank">Property.Work</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="http://shopforsale.in/" target="_blank">ShopForSale.in</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="http://preleasedproperty.forsale/" target="_blank">PreLeasedProperty.forsale</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="http://2bhkflat.forsale/" target="_blank">2BHKflat.forsale</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="http://3bhkflat.forsale/" target="_blank">3BHKflat.forsale</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="https://factory.forsale/" target="_blank">Factory.forsale</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="https://plots.forsale/" target="_blank">Plots.forsale</a></li>                                                                                               
                                                <li><i className="fa fa-angle-right"></i><a href="https://petrolpump.forsale/" target="_blank">PetrolPump.forsale</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="https://gaur.city/" target="_blank">Gaur.City</a></li>
                                                <li><i className="fa fa-angle-right"></i><a href="https://gaur.yamuna.city/" target="_blank">Gaur.Yamuna.City</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer_menus">
                                            <ul>
                                                <h4>Stay in Touch</h4>
                                                <li>
                                                    <i className="fa fa-map-marker"></i><span>To get any information contact us with your requirements online.</span>
                                                </li>
                                                <li>
                                                    <a href="tel:+91-8745891014" target="_blank"><i className="fa fa-mobile"></i><span>(+91) 8745891014</span></a>
                                                </li>
                                                <li>
                                                    <a href="https://wa.me/+918745891014" target="_blank" ><i className="fa fa-whatsapp"></i><span>(+91) 8745891014</span></a>
                                                </li>
                                                <li>
                                                    <i className="fa fa-envelope"></i><span>practicebook.in@gmail.com</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer_about social_about">
                                            <h4>information</h4>
                                            <p>Follow us on given social media to keep yourself updated on new projects arrivals and offers. </p>
                                            <div className="foter_social_icons">
                                                <ul className="social-network social-circle">
                                                    <li><a href="#" className="icoRss" title="Rss"><i className="fa fa-rss"></i></a></li>
                                                    <li><a href="https://www.facebook.com/propertyforsaleonline" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                                                    <li><a href="#" className="icoTwitter" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                                                    <li><a href="#" className="icoGoogle" title="Google +"><i className="fa fa-google-plus"></i></a></li>
                                                    <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer_menu">
                                            <ul>
                                                <h4>information</h4>
                                                <li><i className="fa fa-angle-right"></i><Link href={glink.href.homeLocation} as={`/${setting.country}/${setting.location}`}><a>Home</a></Link></li>
                                                <li><i className="fa fa-angle-right"></i><Link href={glink.href.reg} as="/registration"><a>Register</a></Link></li>
                                                {/* <li><i className="fa fa-angle-right"></i><Link href={glink.href.projects} as={`/${setting.country}/${setting.location}/${setting.subArea}/projects/${setting.propType}`}><a>Projects</a></Link></li> */}
                                                <li><i className="fa fa-angle-right"></i><Link href={glink.href.blogs} as="/blogs"><a>Blogs</a></Link></li>
                                                <li><i className="fa fa-angle-right"></i><Link href={glink.href.contact} as="/contact"><a>Contact Us</a></Link></li>
                                                <li><i className="fa fa-angle-right"></i><Link href={glink.href.properties} as={`/${setting.country}/${setting.location}/${setting.subArea}/properties/${setting.propType}`}><a>Properties</a></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer_newslatter">
                                            <h4>Sign up for newsletter</h4>
                                            <p>Get notified about the latest properties in our marketplace. </p>
                                            <div className="newsletter">
                                                <form className="content">
                                                    <div className="input-group">
                                                        <input type="email" className="form-control" placeholder="Enter your email"></input>
                                                        <span className="input-group-btn">
                                                            <button className="btn" type="submit">Subscribe Now</button>
                                                        </span>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="footer_about social_about">
                                            <p>Copyright 2020. All rights reserved.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="footer_about social_about text-right">
                                            <p>Developed & Maintained By: <a target="_blank" href="http://uniservedata.tech">Uniserve Data Technologies Pvt Ltd.</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </>
            }
            <style jsx>
                {`
                .partner ul li {
                    display: block !important;
                    width: 100% !important;
                }
                `}
            </style>
        </div >
    )
}
export default connect<any>(mapStateToProps)(Footer)