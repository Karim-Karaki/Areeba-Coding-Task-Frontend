import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:4000",
});


//get all item 
export const getAllItems = async () => {
    const response = await api.get("/items");
    return response.data;
};
export const getAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};
export const addCategory = async (category) => {
    const response = await api.post("/categories", category);
    return response.data;
};


export const addNewItem = async (item) => {
    const response = await api.post("/items", item);
    return response.data;
  };

export const deleteItem = async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
};

export const updateItem = async (id, item) => {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
};




export default api;
