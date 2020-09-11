import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import { PactStore } from "./contexts/PactContext";

function App() {
  return (
    <PactStore>
      <Home />
    </PactStore>
  );
}

export default App;
