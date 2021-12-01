import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  VERIFY,
  SET_TOKEN
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const state = {
  errors: null,
  user: {},
  hasToken: !!JwtService.getToken(),
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  hasToken(state) {
    return state.isAuthenticated;
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
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [VERIFY](context, verification) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/verification/verify", verification)
        .then(({ data }) => {
          context.commit(SET_ERROR, null);
          return resolve(data);
        })
        .catch(({ response }) => {
          if (!response) {
            return context.commit(SET_ERROR, null);
          }
          if (!response.data.errors) {
            context.commit(SET_ERROR, response.data.message);
            return reject(response);
          }
          context.commit(SET_ERROR, response.data.errors);
          return reject(response);
        });
    });
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/register", credentials)
        .then(({ data }) => {
          context.commit(SET_TOKEN, data);
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
  [SET_AUTH](state, response) {
    state.isAuthenticated = true;
    state.user = response.data;
    state.errors = {};
    JwtService.saveToken(response.data.access_token);
  },
  [SET_TOKEN](state, response) {
    state.errors = {};
    state.isAuthenticated = false;
    state.hasToken = true;
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
