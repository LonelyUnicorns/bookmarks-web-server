
const Router = require('koa-router');
const fetchBookmarks = require('./fetch.controller');
const addBookmark = require('./add.controller');

const router = new Router({ prefix: '/bookmarks' });

router
	.get('/', fetchBookmarks)
	.post('/', addBookmark);

module.exports = router.routes();
