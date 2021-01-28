import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../../lib/with-redux-store';
import Index from '../index';
interface Props { getProjectGroups, getRouteSEOData, getPropertyList, projectGroups, filters, setting, updateAll, domain }
type MyState = { };

class BlogSorted extends React.Component<Dispatchable<Props>, MyState> {
    componentDidMount() {
    }
    render() {
        const { } = this.props;
        return (
            <div>
                <Index {...this.props} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogSorted)
