import React from "react";
import ReactDOM from "react-dom";
import smoothscroll from "smoothscroll-polyfill";
import { ambient } from "audiate";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { autoPlay } from "./config";

import "./index.css";

if (autoPlay) ambient();

smoothscroll.polyfill();

ReactDOM.render(<App autoPlay={autoPlay} />, document.getElementById("root"));

serviceWorker.unregister();
