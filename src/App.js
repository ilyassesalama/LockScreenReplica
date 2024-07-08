import "./App.css";
import React, { useEffect, useState } from "react";
import useNoSleep from "./useNoSleep";
import LockScreen from "./pages/LockScreen/LockScreen";

const App = () => {
  return (
    <div className="App">
      <LockScreen />
    </div>
  );
};

export default App;
