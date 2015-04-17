var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	creado: {
		type: Date,
		default: Date.now
	},
	titulo: {
		type: String,
		default: '',
		trim:true,
		required: 'El titulo no puede estar en blanco'
	},
	contenido: {
		type: String,
		default:'',
		trim:true
	},
	creandor: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
mongoose.model('Article', ArticleSchema);
