import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { btnClick } from '../utility';
import { upload } from '../asyncActions/commonAsyncActions';
import { constant } from '../constant';

interface Props {
    upload, updatePhoto
}
type MyState = { selectedFile: any, loading: boolean };

class Uploader extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props);
        this.state = { selectedFile: null, loading: false }
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    handleChange = (e) => {
        this.setState({});
    }
    componentDidMount() {

    }
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <hr />
                    <h4>File Details:</h4>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        }
        // else {
        //     return (
        //         <div>
        //             <br />
        //             <h6>Choose before Pressing the Upload button</h6>
        //         </div>
        //     );
        // }
    };
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    async onFileUpload() {
        this.setState({ loading: true });
        const formData = new FormData();
        formData.append(
            "photo",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        let res = await this.props.upload(formData);
        this.setState({ selectedFile: null, loading: false }, function () {
            btnClick('uploadboxClose');
            this.props.updatePhoto(`${constant.baseAPIurl}uploads/${res.filename}`);
        });
    };
    render() {
        const { } = this.props;
        return (
            <div>
                <div className="modal fade" id="uploadbox" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Choose an image</h5>
                                <button type="button" id="uploadboxClose" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                        <input type="file" onChange={this.onFileChange} />
                                        {this.fileData()}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> &nbsp;
                                    <button type="button" disabled={!this.state.selectedFile} className="btn btn-secondary" onClick={this.onFileUpload}> {this.state.loading &&
                                    <i className="fa fa-circle-o-notch fa-spin"></i>
                                }
                    &nbsp;Upload</button>
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

    }
    return obj;
}

const mapDispatchToProps = {
    upload
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)
