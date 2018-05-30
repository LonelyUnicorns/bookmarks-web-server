

const EXCHANGE_NAME = 'addition.push';

module.exports = async function(ctx, next) {
	const data = ctx.body;
	const result = await ctx.amqp.publish(EXCHANGE_NAME, '', Buffer.from(data, 'ascii'));
	ctx.body = result.message.toString('utf-8');
}
