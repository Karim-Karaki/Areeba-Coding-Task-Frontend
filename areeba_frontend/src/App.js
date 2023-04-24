import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllItems, addNewItem } from './api';
import Item from './Item_Component';

function App() {
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState(null);


  const Item_form = () => {
    setShowPopup(true);
  };
  const showMessage = (text, duration = 3000) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  // Replace these functions with actual API calls
  const addItem = async (item) => {
    try {
      const newItem = await addNewItem(item);
      // Update the items state by appending the newItem
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const item = {
      name: name,
      description: description,
      phone_number: phoneNumber
    };
    
    try {
      const newItem = await addNewItem(item);
      if (newItem.message) {
        return alert(newItem.message);
      }
      setItems((prevItems) => [...prevItems, newItem]);
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding item:', error);
      showMessage('Error adding item');
    }
  };


  const fetchItems = async () => {
    // Fetch items logic
    const response = await getAllItems();
    return setItems(response);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1>Areeba Item API</h1>
      <h2>PLease remeber to refresh after deleting or updating</h2>
      <button className='button' onClick={Item_form}>Add item</button>
      <div className="items-container">
        {items.map((item) => (
          <Item
            key={item._id}
            item={item}
            onDelete={() => showMessage('Item Deleted Please Refresh')}
            onUpdate={() => showMessage('Item Updated Please Refresh')}
          />
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />
            <button type="submit">Add Item</button>
            <button type="button" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
