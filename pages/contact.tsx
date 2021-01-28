import React from 'react'
import { connect } from 'react-redux'
import { Dispatchable } from '../lib/with-redux-store';
import { Contact, BreadCrumb } from '../components'

interface Props { }

class ContactPage extends React.Component<Dispatchable<Props>> {

  componentDidMount() {
  }
  setMsg(){}
  render() {
    return (
      <div>
        <BreadCrumb id="5" />
        {/* <Contact title="" {...this.props}/> */}
        <section id="office_address">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="utf-boxed-list-headline-item">
                  <h3><i className="icon-feather-map"></i> Office Address</h3>
                </div>

                <div className="utf-contact-location-info-aera sidebar-textbox margin-bottom-40">
                  <ul className="contact-details">
                    <li>
                      {/* <strong>Phone Number:</strong><br /> */}
                      <i className="fa fa-phone"></i>  <span>(+91) 8375924100</span>
                    </li>
                    <li>
                      {/* <strong>Email Address:</strong> */}
                      <i className="fa fa-envelope"></i>  <span><a href="#">www.property.sale@gmail.com</a></span>
                    </li>
                    <li>
                      {/* <strong>Website:</strong> */}
                      <i className="fa fa-globe"></i>  <span>www.Property.Sale</span>
                    </li>
                    <li>
                      {/* <strong>Address:</strong> */}
                      <i className="fa fa-map-marker"></i>  <span>Sector 16B, Greater Noida West.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-8 col-sm-8">
                <div id="contact">
                  <div className="utf-boxed-list-headline-item">
                    <h3><i className="icon-feather-layers"></i> Contact Form</h3>
                  </div>
                  <Contact msg="" title="" {...this.props} setMsg={this.setMsg} />
                 {/*  <div className="utf-contact-form-item">
                  
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <input name="name" type="text" placeholder="First Name" required></input>
                        </div>
                        <div className="col-md-6">
                          <input name="name" type="text" placeholder="Last Name" required></input>
                        </div>
                        <div className="col-md-6">
                          <input name="email" type="email" placeholder="Email Address" required></input>
                        </div>
                        <div className="col-md-6">
                          <input name="name" type="text" placeholder="Subject" required></input>
                        </div>
                        <div className="col-md-12">
                          <textarea name="comments" cols={40} rows={3} placeholder="Message..." required></textarea>
                        </div>
                      </div>
                      <div className="utf-centered-button margin-bottom-10">
                        <input type="submit" className="submit button pull-right" id="submit" value="Submit Message"></input>
                      </div>
                      <div className="clear-both"></div>
                    </form> 
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)

