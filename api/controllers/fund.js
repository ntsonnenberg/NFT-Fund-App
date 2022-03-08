const funds = require("../database/fund");

module.exports = function (pool) {
  return {
    async addFund(req, res) {
      const { title, description, ownerId, memberIds, capital } =
        req.enforcer.body;

      const client = await pool.connect();

      const ids = await funds.createFund(
        client,
        title,
        description,
        ownerId,
        memberIds,
        capital
      );

      if (ids) {
        res
          .set("location", "/api/funds/ + " + ids.fundId)
          .enforcer.status(201)
          .send({
            FundId: ids.fundId,
            title: title,
            description: description,
            ownerId: ownerId,
            memberIds: memberIds,
            capital: capital,
          });
      } else {
        res.enforcer.status(400).send();
      }
    },

    async getFund(req, res) {
      const fundId = req.enforcer.params.fundId;
      const client = await pool.connect();

      const fundCapital = await funds.getFund(client, fundId);

      if (fundCapital) {
        res
          .set("location", "/api/funds/ + " + fundCapital[0].fundId)
          .enforcer.status(200)
          .send({
            FundId: fundCapital[0].fund_id,
            title: fundCapital[0].title,
            description: fundCapital[0].description,
            ownerId: fundCapital[0].owner_id,
            memberIds: fundCapital[0].members,
            capital: fundCapital[1],
          });
      } else {
        res.enforcer.status(400).send();
      }
    },

    async updateFund(req, res) {},

    async deleteFund(req, res) {},

    async addMember(req, res) {},

    async removeMember(req, res) {},
  };
};
