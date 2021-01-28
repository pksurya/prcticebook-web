import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const WhatsAppGrp: React.SFC<any> = () => {
    return (
        <div>
            <div className="whatsapp_link">
                <div className="start_whatsapp_group">
                    <a href="https://chat.whatsapp.com/BmkIMg7CE5e55yAFDNkyvN"><i className="fa fa-whatsapp"></i>Join Whatsapp Group</a>
                </div>
            </div>
        </div>
    )
}

export default connect<any>(mapStateToProps)(WhatsAppGrp)
