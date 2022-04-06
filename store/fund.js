export const state = function () {
  return {
    fund: {},
    fundList: [],
  };
};

export const mutations = {
  setFund(state, fund) {
    state.fund = fund;
  },

  addFund(state, fund) {
    let fundInList = false;

    state.fundList.forEach((nftFund) => {
      if (nftFund.fundId === fund.fundId) {
        fundInList = true;
      }
    });

    if (!fundInList) {
      state.fundList.push(fund);
    }
  },
};

export const actions = {
  async fundListInit({ commit, state }) {
    console.log("inside fundListInit");

    const res = await this.$axios.get("api/funds");

    console.log(res);

    if (res.status === 200) {
      res.data.forEach((fund) => {
        commit("addFund", fund);
      });
    }
  },

  async createFund(
    { commit, state },
    { title, description, eth, avax, sol, xrp, ownerId }
  ) {
    console.log("inside createFund");

    const res = await this.$axios.post("api/funds", {
      title: title,
      description: description,
      ownerId: ownerId,
      memberIds: [ownerId],
      capital: {
        ETH: eth,
        SOL: sol,
        AVAX: avax,
        XRP: xrp,
      },
    });

    if (res.status === 201) {
      commit("addFund", res.data);
    }
  },

  async getOwner({ commit, state }, user) {
    const ownerId = 0;
    const accounts = (await this.$axios.get("api/accounts")).data;

    for (let rep = 0; rep < accounts.length; rep++) {
      if (accounts[rep].username === user) {
        return accounts[rep].account_id;
      }
    }
  },
};
