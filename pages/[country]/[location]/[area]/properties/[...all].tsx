import React from 'react';
import { connect } from 'react-redux';
import { Dispatchable } from '../../../../../lib/with-redux-store';
import { getPropertyList, filterList, resetList, getHotPropertyList } from '../../../../../asyncActions/propertyAsyncActions';
import { getRouteSEOData, getWebsiteData } from '../../../../../asyncActions/commonAsyncActions';
import { saveQueryToStore } from '../../../../../actions/contactActions';
import ReduxLazyScroll from 'redux-lazy-scroll';
import { PropList, PropGrid, PropFilter, BreadCrumb, Meta, FilterCap } from '../../../../../components'
import { UpdateFilter } from '../../../../../actions/filterActions';
import {  addOrRemoveInFIlter, deepClone, MapFilterToSetting, priceMap, setWebsites, setWebsiteCode, verifyWebsiteCode, getInitialPropsU, MapWebsiteCode } from '../../../../../utility';
import Link from 'next/link';
import { glink } from '../../../../../constant';
import {
	// BrowserView,
	// MobileView,
	isBrowser,
	isMobile
} from "react-device-detect";

interface Props {
	getWebsiteData, website, domain, resetList, getPropertyList, UpdateFilter, getRouteSEOData, setting, data, 
	count, routes, currentPage, filterList, loading, countLoading,
	isFetching, errorMessage, hasMore, keyword, saveQueryToStore, filters, showAll, up, hotProps, getHotPropertyList
}
type SortState = { input: string, grid: boolean, client: boolean, firstLoad: boolean };
class Properties extends React.Component<Dispatchable<Props>, SortState> {
	async getInitialProps(appContext) {
		await getInitialPropsU(appContext, appContext.domain);
	}
	async componentDidMount() {
		if (!this.props.website) {
			await this.props.getWebsiteData(this.props.domain);
		}
		window.scrollTo(0, 0);
		if (this.props.website && this.props.setting) {
			let f = addOrRemoveInFIlter(this.props.filters, ['propType', 'subArea', 'location'], [this.props.setting.propType, this.props.setting.subArea, this.props.setting.location], false);
			this.props.filterList(f, this.props.website.code, true);
			this.props.getHotPropertyList(this.props.website.code);
		}
		this.setState({ client: true });
	}
	constructor(props) {
		super(props);
		this.state = { input: '', grid: false, client: false, firstLoad: true }
		this.loadMore = this.loadMore.bind(this);
		this.reload = this.reload.bind(this);
	}

	handleChange = (e) => {
		this.setState({ input: e.target.value });
	}
	getData = () => {
		if (this.props.website) {
			this.props.filterList(addOrRemoveInFIlter(this.props.filters, ['keyword'], [this.state.input], false));
		}
	}

	list() {
		this.setState({ grid: false });
	}
	grid() {
		this.setState({ grid: true });
	}
	loadMore() {
		if (this.props.website) {
			let f = setWebsites(deepClone(this.props.filters), this.props.domain);
			if (this.state.firstLoad) {
				f.page = 0;
				this.setState({ firstLoad: false })
			}
			else {
				f.page = this.props.currentPage + 1;
			}
			f.websites = verifyWebsiteCode(this.props.website);
			this.props.getPropertyList(f);
		}
	}
	reload(e) {
		if (this.props.website) {
			this.props.filterList(addOrRemoveInFIlter(this.props.filters, ['orderby'], [e.target.value], false), this.props.domain);
		}
	}

	resetCap(key, val) {
		this.props.filterList(addOrRemoveInFIlter(this.props.filters, [key, 'capReset'], [val, true], false), false);
	}

