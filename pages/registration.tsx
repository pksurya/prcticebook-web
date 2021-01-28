import React from 'react'
import { connect } from 'react-redux'
import { Dispatchable } from '../lib/with-redux-store';
import { BreadCrumb, Msg } from '../components';
import { reg } from '../asyncActions/authAsyncActions';
import { btnClick, deepClone, openModal, openLogin } from '../utility';
import Router from 'next/router';
import { constant, glink } from '../constant';

interface Props { reg, error, auth }

type MyState = {
  Address: string,
  City: string,
  Department: string,
  Designation: string,
  Phone: null,
  Role: string,
  State: string,
  email: string,
  name: string,
  password: string,
  tnc: boolean,
  showTnc: boolean,
  btnLogin: boolean,
  msg: string,
  loading: boolean
};

const initState = {
  Address: "",
  City: "",
  Department: "",
  Designation: "",
  Phone: null,
  Role: "",
  State: "",
  email: "",
  name: "",
  password: "test123",
  tnc: false,
  showTnc: false,
  btnLogin: false,
  msg: "",
  loading: false
}

class Reg extends React.Component<Dispatchable<Props>, MyState> {
  constructor(props) {
    super(props);
    this.state = deepClone(initState);
    this.handleChange = this.handleChange.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.regg = this.regg.bind(this);
    this.valid = this.valid.bind(this);
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
  async regg() {
    this.setState({ loading: true });
    await this.props.reg(this.state);
    this.setState(deepClone(initState));
  }
  openLogin() {
    openLogin();
  }
  valid() {
    let valid = true;
    if (this.state.name == "") {
      valid = false;
    }
    else if (this.state.email == "") {
      valid = false;
    }
    else if (this.state.Phone == "") {
      valid = false;
    }
    else if (this.state.Role == "") {
      valid = false;
    }
    else if (!this.state.tnc) {
      valid = false;
    }
    return valid;
  }

  render() {
    return (
      <div>
        <BreadCrumb id="6" />
        <section id="register_page_form">
          <div className="container">
            <div className="col-md-12">
              <div className="register_forming">
                <h3>Register</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">* Register as a:</label>
                    <select name="Role" className="form-control" onChange={this.handleChange} required>
                      <option value="">Register as a:</option>
                      <option value="web-4">Owner</option>
                      <option value="web-3">Builder</option>
                      <option value="web-2">Broker</option>
                      <option value="web-1">Buyer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">* Your Name:</label>
                    <input type="text" className="form-control" name="name" placeholder="Name" onChange={this.handleChange} required></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">* Email address:</label>
                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.handleChange} required></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">* Mobile Number:</label>
                    <input type="Number" className="form-control" name="Phone" placeholder="Mobile Number" onChange={this.handleChange} required></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" name="Address" placeholder="Address" onChange={this.handleChange}></input>
                  </div>
                  <div className="checkbox">
                    <label htmlFor="tnc"> Terms & Conditions</label>
                    <input name="tnc" id="tnc" type="checkbox" defaultChecked={this.state.tnc} checked={this.state.tnc} onClick={() => this.setState({ showTnc: !this.state.showTnc })}></input>
                  </div>
                  {this.state.showTnc &&
                    <div className="form-group">
                      <p>All the details displayed on the website are for informational purposes to the viewers/visitors of this website. All.Information displayed regarding all properties/real estate projects weather fresh sale or resale, including property/project details, listings, floor area ratio, super area, carpet area, layout plans of units, project layout, location information etc has been updated from multiple sources as per the best of knowledge and effort.Nothing contained herein shall be deemed to constitute legal advice,solicitations, promotion, marketing, offer for sale, invitation to offer, invitation to acquire/invest/make financial commitments/make legal agreements by any entity.You are hereby advised to visit the relevant RERA website/ take all RERA registered relevant details from the appropriate authorities/entity before taking any decision based on the contents displayed on the website.</p>
                      <p>I the viewer/visitor to this website here by solemnly declare in my full senses and consciousness that I will not take any legal action against any person/entity associated with this website for any reason regarding the data/content /information displayed on this website.</p>
                      <button type="button" onClick={() => this.setState({ tnc: !this.state.tnc, showTnc: !this.state.showTnc })} className="btn btn-default pull-right">{(this.state.tnc) ? 'Decline' : 'Accept'}</button>
                    </div>
                  }
                  <button type="button" onClick={this.regg} disabled={!this.valid()} className="btn btn-default">
                    {this.state.loading &&
                      <i className="fa fa-circle-o-notch fa-spin"></i>
                    }
                    &nbsp;Register</button>
                  <div style={{ clear: 'both' }}></div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Msg {...this.props} openLogin={this.openLogin}>
        </Msg>

        <style jsx>{`
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
            }.register_forming {
                width: 60%;
                margin: 50px auto;
                background: #fff;
                padding: 25px;
                box-shadow: 1px 2px 10px #cccccc59;
                border-radius: 10px;
            }.register_forming .form-group {
                margin-bottom: 12px;
            }.register_forming .form-group .form-control {
                border: 1px solid #eee;
                border-radius: 0;
                box-shadow: none;
                height: auto;
                font-size: 13px;
                padding: 10px;
            }.register_forming .form-group label {
                margin-bottom: 4px;
                font-size: 13px;
            }.register_forming .btn.btn-default {
                background: var(--primary);
                color: #fff;
            }
            
            
            input[type='checkbox'] {
              opacity: 1 !important; 
              display: block !important; 
              float: left;
              width: 18px;
              margin-top: 6px;
          }
            
            `}
        </style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.regError,
    auth: state.auth
  }
}
const mapDispatchToProps = {
  reg
}
export default connect(mapStateToProps, mapDispatchToProps)(Reg)

