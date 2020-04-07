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

const sum = (arr) => arr.reduce((prev, next) => prev + next.value, 0);

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 获取当月数据
  // 分类
  // 计算

  const cur = await getCurrentValuesFromDB(getCurrentMonth());
  const values = groupByType(cur);
  const res ={};
  for(let key in values){
    res[`${key}`] = sum(values[key]);
  }
  return res;
}