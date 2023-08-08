const passData = (req, res) => {
  res.json({
    testData: 'works handler'
  });
};

module.exports = passData;