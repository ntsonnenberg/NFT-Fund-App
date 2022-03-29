export const state = function () {
  return {
    list: [],
  };
};

export const mutations = {
  setFund(state, fund) {
    console.log(fund);

    state.list.push({
      fund,
      done: false,
    });
  },
};

export const actions = {
  async getFund({ commit, state }, fundId) {
    const res = await this.$axios.get(`api/funds/${fundId}`);

    console.log(res.data);

    if (res.statsus === 200) {
      commit("setFund", res.data);
    }
  },
};