	render() {

		const { setting, count, isFetching, errorMessage, hasMore, routes, filters, hotProps, loading, countLoading, website } = this.props;
		return (
			<div>
				<BreadCrumb id="1" />
				<Meta {...routes} />
				<div className="content-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-sm-12 col-md-3 desktop">
								{this.props.website && isBrowser &&
									<PropFilter key={99} {...this.props} resetInput={() => this.setState({ input: '' })} />
								}
								<div className="sugetn">
									<div className="sugne_in" id="new_properties">
										<h3>Hot Properties</h3>
										<div className="sidebar-module">
											<div className="sidebar-module-inner">
												<ul className="sidebar-post">
													{hotProps && hotProps.map((x, i) =>
														<li className="clearfix" key={i}>
															<Link href={glink.href.property} as={`/${filters.country}/${filters.location}/${filters.subArea}/property/${x.slug}`}><a>
																<div className="image hot-prop-img">
																	<img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.title}></img>
																</div>
																<div className="content">
																	<h6>{x.title}</h6>
																	{website && website.code != 'w12' &&
																		<span>
																			<ins>₹ {priceMap(x.costDistress || x.cost)}</ins><br />
																			<del>₹ {priceMap(x.cost)}</del>
																		</span>
																	}
																	{website && website.code == 'w12' &&
																		<span>
																			<ins>₹ {x.rent}/-</ins><br />
																		</span>
																	}
																</div>
															</a></Link>
														</li>
													)}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-md-9" style={{ padding: "0" }}>
								<div className="searching_searchbar">
									<form className="form-inline">
										<a className="btn btn-success mobile" data-toggle="modal" data-target="#filterPopup">
											<i className="fa fa-filter"></i>
										</a>
										<input className="form-control mr-sm-2" type="search" value={this.state.input} onChange={this.handleChange} placeholder="Search by Location / Project name / Keyword..." aria-label="Search"></input>
										<button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => this.getData()}>{(countLoading) ? <i className="fa fa-circle-o-notch fa-spin"></i> : null} Search</button>
									</form>
								</div>

								<FilterCap  {...this.props} reset={(x, y) => { this.resetCap(x, y) }} />

								<div className="sorting-wrappper">
									<div className="sorting-content">
										<div className="row">
											<div className="col-sm-12 col-md-8">
												<div className="sort-by-wrapper">
													<div className="sorting-header">
														{this.state.client && website &&
															<h1 className="sorting-title uppercase">{(countLoading) ? <i className="fa fa-circle-o-notch fa-spin"></i> : count || '0'} {(routes.data && routes.data.title) ? routes.data.title : `${website.text} in ${filters.location} for Sale`}</h1>
														}
													</div>
												</div>
											</div>
											<div className="col-sm-12 col-md-4">
												<div className="sort-by-wrapper mt pull-right pull-left-sm mt-10-sm">
													<div className="sort-by-wrapper mt pull-right pull-left-sm mt-10-sm desktop">
														<label className="sorting-label">View as: </label>
														<div className="sorting-middle-holder">
															<a onClick={() => this.list()} className="btn btn-sorting active"><i className="fa fa-th-list"></i></a>&nbsp;
															<a onClick={() => this.grid()} className="btn btn-sorting"><i className="fa fa-th-large"></i></a>
														</div>
													</div>
													<select name="sort" id="options_more" onChange={this.reload}>
														<option value="Sort By">Sort By</option>
														<option value="listingDtae-desc">Latest</option>
														<option value="cost-asc">Price Asc</option>
														<option value="cost-desc">Price Desc</option>
														<option value="view-desc">Most Viewed</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="starting_table">
									{/*<ul className="nav nav-tabs" id="myTab" role="tablist">
										<li className="nav-item">
											<a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Properties ({(countLoading) ? <i className="fa fa-circle-o-notch fa-spin"></i> : count || '0'})</a>
										</li>
										 <li className="nav-item">
											<a className="nav-link" id="qualification-tab" data-toggle="tab" href="#qualification" role="tab" aria-controls="qualification" aria-selected="true">New Projects</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" id="exprience-tab" data-toggle="tab" href="#exprience" role="tab" aria-controls="exprience" aria-selected="true">Top Agents</a>
										</li> 
									</ul>*/}
									<div className="tab-content" id="myTabContent">
										{!countLoading &&
											<div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
												{this.state.grid && setting &&
													<div className="package-list-item-wrapper on-page-result-page" id="grid_listing">
														<ReduxLazyScroll
															isFetching={isFetching}
															errorMessage={errorMessage}
															loadMore={this.loadMore}
															hasMore={hasMore}
														>
															<PropGrid {...this.props} />
														</ReduxLazyScroll>
													</div>
												}
												{!this.state.grid && setting &&
													<div className="package-list-item-wrapper on-page-result-page">
														<ReduxLazyScroll
															isFetching={isFetching}
															errorMessage={errorMessage}
															loadMore={this.loadMore}
															hasMore={hasMore}
														>
															<PropList {...this.props} />
														</ReduxLazyScroll>
													</div>
												}
											</div>
										}


