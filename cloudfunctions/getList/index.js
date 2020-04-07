// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth()+1}`.padStart(2,'0')
  return `${year}${month}`;
}

const getCurrentValuesFromDB = async (time) => {
  const values =  await db.collection('bill').field({
    [time]:true
  }).get();
  const now =  values['data'].pop();
  return now?now[time]:[]          
}

const groupByType = (arr) => arr.reduce((prev, next) => {
  const {
    type1,
    type2
  } = next;
  let cur = `${type1}${type2}`;
  if (!prev[cur]) {
    prev[cur] = [];
  };
  prev[cur].push(next);
  return prev;
}, {})

// 云函数入口函数
exports.main = async (event, context) => {
  const {location} = event || {};
  const wxContext = cloud.getWXContext()
  const cur = await getCurrentValuesFromDB(getCurrentMonth());
  const values = groupByType(cur);
  return values[location];
}