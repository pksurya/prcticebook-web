import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const Verified: React.SFC<any> = (props) => {
    const { domain } = props;
    const links = [
        { name: "Property for sale", url: "https://property.sale", text: "property.sale" },
        { name: "Property for rent", url: "https://property.rent", text: "property.rent" },
        // { name: "Golf Property for sale", url: "https://property.golf", text: "property.golf" },
        // { name: "Shop for sale", url: "http://shopforsale.in", text: "shopforsale.in" },
        // { name: "Plots for sale", url: "http://plots.forsale/", text: "plots.forsale" },
        { name: "Kothi for sale", url: "http://kothi.forsale/", text: "kothi.forsale" },
        { name: "Food Court for sale", url: "http://foodcourt.forsale/", text: "foodcourt.forsale" },
        // { name: "Factory for sale", url: "http://factory.forsale/", text: "factory.forsale" },
        // { name: "Distress property for sale", url: "https://distress.property.sale/", text: "distress.property.sale" },
        // { name: "2BHK flats for sale", url: "http://2bhkflat.forsale/", text: "2bhkflat.forsale" },
        // { name: "3BHK flats for sale", url: "http://3bhkflat.forsale/", text: "3bhkflat.forsale" },
        // { name: "Jobs in Real Estate", url: "https://property.work", text: "property.work" },
        // { name: "PetrolPump for sale", url: "https://property.work", text: "petrolpump.forsale" },
        // { name: "PreLeased property for sale", url: "http://preleasedproperty.forsale/", text: "preleasedproperty.forsale" }

    ]
    return (
        <div>
            <div className="verfied_section">
                <div className="container">
                    <div className="col-md-12">
                        <div className="verfied_section_data">
                            <ul>
                                {links && links.map((x, i) =>
                                    <>
                                        {(domain != x.text) &&
                                            <li key={i}>
                                                <img src="/assets/images/right_check.png" alt="" className="img-responsive"></img>
                                                <h3>{x.name}</h3>
                                                <h4><a target="_blank" href={x.url}>{x.text} <i className="fa fa-long-arrow-right"></i></a></h4>
                                            </li>
                                        }
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect<any>(mapStateToProps)(Verified)
