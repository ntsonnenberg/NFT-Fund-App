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
    state.list.forEach((item) => {
      if (item.fund.fundId === fund.fundId) {
        return;
      }
    });

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
      fundId: res.data.FundId,
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
      commit("add", fund);
    }
  },

  async modifyList({ commit, state }) {
    const res = await this.$axios.get(`api/funds`);
    const fundIds = res.data;

    fundIds.forEach(async (id) => {
      const fund = await this.$axios.get(`api/funds/${id}`);
      const owner = (await this.$axios.get(`api/accounts/${fund.data.ownerId}`))
        .data.username;

      const fundToAdd = {
        FundId: fund.data.FundId,
        title: fund.data.title,
        description: fund.data.description,
        ownerName: owner,
        memberIds: fund.data.memberIds,
        capital: {
          ETH: fund.data.capital.eth,
          SOL: fund.data.capital.sol,
          AVAX: fund.data.capital.avax,
          XRP: fund.data.capital.xrp,
        },
      };

      if (res.status === 200) {
        commit("add", fundToAdd);
      }
    });
  },
};
