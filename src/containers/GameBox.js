import React, { Component, Fragment } from 'react';
import CellItem from '../components/CellItem.js'
import "./GameBox.css"

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
        this.checkWinner = this.checkWinner.bind(this)
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

            let arrayColumn = [this.state.cells[i].value, this.state.cells[i+3].value, this.state.cells[i+6].value]
            arrayOfColumns.push(arrayColumn)
        }
        return arrayOfColumns
    }

    getDiagonalArray1(){
        const arrayDiagonal1 = [this.state.cells[0].value, this.state.cells[4].value, this.state.cells[8].value ]
        return arrayDiagonal1;
    }
    getDiagonalArray2(){
        const arrayDiagonal2 = [this.state.cells[2].value, this.state.cells[4].value, this.state.cells[6].value ]
        return arrayDiagonal2;
    }


    getWinner(){
        const allCombosArray = [...this.getArrayOfColumns(), ...this.getArrayOfRows(), this.getDiagonalArray1(), this.getDiagonalArray2()]
        // this.allCombosArray.push(this.arrayOfColumns())
        // this.allCombosArray.push(this.arrayOfRows())
        // console.log(allCombosArray);
        console.log("get winner is called")


        for (const row of allCombosArray) {
            // console.log(row);

            if (row.includes("X") && !row.includes("O") && !row.includes("")){
                console.log("Player1 won");
                this.setState({winner: "player1"})
                // this.checkWinner()
            }
            if(row.includes("O") && !row.includes("X") && !row.includes("")){
                console.log("Player2 won");
                this.setState({winner: "player2"})
            }
        }

    }

    checkWinner(){
        return this.state.winner;
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

    handleCellClick(id){
        const currentPlayer = this.whoIsCurrentPlayer()

        const symbolOfCurrentPlayer = currentPlayer.symbol

        const newCells = this.state.cells.map(cell => {
            return (cell.id === id) ? {...cell, isPlayable: false, value: `${symbolOfCurrentPlayer}`} : cell;
        });
        this.setState({cells: newCells}, () => this.cellPostClick())

    }

    cellPostClick(){
        this.getWinner()
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
            <div className="containerOfCells">
            {createCells}
            </div>
        <h3>Winner is: {this.state.winner}</h3>
            </Fragment>
        )
    }

}

export default GameBox
