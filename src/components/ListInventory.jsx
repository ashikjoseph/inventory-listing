import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {
  deleteInventory, getAllInventory, getInventoryDetailsById, updateInventoryById,
  getFakeStoreProducts, deleteFakeStoreProduct, updateFakeStoreProduct
} from '../services/allAPI';
import './listinventory.css';

function Listinventory({ uploadInventoryStatus }) {
  const [eachInventoryValue, setEachInventoryValue] = useState({
    inventoryTitle: "",
    inventoryPrice: "",
    inventoryDescription: "",
    inventoryCategory: "",
    inventoryImage: "",
    inventoryRating: "",
    inventoryRatingcount: ""
  });

  const [show, setShow] = useState(false);
  const [showFake, setShowFake] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFakeClose = () => setShowFake(false);
  const handleFakeShow = () => setShowFake(true);

  const [allInventory, setAllInventory] = useState([]);
  const [fakeStoreProducts, setFakeStoreProducts] = useState([]);
  const [selectedFakeProduct, setSelectedFakeProduct] = useState(null);

  const getAllInventoryItem = async () => {
    const response = await getAllInventory();
    const { data } = response;
    setAllInventory(data);
  };

  const getAllFakeStoreProducts = async () => {
    const response = await getFakeStoreProducts();
    const { data } = response;
    setFakeStoreProducts(data);
  };

  useEffect(() => {
    getAllInventoryItem();
    getAllFakeStoreProducts();
  }, [uploadInventoryStatus]);

  const removeInventory = async (id) => {
    await deleteInventory(id);
    alert("Successfully deleted the inventory item");
    getAllInventoryItem();
  };

  const removeFakeProduct = async (id) => {
    await deleteFakeStoreProduct(id);
    setFakeStoreProducts(fakeStoreProducts.filter(product => product.id !== id));
    alert("Successfully deleted the Fake Store product");
  };

  const getInventoryDetails = async (id) => {
    handleShow();
    const res = await getInventoryDetailsById(id);
    const { data } = res;
    setEachInventoryValue(data);
  };

  const getFakeProductDetails = (product) => {
    handleFakeShow();
    setSelectedFakeProduct(product);
  };

  const updateInventory = async () => {
    handleClose();
    await updateInventoryById(eachInventoryValue.id, eachInventoryValue);
    alert("Inventory updated successfully");
    getAllInventoryItem();
  };

  const updateFakeProduct = async () => {
    handleFakeClose();
    const updatedProduct = await updateFakeStoreProduct(selectedFakeProduct.id, selectedFakeProduct);
    setFakeStoreProducts(fakeStoreProducts.map(product =>
      product.id === selectedFakeProduct.id ? updatedProduct.data : product
    ));
    alert("Fake Store product updated successfully");
  };

  return (
    <>
      <div className='mt-5 inventory-list'>
        <table className='table table-bordered'>
          <thead className='thead-dark'>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Rating</th>
              <th>Rating Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allInventory.length > 0 ? (
              allInventory.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.inventoryTitle}</td>
                  <td>{item.inventoryPrice}</td>
                  <td>{item.inventoryDescription}</td>
                  <td>{item.inventoryCategory}</td>
                  <td><img src={item.inventoryImage} alt={item.inventoryTitle} className='inventory-image' /></td>
                  <td>{item.inventoryRating}</td>
                  <td>{item.inventoryRatingcount}</td>
                  <td className='table-actions'>
                    <Button variant="info" className="btn-sm" style={{ height: "50px" }} onClick={() => getInventoryDetails(item.id)}>
                      <i className="fa-solid fa-pen-to-square" style={{ fontSize: "18px" }}></i>
                    </Button>
                    <Button className='btn-sm' variant="danger" onClick={() => removeInventory(item.id)}>
                      <i className="fa-solid fa-trash" style={{ fontSize: "18px" }}></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No inventory items available</td>
              </tr>
            )}
            {fakeStoreProducts.length > 0 && fakeStoreProducts.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td><img src={item.image} alt={item.title} className='inventory-image' /></td>
                <td>{item.rating.rate}</td>
                <td>{item.rating.count}</td>
                <td className='table-actions'>
                  <Button variant="info" className="btn-sm" style={{ height: "50px" }} onClick={() => getFakeProductDetails(item)}>
                    <i className="fa-solid fa-pen-to-square" style={{ fontSize: "18px" }}></i>
                  </Button>
                  <Button className='btn-sm' variant="danger" onClick={() => removeFakeProduct(item.id)}>
                    <i className="fa-solid fa-trash" style={{ fontSize: "18px" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='Title'
              value={eachInventoryValue.inventoryTitle}
              onChange={(e) => setEachInventoryValue({ ...eachInventoryValue, inventoryTitle: e.target.value })}
            />
          </div>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='Price'
              value={eachInventoryValue.inventoryPrice}
              onChange={(e) => setEachInventoryValue({ ...eachInventoryValue, inventoryPrice: e.target.value })} />
          </div>
          <div className='mt-3'>
            <textarea rows="3" className='form-control' placeholder='Description'
              value={eachInventoryValue.inventoryDescription}
              onChange={(e) => setEachInventoryValue({ ...eachInventoryValue, inventoryDescription: e.target.value })}>
            </textarea>
          </div>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='Category'
              value={eachInventoryValue.inventoryCategory}
              onChange={(e) => setEachInventoryValue({ ...eachInventoryValue, inventoryCategory: e.target.value })} />
          </div>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='Image URL'
              value={eachInventoryValue.inventoryImage}
              onChange={(e) => setEachInventoryValue({ ...eachInventoryValue, inventoryImage: e.target.value })} />
          </div>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='Rating'
              value={eachInventoryValue.inventoryRating}
              onChange={(e) => setEachInventoryValue({ ...eachInventoryValue, inventoryRating: e.target.value })} />
          </div>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='Rating Count'
              value={eachInventoryValue.inventoryRatingcount}
              onChange={(e) => setEachInventoryValue({ ...eachInventoryValue, inventoryRatingcount: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateInventory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFake} onHide={handleFakeClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fake Store Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFakeProduct && (
            <>
              <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Title'
                  value={selectedFakeProduct.title}
                  onChange={(e) => setSelectedFakeProduct({ ...selectedFakeProduct, title: e.target.value })}
                />
              </div>
              <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Price'
                  value={selectedFakeProduct.price}
                  onChange={(e) => setSelectedFakeProduct({ ...selectedFakeProduct, price: e.target.value })} />
              </div>
              <div className='mt-3'>
                <textarea rows="3" className='form-control' placeholder='Description'
                  value={selectedFakeProduct.description}
                  onChange={(e) => setSelectedFakeProduct({ ...selectedFakeProduct, description: e.target.value })}>
                </textarea>
              </div>
              <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Category'
                  value={selectedFakeProduct.category}
                  onChange={(e) => setSelectedFakeProduct({ ...selectedFakeProduct, category: e.target.value })} />
              </div>
              <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Image URL'
                  value={selectedFakeProduct.image}
                  onChange={(e) => setSelectedFakeProduct({ ...selectedFakeProduct, image: e.target.value })} />
              </div>
              <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Rating'
                  value={selectedFakeProduct.rating.rate}
                  onChange={(e) => setSelectedFakeProduct({ ...selectedFakeProduct, rating: { ...selectedFakeProduct.rating, rate: e.target.value } })} />
              </div>
              <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Rating Count'
                  value={selectedFakeProduct.rating.count}
                  onChange={(e) => setSelectedFakeProduct({ ...selectedFakeProduct, rating: { ...selectedFakeProduct.rating, count: e.target.value } })} />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFakeClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateFakeProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Listinventory;
