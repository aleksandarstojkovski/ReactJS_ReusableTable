import React, { Component } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import '../styles/HeaderComponent.css'

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.handleSortTableData = this.handleSortTableData.bind(this);
        this.state = {
          order: "asc"
        };
    }

    handleSortTableData(){
        this.setState((prevState) => {
            let switchOrder = prevState.order === "asc" ? "desc" : "asc"
            this.props.handleSortTableData(this.props.value,switchOrder)
            return {
                order: switchOrder
            };
        });
    }

    render() {
        if(this.props.sortColumns.includes(this.props.value)){
        let orderArrow;
        if (this.state.order === "asc")
            orderArrow=<MdArrowDropUp size={20}/>
        else
            orderArrow=<MdArrowDropDown size={20}/>
            return (
                <th onClick={this.handleSortTableData} className={"interaction"}>
                    {this.props.value.toUpperCase()}
                    {orderArrow}
                </th>
            )
        } else {
            return (
            <th>
                {this.props.value.toUpperCase()}
            </th>
            )
        }

    }

}

export default HeaderComponent
