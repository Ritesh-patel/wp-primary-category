module.exports = {
	dist: {
		options: {
			processors: [
				require('autoprefixer')({browsers: 'last 2 versions'})
			]
		},
		files: { 
			'assets/css/wp-primary-category.css': [ 'assets/css/wp-primary-category.css' ]
		}
	}
};