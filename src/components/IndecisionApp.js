import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: null
  };
  handleAdd = text => {
    if (!text) {
      return 'Invalid option value!';
    } else if (this.state.options.indexOf(text) != -1) {
      return 'Option already exists!';
    }
    this.setState(prevState => ({
      options: prevState.options.concat(text)
    }));
  };
  handlePick = () => {
    const option = Math.floor(Math.random() * this.state.options.length);
    this.setState(() => ({
      selectedOption: this.state.options[option]
    }));
  };
  handleRemove = text => {
    this.setState(prevState => ({
      options: prevState.options.filter(el => el != text)
    }));
  };
  handleRemoveAll = () => {
    this.setState(prevState => ({
      options: []
    }));
  };
  handleModalClose = () => {
    this.setState(() => ({
      selectedOption: null
    }));
  };
  componentDidMount() {
    try {
      let options = localStorage.getItem('options');
      options = JSON.parse(options);
      if (options) this.setState(() => ({ options }));
    } catch (e) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.options.length != prevState.options.length) {
      localStorage.setItem('options', JSON.stringify(this.state.options));
    }
  }
  render() {
    const subtitle = 'Let it help you decide!';
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action hasOptions={this.state.options.length > 0} handleClick={this.handlePick} />
          <div className="widget">
            <Options
              handleRemove={this.handleRemove}
              options={this.state.options}
              handleRemoveAll={this.handleRemoveAll}
            />
            <AddOption addClick={this.handleAdd} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          onModalClose={this.handleModalClose}
        />
      </div>
    );
  }
}
