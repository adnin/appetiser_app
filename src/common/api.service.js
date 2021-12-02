import axios from "axios";
import { API_URL } from "@/common/config";
import JwtService from "@/common/jwt.service";
import { LOGOUT } from "../store/actions.type";

export const HTTP = axios.create({
  baseURL: API_URL
});

HTTP.interceptors.request.use(
  (config) => {
    const token = JwtService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HTTP.interceptors.response.use(undefined, function (error) {
  if (error) {
    const httpError = JSON.parse(JSON.stringify(error));
    if (httpError.status === 401) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
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
