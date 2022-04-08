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

  removeFund(state, fundId) {
    for (let rep = 0; rep < state.fundList.length; rep++) {
      if (state.fundList[rep].fundId === fundId) {
        state.fundList.splice(rep, 1);
      }
    }
  },

  addMemberToFund(state, { fundId, username }) {
    let memberInFund = false;

    state.fundList.forEach((fund) => {
      if (fund.fundId === fundId) {
        fund.memberNames.forEach((member) => {
          if (member === username) {
            memberInFund = true;
          }
        });

        if (!memberInFund) {
          fund.memberNames.push(username);
        }
      }
    });
  },

  removeMemberFromFund(state, { fundId, username }) {
    state.fundList.forEach((fund) => {
      if (fund.fundId === fundId) {
        for (let rep = 0; rep < fund.memberNames.length; rep++) {
          if (fund.memberNames[rep] === username) {
            fund.memberNames.splice(rep, 1);
          }
        }
      }
    });
  },
};

export const actions = {
  async fundListInit({ commit, state }) {
    const res = await this.$axios.get("api/funds");

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

  async deleteFund({ commit, state }, fundId) {
    const res = await this.$axios.delete(`api/funds/${fundId}`);

    if (res.status === 200) {
      commit("removeFund", fundId);
    }
  },

  async addMember({ commit, state }, { fundId, username }) {
    const res = await this.$axios.put(
      `api/funds/${fundId}/accounts/${username}/invite`
    );

    if (res.status === 200) {
      commit("addMemberToFund", { fundId, username });
    }
  },

  async removeMember({ commit, state }, { fundId, username }) {
    console.log("inside removeMember action", fundId, username);

    const res = await this.$axios.put(
      `api/funds/${fundId}/accounts/${username}`
    );

    if (res.status === 200) {
      commit("removeMemberFromFund", { fundId, username });
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
