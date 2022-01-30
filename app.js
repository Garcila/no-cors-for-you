const axios = require("axios");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(
	cors({
		origin: "*",
	})
);

const PORT = process.env.PORT || 3000;
const API_KEY_NEWS = process.env.API_KEY_NEWS;

app.get(`/news/:query_term`, function (req, res) {
	const url = `https://newsapi.org/v2/everything?q=${req.params.query_term}&apiKey=${API_KEY_NEWS}`;
	axios
		.get(url)
		.then(response => {
			console.log(response.data);
			res.send(response.data.articles[0].title);
			return response.data;
		})
		.catch(error => console.log(error));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
