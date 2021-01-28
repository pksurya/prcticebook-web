import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { Dispatchable } from '../lib/with-redux-store';
import { getBLOGList } from '../asyncActions/blogAsyncActions';
import { convertISOStringToMonthDay, verifyWebsiteCode } from '../utility';

interface Props {
    getBLOGList,
    blogObj,
    domain,
    website
}

class LatestPost extends React.Component<Dispatchable<Props>> {
    componentDidMount() {
        this.props.getBLOGList(1,'',verifyWebsiteCode(this.props.website));
    }
    setPageNo = (pageNo: number) => {
        this.props.getBLOGList(pageNo,'',verifyWebsiteCode(this.props.website));
    }
    render() {
        const { blogObj } = this.props;
        return (
            <div>
                <div className="sugetn">
                    <div className="sugne_in">
                        <h3>Latest Posts</h3>
                        <div className="sidebar-module">
                            <div className="sidebar-module-inner">
                                <ul className="sidebar-post">

                                    {blogObj && blogObj.map((x, i) =>
                                        <li className="clearfix" key={i}>
                                            <a href={`/blog/${x.slug}`} target="_blank">
                                                <div className="image">
                                                    <img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title}></img>
                                                </div>
                                                <div className="content">
                                                    <h6><Link href="/blog/[slug]" as={`/blog/${x.slug}`}><a>{x.title}</a></Link></h6>
                                                    <p className="recent-post-sm-meta"><i className="fa fa-clock-o"></i>{convertISOStringToMonthDay(x.listingDtae)}</p>
                                                </div>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>
                {`
                .sugne_in h3 {color:white;}
                .sugne_in{
                    max-height: 484px;
                    min-height:auto;
                    margin: 0 auto;
                    overflow: hidden;
                }
                .sugne_in:hover {
                    overflow-y: scroll;
                  }
                  .sugne_in::-webkit-scrollbar {
                    width: .3em;
                  }
                
                  .sugne_in::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                  }
                  .sugne_in::-webkit-scrollbar-thumb {
                    background-color: var(--secondary);
                    outline: 1px solid slategrey;
                  }
                `}
            </style>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    let obj = {
        blogObj: state.blog.data[state.blog.currentPage],
        website:state.website.data
    }
    return obj;
}

const mapDispatchToProps = {
    getBLOGList
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestPost)
