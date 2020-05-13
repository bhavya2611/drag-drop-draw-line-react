import React from "react";
import LineTo from "react-lineto";

export default class MainScreen extends React.Component {
  state = {
    list: [
      {
        name: "Hello",
        status: "left",
      },
      {
        name: "Hi",
        status: "left",
      },
      {
        name: "Yeah",
        status: "right",
      },
    ],
    lineFrom: "",
    lineTo: "",
  };

  handleClick = (e, name) => {
    if (this.state.lineFrom === "") {
      this.setState({ lineFrom: name });
    } else if (this.state.lineTo === "") {
      this.setState({ lineTo: name });
    }
    e.stopPropagation();
  };

  removeLine = (e) => {
    this.setState({
      lineFrom: "",
      lineTo: "",
    });
  };

  handleDragStart = (e, name) => {
    console.log(e);
    e.dataTransfer.setData("id", name);
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleOnDrop = (e, status) => {
    let id = e.dataTransfer.getData("id");
    let list = this.state.list.filter((elem) => {
      if (elem.name === id) {
        elem.status = status;
      }
      return elem;
    });

    this.setState({
      list: list,
    });
  };

  render() {
    let objs = {
      right: [],
      left: [],
    };

    this.state.list.forEach((elem) => {
      objs[elem.status].push(
        <div
          onClick={(e) => this.handleClick(e, elem.name)}
          onDragStart={(e) => this.handleDragStart(e, elem.name)}
          key={elem.name}
          draggable
          className={`draggable elem ${elem.name}`}
        >
          {elem.name}
        </div>
      );
    });
    return (
      <div style={{ display: "flex" }}>
        <div
          onClick={(e) => this.removeLine(e)}
          onDragOver={(e) => {
            this.handleDragOver(e);
          }}
          onDrop={(e) => {
            this.handleOnDrop(e, "left");
          }}
          className="left-container elem"
          style={{ display: "flex", flex: 1 }}
        >
          {objs.left}
        </div>
        <div
          onClick={(e) => this.removeLine(e)}
          className="elem right-container"
          onDragOver={(e) => {
            this.handleDragOver(e);
          }}
          onDrop={(e) => {
            this.handleOnDrop(e, "right");
          }}
          style={{ display: "flex", flex: 8 }}
        >
          {objs.right}
        </div>
        {this.state.lineFrom !== "" && this.state.lineTo !== "" ? (
          <LineTo from={this.state.lineFrom} to={this.state.lineTo} />
        ) : null}
      </div>
    );
  }
}
