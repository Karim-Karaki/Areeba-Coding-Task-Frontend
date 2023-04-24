import React, { useState } from 'react';
import './App.css';
import { deleteItem,updateItem } from './api';

const Item = ({ item, onDelete, onUpdate }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleUpdate = async (updatedItem) => {
    onUpdate(updatedItem);
    const item = {
        name: updatedItem.name,
        description: updatedItem.description,
        phone_number: updatedItem.phone_number
    };
    console.log(item);
    console.log(updatedItem.id);
    const update = await updateItem(updatedItem.id, item);
    setShowPopup(false);
  };

  const handleDelete = async (id) => {
    const response = await deleteItem(id);

};

  return (
    <div className="item-box">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>{item.phone_number}</p>
      <div className='button-wrapper'>
        <button className='update-button' onClick={() => setShowPopup(true)}>Update</button>
        <button className='delete-button' onClick={() => handleDelete(item._id)}>Delete</button>
      </div>
      {showPopup && (
        <div className="popup">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdate({
              id: item._id,
              name: e.target.name.value,
              description: e.target.description.value,
              phone_number: e.target.phone_number.value,
            });
          }}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" defaultValue={item.name} />
            <br />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" defaultValue={item.description} />
            <br />
            <label htmlFor="phone_number">Phone Number:</label>
            <input type="text" id="phone_number" name="phone_number" defaultValue={item.phone_number} />
            <br />
            <button type="submit">Update Item</button>
            <button type="button" onClick={() => setShowPopup(false)}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Item;
