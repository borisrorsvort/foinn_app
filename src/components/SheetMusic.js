import React, { Component } from "react";

import { abcReformatter } from "../helpers/abcHelper";
// eslint-disable-next-line import/no-webpack-loader-syntax
//import abcjs from "exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_latest-min.js";
import abcjs from "abcjs";
import abcjsMidi from "abcjs/midi";
import he from "he";
import reactDimensions from "react-dimensions";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    marginBottom: 100,
    marginTop: 50
  }
});

class SheetMusic extends Component {
  renderAbc() {
    const engraverParams = {
      paddingright: 0,
      paddingleft: 0,
      responsive: "resize",
      add_classes: true
    };

    abcjs.renderAbc(
      this.el,
      abcReformatter(this.props.tune, this.props.type, this.title()),
      {},
      engraverParams
    );
  }

  renderMidi() {
    abcjsMidi.renderMidi(
      this.midi,
      abcReformatter(this.props.tune, this.props.type, this.title()),
      {},
      {
        inlineControls: {
          selectionToggle: false,
          loopToggle: false,
          standard: true,
          tempo: false,
          startPlaying: false
        }
      },
      {}
    );
  }

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
      this.renderMidi(this.props.containerWidth);
    }
  }

  componentDidMount() {
    this.renderAbc(this.props.containerWidth);
    this.renderMidi(this.props.containerWidth);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div ref={el => (this.el = el)} />
        <div ref={el => (this.midi = el)} />
      </div>
    );
  }
}

export default withStyles(styles)(reactDimensions()(SheetMusic));
