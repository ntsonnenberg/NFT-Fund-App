const funds = require("../database/fund");

module.exports = function (pool) {
  return {
    async addFund(req, res) {
      const { title, description, ownerId, memberIds, capital } =
        req.enforcer.body;

      const ids = await funds.createFund(
        pool,
        title,
        description,
        ownerId,
        memberIds,
        capital
      );

      if (ids !== undefined) {
        res
          .send("location", "/api/funds/ + " + ids.fundId)
          .enforcer.status(201)
          .send({
            FundId: ids.fundId,
            title: title,
            description: description,
            ownerId: ownerId,
            memberIds: memberIds,
            captial: captial,
          });
      } else {
        res.enforcer.status(400).send();
      }
    },

    async getFund(req, res) {},

    async updateFund(req, res) {},

    async deleteFund(req, res) {},

    async addMember(req, res) {},

    async removeMember(req, res) {},
  };
};
