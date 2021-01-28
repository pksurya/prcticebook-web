import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const HotSale: React.SFC<any> = () => {
    return (
        <div>
            <div className="sugetn">
                <div className="sugne_in">
                    <h3>Hot Sale</h3>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Avg Rate per sqft</th>
                                <th>Rental Yield</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" id="html"></input> This Project</td>
                                <td>₹ 4363 <span>Highest</span></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> Locality
                    Average</td>
                                <td>₹ 4363</td>
                                <td>2.84% <span>Highest</span></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> Locality
                    Average</td>
                                <td>₹ 4363</td>
                                <td>2.84% <span>Highest</span></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> This Project</td>
                                <td>₹ 4363</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> This Project</td>
                                <td>₹ 4363</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> Locality
                    Average</td>
                                <td>₹ 4363</td>
                                <td>2.84% <b>Highest</b></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> Locality
                    Average</td>
                                <td>₹ 4363 <b>Highest</b></td>
                                <td>2.84%</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> This Project</td>
                                <td>₹ 4363</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> This Project</td>
                                <td>₹ 4363</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> Locality
                    Average</td>
                                <td>₹ 4363</td>
                                <td>2.84% <b>Highest</b></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="html"></input> Locality
                    Average</td>
                                <td>₹ 4363 <b>Highest</b></td>
                                <td>2.84%</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default connect<any>(mapStateToProps)(HotSale)
