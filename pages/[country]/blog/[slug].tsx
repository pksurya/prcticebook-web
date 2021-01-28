import React from 'react'
import { connect } from 'react-redux'
import { Dispatchable } from '../../../lib/with-redux-store';
import { getBlogDetail } from '../../../asyncActions/blogAsyncActions';
import { BlogDetail, BlogSorted, BreadCrumb, Meta } from '../../../components'
interface Props { getBlogDetail, blogObj, slug, server ,domain}

class Blog extends React.Component<Dispatchable<Props>> {
  private myRefElem: React.RefObject<HTMLElement>;

  constructor(props) {
    super(props);
    this.myRefElem = React.createRef();
  }

  componentDidMount() {
    this.updateInnerHTMLFromProps();
  }

  updateInnerHTMLFromProps() {
    this.myRefElem = this.props.blogObj.description;
  }
  
  static async getInitialProps(obj) {
    if (obj.req) {
      await obj.reduxStore.dispatch(getBlogDetail(obj.query.slug));
      return {
        slug: obj.query.slug,
        server: true,
        seo: 'blogDetail'
      }
    }
    else {
      await obj.reduxStore.dispatch(getBlogDetail(obj.query.slug));
      return {
        slug: obj.query.slug,
        server: false
      }
    }
  }
  render() {
    return (
      <div>
        <Meta {...this.props.blogObj.data} />
        <BreadCrumb id="7" />
        <div className="inner-content">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-8">
                <BlogDetail {...this} />
              </div>
              <div className="col-md-4 col-sm-4">
                <BlogSorted {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogObj: state.blogDetail
  }
}
const mapDispatchToProps = {
  getBlogDetail
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)



