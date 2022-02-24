const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;

exports.createAccount = async function (client, username, password, isManager) {
  const accountId = Number(
    uuid().toString().replace(/-/g, "").replace(/\D/g, "").substring(0, 7)
  );

  const salt = await bcrypt.genSalt(10);

  const { rowCount } = await client.query({
    name: "create-account",
    text: "INSERT INTO accounts (account_id, username, password, is_manager) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
    values: [accountId, username, await bcrypt.hash(password, salt), isManager],
  });

  return rowCount > 0 ? accountId : undefined;
};

exports.getAccount = async function (client, accountId) {
  const { rows } = await client.query({
    name: "get-acount-by-id",
    text: "SELECT * FROM accounts WHERE account_id=$1",
    values: [accountId],
  });

  return rows[0];
};

exports.updateAccount = async function (client, accountId, data) {
  const { username, password, isManager } = data;

  const values = [];
  const sets = [];

  if (username !== undefined) {
    values.push(username);
    sets.push("username=$" + values.length);
  }

  if (password !== undefined) {
    const salt = await bcrypt.genSalt(10);

    values.push(await bcrypt.hash(password, salt));
    sets.push("password=$" + values.length);
  }

  if (isManager !== undefined) {
    values.push(isManager);
    sets.push("is_manager=$" + values.length);
  }

  if (values.length === 0) {
    return await exports.getAccount(client, accountId);
  }

  values.push(accountId);

  const { rows } = await client.query({
    name: "update-account",
    text:
      "UPDATE accounts SET  " +
      sets.join(", ") +
      " WHERE account_id=$" +
      values.length +
      " RETURNING *",
    values,
  });

  return rows[0];
};

exports.deleteAccount = async function (client, accountId) {
  const { rowCount } = client.query({
    name: "delete-account",
    text: "DELETE FROM accounts WHERE account_id=$1",
    values: [accountId],
  });

  return rowCount > 0;
};

exports.getFund = async function (client, fundId) {
  const { rows } = await client.query({
    name: "get-fund-by-id",
    text: "SELECT * FROM funds WHERE fund_id=$1",
    values: [fundId],
  });

  return rows[0];
};
