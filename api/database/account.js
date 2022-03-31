const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;

exports.createAccount = async function (client, username, password, isManager) {
  const accountId = Number(
    uuid().toString().replace(/-/g, "").replace(/\D/g, "").substring(0, 7)
  );

  const { rowCount } = await client.query({
    name: "create-account",
    text: "INSERT INTO accounts (account_id, username, password, is_manager) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
    values: [accountId, username, await encryptPassword(password), isManager],
  });

  return rowCount > 0 ? accountId : undefined;
};

exports.getAccounts = async function (client) {
  const { rows } = await client.query({
    name: "get-all-account-ids",
    text: "SELECT account_id FROM accounts",
  });

  return rows;
};

exports.getAccount = async function (client, accountId) {
  const { rows } = await client.query({
    name: "get-acount-by-id",
    text: "SELECT * FROM accounts WHERE account_id=$1",
    values: [accountId],
  });

  return rows[0];
};

exports.getAccountByUsername = async function (client, username) {
  const { rows } = await client.query({
    name: "get-account-by-username",
    text: "SELECT * FROM accounts WHERE username=$1",
    values: [username],
  });

  return rows[0];
};

exports.updateAccount = async function (client, accountId, data) {
  const { username } = data;

  const { rows } = await client.query({
    name: "update-account",
    text: "UPDATE accounts SET username = $1 WHERE account_id=$2 RETURNING *",
    values: [username, accountId],
  });

  return rows[0];
};

exports.deleteAccount = async function (client, accountId) {
  const { rowCount } = await client.query({
    name: "delete-account",
    text: "DELETE FROM accounts WHERE account_id=$1",
    values: [accountId],
  });

  return rowCount > 0;
};

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
}
