async function getAccount(userId) {
  return await Users.findOne({ id: userId });
}
