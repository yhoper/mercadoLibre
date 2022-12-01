exports.listAll = async (req, res) => {
  try {
    res.send(req.params);
  } catch (error) {
    console.log(error);
    res.status(400).send("Search failed");
  }
};
