import React, { Component } from 'react';

class Overview extends Component {
  render() {
    return(
      <ol>
        {this.props.array.map(element => {
          return<li key={element.id} id={element.id}>
            <ul>
              {this.props.prop.map((e,i) => {
                return <li onClick={this.props.edit} className={e} key={`${element.id}-${i+1}`}>{element[e]}</li>
              })}
            </ul>
            <button onClick={this.props.delete}>- Educational Experience</button>
          </li>
          })}
      </ol>
    )
  };
};

export default Overview;