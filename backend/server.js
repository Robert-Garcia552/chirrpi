const express = require('express');
const app = express();


var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/client/build'));

// newsapi requests
app.get('/api', async (req, res) => {
    let { data } = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${keys.reuters}`)
    res.send(data.articles)
});

app.get('/api/:category', async (req, res) => {
    let {data} = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${req.params.category}&apiKey=${keys.reuters}`)
    res.send(data.articles)
});

// logs the port or server
app.listen(port, function() {
    console.log(`Listening on port ${port}!`)
})