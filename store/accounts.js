export const state = function () {
  return {
    user: getUserFromCookie(),
    accountList: [],
  };
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setAccountList(state, accountArray) {
    state.accountList = accountArray;
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

  async updateUser({ commit, state }, { username }) {
    const res = await this.$axios.patch(`api/accounts/${state.user}`, {
      username,
    });

    if (res.status === 200) {
      commit("setUser", res.data.username);
    }
  },

  async listInit({ commit, state }) {
    const accountList = [];
    const accountIds = (await this.$axios.get(`api/accounts`)).data;

    accountIds.forEach(async (id) => {
      const account = await this.$axios.get(`api/accounts/${id}`);

      console.log(account.data);

      accountList.push(account.data);
    });

    commit("setAccountList", accountList);
  },
};

function getUserFromCookie() {
  const re = new RegExp(/user=([^;]+)/);
  const value = re.exec(document.cookie);

  return value != null ? unescape(value[1]) : null;
}
