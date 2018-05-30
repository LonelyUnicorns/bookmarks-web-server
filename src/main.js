
const Koa = require('koa');
const KeyGrip = require('keygrip');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session2');
const amqplib = require('amqplib');
const config = require('../config');
const bookmarks = require('./bookmarks');

const app = new Koa();
app.keys = new KeyGrip(['secret keys'], 'sha256', 'hex');

async function createAmqpConnection() {
	try {
		const { AMQP: { HOST, PORT, USER, PASSWORD }} = config;
		const connectionUrl = url || `amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`;
		return amqplib.connect(connectionUrl);
	} catch(err) {
		return null;
	}
}

async function createApplication() {
	console.info('Connecting to RabbitMQ');
	const conn = await createAmqpConnection();

	if (!conn) {
		console.error('Cannot connect to RabbitMQ server');
	}

	app.context.amqp = await conn.createChannel();;

	app
		.use(session({
			key: 'SESSION_ID',
		}))
		.use(bookmarks.routes)
		.listen(process.env.PORT);
}

createApplication();
