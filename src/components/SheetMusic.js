import React, { Component } from "react";

import { abcReformatter } from "../helpers/abcHelper";
// eslint-disable-next-line import/no-webpack-loader-syntax
//import abcjs from "exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_latest-min.js";
import abcjs from "abcjs";
// import abcjsMidi from "abcjs/midi";
import he from "he";
import reactDimensions from "react-dimensions";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: "20px auto",
    borderBottom: "1px solid #ccc",
    "&:last-child": {
      border: "none",
      marginBottom: 0,
      paddingBottom: 0
    }
  }
});

class SheetMusic extends Component {
  renderAbc(width) {
    const engraverParams = {
      paddingright: 0,
      paddingleft: 0,
      responsive: "resize"
    };
    const parserParams = {};
    const renderParams = {};
    abcjs.renderAbc(
      this.el,
      abcReformatter(this.props.tune, this.props.type, this.title()),
      parserParams,
      engraverParams,
      renderParams
    );
  }

  // renderMidi() {
  //   abcjsMidi.renderMidi(
  //     this.midi,
  //     abcReformatter(this.props.tune, this.props.type, this.title()),
  //     {},
  //     {
  //       inlineControls: {
  //         selectionToggle: false,
  //         loopToggle: false,
  //         standard: true,
  //         tempo: false,
  //         startPlaying: false
  //       }
  //     },
  //     {}
  //   );
  // }

  title() {
    return this.props.tune.name
      ? `${he.decode(this.props.tune.name)} (${this.props.tune.key} - ${
          this.props.tune.type
        })`
      : `${this.props.tune.key} - ${this.props.type}`;
  }

  componentWillReceiveProps(nextProps) {
    const newWidth = nextProps.containerWidth;
    if (this.props.containerWidth !== newWidth) {
      this.renderAbc(this.props.containerWidth);
      // this.renderMidi(this.props.containerWidth);
    }
  }

  componentDidMount() {
    this.renderAbc(this.props.containerWidth);
    // this.renderMidi(this.props.containerWidth);
  }

  // <div ref={el => (this.midi = el)} />
  render() {
    return (
      <div className={this.props.classes.root}>
        <div ref={el => (this.el = el)} />
      </div>
    );
  }
}

export default withStyles(styles)(reactDimensions()(SheetMusic));
