import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../../lib/with-redux-store';

interface Props {
    msg, openLogin
}
type MyState = { input: string };

class Msg extends React.Component<Dispatchable<Props>, MyState> {

    render() {
        const { children, msg, openLogin } = this.props;
        return (
            <div>
                <div className="modal fade" id="msgbox" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Property.Sale</h5>
                                <button type="button" id="msgboxClose" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                        <p>{msg.msg}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> &nbsp;
                            {msg.btnLogin &&
                                    <button type="button" className="btn btn-secondary" onClick={openLogin}>Login</button>
                                }
                            &nbsp;{children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        msg: state.msg
    }
    return obj;
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Msg)

