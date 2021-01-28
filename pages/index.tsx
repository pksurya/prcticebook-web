import React from 'react'
import { connect } from 'react-redux'
import { Dispatchable } from '../lib/with-redux-store';
import { updateAll, getRouteSEOData, getWebsiteData } from '../asyncActions/commonAsyncActions';
import { getProjectGroups } from '../asyncActions/projectAsyncActions';
import { getPropertyList } from '../asyncActions/propertyAsyncActions';
import { About, Banner, ReslaeProps, HomeFilter, Testimonial, Verified, WhyUs, RecentBlog, GalleryList, DistressTable, MostRecom, Recommented } from '../components'
import { MapFilterToSetting, setWebsites, getRoute, setWebsiteCode, deepClone, loadOwl, getInitialPropsU } from '../utility';
import Router from 'next/router';
import { glink } from '../constant';
interface Props {
  getProjectGroups, getWebsiteData, getRouteSEOData, website, properties, loading,
  getPropertyList, projectGroups, filters, setting, updateAll, domain, router, propertiesLoading
}
type MyState = { client: boolean };
class Index extends React.Component<Dispatchable<Props>, MyState> {
  private myRefElem: React.RefObject<HTMLElement>;
  constructor(props) {
    super(props);
    this.state = {
      client: false
    }
    this.myRefElem = React.createRef();
  }
  async componentDidMount() {

    /*Code to reload to default city url */
    // let { pathname } = Router;
    // if (pathname == glink.href.home) {
    //   let url = getRoute(this.props.router, this.props.setting.country, this.props.setting.location, '', '');
    //   if (url) Router.push(url);
    // }


    if (this.props.website) {
      var f = deepClone(this.props.filters);
      f.websites = this.props.website.code;
      await this.props.updateAll(f);
      this.setState({ client: true });
      this.updateInnerHTMLFromProps();
    }

    // await this.props.getProjectGroups(this.props.setting.location);
    // if (this.props.projectGroups) {
    //   loadOwl();
    // }
  }
  updateInnerHTMLFromProps() {
    if (this.props.website && this.props.website.data) {
      this.myRefElem = this.props.website.data.about;
    }
  }
  showGallery() {
    let show: boolean = false;;
    switch (this.props.domain) {
      case "property.sale": {
        show = true;
        break;
      }
      default: {
        show = false;
        break;
      }
    }
    return show;

  }

  async getInitialProps(appContext) {
    await getInitialPropsU(appContext, appContext.domain);
  }

  render() {
    const { domain ,website} = this.props;
    return (
      <div>
        {!this.props.loading && this.props.website &&
          <>
            <HomeFilter {...this.props} key="1" />
            <Verified key="2" {...this.props} />
            {/* <About key="3" {...this.props} /> */}


            {/* <section key="4">
              <div className="container">
                <DistressTable {...this.props} search={true} />
              </div>
            </section>
            {!this.props.propertiesLoading ? <MostRecom key="5" {...this.props} /> : null}

            {website && website.data && website.data.banners &&
              <Banner key="6" {...this.props} />
            } */}

            {/* {this.showGallery() && <Recommented title={'recommended'} key="7" />}
            {this.showGallery() && <Recommented title={'commercial'} key="8" />}
            {this.showGallery() && <Recommented title={'prerented'} key="9" />}
            {this.showGallery() && <Recommented title={'residential'} key="10" />} */}

            {/* {!this.props.propertiesLoading ? <ReslaeProps key="11" {...this.props} /> : null} */}

            {/* <WhyUs key="12" /> */}
            {/* && this.state.client */}
            {/* {this.showGallery() && <GalleryList {...this.props} key="13" />} */}
            {this.props.website && <RecentBlog {...this.props} key="14" />}
            {/* <Testimonial key="15"  {...this.props} /> */}
          </>
        }
        {/* {this.props.loading && !this.props.website &&
          <div className="loader-new"></div>
        } */}
        <style global jsx>{`
            .breadcrumb{display:none;}

      `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let obj = {
    projectGroups: state.projects.groups,
    filters: state.filters,
    setting: state.setting,
    loading: state.website.loading,
    website: state.website.data,
    propertiesLoading: state.properties.loading,
    properties: state.properties.data
  }
  return MapFilterToSetting(obj, state.setting);
}
const mapDispatchToProps = {
  getProjectGroups, getPropertyList, updateAll, getRouteSEOData, getWebsiteData
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)

