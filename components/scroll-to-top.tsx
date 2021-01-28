import { connect } from 'react-redux'
import React, { useState } from 'react';

const mapStateToProps = (state: any) => state

const ScrollTop: React.SFC<any> = () => {
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (process.browser) {
        window.addEventListener('scroll', checkScrollTop)
    }
    return (
        <div>
            <div id="bt_to_top" style={{ height: 40, display: showScroll ? 'flex' : 'none' }}>
                <a onClick={scrollTop}>
                    <i className="jsx-950047815 fa fa-arrow-up"></i>
                </a>
            </div>
            <style jsx>
                {`
                    #bt_to_top a {
                        background-color: var(--secondary);
                        height: 40px;
                        text-align: center;
                        position: fixed;
                        bottom: 30px;
                        transition: background-color .3s, opacity .5s, visibility .5s;                        
                        padding: 10px 10px;
                        right: 30px;
                        width: 40px;
                        border: 1px solid var(--secondary);
                    }
                    #bt_to_top a i{
                        font-size: 20px;
                        color: white;
                    }
                    #bt_to_top a :hover {
                        cursor: pointer;
                        background-color: #333;
                        border: 1px solid #fff;
                    }
                    #bt_to_top a:active {
                        background-color: #555;
                    }
                    #bt_to_top a.show {
                        opacity: 1;
                        visibility: visible;
                    }`}
            </style>
        </div>
    )
}

export default connect<any>(mapStateToProps)(ScrollTop)
