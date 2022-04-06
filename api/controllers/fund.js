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

      const owner = await accounts.getAccount(client, ids.ownerId);

      let memberArray = [];

      for (let rep = 0; rep < memberIds.length; rep++) {
        const member = await accounts.getAccount(client, memberIds[rep]);

        memberArray.push(member.username);
      }

      if (ids) {
        res
          .set("location", "/api/funds/ + " + ids.fundId)
          .enforcer.status(201)
          .send({
            fundId: ids.fundId,
            title: title,
            description: description,
            owner: owner.username,
            memberNames: memberArray,
            capital: capital,
          });
      } else {
        res.enforcer.status(400).send();
      }
    },

    async getFunds(req, res) {
      const client = await pool.connect();
      const allFunds = await funds.getFunds(client);

      for (let rep = 0; rep < allFunds.length; rep++) {
        const owner = await accounts.getAccount(client, allFunds[rep].owner_id);

        allFunds[rep].owner = owner.username;
        delete allFunds[rep].owner_id;

        allFunds[rep].memberNames = [];

        const members = allFunds[rep].members;

        for (let i = 0; i < members.length; i++) {
          const account = await accounts.getAccount(client, members[i]);

          allFunds[rep].memberNames.push(account.username);
        }

        delete allFunds[rep].members;

        const capital = await funds.getCapital(
          client,
          allFunds[rep].capital_id
        );

        allFunds[rep].capital = {
          ETH: capital.eth,
          SOL: capital.sol,
          AVAX: capital.avax,
          XRP: capital.xrp,
        };

        delete allFunds[rep].capital_id;

        allFunds[rep].fundId = allFunds[rep].fund_id;
        delete allFunds[rep].fund_id;
      }

      if (allFunds) {
        res.enforcer.status(200).send(allFunds);
      } else {
        res.enforcer.status(400);
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