										<div className="tab-pane fade" id="qualification" role="tabpanel" aria-labelledby="qualification-tab">
											<div className="package-list-item-wrapper on-page-result-page">
												<div className="package-list-item clearfix" id="exclusive">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img3.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="absolute-in-images">
															<div className="durations">
																<span>Exclusive Properties</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix" id="exclusive">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img4.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="absolute-in-images">
															<div className="durations">
																<span>Exclusive Properties</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix" id="exclusive">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img1.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="absolute-in-images">
															<div className="durations">
																<span>Exclusive Properties</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img4.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img2.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img4.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img2.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="tab-pane fade" id="exprience" role="tabpanel" aria-labelledby="exprience-tab">
											<div className="package-list-item-wrapper on-page-result-page">
												<div className="package-list-item clearfix" id="exclusive">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img1.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="absolute-in-images">
															<div className="durations">
																<span>Exclusive Properties</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix" id="exclusive">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img3.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="absolute-in-images">
															<div className="durations">
																<span>Exclusive Properties</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix" id="exclusive">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img5.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="absolute-in-images">
															<div className="durations">
																<span>Exclusive Properties</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img2.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>

												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img4.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img2.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="package-list-item clearfix">
													<div className="image">
														<a href="#">
															<img src="/assets/images/property-img2.jpg" alt="Tour Package" />
														</a>
														<div className="absolute-in-image">
															<div className="duration">
																<span>RERA REGISTERED</span>
															</div>
														</div>
														<div className="price_costing">
															<div className="property_id">
																<ul>
																	<li>
																		<div className="listing_data"><b>Cost: </b>
																			<span>₹ 1.48 Crore</span>
																		</div>
																	</li>
																	<li>
																		<div className="listing_data"><b>Property Id: </b>
																			<span>123456</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>

													<div className="content">
														<h5><a href="#">Paramount Golfforeste</a> <span>Sector 1 Greater Noida West, Greater Noida</span></h5>
														<div className="row gap-10">
															<div className="col-sm-12 col-md-12">

																<p>Ivy County Sector 75 Noida is a new project by County group, County group is a renowned group with number of completed projects in Noida and Greater Noida.<a href="#">Read More</a></p>
																<ul className="list-info">
																	<li>
																		<span className="font600"><b>Property Type:</b> <span> Plots</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Builder Type:</b> <span>Builder</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed By:</b> <span>Broker</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Listed On: </b><span>25/04/2020</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Floor: </b><span>G / G</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Total Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Carpet Area: </b><span>2691 Sq ft</span></span>
																	</li>
																	<li>
																		<span className="font600"><b>Facing: </b><span>North West</span></span>
																	</li>
																</ul>

															</div>
															<div className="col-sm-12 col-md-12 text-right text-left-sm">
																<div className="contact_buttons">
																	<span className="top_views">
																		<b className="sigle_tag">Posted On:- 3, May 2020</b>
																		<b className="sigle_tag"><i className="fa fa-eye"></i>1230</b></span>
																	<a href="/property" className="btn btn-primary btn-sm">View Details</a>
																	<a href="#" className="btn btn-primary btn-sm contact_btn">Contact Details</a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="filterPopup" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">

							<div className="modal-body">
								<button type="button" className="close" id="filterPopClose" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								{isMobile &&
									<PropFilter key={100} {...this.props} resetInput={() => this.setState({ input: '' })} />
								}
							</div>
						</div>
					</div>
				</div>
				<style jsx>
					{`
					 .fa-filter{color:white;}
					 .sorting-title{    
						font-size: 15px;
						color: gray;
						font-weight: 400;}
						#overview .package-list-item-wrapper{background-color:#eee;}
						.image{background: #222222;}
						.image img{opacity:0.9;}
					.hot-prop-img img{max-height:80px;}
					ins {
						color: green !important;
					}
					
					 `}

				</style>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let obj = {
		data: state.properties.data,
		count: state.properties.count,
		countLoading: state.properties.countLoading,
		loading: state.properties.loading,
		currentPage: state.properties.currentPage,
		filters: MapWebsiteCode(state.filters, state.website.data),
		routes: state.routes,
		hotProps: state.properties.hotPropList,
		setting: state.setting,
		website: state.website.data,
		showAll: true
	}
	return MapFilterToSetting(obj, state.setting);
}

const mapDispatchToProps = {
	getPropertyList, resetList, saveQueryToStore, getRouteSEOData, filterList, UpdateFilter, getHotPropertyList, getWebsiteData
}

export default connect(mapStateToProps, mapDispatchToProps)(Properties)



