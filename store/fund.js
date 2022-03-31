import { Passport } from "passport/lib";

export const state = function () {
  return {
    fund: {},
    list: [],
  };
};

export const mutations = {
  setFund(state, fund) {
    state.fund = fund;
  },

  add(state, fund) {
    state.list.push({
      fund,
      done: false,
    });
  },

  remove(state, { fund }) {
    state.list.splice(state.list.indexOf(fund), 1);
  },
};

export const actions = {
  async getFund({ commit, state }, fundId) {
    console.log("inside getFund");
    const res = await this.$axios.get(`api/funds/${fundId}`);

    const owner = (await this.$axios.get(`api/accounts/${res.data.ownerId}`))
      .data.username;

    const fund = {
      FundId: res.data.FundId,
      title: res.data.title,
      description: res.data.description,
      ownerName: owner,
      memberIds: res.data.memberIds,
      capital: {
        ETH: res.data.capital.eth,
        SOL: res.data.capital.sol,
        AVAX: res.data.capital.avax,
        XRP: res.data.capital.xrp,
      },
    };

    if (res.status === 200) {
      commit("setFund", fund);
      commit("setList", fund);
    }
  },

  async getList({ commit, state }) {
    const fundList = [];

    const res = await this.$axios.get(`api/funds/`);
  },
};
