import { connect } from 'react-redux'
import React from 'react';
import Link from 'next/link';
import { glink } from '../constant';

const mapStateToProps = (state: any) => state

const SuggestedProp: React.SFC<any> = (prop) => {
    const { propList } = prop;
    return (
        <div>
            <div className="sugetn">
                <div className="sugne_in">
                    <h3>Suggested Property</h3>
                    <ul>
                        {propList && propList.map((x, i) =>
                            <li key={i}>
                               <Link href={glink.href.property} as={`/${prop.filters.country}/${prop.filters.location}/${prop.filters.subArea}/property/${x.slug}`}>
                                   <a onClick={()=> prop.getPropertyDetail(x.slug)}>{x.title}</a></Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <style jsx>
                {`
                .sugne_in h3 {color:white;}
                .sugne_in{
                    max-height: 484px;
                    min-height:auto;
                    margin: 0 auto;
                    overflow: hidden;
                }
                .sugne_in:hover {
                    overflow-y: scroll;
                  }
                  .sugne_in::-webkit-scrollbar {
                    width: .3em;
                  }
                
                  .sugne_in::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                  }
                  .sugne_in::-webkit-scrollbar-thumb {
                    background-color: var(--secondary);
                    outline: 1px solid slategrey;
                  }
                `}
            </style>
        </div>
    )
}

export default connect<any>(mapStateToProps)(SuggestedProp)
