const uuid = require("uuid").v4;

exports.createFund = async function (
  client,
  title,
  description,
  ownerId,
  memberIds,
  capital
) {
  const fundId = Number(
    uuid().toString().replace(/-/g, "").replace(/\D/g, "").substring(0, 7)
  );

  const capitalId = Number(
    uuid().toString().replace(/-/g, "").replace(/\D/g, "").substring(0, 7)
  );

  try {
    await client.query("BEGIN");

    const { rowCount: rowCapitalCount } = await client.query({
      name: "create-capital",
      text: "INSERT INTO capitals (capital_id, eth, sol, avax, xrp) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING",
      values: [capitalId, capital.ETH, capital.SOL, capital.AVAX, capital.XRP],
    });

    const { rowCount: rowFundCount } = await client.query({
      name: "create-fund",
      text: "INSERT INTO funds (fund_id, title, description, owner_id, capital_id, members) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING",
      values: [fundId, title, description, ownerId, capitalId, memberIds],
    });

    await client.query("COMMIT");

    return rowCapitalCount > 0 && rowFundCount > 0
      ? { fundId: fundId, capitalId: capitalId }
      : undefined;
  } catch (e) {
    console.log("Error:", e.message);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

exports.getFund = async function (client, fundId) {
  const { rows: fundRow } = await client.query({
    name: "get-fund-by-id",
    text: "SELECT * FROM funds WHERE fund_id=$1",
    values: [fundId],
  });

  const { rows: capitalRow } = await client.query({
    name: "get-capital-by-id",
    text: "SELECT * FROM capitals WHERE capital_id=$1",
    values: [fundRow[0].capital_id],
  });

  return [fundRow[0], capitalRow[0]];
};

exports.updateFund = async function (client, fund, newData) {
  const { title, description, ownerId, memberIds, capital } = newData;
  let values = [];
  let sets = [];

  if (capital.ETH !== undefined) {
    values.push(capital.ETH);
    sets.push("eth=$" + values.length);
  }

  if (capital.SOL !== undefined) {
    values.push(capital.SOL);
    sets.push("sol=$" + values.length);
  }

  if (capital.AVAX !== undefined) {
    values.push(capital.AVAX);
    sets.push("avax=$" + values.length);
  }

  if (capital.XRP !== undefined) {
    values.push(capital.XRP);
    sets.push("xrp=$" + values.length);
  }

  values.push(fund.capital_id);

  const { rows: capitalRows } = await client.query({
    name: "update-capital",
    text:
      "UPDATE capitals SET " +
      sets.join(", ") +
      " WHERE capital_id=$" +
      values.length +
      " RETURNING *",
    values,
  });

  values = [];
  sets = [];

  if (title !== undefined) {
    values.push(title);
    sets.push("title=$" + values.length);
  }

  if (description !== undefined) {
    values.push(description);
    sets.push("description=$" + values.length);
  }

  if (ownerId !== undefined) {
    values.push(ownerId);
    sets.push("owner_id=$" + values.length);
  }

  if (fund.capital_id !== undefined) {
    values.push(fund.capital_id);
    sets.push("capital_id=$" + values.length);
  }

  if (memberIds !== undefined) {
    values.push(memberIds);
    sets.push("members=$" + values.length);
  }

  values.push(fund.fund_id);

  const { rows: fundRows } = await client.query({
    name: "update-fund",
    text:
      "UPDATE funds SET " +
      sets.join(", ") +
      " WHERE fund_id=$" +
      values.length +
      " RETURNING *",
    values,
  });

  return [fundRows, capitalRows];
};

exports.deleteFund = async function (client, fund) {
  const { rowCount: rowFundCount } = await client.query({
    name: "delete-fund",
    text: "DELETE FROM funds WHERE fund_id=$1",
    values: [fund.fund_id],
  });

  const { rowCount: rowCapitalCount } = await client.query({
    name: "delete-capital",
    text: "DELETE FROM capitals WHERE capital_id=$1",
    values: [fund.capital_id],
  });

  return rowFundCount > 0 && rowCapitalCount > 0;
};

exports.addMember = async function (client, account, fund) {
  const { rowCount } = await client.query({
    name: "add-member",
    text: "UPDATE funds SET members = members || array[$1]::integer[] WHERE fund_id=$2",
    values: [account.account_id, fund.fund_id],
  });

  return rowCount > 0;
};

exports.removeMember = async function (client, account, fund) {
  const { rowCount } = await client.query({
    name: "remove-member",
    text: "UPDATE funds SET members = array_remove(members, $1) WHERE fund_id=$2",
    values: [account.account_id, fund.fund_id],
  });

  return rowCount > 0;
};
