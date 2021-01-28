import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { Dispatchable } from '../../lib/with-redux-store';
import { getBLOGList } from '../../asyncActions/blogAsyncActions';
import { constant } from '../../constant';
import { convertISOStringToMonthDay, shorten, verifyWebsiteCode } from '../../utility';

interface Props {
    getBLOGList,
    blogObj,
    domain,
    website
}

class RecentBlog extends React.Component<Dispatchable<Props>> {
    componentDidMount() {
        if (this.props.website) {
            this.props.getBLOGList(1, '', verifyWebsiteCode(this.props.website));
        }
    }
    setPageNo = (pageNo: number) => {
        if (this.props.website) {
            this.props.getBLOGList(pageNo, '', verifyWebsiteCode(this.props.website));
        }
    }
    // static async getInitialProps(obj) {
    //     if (obj.req && obj.req.headers)
    //         await obj.reduxStore.dispatch.getBLOGList(1, '', setWebsiteCode(obj.req.headers.host));
    // }
    render() {
        const { blogObj } = this.props;
        return (
            <div>
                <section id="blog" className="blog-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title text-center">
                                    <h2>Recent Blog</h2>
                                </div>
                                <div className="section-separator text-center">
                                    <img src="/assets/images/Hexo-LTD-dens.png" alt=""></img>
                                    <i className="fa fa-th-large"></i>
                                    <img src="/assets/images/Hexo-LTD-dens.png" alt=""></img>
                                </div>
                                <div className="section-content text-center">
                                    <p>Read our latest news and articles on real estate industry, subscribe to get all the latest news directly in your inbox.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {blogObj && blogObj.map((x, i) =>
                                <>
                                    {x &&
                                        <div className="col-sm-4" key={i}>
                                            <div className="blog-post1">
                                                <div className="post-img">
                                                    <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title}></img></a></Link>
                                                    <a className="tag" href="#"><i className="fa fa-plus"></i></a>
                                                </div>
                                                <div className="post-info">
                                                    <div className="more_info">
                                                        <div className="right_profile_data">
                                                            <Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a><img src="https://api.dritalconnect.com/uploads/photo-1599803322120..jpg" alt={x.title} className="img-responsive"></img></a></Link>
                                                            <a href="#">{constant.author}</a><br />
                                                            <span>{convertISOStringToMonthDay(x.listingDtae)} - 2 min read</span>
                                                            <a href="#"><b className="text-right bookmark_work"><i className="fa fa-bookmark-o"></i></b></a>
                                                        </div>
                                                    </div>
                                                    <div className="blog_content">
                                                        <h3><Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a>{x.title}</a></Link></h3>
                                                        <p>{shorten(x.metaDesc, 200, ' >>', false)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </section>
                <style jsx>
                    {`
    .post-img img{min-height:250px;max-height:250px;}
    `}
                </style>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let result = state.blog.data[state.blog.currentPage];
    if (result && result.length >= 2) {
        let first = result[0];
        let sec = result[1];
        let th = result[2];

        let obj = {
            blogObj: [first, sec, th],
            website: state.website.data
        }
        return obj;
    }
    else {
        return null;
    }
}

const mapDispatchToProps = {
    getBLOGList
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentBlog)
