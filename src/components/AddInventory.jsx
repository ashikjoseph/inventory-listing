import React, { useState } from 'react';
import { uploadInventory } from '../services/allAPI';
import './addinventory.css'; 

function Addinventory({setUploadInventoryStatus}) {
    const [inventoryValue, setInventoryValue] = useState({
        inventoryTitle: "",
        inventoryPrice: "",
        inventoryDescription: "",
        inventoryCategory: "",
        inventoryImage: "",
        inventoryRating: "",
        inventoryRatingcount: ""
    });

    const handleAdd = async () => {
        const { inventoryTitle, inventoryPrice, inventoryDescription, inventoryCategory, inventoryImage, inventoryRating, inventoryRatingcount } = inventoryValue;
        if (!inventoryTitle || !inventoryPrice || !inventoryDescription || !inventoryCategory || !inventoryImage ||!inventoryRating || !inventoryRatingcount) {
            alert("Please fill the form completely");
        } else {
            const response = await uploadInventory(inventoryValue);
            alert("Successfully inserted the inventory item");
            setUploadInventoryStatus(response.data)
            setInventoryValue({
                inventoryTitle: "",
                inventoryPrice: "",
                inventoryDescription: "",
                inventoryCategory: "",
                inventoryImage: "",
                inventoryRating: "",
                inventoryRatingcount: ""
            });
        }
    };

    return (
        <div className='container'>
            <h3 className='title'>INVENTORY LISTING</h3>
            <div className='form-group'>
                <input type="text" className='form-control'
                    value={inventoryValue.inventoryTitle}
                    onChange={(e) => setInventoryValue({ ...inventoryValue, inventoryTitle: e.target.value })}
                    placeholder='Title'/>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control'
                    value={inventoryValue.inventoryPrice}
                    onChange={(e) => setInventoryValue({ ...inventoryValue, inventoryPrice: e.target.value })}
                    placeholder='Price'/>
            </div>
            <div className='form-group'>
                <textarea rows="3"
                    className='form-control'
                    value={inventoryValue.inventoryDescription}
                    onChange={(e) => setInventoryValue({ ...inventoryValue, inventoryDescription: e.target.value })}
                    placeholder='Description'>
                </textarea>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control'
                    value={inventoryValue.inventoryCategory}
                    onChange={(e) => setInventoryValue({ ...inventoryValue, inventoryCategory: e.target.value })}
                    placeholder='Category'/>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control'
                    value={inventoryValue.inventoryImage}
                    onChange={(e) => setInventoryValue({ ...inventoryValue, inventoryImage: e.target.value })}
                    placeholder='Image URL'/>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control'
                    value={inventoryValue.inventoryRating}
                    onChange={(e) => setInventoryValue({ ...inventoryValue, inventoryRating: e.target.value })}
                    placeholder='Rating'/>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control'
                    value={inventoryValue.inventoryRatingcount}
                    onChange={(e) => setInventoryValue({ ...inventoryValue, inventoryRatingcount: e.target.value })}
                    placeholder='Rating Count'/>
            </div>
            <button className='btn btn-primary' onClick={handleAdd}>ADD INVENTORY ITEM</button>
        </div>
    );
}

export default Addinventory;
