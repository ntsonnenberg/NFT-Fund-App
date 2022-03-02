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

  const { rowCountFunds } = await client.query({
    name: "create-fund",
    text: "INSERT INTO funds (fund_id, title, description, owner_id, capital_id, members) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING;",
    values: [fundId, title, description, ownerId, capitalId, memberIds],
  });

  return rowCount > 0 ? fundId : undefined;
};
