const express = require('express')
const app = express()
// const xml2js = require('xml2js')
// const axios = require('axios');
// const options = {
//   method: 'GET',
//   url: `https://trends.google.com/trends/trendingsearches/daily/rss?geo=TH`,
//   header: {
//     'X-RapidAPI-Host': `trends.google.com`
//   }
// }
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//options นี้จะเก็บ option เพื่อให้ axios ส่ง request ไปเอา google trend มา
var PORT = 9080;

// app.get("/", (req, res) => { // เมื่อเข้า url http://localhost:3000/ แบบ get จะมาทำงานที่ method นี้นะจ๊ะ
//   //บันทัดล่างนี้จะเป็นการใช้ axios ยิง request ไปโดยใช้ option ข้างบน มาเก็บไว้ในตัวแปร googletrenddata
//   const googletrenddata = new Promise(async (resolve, reject) => {
//     const response = await axios.request(options)
//     const data = response.data
//     const jsonObject = await xml2js.parseStringPromise(data)// data ที่ได้มา จะได้มาเป็น xml ก็เลยใช้ xml2js มาแปลงมันเป็น object
//     const results = jsonObject.rss.channel[0].item

//     // const descriptionArray = description.description[0].split(',');
//     // const filteredDescription = descriptionArray.slice(0, 3);
//     // const descriptionString = filteredDescription.join(', ');
      
//     const filteredResults = results.map((item) => ({
//       title : item.title[0],
//       description : item.description[0].split(',').slice(0,3).join(', ')
//     }))
// // ผมมีปัญหากับ description เพราะมี requirement มาว่า บางที description มันเยอะมาก คั่นด้วย , ให้เอามาแค่ 3 ข้อมูลแรก ก็พอ
// // แล้วก็พยายามจะทำ ไอ 3 คำสั่งที่ comment ไว้ แต่ ทำไม่เป็น เลยใช้แบบ chain มันแบบที่เห็นเลยละกัน
// // ใครมีคำแนะนำว่าต้องทำยังไง ก็สอนผมด้วยละกันนะครับ
//     resolve(filteredResults)
//   })
//   googletrenddata
//   .then( async (result)=>{
//   // ตรงนี้ก็ พอได้ข้อมูลจาก googletrendมาเรียบร้อย ก็จะมาทำงานใน <<ตัวแปร>>.then() เพราะ เรากำหนด googletrenddata ให้เป็น new Promise ไว้
//   // จากตรงนี้ไป เป็น requirement ยิบย่อยเล็กน้อยนะครับ ลองไปไล่ๆ code กันดู
//     const thDateStrine = new Date().toLocaleDateString('th-TH', {year:'2-digit', month:'short',day:'numeric'})
//     const thTimetrine = new Date().toLocaleTimeString('th-TH', {hour:'2-digit'})
//     let roundExpect = 0 //0-9
    
//     while (roundExpect < 10) {
//     let msgHeader = `10 อันดับ (${roundExpect +1} - ${roundExpect +5}) (${thDateStrine}, ${thTimetrine}:00 น.)`
//       let mainContent = '';
//       for (let index = 0; index < 5; index++) {
//         const lineTitle = result[roundExpect].title
//         const lineDesctiption = result[roundExpect].description ? ` (คำที่เกี่ยวข้อง ${result[roundExpect].description})` : ''
//         console.log(result[roundExpect])
//         mainContent += `${roundExpect +1}. ${lineTitle}${ lineDesctiption}` + "\n"
//         roundExpect++
//       }
// // ตรงนี้ก็เป็นการเรียกใช้ line noti แล้วส่ง message ของเราไปด้วยตัวแปร msgHeader + mainContent
//       await axios({
//         method: 'post',
//         url: 'https://notify-api.line.me/api/notify',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Bearer pNNrt8NCiT4gAabH5B36XBufwrSDEV2zVwY30sTtuzM`,
//         },
//         data: "message=" + msgHeader + "\n\n" + mainContent,
//       })
//       .catch(function (error) {
//         if (error.response) {
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         }
//       })
//     }
// // ถ้าทำงานสำเร็จ ตามปกติ ก็จะคืน status 200 { message:'Success' } ไปที่หน้าจอ
//     res.status(200).send({ message: 'Success' });
//     console.log('Show log::',message);
//   })
//   .catch((err)=>{err})
// })

app.post("/getTarget/", (req, res) => {
  res.status(200).send({targetIP: '192.168.1.35'});
  console.log('Incomming get req');
  console.dir(req.body);
});


app.post("/postplain/", (req, res) => {
  console.log(new Date());
  console.log('Incomming Post req');
  console.dir(req.body);
  res.status(200).send({message: 'Success'});
});
// /*work*/
// app.get("/", (req, res) => { // เมื่อเข้า url http://localhost:3000/ แบบ get จะมาทำงานที่ method นี้นะจ๊ะ
    
//    axios({
//       method: 'post',
//       url: 'https://notify-api.line.me/api/notify',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': `Bearer pNNrt8NCiT4gAabH5B36XBufwrSDEV2zVwY30sTtuzM`,
//       },
//       data: "message=" + msgHeader + "\n\n" + mainContent,
//     })
//     .catch(function (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       }
//     })

//     res.status(200).send({ message: 'Success' });
//     console.log('Show log::',message);
// })

app.listen(PORT, () => {
  console.log('Start server at port:',PORT);
})