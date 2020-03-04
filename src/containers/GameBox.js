import React, { Component, Fragment } from 'react';
import CellItem from '../components/CellItem.js'

class GameBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            winner: '',
            players: [ {id: "player1", symbol: "X", isCurrentPlayer: true }, {id: "player2", symbol: "O", isCurrentPlayer: false }],            
            cells: [
                {id: 'R1C1', value: '', isPlayable: true}, {id: 'R1C2', value: '', isPlayable: true}, {id: 'R1C3', value: '', isPlayable: true}
            ]
        }
        this.handleCellClick = this.handleCellClick.bind(this)
        this.whoIsCurrentPlayer = this.whoIsCurrentPlayer.bind(this)
    }

    handleCellClick(id){   
        const currentPlayer = this.whoIsCurrentPlayer()
        const symbolOfCurrentPlayer = currentPlayer.symbol
        
        const newCells = this.state.cells.map(cell => {
            return (cell.id === id) ? {...cell, isPlayable: false, value: `${symbolOfCurrentPlayer}`} : cell;
        });
        this.setState({cells: newCells})

        const nextTurnPlayers = this.state.players.map( player => {
            return (player === currentPlayer) ? {...player, isCurrentPlayer: false} : {...player, isCurrentPlayer: true};
        })

        this.setState({players: nextTurnPlayers})        
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
            return <CellItem key={cell.id} cellID={cell.id} onCellClick={this.handleCellClick}></CellItem>
        })

        return(
            <Fragment>
    <h2> Which player is playing? {this.whoIsCurrentPlayer().id}</h2>
            <p>HELLO I AM THE BOX</p>
            {createCells}
            </Fragment>
        )
    }

}

export default GameBox
