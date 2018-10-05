import React, { Component } from 'react'

class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText : '',
      placeholder : 'Tapez votre film',
      timeDelaySearch : 1000,
      lockRequest : false
    }
  }

  render() {
    return <div className="center">
              <i className="fa fa-search icon-search"></i>
              <input onChange={this.handleChange.bind(this)} placeholder={this.state.placeholder} className="input-search"/> 
              <button className="btn-go" onClick={this.handleClick.bind(this)}>Go</button>
          </div>
  }

  search() {
    this.props.callback(this.state.searchText)
    this.setState({ lockRequest: false }) 
  }
  
  handleChange(event) {
    this.setState({ searchText: event.target.value })
    if(!this.state.lockRequest) {
      this.setState({ lockRequest: true })
      setTimeout(() => { this.search() }, this.state.timeDelaySearch)
    }
  }
  
  handleClick(event) {
    search()
  }

}

export default SearchBar;