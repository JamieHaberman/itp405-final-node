var bookshelf = require('./bookshelf.js');

var Area = bookshelf.Model.extend({
	tableName: 'areas'
});

module.exports = Area;
