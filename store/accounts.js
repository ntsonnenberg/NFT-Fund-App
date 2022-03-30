export const state = function () {
  return {
    user: getUserFromCookie(),
  };
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  async login({ commit, state }, { username, password }) {
    const res = await this.$axios.put("api/authentication/login", {
      username,
      password,
    });

    if (res.status === 200) {
      commit("setUser", getUserFromCookie());
    }
  },

  async logout({ commit }) {
    const res = await this.$axios.put("api/authentication/logout");

    if (res.status === 200) {
      commit("setUser", null);
    }
  },

  async signup({ commit, state }, { username, password, isManager }) {
    const res = await this.$axios.post("api/accounts", {
      username,
      password,
      isManager,
    });

    if (res.status === 201) {
      commit("setUser", null);
    }
  },

  async updateUser({ commit, state }, { username, password, isManager }) {
    const res = await this.$axios.put(`api/accounts/${state.user}`, {
      username,
      password,
      isManager,
    });

    if (res.status === 200) {
      commit("setUser", res.data.username);
    }
  },
};

function getUserFromCookie() {
  const re = new RegExp(/user=([^;]+)/);
  const value = re.exec(document.cookie);

  return value != null ? unescape(value[1]) : null;
}
