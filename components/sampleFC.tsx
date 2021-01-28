import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const Sample: React.SFC<any> = () => {
    return (
        <div>
            
        </div>
    )
}

export default connect<any>(mapStateToProps)(Sample)
