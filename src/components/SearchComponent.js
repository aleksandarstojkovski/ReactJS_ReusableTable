import React, { Component } from 'react'
import '../styles/SearchComponent.css'

class SearchComponent extends Component {

    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(searchTerm){
        this.props.handleSearch(searchTerm)
    }

    render() {
        return (
            <input type="text" placeholder="Search..." onChange={event => this.handleSearch(event.target.value)}></input>
        )
    }
    
} 

export default SearchComponent
