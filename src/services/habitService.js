import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getHabits = async (token) =>
  axios.get(`${API}/habits`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getHabitById = async (id, token) =>
  axios.get(`${API}/habits/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addHabit = async (name, token) =>
  axios.post(
    `${API}/habits`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const checkInHabit = async (id, token) =>
  axios.put(
    `${API}/habits/${id}/checkin`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const updateHabit = async (id, data, token) =>
  axios.put(`${API}/habits/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteHabit = async (id, token) =>
  axios.delete(`${API}/habits/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
