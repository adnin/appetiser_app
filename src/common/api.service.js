import axios from "axios";
import { API_URL } from "@/common/config";
import JwtService from "@/common/jwt.service";

export const HTTP = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${JwtService.getToken()}`
  }
});

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/login");
    }
  }
});

const ApiService = {
  async query(resource, params) {
    try {
      return HTTP.get(resource, params);
    } catch (error) {
      throw new Error(`[Appetiserdev] ApiService ${error}`);
    }
  },

  async get(resource, slug = "") {
    try {
      return HTTP.get(`${resource}/${slug}`);
    } catch (error) {
      throw new Error(`[Appetiserdev] ApiService ${error}`);
    }
  },

  post(resource, params) {
    return HTTP.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return HTTP.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return HTTP.put(`${resource}`, params);
  },

  async delete(resource) {
    try {
      return HTTP.delete(resource);
    } catch (error) {
      throw new Error(`[Appetiserdev] ApiService ${error}`);
    }
  }
};

export default ApiService;
