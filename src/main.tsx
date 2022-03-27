import React from "react";
import ReactDOM from "react-dom";
import "virtual:windi.css";
import { Home } from "./pages/Home";
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';

ReactDOM.render(
  <ConfigProvider locale={enUS}>
  <Home />
  </ConfigProvider>
  ,
  document.getElementById("root"),
);
