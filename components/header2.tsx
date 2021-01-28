import { connect } from 'react-redux';
import React from 'react';
import Link from 'next/link';
import CitySelectorPopup from './city-selector-popup';
import { getLocationAreaText } from '../utility';
import Login from './login';
import { glink } from '../constant';
import Router from 'next/router';

const mapStateToProps = (state: any) => state
const Header2: React.SFC<any> = (props) => {
    const { setting, auth, website } = props;

    if (props.website && props.website.data) {
        document.body.style.setProperty('--primary', props.website.data.primaryColor);
        document.body.style.setProperty('--secondary', props.website.data.secondaryColor);
        document.body.style.setProperty('--title', props.website.data.titleColor);
    }

    return (
        <div>
            {props.website && props.website.data &&
                <header id="start_top" className="new_header_bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-8">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                    <Link href={glink.href.home} as={`/`}><a className="navbar-brand">
                                        <span className={`capital ${(website.data.code == 'w16') ? 'logo-w16' : ''}`}>{props.domain}</span>
                                    </a></Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="fa fa-bars"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav">
                                            <li className="nav-item active">
                                                <Link href={glink.href.homeLocation} as={`/${setting.country}/${setting.location}`}><a className={(Router.pathname == glink.href.home || Router.pathname == glink.href.homeLocation) ? "active nav-link" : "nav-link"}>Home</a></Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href={glink.href.blogs} as={`/blogs`}><a className={(Router.pathname == glink.href.blogs) ? "active nav-link" : "nav-link"}>Blog</a></Link>
                                            </li>
                                            {props.website.data.project &&
                                                <li className="nav-item">
                                                    <Link href={glink.href.projects} as={`/${setting.country}/${setting.location}/${setting.subArea}/projects/${setting.propType}`}><a className={(Router.pathname == glink.href.projects) ? "active nav-link" : "nav-link"}>Projects</a></Link>
                                                </li>
                                            }
                                            <li className="nav-item">
                                                <Link href={glink.href.properties} as={`/${setting.country}/${setting.location}/${setting.subArea}/properties/${setting.propType}`}><a className={(Router.pathname == glink.href.properties || Router.pathname == glink.href.blankProperties) ? "active nav-link" : "nav-link"}>{(props.website.data.text == "Distress Property") ? 'Property' : props.website.data.text} </a></Link>
                                            </li>
                                            {props.website.data.pricing &&
                                                <li className="nav-item">
                                                    <Link href={glink.href.pricing} as={`/pricing`}><a className={(Router.pathname == glink.href.pricing) ? "active nav-link" : "nav-link"}>Pricing</a></Link>
                                                </li>
                                            }
                                            <li className="nav-item">
                                                <Link href={glink.href.contact} as={`/contact`}><a className={(Router.pathname == glink.href.contact) ? "active nav-link" : "nav-link"}>Contact</a></Link>
                                            </li>
                                            {auth.data && auth.logined &&
                                                <li className="nav-item dropdown" id="open_menu">
                                                    <Link href={glink.href.myProfile} as={`/my-profile`}><a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user" aria-hidden="true"></i> {auth.data.user.name} </a></Link>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                        <li><a className="dropdown-item" href="https://admin.property.sale/" target="_blank">My Admin</a></li>
                                                        <li><Link href={glink.href.myProfile} as={`/my-profile`}><a className="dropdown-item" >My Profile</a></Link></li>
                                                        <li><a className="dropdown-item" onClick={props.logout} href="#"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                                                    </ul>
                                                </li>
                                                // <li className="nav-item">
                                                //     <Link href={glink.href.myProfile} as={`/my-profile`}><a className="nav-link">{auth.data.user.name}</a></Link>
                                                // </li>
                                            }
                                            {auth.data == null && !auth.logined &&
                                                <>
                                                    <li className="nav-item">
                                                        <a id="loginbtn" className="nav-link login_design" data-toggle="modal" data-target="#login" onClick={props.resetLogin}>Login</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href={glink.href.reg} as={`/registration`}><a className="nav-link login_design">register</a></Link>
                                                    </li>
                                                </>
                                            }
                                        </ul>
                                        {/* <div id="llist_properties">
                                        <a className="nav-link address_details" href="#" data-toggle="modal" data-target="#cityModal"> <i className="fa fa-map-marker"></i> {getLocationAreaText(setting)}</a>
                                        
                                        <CitySelectorPopup {...props} />
                                    </div>
                                    <div id="list_properties" className="new_list_properties">                                        
                                        <Link href={glink.href.listProp} as={`/post-free-property`}><a className="nav-link">List Properties<span>Free</span> </a></Link>
                                    </div> */}
                                    </div>
                                </nav>
                            </div>

                            <div className="col-md-2 col-sm-2">
                                {website.data.code != 'w15' && website.data.code != 'w16' &&
                                    <div id="llist_properties">
                                        {props.website.code}
                                        <a className="nav-link address_details" href="#" data-toggle="modal" data-target="#cityModal"> <i className="fa fa-map-marker"></i> {getLocationAreaText(setting)}</a>
                                        <CitySelectorPopup {...props} />
                                    </div>
                                }
                            </div>

                            < div className="col-md-2 col-sm-2">
                                <div id="list_properties" className="new_list_properties">
                                    <Link href={glink.href.listProp} as={`/post-free-property`}><a className="nav-link">List {props.website.data.listPropTitle}<span>Free</span> </a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            }
            <Login {...props} />
            <style jsx>{`
                .logo-w16{
                    font-size: 22px !important;
                    margin-left: -58px;
                }
                .logo{    
                    height: 59px;
                    width: 200px;
                    padding-top: 6px;}

                .fa-bars{
                    font-size: 30px;
                    color: white;
                    padding: 5px 10px 5px 10px;
                    border: 2px solid white;
                }

                #navbarNav li a.active{border-bottom:2px solid var(--secondary); }
                .navbar-brand{
                    font-family: -webkit-body;
                    font-size: 27px;
                    margin-top: 2px;
                    padding-top: -7px;
                    color: white;
                    padding-bottom: 2px;
                }
                .new_header_bg .navbar-nav {margin-top: -43px; !important;}
                #llist_properties,.new_list_properties{margin-top:7px !important;}
           `}</style>
        </div >
    )
}

export default connect<any>(mapStateToProps)(Header2)
