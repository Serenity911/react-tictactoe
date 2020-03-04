import React, { Component, Fragment } from 'react';
import CellItem from '../components/CellItem.js'

class GameBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            winner: '',
            players: [ {id: "player1", symbol: "X", isCurrentPlayer: true }, {id: "player2", symbol: "O", isCurrentPlayer: false }],            
            cells: [
                {id: 'R1C1', value: '', isPlayable: true}, {id: 'R1C2', value: '', isPlayable: true}, {id: 'R1C3', value: '', isPlayable: true}, 
                
                {id: 'R2C1', value: '', isPlayable: true}, {id: 'R2C2', value: '', isPlayable: true}, {id: 'R2C3', value: '', isPlayable: true}, 
                
                {id: 'R3C1', value: '', isPlayable: true}, {id: 'R3C2', value: '', isPlayable: true}, {id: 'R3C3', value: '', isPlayable: true}
            ]
        }
        this.handleCellClick = this.handleCellClick.bind(this)
        this.whoIsCurrentPlayer = this.whoIsCurrentPlayer.bind(this)
        // this.getFirstRowValues = this.getFirstRowValues.bind(this)
        // this.getFirstRowWinner = this.getFirstRowWinner.bind(this)
        // this.getEachRow = this.getEachRow.bind(this)
        this.getWinner = this.getWinner.bind(this)
        this.getArrayOfColumns = this.getArrayOfColumns.bind(this)
    }

    getArrayOfRows(){
        const arrayOfRows = []
        for(let i = 0; i <=8; i +=3 ){
            let arrayRow = [this.state.cells[i].value, this.state.cells[i+1].value, this.state.cells[i+2].value]
            arrayOfRows.push(arrayRow)
        }
        return arrayOfRows 
    }

    getArrayOfColumns(){
        const arrayOfColumns = []
        for(let i = 0; i <= 2 ; i ++){
            // 0, 3, 6

            let arrayColumn = [this.state.cells[i].value, this.state.cells[i+3].value]
            arrayOfColumns.push(arrayColumn)
        }        
        return arrayOfColumns
    }

    getWinner(){
        const allCombosArray = [...this.getArrayOfColumns(), ...this.getArrayOfRows()]
        // this.allCombosArray.push(this.arrayOfColumns())
        // this.allCombosArray.push(this.arrayOfRows())
        console.log(allCombosArray);
        

        for (const row of allCombosArray) {
            console.log(row);
            
            if (row.includes("X") && !row.includes("O") && !row.includes("")){
                console.log("Player1 won");   
            }
            if(row.includes("O") && !row.includes("X") && !row.includes("")){
                console.log("Player2 won");   
            }
        }

    }

    // getFirstRowValues(){
    //     const firstRowValue = this.state.cells.map( (item, index) => {
    //         if(index <=2){
    //             return item.value
    //         }
    //     })
    //     return firstRowValue
    // }

    // getFirstRowWinner(){
    //     if (this.getFirstRowValues().includes("X") && !this.getFirstRowValues().includes("O") && !this.getFirstRowValues().includes("")){
    //         console.log("Player1 won");   
    //     }
    //     if(this.getFirstRowValues().includes("O") && !this.getFirstRowValues().includes("X") && !this.getFirstRowValues().includes("")){
    //         console.log("Player2 won");   

    //     }
    // }

    handleNextTurn(){
        const currentPlayer = this.whoIsCurrentPlayer()

        const nextTurnPlayers = this.state.players.map( player => {
            return (player === currentPlayer) ? {...player, isCurrentPlayer: false} : {...player, isCurrentPlayer: true};
        })

        this.setState({players: nextTurnPlayers})   
    }

    handleUpdateCell(id){
        const currentPlayer = this.whoIsCurrentPlayer()

        const symbolOfCurrentPlayer = currentPlayer.symbol
        
        const newCells = this.state.cells.map(cell => {
            return (cell.id === id) ? {...cell, isPlayable: false, value: `${symbolOfCurrentPlayer}`} : cell;
        });
        this.setState({cells: newCells})
    }

    handleCellClick(id){   
        this.handleUpdateCell(id)
        this.handleNextTurn()
    }
    
    whoIsCurrentPlayer(){
        for (let player of this.state.players) {
            if (player.isCurrentPlayer === true) {
                return player; 
            }
        }
    }

    render(){
        const createCells = this.state.cells.map(cell => {
            return <CellItem key={cell.id} cellID={cell.id} cellValue={cell.value} onCellClick={this.handleCellClick}></CellItem>
        })

        return(
            <Fragment>
            <h2> Which player is playing? {this.whoIsCurrentPlayer().id}</h2>
            <p>HELLO I AM THE BOX</p>
            <button onClick={this.getWinner}></button>
            {createCells}
            </Fragment>
        )
    }

}

export default GameBox
