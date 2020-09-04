import React, { Component } from "react";
import { StorageContext } from "../context/StorageContext";
import styled from "@emotion/styled";

export class Sidebar extends Component {
  static contextType = StorageContext;

  constructor(props, context) {
    super(props, context);

    this.initResize = this.initResize.bind(this);
    this.Resize = this.Resize.bind(this);
    this.stopResize = this.stopResize.bind(this);
  }

  componentDidMount() {
    const savedWidth = this.context.storage.getItem(
      `apollo-client:${this.props.name}`
    );
    // if (savedWidth) this.sidebar.style.width = `${savedWidth}px`;
  }

  initResize(e) {
    window.addEventListener("mousemove", this.Resize, false);
    window.addEventListener("mouseup", this.stopResize, false);
  }

  Resize(e) {
    const rect = e.target.getBoundingClientRect();
    console.log("rect X: ", rect.x);
    console.log("clientX", e.clientX);
    console.log("offsetLeft: ", this.sidebar.offsetLeft);
    // console.log("offsetParent: ", this.sidebar.offsetParent.offsetLeft);
    // console.log("offsetParent: ", this.sidebar.offsetParent.offsetWidth);
    // console.log("offsetWidth: ", this.sidebar.offsetWidth);
    // console.log(e.pageX - e.clientX - this.sidebar.offsetLeft);
    const width = e.clientX - this.sidebar.offsetLeft - rect.x;
    console.log("width: ", width);
    this.context.storage.setItem(`apollo-client:${this.props.name}`, width);
    this.sidebar.style.width = `${width}px`;
    window.getSelection().removeAllRanges();
  }

  stopResize(e) {
    window.removeEventListener("mousemove", this.Resize, false);
    window.removeEventListener("mouseup", this.stopResize, false);
  }

  render() {
    const { children } = this.props;
    return (
      <SidebarDiv
        ref={(sidebar) => {
          this.sidebar = sidebar;
        }}
      >
        <Dragger onMouseDown={this.initResize} />
        {children}
      </SidebarDiv>
    );
  }
}

const SidebarDiv = styled.div({
  backgroundImage:
    "linear-gradient(\n    179deg,\n    #2c2f39 2%,\n    #363944 14%,\n    #32353d 100%\n  )",
  color: '"#fff"',
  flex: "none",
  textAlign: "center",
  width: "55px",
  position: "relative",
  overflowX: "hidden",
});

const Dragger = styled.div({
  position: "absolute",
  height: "100%",
  width: "4px",
  right: "0",
  cursor: "ew-resize",
  backgroundColor: "transparent",
});
