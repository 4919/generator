const fs = require("fs");
const stringify = require("csv-stringify/lib/sync");

(async () => {
  const data = [
    {
      id: 1,
      name: "hoge",
      age: 17
    },
    {
      id: 2,
      name: "fuga",
      age: 21
    },
    {
      id: 3,
      name: "piyo",
      age: 13
    }
  ];

  const csvData = stringify(data, { header: true });
  fs.writeFileSync("./sample.csv", csvData);
})();
