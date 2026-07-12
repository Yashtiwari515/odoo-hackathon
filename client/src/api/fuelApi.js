import api from "./axios";

export const getFuelLogs = () => api.get("/fuel");
export const getFuelLogById = (id) => api.get(`/fuel/${id}`);
export const createFuelLog = (data) => api.post("/fuel", data);
export const updateFuelLog = (id, data) => api.put(`/fuel/${id}`, data);
export const deleteFuelLog = (id) => api.delete(`/fuel/${id}`);