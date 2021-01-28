import { connect } from 'react-redux'
import React from 'react';
import { Contact } from '../components';

const mapStateToProps = (state: any) => state

const ContactPopup: React.SFC<any> = (props) => {
    return (
        <div>
            <div className="modal fade" id="ContactPopup" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Contact Our Real Estate Experts</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> */}
                        <div className="modal-body">
                            <button type="button" className="close" id="contactPopClose" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <Contact {...props}/>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect<any>(mapStateToProps)(ContactPopup)
