const fs = require("fs");
const faker = require("faker");
const dayjs = require("dayjs");
faker.locale = "ja";
const stringify = require("csv-stringify/lib/sync");
const csvSync = require('csv-parse/lib/sync');

//行数調整
const school_count = 10 //学校数
const day_count = 10 // 日数

//食品情報
// TODO: csvから読み出せるようにする
const foodArr = csvSync(fs.readFileSync('./menu.csv')).map(menu => {
  return {
    menu_item_name: menu[0],
    ingredient_standard_name: menu[1],
    ingredient_local_name: menu[2],
    food_group_6: menu[3],
    food_group_3: menu[4],
    allergens: menu[5]
  }
})

//乱数生成
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getFoodInfo(index){
  return foodArr[index]
}

function createRow(province, town, name, day_index, menu_index,){
  return {
    "全国地方公共団体コード": "011011",
    "都道府県名": province,
    "市区町村名": town,
    "学校ID": 1,
    "学校名": name,
    "学年": "小学校中学年",
    "レコードID": 1,
    "年月日": dayjs().add(day_index, 'd').format('YYYY-MM-DD'),
    "献立ID": "",
    "料理ID": menu_index,
    "料理名称": foodArr[menu_index].menu_item_name,
    "同一料理内通し番号": 1,
    "食品ID": "",
    "食品名称(成分表)": foodArr[menu_index].ingredient_standard_name,
    "食品名称(独自)": foodArr[menu_index].ingredient_local_name,
    "食品群(6群)": foodArr[menu_index].food_group_6,
    "食品群(3群)": foodArr[menu_index].food_group_3,
    "分量": getRandomInt(1000),
    "エネルギー": getRandomInt(1000),
    "タンパク質": getRandomInt(100)/10,
    "タンパク質エネルギー比": "",
    "脂質": getRandomInt(100)/10,
    "脂質エネルギー比": "",
    "食塩相当量": getRandomInt(20)/10,
    "カルシウム": getRandomInt(500),
    "マグネシウム": "",
    "鉄": getRandomInt(20)/10,
    "ビタミンA_ug": getRandomInt(20)/10,
    "ビタミンA_ugRAE": "",
    "ビタミンA_IU": "",
    "ビタミンB1": getRandomInt(20)/100,
    "ビタミンB2": getRandomInt(100)/100,
    "ビタミンC": getRandomInt(3),
    "食物繊維": getRandomInt(10)/10,
    "亜鉛": "",
    "炭水化物": "",
    "糖質量": "",
    "アレルゲン情報公開・非公開": 1,
    "アレルゲン品目": foodArr[menu_index].allergens,
    "調理方法（料理単位）": "",
    "調理方法（食材単位）": "",
    "備考": ""
  }
}

(async () => {
  const data = []
  //学校の配列を生成
  const schoolArr = []
  for(let i=0; i<= school_count; i++){
      const province =  faker.address.state()
      const town = faker.address.city()
      const schoolName = faker.name.lastName() + "小学校"
      schoolArr.push({
        province: province,
        town: town,
        name: schoolName
      }  
    )
  }

  schoolArr.forEach((school)=>{
    for(let i=0; i<day_count; i++){
      for(let j=0; j<foodArr.length; j++){
        data.push(createRow(school.province, school.town, school.name, i, j))
      }
    }
  })

  const csvData = stringify(data, { header: true });
  fs.writeFileSync("./sample.csv", csvData);
})();
