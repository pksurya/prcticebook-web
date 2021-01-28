import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
//import { BlogSortedState } from '../../domain/store';
import { Dispatchable } from '../../lib/with-redux-store';
import { getBLOGList, getBlogCount, getPopularBlogList, getBlogDetail } from '../../asyncActions/blogAsyncActions';
import { viewsFormat, convertISOStringToMonthDay } from '../../utility';
import { getWebsiteData } from '../../asyncActions/commonAsyncActions';

//const mapStateToProps = (state: BlogSortedState) => state
//prop: BlogSortedState

interface Props {
    getBLOGList, getBlogCount, getPopularBlogList, website, getWebsiteData,
    blogObj, popular, recent, getBlogDetail, domain, setting
}
type SortState = { input: string };
class BlogSorted extends React.Component<Dispatchable<Props>, SortState> {


    // //const BlogSorted: React.SFC<BlogSortedState> = () => {
    // getInitialState = () => {
    //     return { input: '' };
    // }
    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }
    getData = () => {
        if (this.props.website) {
            this.props.getBlogCount(this.state.input, this.props.website.code);
            this.props.getBLOGList(1, this.state.input, this.props.website.code);
        }
    }
    // getPopular = () => {
    //     this.props.getPopularBlogList();
    // }
    async componentDidMount() {
        if (!this.props.website) {
            await this.props.getWebsiteData(this.props.domain);
        }

        this.props.getPopularBlogList(this.props.website.code);

        if (this.props.blogObj == null || this.props.blogObj.length == 0) {
            this.props.getBLOGList(1, '', this.props.website.code);
        }
    }
    render() {
        ////console.log(this.props);
        const { blogObj, popular, recent, website, setting } = this.props;
        return (
            <div>
                <div className="sidebar">

                    <div className="search_bar">
                        <h5 className="widget-title">Search Blog</h5>
                        <div className="search">
                            <form>
                                <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} ></input>
                                <button type="button" className="btn" onClick={() => this.getData()}><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>


                    <div className="sidebar_listing">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#home">Recent Post</a>
                            </li>
                            <li className="nav-item">
                                {/* onClick={() => this.getPopular()} */}
                                <a className="nav-link" data-toggle="tab" href="#menu1">Most Popular</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#menu2">Most Commented</a>
                            </li>
                        </ul>


                        <div className="tab-content">
                            <div id="home" className="container tab-pane active"><br />
                                <ul className="papu-post">
                                    {recent && recent.map((x, i) =>
                                        <li key={i}>
                                            <div className="media-left">
                                                <a><img src={x.profilePic} alt={x.title}></img></a>
                                            </div>
                                            <div className="media-body">
                                                <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a onClick={() => this.props.getBlogDetail(x.slug)} className="media-heading">{x.title}</a></Link>
                                                <div className="postmeta">
                                                    <ul>
                                                        <li><i className="fa fa-pencil-square-o"></i> Posted By : <span>{convertISOStringToMonthDay(x.listingDtae)} </span></li>
                                                        <li><i className="fa fa-eye"></i> Views : <span>{viewsFormat(x.view, 2)} </span> </li>
                                                    </ul>
                                                </div>
                                                <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a onClick={() => this.props.getBlogDetail(x.slug)} className="read_ride_more">Read More</a></Link>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div id="menu1" className="container tab-pane fade"><br />
                                <ul className="papu-post">
                                    {popular && popular.map((x, i) =>
                                        <li key={i}>
                                            <div className="media-left">
                                                <a href="#"><img src={x.profilePic} alt={x.title}></img></a>
                                            </div>
                                            <div className="media-body">
                                                <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a className="media-heading">{x.title}</a></Link>
                                                <div className="postmeta">
                                                    <ul>
                                                        <li><i className="fa fa-pencil-square-o"></i> Posted By : <span>{convertISOStringToMonthDay(x.listingDtae)} </span></li>
                                                        <li><i className="fa fa-eye"></i> Views : <span>{viewsFormat(x.view, 2)} </span> </li>
                                                    </ul>
                                                </div>
                                                <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a className="read_ride_more">Read More</a></Link>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div id="menu2" className="container tab-pane fade"><br />
                                <ul className="papu-post">
                                    {blogObj && blogObj.map((x, i) =>
                                        <li key={i}>
                                            <div className="media-left">
                                                <a href="#"><img src={x.profilePic} alt={x.title}></img></a>
                                            </div>
                                            <div className="media-body">
                                                <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a className="media-heading">{x.title}</a></Link>
                                                <div className="postmeta">
                                                    <ul>
                                                        <li><i className="fa fa-pencil-square-o"></i> Posted By : <span>{convertISOStringToMonthDay(x.listingDtae)} </span></li>
                                                        <li><i className="fa fa-eye"></i> Views : <span>{viewsFormat(x.view, 2)} </span> </li>
                                                    </ul>
                                                </div>
                                                <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a className="read_ride_more">Read More</a></Link>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="siderbar_image">
                    {website && website.banners && website.banners.map((x, i) =>
                        <>
                            {(setting.location == x.city || x.city == '' || x.city == null || typeof x.city == 'undefined') &&
                                <div className="property_data_image" key={i}>
                                    <a href={x.url} target="_blank">
                                        <img src={x.image} alt={this.props.domain} className="img-responsive"></img>
                                    </a>
                                </div>
                            }
                        </>
                    )}
                </div>
                <style jsx>
                    {`.property_data_image,.siderbar_image{margin-bottom:15px;}`}
                </style>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        blogObj: state.blog.data[state.blog.currentPage],
        popular: state.blog.popular,
        recent: state.blog.recent,
        website: state.website.data,
        setting: state.setting
    }
    return obj;
}

const mapDispatchToProps = {
    getBLOGList, getBlogCount, getPopularBlogList, getBlogDetail, getWebsiteData
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogSorted)
//export default connect<BlogSortedState>(mapStateToProps)(BlogSorted)
