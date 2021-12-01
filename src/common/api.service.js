import { inject } from "vue";

const ApiService = {
  setup() {
    const axios = inject("axios"); // inject axios
  },
  query(resource, params) {
    return axios.get(resource, params).catch((error) => {
      throw new Error(`[Appetiserdev] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return axios.get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[Appetiserdev] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return axios.put(`${resource}`, params);
  },

  delete(resource) {
    return axios.delete(resource).catch((error) => {
      throw new Error(`[Appetiserdev] ApiService ${error}`);
    });
  }
};

export default ApiService;
