import { connect } from 'react-redux'
import React from 'react';
import { Dispatchable } from '../../lib/with-redux-store';

interface Props {
    slugs
}
type MyState = { input: string };

class SimilarBlogLinks extends React.Component<Dispatchable<Props>, MyState> {

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }
    componentDidMount() {

    }
    render() {
        const { slugs } = this.props;
        return (
            <div>
                <br/>
                        <hr/>
                 <h5>Read Similar Articles</h5>
                        
                <table id="customers" className="stable">
                    <tbody>
                        {slugs && slugs.map((x, i) =>
                            <tr key={i}>
                                <td>
                                    <a target="_blank" href={`https://practicebook.in/blog/${x.slug}`}
                                    >{x.title}</a>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>





                <style jsx>
                    {`
.stable{
    box-sizing: border-box; font-family: &quot;Trebuchet MS&quot;, Arial, Helvetica, sans-serif; width: 1106px; color: rgb(33, 37, 41); background-color: rgb(242, 243, 243);
}
.stable tbody{
    box-sizing: border-box;
}
.stable tbody tr{
    box-sizing: border-box; background-color: rgba(221, 221, 221, 0.09);
}
.stable tbody tr td{
    box-sizing: border-box; border: 1px solid rgb(221, 221, 221); padding: 8px; font-size: 13px;
}
.stable tbody tr td a{
    box-sizing: border-box; color: rgba(4, 4, 4, 0.62); cursor: pointer; line-height: 18px; font-weight: bold;
}


               `}
                </style>
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

export default connect(mapStateToProps, mapDispatchToProps)(SimilarBlogLinks)
