module.exports = function (grunt){

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


     // watch
    //--------------------------------------------------------------
    // Watches for changed files and runs appropriate tasks

    watch: {
      markup: {
        files: ['./app/**/*.html'],
        tasks: ['copy:statics']
      },
      styles: {
        files: ['./app/assets/scss/*.scss'],
        tasks: ['compass']
      },
      scripts: {
        files: ['./app/assets/js/**/*.js'],
        tasks: ['jshint', 'concat:dev']
      }
    },



    // jshint, find errors in javascript code
    jshint: {
      options: {

      },
      all: [
        'gruntfile.js',
        './app/assets/js/**/*.js',
        '!./app/assets/js/vendor/*',
        '!./app/assets/js/ugly/*'
      ]
    },

    // uglify
    uglify: {
      development: {
          files: [{
              './app/assets/js/ugly/ugly.js': ['./app/assets/js/app.js',
                  './app/assets/js/controllers/ListController.js',
                  './app/assets/js/controllers/CountryDetailController.js',
                  './app/assets/js/dataService.js']
          }]
      },
      options: {
        mangle: false
      },
    },

    // clean
    clean: {
       all: {
        files: [{
          dot: true,
          src: [
            'www/*'
          ]
        }]
      }
    },

    // concat
    concat: {
      options:{

      },
      dev: {
        src: [
          './app/assets/js/ugly/*.js'
        ],
        dest: './www/js/scripts.js'
      },
      vendor: {
        src: [
          './app/bower_components/jquery/dist/jquery.min.js',
          './app/bower_components/lodash/lodash.min.js',
          './app/bower_components/angular/angular.min.js',
          './app/bower_components/angular-route/angular-route.min.js',
          './app/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
          './app/bower_components/angular-google-maps/dist/angular-google-maps.min.js',
          './app/bower_components/angular-animate/angular-animate.min.js',
          './app/bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: './www/js/vendors.js'
      }
    },

    // compass
    compass: {
      dist: {
          options: {
          sassDir: './app/assets/scss',
          cssDir: './www/css',
          outputStyle: 'compressed'
        }
      }
    },
    // html hint
    htmlhint: {
      templates:{
        options:{
          'attr-lower-case': true,
          'attr-value-not-empty': true,
          'tag-pair': true,
          'tag-self-close': true,
          'tagname-lowercase': true,
          'id-class-unique': true,
          'src-not-empty': true,
          'img-alt-required': true

        },
        src: ['./app/**/*.html']
      }
    },

    // copy over static files not moved in other tasks
    copy: {
      statics: {
        files: [
        {
            expand: true,
            cwd: './app/assets//',
            src: ['loading-globe.gif'],
            dest: 'www/'
          },
          {
            expand: true,
            cwd: './app/assets/css/vendor/',
            src: ['**'],
            dest: 'www/css/vendor/'
          },
          {
            expand: true,
            cwd: './app/partials/',
            src: ['**'],
            dest: 'www/partials'
          },
          {
            expand: true,
            cwd: './app/',
            src: ['index.html'],
            dest: 'www/'
          }
        ]
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask("default", [
      'clean',
      'jshint',
      'uglify',
      'compass',
      'concat:dev',
      'concat:vendor',
      'copy:statics'
    ]);
};

