import { connect } from 'react-redux'
import React from 'react';
import { initialFilterState } from '../reducers/filterReducer';
import { Dispatchable } from '../lib/with-redux-store';

interface Props {
    reset, filters
}
type MyState = { input: string };

class FilterCap extends React.Component<Dispatchable<Props>, MyState> {
    getName(x) {
        if (this.props.filters[x]) {
            switch (x) {
                case 'budget': return <span><b>Budget: </b> ₹ {this.props.filters[x].replace(',', ' - ')} Lakhs &nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'rent': return <span><b>Rent: </b> ₹ {this.props.filters[x].replace(',', ' - ')} Thousand&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'size': return <span><b>Area: </b> {this.props.filters[x].replace(',', ' - ')} sq. ft.&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'roi': return <span><b>ROI: </b> More than {this.props.filters[x]} %&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'floor': return <span><b>Floor: </b> {this.props.filters[x]}&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'roadSize': return <span>{this.props.filters[x]} Road&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;

                //for rent 

                case 'securityDeposit': return <span><b>Security Deposit: </b>{this.props.filters[x]}&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'rentPriority': return <span><b>Priority to: </b> {this.props.filters[x]}&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'rentEscalation': return <span><b>Rent Escalation: </b> {this.props.filters[x]}&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'rentEscalationPeriod': return <span><b>Rent Escalation Period: </b> {this.props.filters[x]}&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
                case 'roadSize': return <span>{this.props.filters[x]} Road&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;


                case 'builder': {
                    let builder = '';
                    if (this.props.filters[x] == 2) { builder = 'Authority'; }
                    else if (this.props.filters[x] == 3) { builder = 'Builder'; }
                };

                default: return <span>{this.props.filters[x].toString().split(',').join(' , ')}&nbsp;&nbsp;<i className="fa fa-remove"></i></span>;
            }
        }
    }
    render() {
        const { filters } = this.props;
        let keys = Object.keys(filters);
        let newKeys: string[] = [];
        let toRemove = ["websites", "orderby", "reset", "budgetC", "rentC", "sizeC", "query", "location", "capReset"];
        keys.forEach(x => {
            if (toRemove.indexOf(x) == -1) {
                if (filters[x] && filters[x] != 'All' && filters[x] != '' && initialFilterState[x] != filters[x])
                    newKeys.push(x);
            }
        })
        return (
            <div>
                {newKeys.length > 0 &&
                    <div className="sorting-wrappper">
                        <div className="capsules">
                            <ul className="row">
                                {newKeys.map((x, i) =>
                                    <li key={i} onClick={() => { this.props.reset(x, initialFilterState[x]) }} className="col-md-1 col-sm-2 col-xs-2 text-center">
                                        {this.getName(x)}
                                    </li>
                                )}
                            </ul>
                        </div>

                        <style jsx>
                            {`
              .capsules ul{
                 display: inline-flex;
                 width: 100%;
                 margin-left: -40px;
                 margin-right: -5px;
              }
              .capsules ul li{
                border: 1px solid var(--secondary);
                border-radius: 10px;
                padding: 2px 7px;
                font-size: 9px;
                margin-right: 5px;
                list-style:none;
                display:inline-block;
                margin-bottom: 5px;
                cursor: pointer;
                max-width: unset !important;
                white-space:nowrap;
                padding-bottom: 4px;
                width: auto;
              }
              .fa {
                  color:var(--primary) !important;
                  margin-left:5px;
                  font-size:11px;
              }
              `}
                        </style>
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterCap)


/*
- Some filter are binding with value like 9/2/3/4....so bind it with it label name
- Close icon on filterbox, so reset all at once
*/
