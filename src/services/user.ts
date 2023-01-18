import { getToken } from '../utils/localStorage';
import api from "./api";

type LoginData = {
  userName: string;
  password: string;
};

export const login = (data: LoginData) => api.post("/login", data);
export const me = () => api.get("/user/me", { headers: { "Authorization": `${getToken()}` } });

export const checkLogin = async () => {
  if (!getToken()) throw Error('Token not found');

  const { data } = await me();
  if (!data) throw Error('Data not found');
}