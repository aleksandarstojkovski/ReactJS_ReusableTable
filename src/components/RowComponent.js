import React, { Component } from 'react'

class RowComponent extends Component {

    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event, item){
        if(this.props.onClickFunction)
            this.props.onClickFunction(event, item);
    }

    render() {
        
        const columns = Object.entries(this.props.item).filter(([key, val])=>this.props.columns.includes(key)).map(([key, value],index) =>
            <td key={index}>{value}</td>
        );
        
        return (
            <tr onClick={(event) =>this.handleOnClick(event, this.props.item)}>
                {columns}
            </tr>
        )
    }
    
} 

export default RowComponent
    