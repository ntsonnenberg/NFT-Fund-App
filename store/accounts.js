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
};

function getUserFromCookie() {
  const re = new RegExp(/user=([^;]+)/);
  const value = re.exec(document.cookie);

  return value != null ? unescape(value[1]) : null;
}
