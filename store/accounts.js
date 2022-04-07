export const state = function () {
  return {
    user: getUserFromCookie(),
    isManager: false,
    accountList: [],
  };
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setManagerStatus(state, isManager) {
    state.isManager = isManager;
  },

  addAccount(state, account) {
    let accountInList = false;

    state.accountList.forEach((user) => {
      if (user.account_id === account.account_id) {
        accountInList = true;
      }
    });

    if (!accountInList) {
      state.accountList.push(account);
    }
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

    console.log(res);

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
      commit("setUser", getUserFromCookie());
    }
  },

  async updateUser({ commit, state }, { username }) {
    const res = await this.$axios.patch(`api/accounts/${state.user}`, {
      username,
    });

    if (res.status === 200) {
      commit("setUser", res.data.username);
    }
  },

  async deleteUser({ commit, state }) {
    const res = await this.$axios.delete(`api/accounts/${state.user}`);

    if (res.status === 200) {
      commit("setUser", null);
    }
  },

  async listInit({ commit, state }) {
    console.log("inside listInit");

    const res = await this.$axios.get("api/accounts");

    res.data.forEach(async (account) => {
      if (res.status === 200) {
        commit("addAccount", account);
      }
    });
  },
};

function getUserFromCookie() {
  const re = new RegExp(/user=([^;]+)/);
  const value = re.exec(document.cookie);

  return value != null ? unescape(value[1]) : null;
}
