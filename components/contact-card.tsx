import { connect } from 'react-redux'
import React from 'react';
import { constant } from '../constant';

const mapStateToProps = (state: any) => state

const ContactCard: React.SFC<any> = (props) => {
    return (
        <div>
            <div className="container sticky">
                <div className="row form_start">
                    <div className="col-md-12">
                        <i className="fa fa-user"></i>&nbsp;&nbsp;&nbsp; <span><b>{constant.author}</b></span>
                    </div>
                    <div className="col-md-12">
                        <i className="fa fa-envelope"></i>&nbsp;&nbsp;&nbsp;<span><b>{constant.email}</b></span>
                    </div>
                    <div className="col-md-12">
                        <i className="fa fa-phone"></i>&nbsp;&nbsp;&nbsp;<span><b>{constant.contactNumber}</b></span>
                    </div>
                    <div className="col-md-12 btn-div">
                        <a href="https://wa.me/+918375924100" className="btns" target="_blank"><i className="fa fa-whatsapp"></i> <span>WhatsApp Us</span></a>
                &nbsp; &nbsp;
                <a href="tel:+91-8375924100" className="btns" target="_blank"><i className="fa fa-phone"></i> <span>Call Us</span></a>
                    </div>
                </div>
            </div>
            <style jsx>{`
    .row{    
        margin-top:10px;}
        .btns{
            padding:8px;
            border-radius:5px;
            background:var(--primary);
            color:white;
            font-weight:700;
        }
        .btn-div{    
            margin-top: 30px;
            margin-bottom: 15px;}
        .btns:hover{
            background:var(--secondary);
            color:white;
        }
    `}</style>
        </div>
    )
}

export default connect<any>(mapStateToProps)(ContactCard)
