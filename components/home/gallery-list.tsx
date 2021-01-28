import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../../lib/with-redux-store';
import { getProjectList } from '../../asyncActions/projectAsyncActions'
import { glink } from '../../constant';
import Link from 'next/link';
import { deepClone } from '../../utility';

interface Props {
    filters, getProjectList, projectsMixed
}
type MyState = { input: string };

class GalleryList extends React.Component<Dispatchable<Props>, MyState> {

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }
    componentDidMount() {
        let f = deepClone(this.props.filters);
        f.limit = 50;
        this.props.getProjectList(f);
    }
    getGallery(x, i) {
        return (
            <>
                {(i < 4) &&
                    <li key={i} className="thumbnail">
                        <Link href={glink.href.project} as={`/${this.props.filters.country}/${this.props.filters.location}/${this.props.filters.subArea}/project/${x.slug}`}>
                            <a>
                                <img src={x.profilePic || '/assets/images/ps.jpg'} alt={x.projectName} className="img-responsive"></img></a></Link>
                        <div className="centered uc">{x.projectName}</div>
                    </li>
                }
            </>)
    }
    getProps(type) {
        if (this.props.projectsMixed) {
            let arr = this.props.projectsMixed.filter(x => x.propType.name == type);
            return (
                arr.map((x, i) =>
                    <>
                        {i < 10 &&

                            <li key={i}>
                                <Link href={glink.href.project} as={`/${this.props.filters.country}/${this.props.filters.location}/${this.props.filters.subArea}/project/${x.slug}`}>
                                    <a><b>{x.projectName} - {x.location}</b></a></Link>
                                <span> {(x.priceRange) ? `Rs. ${x.priceRange} Lakhs` : 'Price on Request'} </span>
                            </li>
                        }
                    </>
                ))
        }
    }

    render() {
        const { filters, projectsMixed } = this.props;
        return (
            <div>
                <section id="apartment_datas">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-3">
                                <div className="our_gallery_logos">
                                    <h3>PROPERTY GALLERY</h3>
                                    <ul>
                                        {projectsMixed && projectsMixed.map((x, i) => this.getGallery(x, i)
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="apartment_more_data">
                                    <h3 className="uc">{filters.location} - RESIDENTIAL Projects</h3>
                                    <ul>
                                        {this.getProps('Residential')}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="apartment_more_data">
                                    <h3 className="uc">{filters.location} - Commercial Projects</h3>
                                    <ul>
                                        {this.getProps('Commercial')}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="apartment_more_data">
                                    <h3 className="uc">{filters.location} - Industrial Projects</h3>
                                    <ul>
                                        {this.getProps('Industrial')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx>
                    {`
                   
                    `}
                </style>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        projectsMixed: state.projects.data
    }
    return obj;
}

const mapDispatchToProps = {
    getProjectList
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryList)
