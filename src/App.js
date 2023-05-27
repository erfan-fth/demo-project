import 'devextreme/dist/css/dx.light.css';
import { useState } from "react";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;