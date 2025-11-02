// src/Services/SearchService.js
import instance from "./axiosConfig";

const SEARCH_BASE = "/lost-found/api/search";

export const searchLostItems = (query) =>
  instance.get(`${SEARCH_BASE}/lost`, { params: { q: query } });

export const searchFoundItems = (query) =>
  instance.get(`${SEARCH_BASE}/found`, { params: { q: query } });
