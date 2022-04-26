const dealsRouter = require('express').Router();
const CoinGecko = require('coingecko-api');
const { Deal } = require('../db/models');
// 1. Import coingecko-api

const CoinGeckoClient = new CoinGecko(); // 2. Initiate the CoinGecko API Client

dealsRouter.get('/deals', async (req, res) => {
  try {
    if (req.session.user) {
      const deals = await Deal.findAll({ where: { user_id: req.session.userId }, raw: true, order: [['purchase_date', 'DESC']] });
      // console.log(deals);
      const coinArr = deals.map((el) => el.coin.toLowerCase());
      const currencyArr = deals.map((el) => el.currency.toLowerCase());
      const quantityArr = deals.map((el) => el.quantity);
      const dateArr = deals.map((el) => `${el.purchase_date.slice(-2)}-${el.purchase_date.slice(5, 7)}-${el.purchase_date.slice(0, 4)}`);

      for (let i = 0; i < deals.length; i += 1) {
        const historicData = await CoinGeckoClient.coins.fetchHistory(coinArr[i], {
          date: dateArr[i],
        });
        // console.log('historicData1 =====>', historicData);
        const purchacePrice = historicData.data.market_data.current_price[`${currencyArr[i]}`];
        // const purchacePriceShort = parseFloat(purchacePrice).toFixed(4); // округ до 4 десятичн знаков
        const purchaceCost = purchacePrice * quantityArr[i];
        // const purchaceCostShort = parseFloat(purchaceCost).toFixed(4);

        const currentData = await CoinGeckoClient.coins.fetch(coinArr[i], {});
        const currentPrice = currentData.data.market_data.current_price[`${currencyArr[i]}`];
        // const currentPriceShort = parseFloat(currentPrice).toFixed(4);
        const currentCost = currentPrice * quantityArr[i];
        // const currentCostShort = parseFloat(currentCost).toFixed(4);
        const currentProfit = currentCost - purchaceCost;
        // const currentProfitShort = parseFloat(currentProfit).toFixed(4);

        deals[i].purchace_price = purchacePrice;
        deals[i].purchace_price_short = purchacePrice.toLocaleString();
        deals[i].purchace_cost = purchaceCost;
        deals[i].purchace_cost_short = purchaceCost.toLocaleString();
        deals[i].current_price = currentPrice;
        deals[i].current_price_short = currentPrice.toLocaleString();
        deals[i].current_cost = currentCost;
        deals[i].current_cost_short = currentCost.toLocaleString();
        deals[i].current_profit = currentProfit;
        deals[i].current_profit_short = currentProfit.toLocaleString();
        deals[i].profit = currentProfit > 0;
      }
      // console.log(deals);

      res.render('deals', { deals });
    } else {
      res.redirect('main');
    }
  } catch (err) {
    res.send(err.message);
  }
});

dealsRouter.post('/deal/new', async (req, res) => {
  try {
    if (req.session.user) {
      const {
        coin, currency, purchase_date, quantity,
      } = req.body;

      const date = `${purchase_date.slice(-2)}-${purchase_date.slice(5, 7)}-${purchase_date.slice(0, 4)}`;
      const historicData = await CoinGeckoClient.coins.fetchHistory(coin, { date });
      // console.log('historicData =====>', historicData);
      const purchacePrice = historicData.data.market_data.current_price[`${currency}`];
      const purchaceCost = purchacePrice * quantity;
      const currentData = await CoinGeckoClient.coins.fetch(coin, {});
      const currentPrice = currentData.data.market_data.current_price[`${currency}`];
      const currentCost = currentPrice * quantity;
      const currentProfit = currentCost - purchaceCost;

      if (purchacePrice && currentPrice) {
        await Deal.create({
          coin: `${coin.slice(0, 1).toUpperCase()}${coin.slice(1).toLowerCase()}`,
          currency: currency.toUpperCase(),
          purchase_date,
          quantity,
          user_id: req.session.userId,
        });

        res.send({
          success: true,
          purchacePrice: purchacePrice.toLocaleString(),
          purchaceCost: purchaceCost.toLocaleString(),
          currentPrice: currentPrice.toLocaleString(),
          currentCost: currentCost.toLocaleString(),
          currentProfit: currentProfit.toLocaleString(),
          profit: currentProfit > 0,
        });
      }
    } else {
      res.redirect('main');
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

module.exports = dealsRouter;
