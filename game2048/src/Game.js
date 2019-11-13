import React from "react";
import Game2048 from "./Game2048";
import "./Game.css";

let game = new Game2048();

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: game,
    }
  }
  componentDidMount() {
    this.state.game.randomBlock();
    this.state.game.randomBlock();
    this.setState({
      game
    })
    window.addEventListener("keyup", (e) => {
      if (this.state.game.gameOver) {
        window.alert("游戏结束！");
        game = new Game2048();
        game.randomBlock();
        game.randomBlock();
        this.setState({
          game
        })
        return
      }
      if (e.key === "ArrowDown") {
        this.moveDown();
      }
      if (e.key === "ArrowUp") {
        this.moveUp();
      }
      if (e.key === "ArrowLeft") {
        this.moveLeft();
      }
      if (e.key === "ArrowRight") {
        this.moveRight();
      }
    })
  }
  moveDown = () => {
    this.state.game.moveBottom();
    this.state.game.randomBlock()
    this.setState({
      game
    })
  }
  moveUp = () => {
    this.state.game.moveTop();
    this.state.game.randomBlock()
    this.setState({
      game
    })
  }
  moveLeft = () => {
    this.state.game.moveLeft();
    this.state.game.randomBlock()
    this.setState({
      game
    })
  }
  moveRight = () => {
    this.state.game.moveRight();
    this.state.game.randomBlock()
    this.setState({
      game
    })
  }

  render() {
    let board = this.state.game.getBoard();
    return (
      <div className="boxWrapper">
        {
          board.map((arr, idx) => {
            return (
              <div key={"row" + idx} className="rowWapper">
                {
                  arr.map((it, idx) => <Tile style={{ margin: "10px" }} key={"col" + idx} content={it}></Tile>)
                }
              </div>
            )
          })
        }
        <div onClick={this.moveDown} className="buttons"><span role="img" style={{ fontSize: "30px" }} aria-label="arrowdown">⬇️</span></div>
        <div onClick={this.moveUp} className="buttons"><span role="img" style={{ fontSize: "30px" }} aria-label="arrowup">⬆️</span></div>
        <div onClick={this.moveLeft} className="buttons"><span role="img" style={{ fontSize: "30px" }} aria-label="arrowleft">⬅️</span></div>
        <div onClick={this.moveRight} className="buttons"><span role="img" style={{ fontSize: "30px" }} aria-label="arrowright">➡️</span></div>
        <p>
          tip：使用键盘方向键或点击上方按钮操作上下左右
        </p>
      </div>
    )
  }
}

function Tile({ content }) {
  let bgcolor;
  let color;
  switch (content) {
    case 0:
      bgcolor = "rgb(205,193,180)";
      break;
    case 2:
      bgcolor = "rgb(238,228,218)";
      color = "rgb(120,110,101)"
      break;
    case 4:
      bgcolor = "rgb(236,224,200)";
      color = "rgb(120,110,101)"
      break;
    case 8:
      bgcolor = "rgb(242,177,121)";
      color = "rgb(249,234,222)"
      break;
    case 16:
      bgcolor = "rgb(245,149,99)";
      color = "rgb(249,234,222)"
      break;
    case 32:
      bgcolor = "rgb(245,124,95)";
      color = "rgb(249,234,222)"
      break;
    case 64:
      bgcolor = "rgb(246,93,59)";
      color = "rgb(249,234,222)"
      break;
    case 128:
      bgcolor = "rgb(237,206,113)";
      color = "rgb(249,234,222)"
      break;
    case 256:
      bgcolor = "rgb(237,204,97)";
      color = "rgb(249,234,222)"
      break;
    case 512:
      color = "rgb(249,234,222)"
      bgcolor = "rgb(236,200,80)";
      break;
    case 1024:
      color = "rgb(249,234,222)"
      bgcolor = "rgb(237,197,63)";
      break;
    case 2048:
      color = "rgb(249,234,222)"
      bgcolor = "rgb(238,205,95)";
      break;
    default:
      bgcolor = "black";
      color = "white";
      break;
  }

  const style = {
    color: color,
    backgroundColor: bgcolor,
  }

  return (
    <div className={"tileItem"} style={style}>
      {content !== 0 && content}
    </div>
  )
}

export default Game;