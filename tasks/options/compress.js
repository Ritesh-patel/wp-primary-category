module.exports = {
	main: {
		options: {
			mode: 'zip',
			archive: './release/wpc.<%= pkg.version %>.zip'
		},
		expand: true,
		cwd: 'release/<%= pkg.version %>/',
		src: ['**/*'],
		dest: 'wpc/'
	}
};