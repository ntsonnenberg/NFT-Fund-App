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

  addAccount(state, account) {
    let accountInList = false;

    state.accountList.forEach((user) => {
      if (user.accountId === account.accountId) {
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
    console.log("inside listInit");

    let accountArray = [];
    const accountIds = (await this.$axios.get(`api/accounts`)).data;

    accountIds.forEach(async (id) => {
      const res = await this.$axios.get(`api/accounts/${id}`);

      const account = {
        accountId: res.data.accountId,
        username: res.data.username,
        isManager: res.data.isManager,
      };

      console.log(account);

      commit("addAccount", account);
    });
  },
};

function getUserFromCookie() {
  const re = new RegExp(/user=([^;]+)/);
  const value = re.exec(document.cookie);

  return value != null ? unescape(value[1]) : null;
}
