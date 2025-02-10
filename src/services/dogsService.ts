import { Dog } from "../models/Dog";
import API from "./axiosCofing";

export const getDogsImage = async (): Promise<Dog[]> => {
  const response = await API.get("images/search?limit=10");
  return response.data;
};

export const getDogById = async (id: string): Promise<Dog> => {
  const response = await API.get(`images/${id}`);
  return response.data;
};
