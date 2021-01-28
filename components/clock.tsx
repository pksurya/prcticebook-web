import { connect } from 'react-redux'
import React from 'react';

const mapStateToProps = (state: any) => state

const format = t => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = n => n < 10 ? `0${n}` : n

//React.FC
//This PR renames React.SFC and React.StatelessComponent to React.FunctionComponent, while introducing deprecated aliases for the old names.


const Clock: React.FC<any> = ({ lastUpdate, light }) => {
  return (
    <div className={light ? 'light' : ''}>
      {format(new Date(lastUpdate))}
      <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82FA58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }

        .light {
          background-color: #999;
        }
      `}</style>
    </div>
  )
}

export default connect<any>(mapStateToProps)(Clock)
