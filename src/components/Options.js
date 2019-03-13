import React from 'react';

import Option from './Option';

const Options = props => {
  return (
    <div>
      <div className="widget__header">
        <h3>Your Options</h3>
        <button className="button button--link" onClick={props.handleRemoveAll}>
          Remove All
        </button>
      </div>
      {props.options.length == 0 && (
        <p className="widget__message">Please add an option to get started!</p>
      )}
      {props.options.map((el, idx) => (
        <Option count={idx + 1} key={el} handleRemove={props.handleRemove} option={el} />
      ))}
    </div>
  );
};

export default Options;
