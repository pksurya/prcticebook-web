import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../../../../lib/with-redux-store';
import Properties from './properties/[...all]';
interface Props {
	website, domain, resetList, getPropertyList, UpdateFilter, getRouteSEOData, setting, data, count, routes, currentPage, filterList, loading, countLoading,
	isFetching, errorMessage, hasMore, keyword, saveQueryToStore, filters, showAll, up, hotProps, getHotPropertyList
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
                <Properties {...this.props}/>
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
