import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { cp, logout } from '../asyncActions/authAsyncActions';
import { updateMsg } from '../asyncActions/commonAsyncActions';
import { constant } from '../constant';
import { openModal, deepClone } from '../utility';

interface Props {
    cp, auth, logout, updateMsg
}
type MyState = {
    op: string, np: string, cp: string, loading: boolean
};
const initState = {
    op: "", np: "", cp: "", loading: false
}

class ChangePassword extends React.Component<Dispatchable<Props>, MyState> {
    constructor(props) {
        super(props)
        this.state = deepClone(initState);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    componentDidMount() {
    }
    async handleSubmit(event) {
        event.preventDefault();
        let obj = {
            password: this.state.np
        }
        await this.props.cp(obj, this.props.auth.data.user._id);
        this.setState(deepClone(initState));
    }
    render() {
        const { auth } = this.props;
        return (
            <div>
                <div className="myaccount_form">
                    <div className="register_forming">
                        <h3>Change Your Password</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="Old Password">Old Password:</label>
                                <input type="password" name="op" value={this.state.op} onChange={this.handleChange} required className="form-control" placeholder="Old Password.."></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="New Password">New Password:</label>
                                <input type="password" name="np" value={this.state.np} onChange={this.handleChange} required className="form-control" placeholder="New Password.."></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm password">Confirm Password:</label>
                                <input type="password" name="cp" value={this.state.cp} onChange={this.handleChange} required className="form-control" placeholder="Confirm Password.."></input>
                            </div>
                            <button type="submit" className="btn btn-default">{auth.cpLoading &&
                                <i className="fa fa-circle-o-notch fa-spin"></i>
                            }
                                                     &nbsp;Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        auth: state.auth,
    }
    return obj;
}

const mapDispatchToProps = {
    cp, logout, updateMsg
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
