import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH, VERIFY } from "./actions.type";
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_TO_VERIFY
} from "./mutations.type";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  toVerify: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  toVerify(state) {
    return state.toVerify;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve) => {
      ApiService.post("/auth/login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          if (!response) {
            return context.commit(SET_ERROR, null);
          }
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [VERIFY](context, value) {
    context.commit(SET_TO_VERIFY, value);
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/register", credentials)
        .then(({ data }) => {
          // context.commit(SET_AUTH, data);
          return resolve(data);
        })
        .catch(({ response }) => {
          if (!response) {
            return context.commit(SET_ERROR, null);
          }
          context.commit(SET_ERROR, response.data.errors);
          return reject(response);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("/users")
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
        })
        .catch(({ response }) => {
          if (!response) {
            return context.commit(SET_ERROR, null);
          }
          context.commit(SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_TO_VERIFY](state, value) {
    state.toVerify = value;
  },
  [SET_AUTH](state, response) {
    state.isAuthenticated = true;
    state.user = response.data;
    state.errors = {};
    JwtService.saveToken(response.data.access_token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
