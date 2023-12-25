import { mpn } from "@prisma/client";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const mpnAPI = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const getMPN = async () => {
  const { data } = await mpnAPI.get<any>("/mpn");
  return data;
};
export default getMPN;
