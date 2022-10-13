// Setup

module.exports = async ({ requester }, res) => {
  return res.json({
    id: Date.now(),
    requester: requester.owner,
  });
};
