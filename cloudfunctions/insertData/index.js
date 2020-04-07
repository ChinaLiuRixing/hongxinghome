// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

const insert = (time)=>{
  await 
}

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth()+1}`.padStart(2,'0')
  return `${year}${month}`;
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const time = getCurrentMonth();
  const {price,remark,type1,type2} = event.modalCur || {};
 
  let values = await db.collection('bill').field({
    [time]:true
  }).get();

  let data = values.data.pop()[time];
  data.push({
    person: "lrx",
    remark,
    value: price,
    type1,
    type2,
    time: Date.now()
  });

  return await db.collection('bill').doc('Q1hRZsBcywzTVzkzyFFeKhSVIZGheCOTYTNXAYJuBJweQW2o')
  .update({
    data:{
      [time]:data
    }
  })
}