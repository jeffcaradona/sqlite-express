let controller = {};

controller.createUser = (req, res, next) => {
    let errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    let data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    let sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    let params =[data.name, data.email, data.password]
    req.app.locals.dbApp.db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
};

controller.getUser = (req, res, next) => {
    const sql = "select * from user where id = ?"
    const params = [req.params.id]
    req.app.locals.dbApp.db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        });
      });
}


controller.getUsers = (req, res, next) => {
    const sql = "select * from user";
    const params = [];
    try {
      
      req.app.locals.dbApp.db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: rows,
        });
      });
    } catch (error) {
      next(error);
    }
  }

export default controller;
