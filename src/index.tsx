import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const root = createRoot(document.querySelector("#app") as HTMLDivElement);
root.render(<App />);
