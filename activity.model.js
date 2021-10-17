const sql = require("./db_connection.js");

// constructor
const Activity = function(activity) {
  this.name = activity.name;
  this.description = activity.description;
  this.supply_tag = activity.supply_tag;
};
/**
Activity.getByTime = (time, supply result) => {
  sql.query(`SELECT * FROM activities WHERE time <= ${time}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};**/

Activity.getBySupply = (supply, result) => {
    let = '';
    if (supply==='false'){
        q = `SELECT * FROM activities WHERE supply_tag = "-"`
    }
    else
        q = `SELECT * FROM activities WHERE supply_tag != "-"`
    sql.query(q, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found activities: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Activity.getAll = result => {
  sql.query(`select * from activities`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("activities: ", res);
    result(null, res);
  });
};

Activity.getTagsById = (id,result) => {
  sql.query(`select t.tag_name from activities a join activities_tags at2 on a.Activity_id = at2.Activity_id 
    join tags t on t.tag_id = at2.Tag_id WHERE a.activity_id=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("activities: ", res);
    result(null, res);
  });
};


module.exports = Activity;