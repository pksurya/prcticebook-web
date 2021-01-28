import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { glink } from '../constant';

interface State {
    id: string
}
const mapStateToProps = (state: State) => state

const BreadCrumb: React.SFC<any> = (props) => {
    const { id, setting } = props;
    let arr = [{ href: glink.href.homeLocation, as: `/${setting.country}/${setting.location}`, name: 'Home' }];

    if (id == "0") {//blogs
        arr.push({ href: '', as: '', name: 'Blogs' });
    }
    else if (id == "7") {//blogs
        arr.push({ href: glink.href.blogs, as: '/blogs', name: 'Blogs' });
        arr.push({ href: '', as: '', name: 'Details' });
    }
    else if (id == "1") {//properties
        arr.push({ href: '', as: '', name: 'Properties' });
    }
    else if (id == "2") {//projects
        arr.push({ href: '', as: '', name: 'Projects' });
    }
    else if (id == "3") {//property Details
        arr.push({ href: glink.href.properties, as: `/${setting.country}/${setting.location}/${setting.area}/properties/${setting.propType}`, name: 'Properties' });
        arr.push({ href: '', as: '', name: 'Detail' })
    }
    else if (id == "4") {//project Details
        arr.push({ href: glink.href.projects, as: `/${setting.country}/${setting.location}/${setting.area}/projects/${setting.propType}`, name: 'Projects' });
        arr.push({ href: '', as: '', name: 'Detail' })
    }
    else if (id == "5") {//Contact
        arr.push({ href: '', as: '', name: 'Contact' });
    }
    else if (id == "6") {//Registration
        arr.push({ href: '', as: '', name: 'Registration' });
    }
    else if (id == "8") {//Post Free Prop
        arr.push({ href: '', as: '', name: 'Post Free properties' });
    }
    else if (id == "9") {//My Profile
        arr.push({ href: '', as: '', name: 'My Profile' });
    }
    else if (id == "10") {//Forgot Password
        arr.push({ href: '', as: '', name: 'Forgot Password' });
    }

    return (
        <div>
            <div className="breadcrumb">
                <div className="container">
                    <div className="col-md-12">
                        <div className="start">
                            <div className="bread_listing">
                                {arr && arr.map((x, i) =>
                                    <>
                                        {x.href != '' &&
                                            <Link href={x.href} as={x.as}><a key={i}>{x.name}</a></Link>
                                        }
                                        {x.href == '' &&
                                            <span >{x.name}</span>
                                        }
                                        {arr && arr.length != i + 1 &&
                                            <i key={i}>&nbsp;/&nbsp;</i>
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`.start{float:right;}`}</style>
        </div>
    )
}

export default connect<State>(mapStateToProps)(BreadCrumb)
