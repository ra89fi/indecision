import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: null
  };
  handleSubmit = e => {
    e.preventDefault();
    const text = e.target.elements.option.value.trim();
    const error = this.props.addClick(text);
    this.setState(() => ({ error }));
    if (!error) e.target.elements.option.value = '';
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="add-option">
          <input type="text" name="option" className="add-option__input" />
          <button className="button">Add Option</button>
        </form>
        {this.state.error && <p className="add-option__error">{this.state.error}</p>}
      </div>
    );
  }
}
