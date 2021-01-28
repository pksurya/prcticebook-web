import { connect } from 'react-redux'
import React from 'react';
import { Header2, Footer, ContactPopup, Fsocial, ScrollTop, LeadForm1 } from '../components';
import Safe from "react-safe";
import { resetLogin } from '../asyncActions/authAsyncActions';
import { Dispatchable } from '../lib/with-redux-store';
import { ToastContainer } from 'react-toastify';
import { logout } from '../asyncActions/authAsyncActions';
import { getWebsiteData, updateSetting } from '../asyncActions/commonAsyncActions';
import Router from 'next/router';
import { getSubdomain, loadLeadForms } from '../utility';
// import * as $ from 'jquery';
//import $ from 'jquery';
declare var $: any;

interface Props { updateSetting, server, resetLogin, logout, getWebsiteData, domain, auth, setting, state }
type MyState = { showHeader: boolean };
class Layout extends React.Component<Dispatchable<Props>, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: false
    }
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ showHeader: true });
    await this.props.getWebsiteData(this.props.domain);

    //This will set defaut city for gaur.city -- set default city from admin
    if (this.props.state.website.data && this.props.state.website.data.defaultCity) {
      this.props.updateSetting(this.props.state.setting, ['location', 'subArea'], [this.props.state.website.data.defaultCity, 'All'], false, null);
    }
    loadLeadForms();
  }
  render() {
    const { children } = this.props
    return (
      <div>
        {this.state.showHeader &&
          <Header2 {...this.props} />
        }
        {children}
        <Footer />
        <Fsocial />
        <ToastContainer />
        <ContactPopup {...this.props} />
        <ScrollTop />
        {this.state.showHeader &&
          <LeadForm1 {...this.props} />
        }

        <Safe.script src="/assets/js/jquery-1.11.1.min.js"></Safe.script>
        <Safe.script src="/assets/js/bootstrap.min.js"></Safe.script>
        <Safe.script src="/assets/js/crisp.js"></Safe.script>
        <Safe.script src="https://chatman-api.dritalconnect.com/ichat.js?key=5fd707d112c890288a29ffd4" id="ichatman"></Safe.script>
        <Safe.script src="https://chatman-api.dritalconnect.com/ipush?key=5fd707d112c890288a29ffd4" id="ipush"></Safe.script>
        {/* <Safe.script src="https://progressier.com/client/script.js?id=8bAkl3u7WiXwjRJagIeq"></Safe.script> */}
        {/* <Safe.script data-ad-client="ca-pub-2354653433404210" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></Safe.script> */}
        <Safe.script>{
          `try{Typekit.load({ async: true });}catch(e){}`
        }
        </Safe.script>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = {
  resetLogin, logout, getWebsiteData, updateSetting
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
