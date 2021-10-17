module.exports = app => {
  const activities = require("./activity.controller.js");

  // Retrieve all Activities
  app.get("/activities", activities.findAll);

  // Retrieve activities with supply
  app.get("/activities/:supply", activities.findBySupply);

};