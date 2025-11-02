// src/Services/LostFoundService.js
import instance from "./axiosConfig";

const BASE_URL = "/lost-found";

export const getAllLostItems = () => instance.get(`${BASE_URL}/lost-items`);

export const getLostItemsByUser = () =>
  instance.get(`${BASE_URL}/lost-items/user`);

export const getLostItemById = (id) =>
  instance.get(`${BASE_URL}/lost-items/${id}`);

export const lostItemSubmission = (lostItem) =>
  instance.post(`${BASE_URL}/lost-items`, lostItem);

export const deleteLostItemById = (id) =>
  instance.delete(`${BASE_URL}/lost-items/${id}`);

export const getAllFoundItems = () => instance.get(`${BASE_URL}/found-items`);

export const getFoundItemsByUser = () =>
  instance.get(`${BASE_URL}/found-items/user`);

export const getFoundItemById = (id) =>
  instance.get(`${BASE_URL}/found-items/${id}`);

export const foundItemSubmission = (foundItem) =>
  instance.post(`${BASE_URL}/found-items`, foundItem);

export const deleteFoundItemById = (id) =>
  instance.delete(`${BASE_URL}/found-items/${id}`);

export const findAllItems = () => instance.get(`${BASE_URL}/lost-items/count`);

export const getTotalFoundItem = () =>
  instance.get(`${BASE_URL}/found-items/count`);
