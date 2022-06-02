# crypto-calculator

Used: Node.js, Express, Handlebars, PostgreSQL, Sequelize, Bootstrap, CoinGecko API, Bcrypt, express-session

Run with 'npm start'

My idea was to make an application for crypto investors to help them to calculate profit or loss in their current crypto wallet.
So I made this proto application "Crypto Profit".

On the main page you can see top 100 coins due to current market capitalization:

<img alt="main-page" src="./images-readme/main-page.png" />

I used CoinGecko API to download data.
I also implemented searching by coin name and id:

<img alt="main-page-search" src="./main-page-search.png" />

and  sorting by price, 24h change and market capitalization. This is an example of sorting by 24h price chaange:

<img alt="main-page-sort" src="./main-page-sort.png" />

After registration/login you can use main functionality in your personal account.
Here you can calculate profit or loss from the coin that you have now in your wallet.
Add coin id, currency used to pay for the purchase, quantity of coins and purchase date and the application will calculate current profit/loss from your deal:

<img alt="my-deals" src="./my-deals.png" />

I also implemented searching by coin name and sorting by any column.

To make searching coin id easily I added "Coin List" table with coin names and ids with searching possibility.

Plans for development: redesign, adding functionality e.g. deleting deals, etc.
