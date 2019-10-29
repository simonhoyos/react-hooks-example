import React from 'react';
import { Navigation } from './components/Navigation';
import { Images } from './components/Images';
import { PaginationProvider } from './store';
import './App.css';

function App() {
  return (
    <PaginationProvider>
      <div className="App">
        <Navigation />
        <Images />
        <Navigation />
      </div>
    </PaginationProvider>
  );
}

export default App;
