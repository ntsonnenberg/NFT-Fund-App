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

    let fundArray = [];
    const fundIds = (await this.$axios.get("api/funds")).data;

    fundIds.forEach(async (id) => {
      const res = await this.$axios.get(`api/funds/${id}`);
      const owner = (await this.$axios.get(`api/accounts/${res.data.ownerId}`))
        .data.username;

      const fund = {
        fundId: res.data.FundId,
        title: res.data.title,
        description: res.data.description,
        ownerName: owner,
        memberIds: res.data.memberIds,
        captial: res.data.capital,
      };

      if (res.status === 200) {
        commit("addFund", fund);
      }
    });
  },

  async createFund(
    { commit, state },
    { title, description, eth, avax, sol, xrp, owner }
  ) {
    console.log("inside createFund");

    const accountIds = (await this.$axios.get("api/accounts")).data;

    accountIds.forEach(async (id) => {
      const account = (await this.$axios.get(`api/accounts/${id}`)).data;

      if (account.username === owner) {
        const fund = {
          title: title,
          description: description,
          ownerId: account.accountId,
          memberIds: [],
          capital: {
            ETH: eth,
            SOL: sol,
            AVAX: avax,
            XRP: xrp,
          },
        };

        const res = await this.$axios.post("api/funds", fund);

        console.log(res);

        if (res.status === 201) {
          commit("setFund", res.data);
          commit("addFund", res.data);
        }
      }
    });
  },
};
