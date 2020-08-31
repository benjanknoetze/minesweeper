import React from "react";
import Board from "../Board";
import Card from "react-bootstrap/Card";
import "./style.css";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.boardElement = React.createRef();

    this.state = {
      height: 8,
      width: 8,
      mines: 10,
      gameStatus: 0
    };
  }

  handleChange = (prop, value) => {
    this.setState({ [prop]: value });
  };

  handleChangeHeight = event => {
    const val = clamp(event.target.value, 5, 18);
    this.handleChange("height", val);
  };

  handleChangeWidth = event => {
    const val = clamp(event.target.value, 5, 18);
    this.handleChange("width", val);
  };

  handleChangeMines = event => {
    const cap = Math.floor((this.state.height * this.state.width) / 3);
    const val = clamp(event.target.value, 1, cap);
    this.handleChange("mines", val);
  };

  restartGame = () => {
    this.boardElement.current.restartBoard();
  };

  render() {
    const { height, width, mines, gameStatus } = this.state;
    return (
      <div className="game">
      <h2 id="gameTitle">Minesweeper</h2>
        <Board
          ref={this.boardElement}
          height={height}
          width={width}
          mines={mines}
          gameStatus={gameStatus}
        />
        <Card className="control-buttons">
          <button className="restartBtn" onClick={this.restartGame}>Restart</button>

          <form>
            <label id="gameSettings">Height</label>
            <input id="gameInput"
              type="number"
              value={this.state.height}
              onChange={this.handleChangeHeight}
            />
            <label id="gameSettings">Width</label>
            <input id="gameInput"
              type="number"
              value={this.state.width}
              onChange={this.handleChangeWidth}
            /><br></br>
            <label id="gameSettings">Mines</label>
            <input id="gameInput"
              type="number"
              value={this.state.mines}
              onChange={this.handleChangeMines}
            />
          </form>
        </Card>
      </div>
    );
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export default Game;
