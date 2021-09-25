const table = "book";
const getTableData = (req, res, db) => {
  db.select("*")
    .from(table)
    .modify(function (queryBuilder) {
      if (Object.keys(req.query).length > 0) {
        const keys = Object.keys(req.query);
        const k = keys[0];
        console.log(`DB query by: |${k}|`);
        //regex for contains operator, e.g. 'description contains girl'
        const reText = /(?<left>\w+\s+)(?<operator>contains\s+)(?<right>.*)/;
        const resultText = reText.exec(k);
        if (resultText) {
          left = resultText.groups.left;
          operator = "ilike";
          right = `%${resultText.groups.right.trim()}%`;
          queryBuilder.where(left, operator, right);
        } else {
          //<--- default when query param is used with '=', e.g. 'price=0'
          const val = req.query[k];
          queryBuilder.where(k, val.trim());
        }
      }
    })
    .then((items) => {
      if (items.length) {
        console.log(`found ${items.length} items`);
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: `${err}` }));
};

const queryById = (req, res, db) => {
  id = req.params.id;
  db.select("*")
    .from(table)
    .where({ id: id })
    .then((items) => {
      if (items.length === 1) {
        res.json(items[0]);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: err }));
};

const putTableData = (req, res, db) => {
  id = req.params.id;
  const { title, author, isbn } = req.body;
  db(table)
    .where({ id })
    .update({ title, author, isbn })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: err }));
};

const deleteTableData = (req, res, db) => {
  id = req.params.id;
  db(table)
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch((err) => res.status(400).json({ dbError: err }));
};

const postTableData = (req, res, db) => {
  const { title, author, isbn } = req.body;
  db(table)
    .insert({ title, author, isbn })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: err }));
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  queryById,
};
