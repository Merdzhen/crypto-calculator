// console.log('crypto js');

// // https://youtu.be/XXuUNZIQUVA
// const ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');
// const stockPriceElement = document.getElementById('stock-price');
// let lastPrice = null;

// ws.onmessage = (event) => {
//   const stockObject = JSON.parse(event.data);
//   // console.log(stockObject.p);
//   const price = parseFloat(stockObject.p).toFixed(2);
//   stockPriceElement.innerText = price;
//   stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
//   lastPrice = price;
// };
