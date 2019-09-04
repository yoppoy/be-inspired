# Be-inspired
"I read a lot on medium, time to share it with those around me"

Node.Js server scrapping medium bookmarks and serving data to a React App that displays them with a material UI

## Setup
In order to scrape Medium, this project uses a pre-generated medium login link. In order to generate this link, head over to the sign-in window on [medium.com](medium.com). Enter your mail address and confirm. Retrieve the generated link (one-time use) and add it as `MEDIUM_LOGIN_LINK` in your env variables. This is only required on the first launch of the project since the cookies are saved in a json file for later use. 
### Environment variables
Setup the following environment variables in a `.env` file at the root of the project.

| Env Variable | Description | Example |
|--------------|-------------|---------|
| `NODE_ENV` | Node environment | development |
| `PORT` | Port to run the app on | 4000 |
| `MONGOOSE_DEBUG` | Mongoose debug activated or not | true / false |
| `MONGO_HOST` | Mongodb database url | mongodb://127.0.0.1:27017/be-inspired |
| `MONGO_USER` | Mongodb user | user |
| `MONGO_PWD` | Mongodb password | password |
| `MEDIUM_LOGIN_LINK` | Generated medium link to generate a local cookie | https://medium.com/m/callback/email?token=f3101605993e&operation=login |

### Installing
To install all the necessary dependencies :
```
cd server && npm install && cd ../client && npm install
```
To run the application in development
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
* [ReactJS](https://reactjs.org) - The frontend framework used
* [Puppeteer](https://github.com/GoogleChrome/puppeteer) - Headless chromium
* [Cheerio](https://cheerio.js.org/) - Scrapper

## Authors

* **Yoppoy** - *Shiba lover* - [Cute shiba](https://www.instagram.com/marutaro/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Scrapper inspired by [medium-marks](https://github.com/georgem3/medium-marks)
