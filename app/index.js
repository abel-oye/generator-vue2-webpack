'use strict';
var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initializing: function() {
		this.pkg = require('../package.json');
	},
	writing: {
		gulpfile: function() {
			this.fs.copyTpl(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js'), {
					date: (new Date).toISOString().split('T')[0],
					name: this.pkg.name,
					version: this.pkg.version,
				}
			);
		},
		webpack: function() {
			 this.fs.copy(
	        this.templatePath('webpack.config.js'),
	        this.destinationPath('webpack.config.js'));

			this.fs.copy(
		       this.templatePath('webpack.production.config.js'),
		       this.destinationPath('webpack.production.config.js'));
		},
		packageJSON: function() {
			this.fs.copyTpl(
		       this.templatePath('_package.json'),
		       this.destinationPath('package.json'),
		       {
		         name:this.options['name']
		       }
		     );
		},
		babel: function() {},
		git: function() {
			this.fs.copy(
		        this.templatePath('gitignore'),
		        this.destinationPath('.gitignore'));
		},
		editorConfig: function() {
			this.fs.copy(
		        this.templatePath('editorconfig'),
		        this.destinationPath('.editorconfig')
		      );
		},
		service: function() {
			this.fs.copy(
		        this.templatePath('service.js'),
		        this.destinationPath('service.js')
		    );
		},
		src: function() {
			mkdirp('test');
			mkdirp('src/assets');
      		mkdirp('src/componets');
      		mkdirp('src/directives');
      		mkdirp('src/mixins');
      		mkdirp('src/utils');

      		this.fs.copy(
		        this.templatePath('mock'),
		        this.destinationPath('mock')
		      );

      		this.fs.copy(
		        this.templatePath('src'),
		        this.destinationPath('src')
		      );
		},
		babel: function(){
			this.fs.copy(
		        this.templatePath('babelrc'),
		        this.destinationPath('.babelrc')
		    );
		},
		config: function() {
			this.fs.copy(
		        this.templatePath('config.js'),
		        this.destinationPath('config.js')
		    );
		},
		app:function(){
			this.fs.copy(
		        this.templatePath('app.js'),
		        this.destinationPath('app.js')
		    );
		}
	},
	install: function() {
		this.installDependencies({
			bower: false,
			skipMessage: this.options['skip-install-message'],
			skipInstall: this.options['skip-install']
		});
	},
	end: function() {
		var howToInstall =
	      '\nAfter running ' +
	      chalk.yellow.bold('npm install & npm start') +
	      ', inject your' +
	      '\nfront end dependencies by running ';

	    this.log(howToInstall)
	}
})