var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const photoSchema = new Schema({
	'name': String,
	'path': String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'views': Number,
	'likes': Number,
	'dislikes': Number,
	'date': Date,
	'comments': [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
	'category': String,
	'likedBy': [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	'dislikedBy': [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	'isFlagged': {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('photo', photoSchema);
