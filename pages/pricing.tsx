import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../lib/with-redux-store';
import { getPlansData } from '../asyncActions/commonAsyncActions';

interface Props {
    getPlansData, plans
}
type MyState = { input: string };

class Plan extends React.Component<Dispatchable<Props>, MyState> {
    componentDidMount() {
        this.props.getPlansData();
    }
    render() {
        const { plans } = this.props;
        if (plans) plans.reverse();
        return (

            <div className="container MT100 mem"><div className="row">

                {plans && plans.map((x, i) =>
                    <div className="col-xs-12 col-md-3"><div className={(x.popular) ? 'panel panel-success active' : "panel panel-primary"}  >
                        {x.popular && <div className="cnrflash"><div className="cnrflash-inner"><span className="cnrflash-label">MOST <br /> POPULR</span></div></div>}

                        <div className="panel-heading" style={{ 'background': x.color }}>
                            <h3 className="panel-title"> {x.name}</h3></div><div className="panel-body"><div className="the-price">
                                <h5 className="newprice"> ₹ {x.offerPrice} <span className="newsubscript">/yr</span></h5>
                                <h1><del>₹ {x.price}</del> <span className="subscript">/yr</span></h1>
                                {/* <small>Default plan</small> */}
                            </div>
                            <table className="table">
                                <tr><td>{x.listing} Listing </td></tr>

                            </table>
                        </div>
                        {/* <div className="panel-footer"><a className="btn-dc ng-star-inserted" role="button">Activate</a> FREE Lifetime</div> */}
                    </div>
                    </div>
                )}





                {/* <div className="col-xs-12 col-md-3"><div className="panel panel-primary">

                    <div className="panel-heading">
                        <h3 className="panel-title"> Bronze</h3></div><div className="panel-body"><div className="the-price">

                            <h5 className="newprice"> ₹ 1000 <span className="newsubscript">/yr</span></h5>
                            <h1><del>₹ 3000</del> <span className="subscript">/yr</span></h1>
                            <small>Default plan</small>
                        </div>
                        <table className="table">
                            <tr><td>30 Listing </td></tr>

                        </table>
                    </div>
                    <div className="panel-footer"><a className="btn-dc ng-star-inserted" role="button">Activate</a> FREE Lifetime</div>
                </div>
                </div>


                <div className="col-xs-12 col-md-3"><div className="panel panel-success active"><div className="cnrflash">
                    <div className="cnrflash-inner"><span className="cnrflash-label">MOST <br /> POPULR</span></div>

                </div><div className="panel-heading"><h3 className="panel-title"> Silver</h3></div><div className="panel-body">
                        <div className="the-price">
                            <h5 className="newprice"> ₹ 1800 <span className="newsubscript">/yr</span></h5>
                            <h1><del>₹ 5000</del> <span className="subscript">/yr</span></h1>
                            <small>Your current membership plan</small>
                        </div>
                        <table className="table">
                            <tr><td>60 Listing </td></tr>
                        </table>
                    </div>

                    <div className="panel-footer"><a className="btn-dc ng-star-inserted" role="button">Upgrade</a> 1 month FREE trial</div>
                </div>
                </div>


                <div className="col-xs-12 col-md-3"><div className="panel panel-info"><div className="panel-heading"><h3 className="panel-title"> Gold</h3></div><div className="panel-body">
                    <div className="the-price">
                        <h5 className="newprice"> ₹ 2500 <span className="newsubscript">/yr</span></h5>
                        <h1><del>₹ 7000</del> <span className="subscript">/yr</span></h1>
                        <small>1 month FREE trial</small>
                    </div>
                    <table className="table">
                        <tr><td>100 Listing </td></tr>
                    </table>
                </div>
                    <div className="panel-footer">
                    <a className="btn-dc ng-star-inserted" role="button">Activate</a> 1 month FREE trial</div>
                </div></div> */}




            </div>
                <style jsx>
                    {`
                                
.mem .panel
{
    text-align: center;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 30px;
    background-color: white;
}
// .mem .panel-primary .panel-heading{
//     background-color:  #cd7f32;
// }
// .mem .panel-success .panel-heading{
//     background-color: #C0C0C0;
// }
// .mem .panel-info .panel-heading{
//     background-color: #FFD700;
// }
.mem .panel:hover { box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4), 0 1px 5px rgba(130, 130, 130, 0.35); }
.mem .panel-body
{
    padding: 0px;
    text-align: center;
}
.mem .panel-title{
    padding: 10px;
}
.mem .the-price
{
    background-color: rgba(220,220,220,.17);
    box-shadow: 0 1px 0 #dcdcdc, inset 0 1px 0 #fff;
    padding: 20px;
    margin: 0;
}

.mem .the-price h1
{
    line-height: 1em;
    padding: 0;
    margin: 0;
}

.mem .subscript
{
    font-size: 25px;
}
.mem .newsubscript
{
    font-size: 18px;
}

/* CSS-only ribbon styles    */
.mem .cnrflash
{
    /*Position correctly within container*/
    position: absolute;
    top: -9px;
    right: 4px;
    z-index: 1; /*Set overflow to hidden, to mask inner square*/
    overflow: hidden; /*Set size and add subtle rounding  		to soften edges*/
    width: 100px;
    height: 100px;
    border-radius: 3px 5px 3px 0;
}
.mem .cnrflash-inner
{
    /*Set position, make larger then 			container and rotate 45 degrees*/
    position: absolute;
    bottom: 0;
    right: 0;
    width: 145px;
    height: 145px;
    -ms-transform: rotate(45deg); /* IE 9 */
    -o-transform: rotate(45deg); /* Opera */
    -moz-transform: rotate(45deg); /* Firefox */
    -webkit-transform: rotate(45deg); /* Safari and Chrome */
    -webkit-transform-origin: 100% 100%; /*Purely decorative effects to add texture and stuff*/ /* Safari and Chrome */
    -ms-transform-origin: 100% 100%;  /* IE 9 */
    -o-transform-origin: 100% 100%; /* Opera */
    -moz-transform-origin: 100% 100%; /* Firefox */
    background-image: linear-gradient(90deg, transparent 50%, rgba(255,255,255,.1) 50%), linear-gradient(0deg, transparent 0%, rgba(1,1,1,.2) 50%);
    background-size: 4px,auto, auto,auto;
    background-color: #aa0101;
    box-shadow: 0 3px 3px 0 rgba(1,1,1,.5), 0 1px 0 0 rgba(1,1,1,.5), inset 0 -1px 8px 0 rgba(255,255,255,.3), inset 0 -1px 0 0 rgba(255,255,255,.2);
}
.mem .cnrflash-inner:before, .cnrflash-inner:after
{
    /*Use the border triangle trick to make  				it look like the ribbon wraps round it's 				container*/
    content: " ";
    display: block;
    position: absolute;
    bottom: -16px;
    width: 0;
    height: 0;
    border: 8px solid #800000;
}
.mem .cnrflash-inner:before
{
    left: 1px;
    border-bottom-color: transparent;
    border-right-color: transparent;
}
.mem .cnrflash-inner:after
{
    right: 0;
    border-bottom-color: transparent;
    border-left-color: transparent;
}
.mem .cnrflash-label
{
    /*Make the label look nice*/
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    padding-bottom: 5px;
    color: #fff;
    text-shadow: 0 1px 1px rgba(1,1,1,.8);
    font-size: 0.95em;
    font-weight: bold;
    text-align: center;
}
.MT100{
    margin-top: 50px;
}
.mem .panel-body {
    padding: 0px !important; 
}
/* .btn{
    margin:5px;
    font-size: 13px;
    font-weight: 600;
    padding: 7px;
    background: sandybrown !important;
    border: saddlebrown;
} */
.mem .panel-primary.active,.mem .panel-success.active,.mem .panel-info.active{
    border: 3px solid green;
}
.panel-footer{padding: 10px;}
.table td{
    padding: 0.50rem;
    font-size: 12px;
}
.newprice{color:green;}


                                `}
                </style>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let obj = {
        plans: state.plan.data
    }
    return obj;
}

const mapDispatchToProps = {
    getPlansData
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)