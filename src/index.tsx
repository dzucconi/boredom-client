import React from "react";
import ReactDOM from "react-dom";
import smoothscroll from "smoothscroll-polyfill";
import parameters from "queryparams";
import { ambient } from "audiate";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

const { autoPlay }: { autoPlay: boolean } = parameters({ autoPlay: false });

if (autoPlay) ambient();

smoothscroll.polyfill();
ReactDOM.render(<App autoPlay={autoPlay} />, document.getElementById("root"));

serviceWorker.unregister();
