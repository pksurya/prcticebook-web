import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const Fsocial: React.SFC<any> = () => {
    return (
        <div>
            <div id="fixed-social">
                <div>
                    <a href="https://www.facebook.com/propertyforsaleonline" className="fixed-facebook" target="_blank"><i className="fa fa-facebook"></i> <span>Facebook</span></a>
                </div>
                <div>
                    <a href="#" data-toggle="modal" data-target="#ContactPopup" className="fixed-twitter" target="_blank"><i className="fa fa-envelope"></i> <span>Submit Query</span></a>
                </div>
                <div>
                    <a href="https://big.property.sale/home-loan-emi-calculator" className="fixed-linkedin" target="_blank"><i className="fa fa-calculator"></i> <span>EMI Calculator</span></a>
                </div>
                <div>
                    <a href="https://wa.me/+918375924100" className="fixed-gplus" target="_blank"><i className="fa fa-whatsapp"></i> <span>WhatsApp Us</span></a>
                </div>
                <div>
                    <a href="tel:+91-8375924100" className="fixed-call" target="_blank"><i className="fa fa-phone"></i> <span>Call Us</span></a>
                </div>
                <div>
                    <a href="https://www.youtube.com/channel/UCpH2pfwoYCvX-rb6wL4C0jQ" className="fixed-youtube" target="_blank"><i className="fa fa-youtube"></i> <span>YouTube</span></a>
                </div>
            </div>
            <style jsx>
                {`
                #fixed-social {
                    position: fixed;
                    top: 180px;
                    z-index: 11;
                }
                #fixed-social a {
                   color: #fff;
                   display: block;
                   height: 35px;
                   position: relative;
                   text-align: center;
                   line-height: 35px;
                   width: 35px;
                   margin-bottom: 1px;
                   z-index: 2;
                   
                }#fixed-social a .fa {
                    font-size: 13px;
                    margin-top: 13px;
                }
                #fixed-social a:hover>span{
                  visibility: visible;
                  left: 26px;
                  opacity: 1;
                } 
                #fixed-social a span {
                    line-height: 35px;
                    left: 45px;
                    position: absolute;
                    text-align: center;
                    width: 130px;
                    visibility: hidden;
                    transition-duration: 0.5s;
                    z-index: 1;
                    opacity: 0;
                    margin-left: 10px;
                }
                
                 .fixed-facebook{
                    background-color: #3b5998;
                 }
                 .fixed-facebook span{
                    background-color: #3b5998;
                 }
                 .fixed-call{
                    background-color: #00AAE5;
                 }
                 .fixed-call span{
                    background-color: #00AAE5;
                 }
                 .fixed-twitter{
                    background-color: #6db6f5;}

                .fixed-youtube,.fixed-youtube span{
                    background-color:#FF0000;
                }
                 
                 .fixed-twitter span{
                    background-color: #6db6f5;
                 }
                 .fixed-gplus{
                    background-color: #00AF54;
                
                 }
                 .fixed-gplus span{
                    background-color: #00AF54;
                 }
                 .fixed-linkedin{
                    background-color: #2d6698;
                
                 }
                 .fixed-linkedin span{
                    background-color: #2d6698;
                 }
                 .fixed-instagrem{
                    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%) !important;
                
                 }
                 .fixed-instagrem span{
                    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%) !important;
                 }
                `}
            </style>
        </div>
    )
}

export default connect<any>(mapStateToProps)(Fsocial)
