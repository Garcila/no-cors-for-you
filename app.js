const axios = require("axios");
const express = require("express");
const app = express();
const favicon = require("serve-favicon");

require("dotenv").config();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

const PORT = process.env.PORT || 3000;
const API_KEY_NEWS = process.env.API_KEY_NEWS;

//https://newsapi.org/v2/everything?q=shark&apiKey=33f90c31aec04b5e8d07242e1af4f3e3
// app.get(`/news/:query_term`, function (req, res) {
// 	const url = `https://newsapi.org/v2/everything?q=${req.params.query_term}&apiKey=${API_KEY_NEWS}`;
// 	axios
// 		.get(url)
// 		.then(response => {
// 			res.send(response.data);
// 		})
// 		.catch(error => console.log(error));
// });

// 204 (no content) if it is trying to get favicon.ico
app.get("/", (req, res) =>
	res.send(
		`<div style="color: rgb(255,255,255);background-color: rgb(77,77,77);height: 100vh; display: flex; flex-direction: column; justify-content: center; text-align: center">
		<h1>👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾</h1>
		<h2>Enter the url you want to connect to</h2>
		<h1>Exclude the https://</h1>
		<h1>🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄</h1>
		</div>`
	)
);

app.use(favicon(__dirname + "/public/images/io.ico"));
// app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/:a?/:b?/:c?/:d?/:e?/:f?/:g?/:h?", function (req, res) {
	let fullURL = "";
	const url = req.params;

	for (let a in url) {
		if (url[a]) {
			fullURL += `${url[a]}/`;
		}
	}
	// remove last /
	fullURL = fullURL.slice(0, -1);

	const queryElements = req.query;

	// Add ? to start the query parameters
	fullURL += "?";
	for (let item in queryElements) {
		fullURL = `${fullURL}${item}=${queryElements[item]}&`;
	}

	// remove the last &
	fullURL = fullURL.slice(0, -1);
	console.log(fullURL);

	axios
		.get(`https://${fullURL}`)
		.then(response => {
			res.send(response.data);
		})
		.catch(error => console.log(error));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
