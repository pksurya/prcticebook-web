import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux'
import { Dispatchable } from '../lib/with-redux-store';
import { HotProp, BlogSorted, BreadCrumb } from '../components';
import { getBLOGList, getBlogCount } from '../asyncActions/blogAsyncActions';
import { getWebsiteData } from '../asyncActions/commonAsyncActions';
import { convertISOStringToMonthDay, viewsFormat, shorten } from '../utility';
import { constant } from '../constant';

interface Props { domain, getBlogCount, getBLOGList, blogObj, blogCount, currentPage, website, getWebsiteData }

class Blogs extends React.Component<Dispatchable<Props>> {

    async componentDidMount() {
        if (!this.props.website) {
            await this.props.getWebsiteData(this.props.domain);
        }

        this.props.getBlogCount('', this.props.website.code);
        this.props.getBLOGList(1, '', this.props.website.code);

    }
    setPageNo = (pageNo: number) => {
        if (this.props.website) {
            this.props.getBLOGList(pageNo, '', this.props.website.code);
        }
    }

    render() {
        const { blogObj, blogCount, currentPage } = this.props;
        return (
            <div>
                <BreadCrumb id="0" />
                <div className="inner-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-8">
                                <div className="blogWraper">
                                    <ul className="blogList">
                                        {blogObj && blogObj.map((x, i) =>
                                            <li key={i}>
                                                <div className="row">
                                                    <div className="col-md-5 col-sm-4">
                                                        <div className="postimg">
                                                            <Link href="/blog/[slug]" as={`/blog/${x.slug}`}>
                                                                <a><img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title}></img>
                                                                </a></Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 col-sm-8">
                                                        <div className="post-header">
                                                            <h4><Link href="/blog/[slug]" as={`/blog/${x.slug}`}>
                                                                <a>{x.title}</a>
                                                            </Link></h4>
                                                            <div className="postmeta">
                                                                <ul>
                                                                    <li><i className="fa fa-user"></i> By : <span>{constant.author} </span></li>
                                                                    <li><i className="fa fa-pencil-square-o"></i> Posted By : <span>{convertISOStringToMonthDay(x.listingDtae)} </span></li>
                                                                    <li><i className="fa fa-eye"></i> Views : <span>{viewsFormat(x.view, 2)} </span> </li>
                                                                </ul>
                                                            </div>
                                                            <p>{shorten(x.metaDesc || x.description, 300, '...', false)}</p>
                                                            <div className="readmore">
                                                                <Link href="/blog/[slug]" as={`/blog/${x.slug}`}>
                                                                    <a>Read More</a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="pagiWrap">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <ul className="pagination">

                                                {Array.from({ length: Math.floor(blogCount / constant.blogsLimit) }, (_, index) => (
                                                    <li className={(currentPage === index + 1 ? 'active' : '')}>
                                                        <a href="#"
                                                            onClick={() => this.setPageNo(index + 1)}>{index + 1}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <BlogSorted {...this.props} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <HotProp {...this.props} /> */}
                <style jsx>
                    {`
    .postimg img{min-height:200px;max-height:200px;}
    `}
                </style>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let obj = {
        blogObj: state.blog.data[state.blog.currentPage],
        blogCount: state.blog.count,
        currentPage: state.blog.currentPage,
        website: state.website.data
    }
    return obj;
}

const mapDispatchToProps = {
    getBLOGList, getBlogCount, getWebsiteData
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)


