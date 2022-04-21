const indexRouter = require('express').Router();
const CoinGecko = require('coingecko-api');
// https://www.coingecko.com/en/api/documentation?
// https://github.com/miscavage/CoinGecko-API
// 1. Import coingecko-api

const CoinGeckoClient = new CoinGecko(); // 2. Initiate the CoinGecko API Client

indexRouter.get('/', async (req, res) => {
  // const coinInfo = await CoinGeckoClient.coins.fetch('bitcoin', {}); // 3. Make calls
  // const coinPrice = coinInfo.data.market_data.current_price;
  // console.log(data);
  // console.log(coinPrice);
  try {
    const coinListAll = await CoinGeckoClient.coins.list();
    const coinList = coinListAll.data.map((el) => el.id);
    // console.log(coinList);
    res.render('main', { coinList });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = indexRouter;
