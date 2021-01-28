import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';

interface Props {

}
type MyState = { input: string };

class BlogSorted extends React.Component<Dispatchable<Props>, MyState> {

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }
    componentDidMount() {
       
    }
    render() {
        const { } = this.props;
        return (
            <div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        obj: state.blog.data
    }
    return obj;
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogSorted)
