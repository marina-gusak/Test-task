import React from "react";
import "./styles.css";

const arrayColor = [
  "#FF5722",
  "#C51162",
  "#AA00FF",
  "#304FFE",
  "#45Fa12",
  "#AA00FF",
  "#794c74",
  "#FFFF00",
  "#FF5722",
  "#C51162",
  "#AA00FF",
  "#304FFE",
  "#45Fa12",
  "#AA00FF",
  "#794c74",
  "#FFFF00"
];

let arrayItems = [];
let arrayIndex = [];
// shuffle array of colors for layout
function shuffle(arrayColor) {
  let m = arrayColor.length,
    currentElement,
    remainingElement;
  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element
    remainingElement = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    currentElement = arrayColor[m];
    arrayColor[m] = arrayColor[remainingElement];
    arrayColor[remainingElement] = currentElement;
  }
  return arrayColor;
}
//one square on the board
function Square(props) {
  return (
    <div
      className="flex-item"
      style={{ backgroundColor: props.colors, visibility: props.visibility }}
      onClick={props.onClick}
    ></div>
  );
}

//board of items
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      cover: Array(16).fill("#6b696d"),
      isPlaying: true,
      visibility: Array(16).fill("visible")
    };
  }

  componentDidMount() {
    window.addEventListener("load", shuffle(arrayColor));
    this.setState({ colors: arrayColor });
  }

  componentWillUnmount() {
    window.removeEventListener("load", shuffle(arrayColor));
  }

  handleClick(i) {
    const colors = this.state.colors.slice();
    const visible = this.state.visibility.slice();
    const cover = this.state.cover.slice();

    if (arrayItems.length < 2 && this.state.isPlaying) {
      arrayIndex.push(i);
      arrayItems.push(colors[i]);
      let j = arrayIndex[0];
      let k = arrayIndex[1];
      cover[j] = colors[j];
      cover[k] = colors[k];

      if (arrayIndex[0] === arrayIndex[1]) {
        cover[j] = "#6b696d";
      }

      if (arrayItems[0] === arrayItems[1] && arrayIndex[0] !== arrayIndex[1]) {
        let j = arrayIndex[0];
        let k = arrayIndex[1];
        this.setState({ isPlaying: false });
        setTimeout(() => {
          visible[j] = "hidden";
          visible[k] = "hidden";
          this.setState({ isPlaying: true });
        }, 300);
      }

      if (arrayItems.length === 2 && arrayItems[0] !== arrayItems[1]) {
        this.setState({ isPlaying: false });
        setTimeout(() => {
          cover[j] = "#6b696d";
          cover[k] = "#6b696d";
          this.setState({ isPlaying: true });
        }, 300);
        this.setState({ colorMatched: false });
      }
    }

    if (arrayItems.length === 2) {
      arrayItems = [];
      arrayIndex = [];
      setTimeout(() => {
        this.setState({ isPlaying: true });
      }, 600);
    }
    this.setState({ cover: cover });
    this.setState({ visibility: visible });
    this.setState({ colors: colors });
  }

  renderSquare(i) {
    return (
      <Square
        visibility={this.state.visibility[i]}
        colors={this.state.cover[i]}
        onClick={
          this.state.visibility[i] === "visible"
            ? () => this.handleClick(i)
            : null
        }
      />
    );
  }

  handleReset() {
    shuffle(arrayColor);
    arrayItems = [];
    arrayIndex = [];
    this.setState({
      colors: arrayColor,
      cover: Array(16).fill("#6b696d"),
      isClicked: false,
      visibility: Array(16).fill("visible"),
      isPlaying: true
    });
  }

  render() {
    return (
      <>
        <div className="header">
          <h1>Find the same color</h1>
          <button
            type="button"
            className="reset"
            onClick={() => this.handleReset()}
          >
            Reset
          </button>
        </div>
        <div className="flex-container">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div>
          <p className="rule">
            A match happens if the <b>two tiles</b> turned color-side-up are
            identical
          </p>
          <p className="footer">Created by Marina G.</p>
        </div>
      </>
    );
  }
}

export default App;
