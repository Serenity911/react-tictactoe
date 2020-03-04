import React, { Component, Fragment } from 'react';
import './CellItem.css'

class CellItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.setState({value: true}, 
            () => {
            console.log(this.props.cellID);
            this.props.onCellClick(this.props.cellID);
        })
        
    }

    render() {
        return(
            <div onClick={this.handleClick} >
                <p>{this.props.cellValue}</p>
            </div>
        )
    }
}

export default CellItem