const accounts = require("../database/account");
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

      const [fund, capital] = await funds.getFund(client, fundId);

      console.log(capital);

      if (fund && capital) {
        res
          .set("location", "/api/funds/ + " + fund.fundId)
          .enforcer.status(200)
          .send({
            FundId: fund.fund_id,
            title: fund.title,
            description: fund.description,
            ownerId: fund.owner_id,
            memberIds: fund.members,
            capital: {
              ETH: capital.eth,
              SOL: capital.sol,
              AVAX: capital.avax,
              XRP: capital.xrp,
            },
          });
      } else {
        res.enforcer.status(400).send();
      }
    },

    async updateFund(req, res) {
      const newData = req.enforcer.body;
      const { fundId } = req.enforcer.params;

      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        let [fund, capital] = await funds.getFund(client, fundId);

        if (fund == undefined || capital === undefined) {
          res.enforcer.status(404).send();
        }

        if (fund.fund_id !== fundId) {
          res.enforcer.status(403).send();
        } else {
          await funds.updateFund(client, fund, newData);

          res.enforcer.status(200).send();
        }

        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");

        throw e;
      } finally {
        client.release();
      }
    },

    async deleteFund(req, res) {
      const { fundId } = req.enforcer.params;

      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        let [fund, capital] = await funds.getFund(client, fundId);

        if (fund === undefined || capital == undefined) {
          res.enforcwer.status(204).send();
        } else if (fund.fund_id !== fundId) {
          res.enforcer.status(403).send();
        } else {
          await funds.deleteFund(client, fund);

          res.enforcer.status(200).send();
        }

        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");

        throw e;
      } finally {
        client.release();
      }
    },

    async addMember(req, res) {
      const { fundId, username } = req.enforcer.params;

      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        let account = await accounts.getAccountByUsername(client, username);
        let [fund, capital] = await funds.getFund(client, fundId);

        if (
          account === undefined ||
          fund === undefined ||
          capital === undefined
        ) {
          res.enforcer.status(404).send();
        } else if (
          account.account_id !== req.user.id ||
          fund.fund_id !== fundId
        ) {
          res.enforcer.status(403).send();
        } else {
          await funds.addMember(client, account, fund);

          res.enforcer.status(200).send();
        }

        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");

        throw e;
      } finally {
        client.release();
      }
    },

    async removeMember(req, res) {
      const { fundId, username } = req.enforcer.params;

      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        let account = await accounts.getAccountByUsername(client, username);
        let [fund, capital] = await funds.getFund(client, fundId);

        if (
          account === undefined ||
          fund === undefined ||
          capital === undefined
        ) {
          res.enforcer.status(404).send();
        } else if (
          account.account_id !== req.user.id ||
          fund.fund_id !== fundId
        ) {
          res.enforcer.status(403).send();
        } else {
          await funds.removeMember(client, account, fund);

          res.enforcer.status(200).send();
        }

        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");

        throw e;
      } finally {
        client.release();
      }
    },
  };
};
