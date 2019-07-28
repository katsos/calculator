import React from 'react';
import ButtonPanel from './components/ButtonPanel';
import './App.css';

function App() {
  function onClick(e) {
    console.log(e);
  }

  return (
    <div className='App'>
      <ButtonPanel onClick={onClick}/>
    </div>
  );
}

export default App;
