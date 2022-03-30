export const state = function () {
  return {
    fund: {},
  };
};

export const mutations = {
  setFund(state, fund) {
    console.log(fund);

    state.fund = fund;
  },
};

export const actions = {
  async getFund({ commit, state }, fundId) {
    console.log("inside getFund");
    const res = await this.$axios.get(`api/funds/${fundId}`);

    const owner = getOwner(res.data.ownerId);

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
    }
  },
};

export async function getOwner(accountId) {
  const res = await this.$axios.get(`api/accounts/${accountId}`);

  return res.data.username;
}
