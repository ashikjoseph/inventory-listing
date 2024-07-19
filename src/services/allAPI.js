import axios from "axios";
import instance from '../instance';
import { commonAPI } from "./commonAPI"


const serverURL = 'https://inventoryserver-ll7l.onrender.com'


// 1) upload inventory item

export const uploadInventory = async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/inventorylist`,reqBody)
}

// 2) get all inventory items

export const getAllInventory = async()=>{
    return await commonAPI('GET',`${serverURL}/inventorylist`,"")
}

// 3) delete inventory item

export const deleteInventory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/inventorylist/${id}`,{})
}

// 4) to get details of a specific task by its id

export const getInventoryDetailsById = async(id)=>{
    return await commonAPI('GET',`${serverURL}/inventorylist/${id}`,"")
}

// 5)update inventory item

export const updateInventoryById = async(id, body)=>{
    return await commonAPI('PUT',`${serverURL}/inventorylist/${id}`, body)
}


// 6) Fetch products from Fake Store API
export const getFakeStoreProducts = async() => {
    try {
        const response = await instance.get('/products');
        return response;
    } catch (error) {
        console.error("Error fetching products from Fake Store API", error);
    }
}

// Simulate delete and update functions(mock implementations)

// 7)delete fakestoreapi product
export const deleteFakeStoreProduct = async (id) => {
    // Mock deletion by returning a successful response
    // return { status: 200, data: response.data, message: 'Product successfully updated' };
    return { success: true, id };
  };
  

  
//   updata fakestoreapi product
  export const updateFakeStoreProduct = async (id, body) => {
    // Mock update by returning a successful response with the updated data
    //  return { status: 200, data: response.data, message: 'Product successfully updated' };
    return { success: true, data: { ...body, id } };
  };
  