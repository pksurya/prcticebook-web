import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { Dispatchable } from '../lib/with-redux-store';
import { login } from '../asyncActions/authAsyncActions'
import { btnClick } from '../utility';
import Router from 'next/router';
import { glink } from '../constant';

interface Props {
    login, auth,router
}
type MyState = { email: string, password: string, remember: boolean };

class Login extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", remember: false }
        this.handleChange = this.handleChange.bind(this);
        this.openForget = this.openForget.bind(this);
    }
    handleChange = (e) => {
        let obj = this.state;
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    componentDidMount() {

    }
    // static async getInitialProps(obj) {
    //     console.log(obj.asPath);
    //     return {
    //         asPath: obj.asPath
    //     }
    // }
    close() {
        const btn = window.document.getElementById("loginClose")!;
        btn.click();
    }
    openForget() {
        btnClick('loginClose');        
        Router.push(glink.href.fp);
    }
    render() {
        const { auth, router } = this.props;
        //console.log(this.props);
        return (
            <div>

                <div className="modal fade" id="login" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            {/* <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Fill The Form</h5>
                               
                            </div> */}

                            <div className="modal-body">
                                <button type="button" className="close" id="loginClose" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="register_form">
                                            {/* <h3>New User Sign Up</h3> */}
                                            <p>Join today and get updated with all the properties deal happening around.</p>
                                            {/* <div className="social-buttons">
                                                <a className="btn btn-block btn-social btn-facebook">
                                                    <i className="fa fa-facebook"></i> Sign In With Facebook
                                            </a>
                                                <a className="btn btn-block btn-social btn-google-plus">
                                                    <i className="fa fa-google-plus"></i> Sign in with Google
                                            </a>
                                                <a className="btn btn-block btn-social btn-facebook">
                                                    <i className="fa fa-facebook"></i> Sign Up With Facebook
                                            </a>
                                            </div> */}
                                            <div className="register_now">
                                                <Link href="/registration" as="/registration" ><a onClick={this.close}>Register Now</a></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form_popup">
                                            <form>
                                                <h3>Login</h3>
                                                {auth.error &&
                                                    <span className="error"> {auth.error} </span>
                                                }
                                                <div className="form-group">
                                                    <label htmlFor="Enter Email">Enter Email:</label>
                                                    <input type="email" name="email" className="form-control" value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="Enter Email"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="pwd">Password:</label>
                                                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={(e) => this.handleChange(e)} placeholder="Password"></input>
                                                </div>
                                                <div className="checkbox">
                                                    <label htmlFor="remember">
                                                        <input id="remember" onClick={() => this.setState({ remember: !this.state.remember })} name="remember" type="checkbox"></input>
                                                         Remember me</label>

                                                    <label className="forgot_pass">
                                                        <a onClick={this.openForget}>Forgot password?</a>
                                                    </label>
                                                    <div style={{ clear: 'both' }}></div>
                                                </div>
                                                <button type="button" onClick={() => this.props.login(this.state, router.asPath)} className="btn btn-default">
                                                    {auth.loading &&
                                                        <i className="fa fa-circle-o-notch fa-spin"></i>
                                                    }
                                                     &nbsp;Sign in</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div> */}
                        </div>
                    </div>
                </div>
                <style jsx >{`
            
                    #login .modal-dialog.modal-dialog-centered {
                        max-width: 850px;
                    }.form_popup {
                        background: #eeeeee8c;
                        padding: 20px;
                    }.form_popup form h3 {
                        font-weight: bold;
                        border-bottom: 1px solid #cccccc7a;
                        padding-bottom: 10px;
                    }.form_popup .form-group {
                        margin-bottom: 10px;
                    }.form_popup .form-group input.form-control {
                        border: 1px solid #eee;
                        background: #fff;
                        border-radius: 0;
                        height: auto;
                        font-size: 15px;
                        padding: 12px;
                    }.form_popup .checkbox {
                        font-size: 14px;
                        margin: 10px 0;
                    }label.forgot_pass {
                        float: right;
                    }label.forgot_pass a {
                        color: var(--primary);
                    }.form_popup form button.btn.btn-default {
                        background: var(--primary);
                        color: #fff;
                    }

                    .btn-social {
                        position: relative;
                        padding-left: 55px;
                        text-align: left;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #fff !important;
                        font-size: 13px;
                    }
                    // .btn-social :first-child{position:absolute;left:0;top:0;bottom:0;width:42px;line-height:34px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
                    .btn-facebook{color:#fff;background-color:#3b5998;border-color:rgba(0,0,0,0.2)}.btn-facebook:hover,.btn-facebook:focus,.btn-facebook:active,.btn-facebook.active,.open .dropdown-toggle.btn-facebook{color:#fff;background-color:#30487b;border-color:rgba(0,0,0,0.2)}
                    .btn-facebook:active,.btn-facebook.active,.open .dropdown-toggle.btn-facebook{background-image:none}
                    .btn-facebook.disabled,.btn-facebook[disabled],fieldset[disabled] .btn-facebook,.btn-facebook.disabled:hover,.btn-facebook[disabled]:hover,fieldset[disabled] .btn-facebook:hover,.btn-facebook.disabled:focus,.btn-facebook[disabled]:focus,fieldset[disabled] .btn-facebook:focus,.btn-facebook.disabled:active,.btn-facebook[disabled]:active,fieldset[disabled] .btn-facebook:active,.btn-facebook.disabled.active,.btn-facebook[disabled].active,fieldset[disabled] .btn-facebook.active{background-color:#3b5998;border-color:rgba(0,0,0,0.2)}
                    .btn-google-plus{color:#fff;background-color:#dd4b39;border-color:rgba(0,0,0,0.2)}.btn-google-plus:hover,.btn-google-plus:focus,.btn-google-plus:active,.btn-google-plus.active,.open .dropdown-toggle.btn-google-plus{color:#fff;background-color:#ca3523;border-color:rgba(0,0,0,0.2)}
                    .btn-google-plus:active,.btn-google-plus.active,.open .dropdown-toggle.btn-google-plus{background-image:none}
                    .btn-google-plus.disabled,.btn-google-plus[disabled],fieldset[disabled] .btn-google-plus,.btn-google-plus.disabled:hover,.btn-google-plus[disabled]:hover,fieldset[disabled] .btn-google-plus:hover,.btn-google-plus.disabled:focus,.btn-google-plus[disabled]:focus,fieldset[disabled] .btn-google-plus:focus,.btn-google-plus.disabled:active,.btn-google-plus[disabled]:active,fieldset[disabled] .btn-google-plus:active,.btn-google-plus.disabled.active,.btn-google-plus[disabled].active,fieldset[disabled] .btn-google-plus.active{background-color:#dd4b39;border-color:rgba(0,0,0,0.2)}
                    .register_now {
                        margin-top: 35px;
                    }.register_now a {
                        background: #333;
                        color: #fff;
                        padding: 10px;
                        display: block;
                        text-align: center;
                        font-size: 17px;
                        border-radius: 2em;
                        border: 5px solid #fff;
                        box-shadow: 0px 5px 4px #ccc;
                    }.register_now a:hover {
                        background: var(--primary);
                        text-decoration: none;
                        transition: all 0.6s ease;
                    }
            

                    input[type='checkbox'] {
                        opacity: 1 !important; 
                        display: block !important;
                        margin-top: 5px;
                        float: left;
                        width: 18px;
                    }
                    .register_form{
                        margin-top:25%;
                    }

            `}
                </style>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        auth: state.auth
    }
    return obj;
}

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
