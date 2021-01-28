import { connect } from 'react-redux'
import React from 'react';
//import Head from 'next/head'
import { BlogDetailState } from '../../domain/store';
import { createMarkup, convertISOStringToMonthDay, viewsFormat } from '../../utility';
import { constant } from '../../constant';
import { DiscussionEmbed } from 'disqus-react';
//import { Meta } from '../../components';

const mapStateToProps = (state: BlogDetailState) => state

const BlogDetail: React.SFC<any> = (obj: any) => {
    const prop = obj.props.blogObj.data;
    return (
        <div>
            {obj && prop &&
                <>
                    <div className="blog_details_page">
                        <h1>{prop.title}</h1>
                        <div className="postmeta">
                            <ul>
                                <li><i className="fa fa-user"></i> By : <span>{constant.author} </span></li>
                                <li><i className="fa fa-pencil-square-o"></i> Posted By : <span>{convertISOStringToMonthDay(prop.listingDtae)} </span></li>
                                <li><i className="fa fa-eye"></i> Views : <span>{viewsFormat(prop.view, 2)} </span> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="blog_details_image">
                        <img src={prop.profilePic || '/assets/images/ps.jpg'} alt={prop.title} className="img-responsive"></img>
                    </div>
                    <div className="social_media_links">
                        <ul className="social-icons-ql">
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                            <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                            <li><a href="#"><i className="fa fa-reddit"></i></a></li>
                            <li><a href="#"><i className="fa fa-stumbleupon"></i></a></li>
                        </ul>
                    </div>
                    <div className="blog_details_datas">
                        <div key="22" ref={obj.myRefElem} dangerouslySetInnerHTML={createMarkup(prop.description)} />
                        <div className="comment_area">
                            <DiscussionEmbed
                                shortname='https-www-property-sale'
                                config={
                                    {
                                        url: prop.slug,
                                        identifier: prop.slug,
                                        title: prop.title
                                    }
                                }
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default connect<BlogDetailState>(mapStateToProps)(BlogDetail)
