import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { BreadCrumb, CP, Msg, Uploader } from '../components';
import { logout, updateUser } from '../asyncActions/authAsyncActions';
import { updateMsg, upload } from '../asyncActions/commonAsyncActions';
import Router from 'next/router'
import { convertISOStringToMonthDay, openModal, openLogin, btnClick } from '../utility';
import { constant, glink } from '../constant';

interface Props {
    logout, auth, updateUser, updateMsg, upload
}
type MyState = { tab: number, name: string, Photo: string, email: string, Phone: string, Address: string, loading: boolean, selectedFile: any };

class MyProfile extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props);
        if (props.auth.data && props.auth.data.user) {
            let user = props.auth.data.user;
            this.state = {
                tab: 0, name: user.name, email: user.email, Phone: user.Phone, Address: user.Address, Photo: user.Photo, loading: false, selectedFile: null
            }
        }
        else {
            this.state = {
                tab: 0, name: "", email: "", Phone: "", Address: "", loading: false, selectedFile: null, Photo: ""
            }
        }
        this.updateUser = this.updateUser.bind(this);
        this.openLogin = this.openLogin.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
    }
    handleChange = (e) => {
        let obj = this.state;
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    componentDidMount() {
        if (!this.props.auth || (this.props.auth && !this.props.auth.logined)) {
            Router.push(glink.href.home);
        }
    }
    async updateUser(e: any = null) {
        if (e) {
            e.preventDefault();
        }
        this.setState({ loading: true });
        let user = (this.props.auth.data) ? this.props.auth.data.user : null;
        user = { ...user, name: this.state.name, email: this.state.email, Phone: this.state.Phone, Address: this.state.Address, Photo: this.state.Photo }
        await this.props.updateUser(this.props.auth.data, user);
        this.setState({ loading: false });
        // await this.props.updateMsg({ msg: constant.msg.updateUserSuccess, btnLogin: false });
        // openModal('msgbox');
    }
    async openLogin() {
        await this.props.logout();
        openLogin();
    }
    
    updatePhoto(pic) {
        this.setState({ Photo: pic }, function () {
            this.updateUser();
        });
    }
    render() {
        const { auth } = this.props;
        const user = (auth.data) ? auth.data.user : null;
        return (
            <div>
                <BreadCrumb id="9" />
                {/* {this.state.ack &&
                    <div className="alert alert-success">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Success!</strong> {constant.msg.updateUserSuccess}
                    </div>
                } */}
                <section id="desbord_section">
                    <div className="container">
                        {user &&
                            <div className="row">

                                <div className="col-md-4 col-sm-4">
                                    <ul className="nav nav-pills brand-pills nav-stacked" role="tablist">
                                        <li className="tab_cls" id="left_profile_image">
                                            <img src={user.Photo || '/assets/images/profile1.jpg'} alt="" className="tab_logo img-responsive"></img>
                                            <div className="upload_profile_image">
                                                <b><a href="#" data-toggle="modal" data-target="#uploadbox">Change Profile Picture</a></b>
                                            </div>
                                        </li>
                                        <li role="presentation" className="brand-nav active"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">My Profile</a></li>
                                        <li role="presentation" className="brand-nav"><a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">Edit Profile</a></li>
                                        <li role="presentation" className="brand-nav"><a href="#tab3" aria-controls="tab3" role="tab" data-toggle="tab">My Admin</a></li>
                                        <li role="presentation" className="brand-nav"><a href="#tab4" aria-controls="tab4" role="tab" data-toggle="tab">Change Password</a></li>
                                        <li role="presentation" className="brand-nav"><a href="#tab5" aria-controls="tab5" role="tab" data-toggle="tab">Deactivate Account</a></li>
                                        <li role="presentation" className="brand-nav">
                                            <a onClick={this.props.logout} href="#" aria-controls="tab6" role="tab" data-toggle="tab">Logout</a></li>
                                    </ul>
                                </div>

                                <div className="col-md-8 col-ms-8">
                                    <div className="tab-content">

                                        <div role="tabpanel" className="tab-pane active" id="tab1">
                                            <table className="table table-stripped table-bordered" id="myTable">
                                                <tbody>
                                                    <tr>
                                                        <td>Name:</td>
                                                        <td>{user.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email:</td>
                                                        <td>{user.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>User Type:</td>
                                                        <td>{user.Role}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phone:</td>
                                                        <td>{user.Phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address:</td>
                                                        <td>{user.Address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Joined On:</td>
                                                        <td>{convertISOStringToMonthDay(user.listingDtae)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="tab2">
                                            <div className="myaccount_form">
                                                <div className="billing_details">
                                                    <form onSubmit={this.updateUser}>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Name:</label>
                                                            <input type="text" name="name" onChange={this.handleChange} value={this.state.name} className="form-control" placeholder="Enter Name"></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email:</label>
                                                            <input type="email" name="email" onChange={this.handleChange} value={this.state.email} className="form-control" placeholder="Enter Email"></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="number">Phone Number:</label>
                                                            <input type="text" name="Phone" onChange={this.handleChange} value={this.state.Phone} className="form-control" placeholder="Number"></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="address">Your Address:</label>
                                                            <input type="text" name="Address" onChange={this.handleChange} value={this.state.Address} className="form-control" placeholder="Enter Address.."></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="address">User Type:</label>
                                                            <p>{user.Role}</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="address">Joined On:</label>
                                                            <p>{convertISOStringToMonthDay(user.listingDtae)}</p>
                                                        </div>
                                                        <div className="cart_submit">
                                                            <button type="submit" className="btn btn-primary">
                                                                {this.state.loading &&
                                                                    <i className="fa fa-circle-o-notch fa-spin"></i>
                                                                }
                    &nbsp;Submit</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="tab3">
                                            <h6>Login Admin, with your Property.Sale credentials to manage your all properties</h6>
                                            <br />
                                            <button type="button" className="btn btn-primary">
                                                <a href="https://admin.property.sale/" target="_blank">Go to Admin</a>
                                            </button>
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="tab4">
                                            <CP {...this.props} />
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="tab5">
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </section>
                <Msg {...this.props} openLogin={this.openLogin} />
                <Uploader {...this.props} updatePhoto={this.updatePhoto} />               
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        obj: state.blog.data,
        auth: state.auth
    }
    return obj;
}

const mapDispatchToProps = {
    logout, updateUser, updateMsg, upload
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
