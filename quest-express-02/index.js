const { response } = require("express");
const express = require("express");
const movies = require("./movies");
const app = express();
const url = require('url');

const port = 3000;

app.get("/", (request, response) => {
    response.send("Welcome to my favourite movie list");
  });

app.get("/api/movies", (request, response) => {
    response.status(200).json(movies);
});

app.get("/api/movie/:id", (request, response) => {
    const movie = movies.find (item => item.id == request.params.id);
    if (movie) {
        response.status(200).json(movie);
    } else {
        response.status(404).send("Not Found");
    }
});

app.get("/api/search", (request, response) => { 
    const parsedUrl = url.parse(request.url, true);
    const lengthMovies = movies.filter(item => item.duration <= parsedUrl.query.maxDuration );
    if (lengthMovies.length !=0) {
        response.status(200).json(lengthMovies)
    } else {
        response.status(404).send("No movies found for this duration");
    }
});

app.get("/api/users", (request, response) => {
    response.status(401).send("unauthorized");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });