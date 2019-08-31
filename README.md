# Be-inspired
"I read a lot on medium, time to share it with those around me"

NodeJs server scrapping medium bookmarks and serving data to a React App that displays them with a material UI


### Environment variables
Setup the following environment variables in a `.env` file.
```
NODE_ENV=production
PORT=4000
MEDIUM_LIMIT=999
MEDIUM_COOKIE='__cfduid=d957e3e20ecfa40c98bd31d7a0a0d406a1564905906;uid=662cf76a59aa;_ga=GA1.2.1750281271.1564990050;lightstep_session_id=fc8619d5aca4427b;pr=2;lightstep_guid/medium-web=19e7ef386ec5dd5d;sid=1:aMm/zKiMrerslFajedA3khUPBsCxnty/VIxlwkJS2TAoZcJ958tdqHouOwbzSl6k;sz=324;tz=-480;xsrf=U3fEOfAyHZeM;mpids=af4499sdfe0'
MONGOOSE_DEBUG=false
MONGO_HOST=mongodb://127.0.0.1:27017/be-inspired
MONGO_USER=admin
MONGO_PWD=root
MONGO_PORT=27017
```

### Installing
To install all the necessary dependencies :
```
cd server && npm install && cd ../client && npm install
```
To run the application in dev
```
npm run dev
```

## Deployment
```
npm run build
npm start
```

## Built With

* [Node.JS](https://nodejs.org) - The backend framework used
* [GraphQL.js](https://graphql.org) - Query language used
* [Cheerio](https://cheerio.js.org/) - Scrapper
* [ReactJS](https://reactjs.org) - The frontend framework used

## Authors

* **Yoppoy** - *Shiba lover* - [Cute shiba](https://www.instagram.com/marutaro/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Scrapper inspired by [medium-marks](https://github.com/georgem3/medium-marks)
