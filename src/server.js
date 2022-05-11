var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;
const ip = require("ip").address();
const bodyParser = require("body-parser");
const JsonDB = require("./utils/jsonDB");
const Item = require("./structres/item");
const cors = require("cors");
// const JsonDB = require('./jsonDB');
// const db = new JsonDB({ path: "jsonData.json" });

// console.log(db.clear());
console.log(ip);
app.use("/", express.static(__dirname + "/public"));

// console.log(new Item().setId(1).setName('Item 1').setStock(getRandomInt(0, 100)));

const db = new JsonDB({
  path: "src/jsonData.json",
  type: "cache",
  format: true
});
// db.clear();
app.listen(port, "0.0.0.0");

console.log();

app.use(bodyParser.json());
app.use(cors({}));
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// app.route('/').get(function (req, res) {
//   res.sendFile(__dirname + '/public/');
// });

// app.get('/style.css', function (req, res) {
//   res.sendFile(__dirname + "/public/style.css");
// });

app
  .route("/shopping-list")
  .get(function (req, res) {})
  .post(function (req, res) {
    data.push();
  });

app
  .route("/items")
  .get(function (req, res) {
    console.log(db.data);
    res.json(db.data);
  })
  .post(function (req, res) {
    console.log(req.body);
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ error: "No data" });
    const action = req.body.action;
    delete req.body.action;
    if (action === "add" || action === 1) {
      console.log(req.body);
      db.add(req.body);
    } else if (action === "remove" || action === 2) {
      console.log(req.body);
      db.remove(req.body.id);
    } else if (action === "update" || action === 3) {
      db.update({ ...req.body });
    }
    res.json(db.data);
  });

// app.route("/items/add").post(function (req, res) {
//   if (Object.keys(req.body).length == 0) return res.status(400).json({ error: "No data" });
//   db.data.push(new Item().setId(db.data.length + 1).setName(req.body.name).setStock(req.body.stock).setStockSize(req.body.stockSize || 0));
//   res.json(db.data);
// });

// app.route("/items/remove").post(function (req, res) {
//   if (Object.keys(req.body).length == 0) return res.status(400).json({ error: "No data" });
//   db.data.splice(db.data.indexOf(req.body.id), 1);
//   res.json(db.data);
// });

// app.route("/items/change").put(function (req, res) {
//   if (Object.keys(req.body).length == 0) return res.status(400).json({ error: "No data" });
//   console.log(db.data);
//   db.update(req.body.id, { id: req.body.id, name: req.body.name, stock: req.body.stock, stockSize: req.body.stockSize });
//   console.log(db.data);
//   res.json(db.data);
// });

app
  .route("/items:id")
  .put(function (req, res) {
    console.log(req.json(), res);
  })
  .get(function (req, res) {
    var items = [];
    for (var i = 0; i < 10; i++) {
      items.push({
        price: getRandomInt(1, 100),
        name: "item" + i
      });
    }
    res.json(items);
    console.log(req.params.id);
  });

app.route("/api").get((req, res) => {
  res.json({
    firstName: "John",
    number: getRandomInt(1, 100),
    array: new Array(10).fill(0).map(() => getRandomInt(1, 100)),
    user: {
      name: "John",
      age: getRandomInt(1, 100),
      address: {
        street: "Street",
        city: "City",
        zip: getRandomInt(1, 100)
      }
    }
  });
});

console.log("RESTful API server started: http://" + ip + ":" + port);
