import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { sendMessage,setMsg } from '../asyncActions/contactAsyncActions';
import { constant } from '../constant';
import { loadLeadFormsHide } from '../utility';

interface Props {
    sendMessage, contact, title, website, msg,setMsg
}
type MyState = { name: string, email: string, number: any, msg: string, ack: string };

class Contact extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            number: '',
            msg: this.props.contact.msg,
            ack: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getInitialState = () => {
        return { name: '', email: '', number: '', msg: this.props.contact.msg };
    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
        if(evt.target.name=='msg'){
            this.props.setMsg(value);
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        let obj = {
            ...this.props.contact,
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            msg: `${this.props.contact.msg || this.state.msg}

            ----> Query page URL:-  
            ${window.location.href}
            ` ,
            website: (this.props.website) ? this.props.website.code : 'w1'
        }

        await this.props.sendMessage(obj);
        this.setState({
            name: "",
            email: "",
            number: null,
            msg: "",
            ack: constant.contactAckMsg
        });
        let base = this;
        setTimeout(function () {
            base.setState({
                ack: ""
            });
            const contactPopClose = window.document.getElementById("contactPopClose")!;
            if (contactPopClose) {
                contactPopClose.click();
            }
            loadLeadFormsHide();
        }, 1000)
    }
    componentDidMount() {
        // this.setState({
        //     msg: this.props.msg || ""
        // });
    }
    render() {
        const { title, contact } = this.props;
        return (
            <div>
                <div className="form_start">
                    <form onSubmit={this.handleSubmit}>
                        {title &&
                            <h3>{title}</h3>
                        }
                        {/* {this.state.ack &&
                            <div className="alert alert-success">
                                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                <strong>Success!</strong> {this.state.ack}
                            </div>
                            // <span className="success">{this.state.ack}</span>
                        } */}
                        <div className="form-group">
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" placeholder="Name" required></input>
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Email Address" required></input>
                        </div>
                        <div className="form-group">
                            <input type="number" name="number" value={this.state.number} onChange={this.handleChange} className="form-control" placeholder="Contact Number" required></input>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" name="msg" value={this.props.contact.msg || this.state.msg} onChange={this.handleChange} placeholder="Your Query" rows={6} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">  {contact.loading &&
                            <i className="fa fa-circle-o-notch fa-spin"></i>
                        }
                                                     &nbsp;Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        contact: state.contact,
        website: state.website.data
    }
    return obj;
}

const mapDispatchToProps = {
    sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
