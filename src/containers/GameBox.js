import React, { Component, Fragment } from 'react';
import CellItem from '../components/CellItem.js'

class GameBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            winner: '',
            player1Moved: false,
            player2Moved: true,
            cells: [
                {id: 'R1C1', value: '', isPlayable: true}, {id: 'R1C2', value: '', isPlayable: true}, {id: 'R1C3', value: '', isPlayable: true}
            ]
        }
        this.handleCellClick = this.handleCellClick.bind(this)
    }


    handleCellClick(id){   

        const newCells = this.state.cells.map(cell => {
            return (cell.id === id) ? {...cell, isPlayable: false, value: 'X'} : cell;
        });

        this.setState({cells: newCells})
    }

    render(){
        const createCells = this.state.cells.map(cell => {
            return <CellItem key={cell.id} cellID={cell.id} onCellClick={this.handleCellClick}></CellItem>
        })

        return(
            <Fragment>
            <p>HELLO I AM THE BOX</p>
            {createCells}
            </Fragment>
        )
    }

}

export default GameBox
