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
                {R1C1: '', isPlayable: true}, {R1C2: '', isPlayable: true}, {R1C3: '', isPlayable: true}
            ]
        }
    }

    render(){
        const createCells = this.state.cells.map(cell => {
            const cellId = Object.keys(cell)[0]
            const cellValue = Object.values(cell)[0]
            return <CellItem key={cellId} valueCell={cellValue}></CellItem>
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
