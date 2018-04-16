const src = './app';
const dest = './build';

module.exports = {
	app: './app',
	build: './build',
	browserSync: {
		server: {
			// We're serving the src folder as well for sass sourcemap linking
			baseDir: [dest, src]
		},
		// Hide the annoying notification
		notify: false,
		files: [
			dest + '/**',
			// Exclude Map files
			'!' + dest + '/**.map'
		],
		open: false
	},
	favicon: {
		src: src + '/favicon.ico',
		dest: dest
	},
	fonts: {
		src: [src + '/fonts/**', './node_modules/font-awesome/fonts/**'],
		dest: dest + '/fonts'
	},
	images: {
		src: src + '/images/**',
		dest: dest + '/images'
	},
	scripts: {
		all: src + '/scripts/**/*.js',
		modules: src + '/scripts/modules',
		src: src + '/scripts/app.js',
		dest: dest + '/scripts',
		libsSrc: src + '/scripts/plugins/**/*.js',
		libsDest: dest + '/scripts/plugins/',
		uglifyOptions: {
			mangle: true,
			compress: {
				sequences: true,
				properties: true,
				dead_code: true, // eslint-disable-line camelcase
				conditionals: true,
				booleans: true,
				unused: false,
				evaluate: true,
				if_return: true, // eslint-disable-line camelcase
				join_vars: true, // eslint-disable-line camelcase
				drop_console: true, // eslint-disable-line camelcase
				global_defs: { // eslint-disable-line camelcase
					DEBUG: false
				}
			}
		}
	},
	styles: {
		src: src + '/styles/**/*.{sass,scss}',
		dest: dest + '/styles'
	},
	twig: {
		src: src + '/*.twig',
		dest: dest,
		watchSrc: [
			src + '/*.twig',
			src + '/**/*.twig',
			src + '/json/*.json'
		],
		data: '../.' + src + '/json/',
		includes: './includes'
	}
};
