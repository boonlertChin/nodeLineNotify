const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const axios = require('axios').default;
var PORT = 9080;
var TOKEN_TYPE = 'Bearer ';
// var TokenLineAPI = 'pNNrt8NCiT4gAabH5B36XBufwrSDEV2zVwY30sTtuzM'; //Line Group Chin and Customer
var TOKEN_LINE_API = 'wgjA544enQ1QTPvG4mOCW42BFftbmIS23HUezV4icJF';

var busketStatusDevice = {
  Target_IP: '192.168.1.35',
  Status: true,
  Count: 0
}

app.post("/getTarget/", (req, res) => {
  res.status(200).send({targetIP: '192.168.1.35'});
  console.log('Incomming get req');
  console.dir(req.body);
});

app.post("/postTargetStatus/", (req, res) => {
  console.log(new Date());
  console.log('Incomming Post req');
  console.dir(req.body);
  console.log(req.body.Status);
  //Device connection failed.
  if(req.body.Status == false){
    busketStatusDevice.Status = req.body.Status; //Record status.
    var counter = busketStatusDevice.Count; //equal delay time at ESP8266 now is 10S
    busketStatusDevice.Count = counter+1;
    var messageHeader = 'Connection Lost: R'+counter;
    sentNotiMessage(messageHeader,busketStatusDevice.Target_IP);
  }else{
    busketStatusDevice.Status = req.body.Status; //Record status.
    busketStatusDevice.Count = 0; //Reset Count
  }

  console.log(busketStatusDevice);
  res.status(200).send({message: 'Received'});
});

const sentNotiMessage = function(msgHeader,mainContent){
    console.log('start: fn: sent Notify api line');
    axios({
      method: 'post',
      url: 'https://notify-api.line.me/api/notify',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': TOKEN_TYPE+TOKEN_LINE_API,
      },
      data: "message=" + msgHeader + "\n\n" + mainContent,
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
};

app.listen(PORT, () => {
  console.log('Start server at port:',PORT);
})