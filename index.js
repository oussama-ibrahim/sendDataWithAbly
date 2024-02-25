const Ably = require("ably");
const {
  BTC_TO_USD,
  EXCHANGE_RATES,
  CURRENT_RATES,
  ETH_TO_USD,
} = require("./constant/rates");
const apiKey = "";

const ably = new Ably.Realtime({ key: apiKey });

function sendDataWithAbly(channelName, data) {
  const channel = ably.channels.get(channelName);
  channel.publish(channelName, data, (err) => {
    if (err) {
      console.error("Error publishing data:", err.message);
    } else {
      console.log("Data published successfully:", data);
    }
  });
}

function sendData() {
  BTC_TO_USD.forEach((item, idx) => {
    setTimeout(() => {
      sendDataWithAbly("BTC_TO_USD_RATE", { ...item });
    }, idx * 1000);
  });
  ETH_TO_USD.forEach((item, idx) => {
    setTimeout(() => {
      sendDataWithAbly("ETC_TO_USD_RATE", { ...item });
    }, idx * 1000);
  });
  EXCHANGE_RATES.forEach((item, idx) => {
    setTimeout(() => {
      sendDataWithAbly("EXCHANGE_RATES", { ...item });
    }, idx * 1000);
  });

  CURRENT_RATES.forEach((item, idx) => {
    setTimeout(() => {
      sendDataWithAbly("CURRENT_RATES", { ...item });
    }, idx * 1000);
  });
}

sendData();
