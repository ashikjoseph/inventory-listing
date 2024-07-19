import React, { useState } from 'react';
import './App.css';
import AddInventory from './components/AddInventory';
import ListInventory from './components/ListInventory';

function App() {
  const [uploadInventoryStatus, setUploadInventoryStatus] = useState({})
  return (
    <div className='app-container'>
      <header className='app-header'>
        <h1>Inventory Management</h1>
      </header>
      <main>
        <AddInventory setUploadInventoryStatus={setUploadInventoryStatus}/>
        <ListInventory uploadInventoryStatus={uploadInventoryStatus} />
      </main>
    </div>
  );
}

export default App;
