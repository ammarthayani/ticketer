const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
	appId: process.env.APP_ID,
	key: process.env.APP_KEY,
	secret: process.env.APP_SECRET,
	cluster: process.env.APP_CLUSTER,
});

app.set('PORT', process.env.PORT || 5000);

app.post('/message', (req, res) => {
	console.log('endpoint hit', req.body);
	const payload = req.body;
	console.log(payload);
	pusher.trigger('chat', 'message', payload);
	res.send(payload);
});

app.listen(app.get('PORT'), () => {
	console.log('Server started at', app.get('PORT'));
});
