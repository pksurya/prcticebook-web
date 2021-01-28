import React from 'react'
import { connect } from 'react-redux'
import { Dispatchable } from '../lib/with-redux-store';
import { BreadCrumb, Msg } from '../components';
import { fp } from '../asyncActions/authAsyncActions';
import Router from 'next/router';
import { openModal, openLogin, deepClone } from '../utility';
import { updateMsg } from '../asyncActions/commonAsyncActions';
import { constant, glink } from '../constant';

interface Props { fp, auth, updateMsg }

type MyState = {
  email: string,
  loading: boolean
};

const initState = {
  email: "",
  loading: false
}

class Fp extends React.Component<Dispatchable<Props>, MyState> {
  constructor(props) {
    super(props);
    this.state = deepClone(initState);
    this.handleChange = this.handleChange.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange = (e) => {
    let obj = this.state;
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  componentDidMount() {
    if (this.props.auth && this.props.auth.logined) {
      Router.push(glink.href.home);
    }
  }
  async submit(e) {
    e.preventDefault();
    if (this.state.email) {
      await this.props.fp(this.state);
      await this.props.updateMsg({ msg: constant.msg.fpSuccess, btnLogin: true });
      this.setState(deepClone(initState));     
      openModal('msgbox');
    }
  }
  openLogin() {
    openLogin();
  }
  render() {
    return (
      <div>
        <BreadCrumb id="10" />
        <section id="register_page_form">
          <div className="container">
            <div className="col-md-12">
              <div className="register_forming" id="forgot_password">
                <form onSubmit={this.submit}>
                  <h4>Forgot Your Password? </h4>
                  <div className="form-group">
                    <label htmlFor="enter email">Enter Your Email Id:</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Enter Your Email Id.."></input>
                  </div>
                  <button type="submit" className="btn btn-default">Get a new Password</button>
                  {/* <Link href="/change-password" as={`/change-password`}><a className="chng_password">Change Password</a></Link> */}
                </form>
              </div>
            </div>
          </div>
        </section>
        <Msg {...this.props} openLogin={this.openLogin} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = {
  fp, updateMsg
}
export default connect(mapStateToProps, mapDispatchToProps)(Fp)

