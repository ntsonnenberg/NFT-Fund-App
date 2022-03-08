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
