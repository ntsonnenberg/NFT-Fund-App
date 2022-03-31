const accounts = require("../database/account");
const funds = require("../database/fund");

module.exports = function (pool) {
  return {
    async createAccount(req, res) {
      const { username, password, isManager } = req.enforcer.body;

      const accountId = await accounts.createAccount(
        pool,
        username,
        password,
        isManager
      );

      if (accountId) {
        res
          .set("location", "/api/accounts/ + " + accountId)
          .enforcer.status(201)
          .send();
      } else {
        res.enforcer.status(409).send();
      }
    },

    async updateAccount(req, res) {
      const data = req.enforcer.body;
      const { username } = req.enforcer.params;

      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        let account = await accounts.getAccountByUsername(client, username);

        if (account === undefined) {
          res.enforcer.status(404).send();
        } else if (account.account_id !== req.user.id) {
          res.enforcer.status(403).send();
        } else {
          let updatedAccount = await accounts.updateAccount(
            client,
            req.user.id,
            data
          );

          res.enforcer.status(200).send({
            accountId: updatedAccount.account_id,
            username: updatedAccount.username,
            isManager: updatedAccount.is_manager,
          });
        }

        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");

        throw e;
      } finally {
        client.release();
      }
    },

    async deleteAccount(req, res) {
      const { username } = req.enforcer.params;

      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        let account = await accounts.getAccountByUsername(client, username);

        const { rows } = await client.query({
          name: "find-fund-of-account",
          text: "SELECT fund_id FROM funds WHERE owner_id=$1",
          values: [account.account_id],
        });

        if (account === undefined) {
          res.enforcer.status(204).send();
        } else if (account.account_id !== req.user.id || rows === []) {
          res.enforcer.status(403).send();
        } else {
          await accounts.deleteAccount(client, account.account_id);

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

    async getAccounts(req, res) {
      const client = await pool.connect();
      const accountIdArray = await accounts.getAccounts(client);
      const accountIds = [];

      accountIdArray.forEach((account) => {
        accountIds.push(account.account_id);
      });

      console.log(accountIds);

      if (accountIds) {
        res.enforcer.status(200).send(accountIds);
      } else {
        res.enforcer.status(400);
      }
    },

    async getAccount(req, res) {
      const { accountId } = req.enforcer.params;
      const client = await pool.connect();

      let account = await accounts.getAccount(client, accountId);

      if (account) {
        res.enforcer.status(200).send({
          accountId: account.account_id,
          username: account.username,
          isManager: account.is_manager,
        });
      } else {
        res.enforcer.status(400).send();
      }
    },
  };
};
