var bookshelf = require('./bookshelf.js');
var Area = require('./area');

var Photo = bookshelf.Model.extend({
	tableName: 'photos',
	area: function() {
		return this.belongsTo(Area);
	}
});

module.exports = Photo;
