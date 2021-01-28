import { connect } from 'react-redux'
import React from 'react'
//import { State } from '../domain/store';

const mapStateToProps = (state: any) => state

const Header: React.SFC<any> = () => {
    return (
        <div>
            <header id="start_top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#"><img src="/assets/images/logo.png" className="img-responsive"></img></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav" style={{ float: "right", marginTop: "20px" }}>
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>                                    
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/blogs">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/projects">Projects</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/properties">Property</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">register</a>
                                </li>
                                <li className="nav-item" id="list_properties">
                                    <a className="nav-link" href="#">List Properties <span>Free</span></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default connect<any>(mapStateToProps)(Header)
