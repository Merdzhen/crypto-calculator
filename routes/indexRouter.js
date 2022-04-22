const indexRouter = require('express').Router();
const CoinGecko = require('coingecko-api');
// https://www.coingecko.com/en/api/documentation?
// https://github.com/miscavage/CoinGecko-API
// 1. Import coingecko-api

const CoinGeckoClient = new CoinGecko(); // 2. Initiate the CoinGecko API Client

indexRouter.get('/', async (req, res) => {
  try {
    const coinListAll = await CoinGeckoClient.coins.markets();
    coinListAll.data.map((el) => {
      el.id = el.id;
      el.symbol = el.symbol.toUpperCase();
      el.market_cap = el.market_cap.toLocaleString();
      el.current_price = el.current_price.toLocaleString();
      el.price_change_percentage_24h_growth = el.price_change_percentage_24h > 0;
    });
    const coinList = coinListAll.data;
    // console.log(coinList[0]);
    res.render('main', { coinList });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = indexRouter;
