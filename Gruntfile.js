
module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');

  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),

    clean: [
        "build"
    ],

    jade: {
      development: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files : {
          "build/dev/index.html" : ["src/jade/index.jade"]
        }
      },
      production: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files : {
          "build/target/index.html" : ["src/jade/index.jade"]
        }

      }
    },

    /*
    less: {
      development: {
        files: {
          "build/dev/style/style.css" : "src/less/main.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "build/target/style/style.css" : "src/less/main.less"
        }
      }
    },
    */


    copy: {
      lib_dev: {
        files: [{
          src: [ 'jquery.min.js' ],
          dest: "build/dev/lib",
          cwd: "bower_components/jquery",
          expand: true
        },{
          src: [ '**' ],
          dest: "build/dev/lib",
          cwd: "src/scripts",
          expand: true
        }]
      },
      lib_prod: {
        files: [{
          src: [ 'jquery.min.js' ],
          dest: "build/target/lib",
          cwd: "bower_components/jquery",
          expand: true
        }]
      },
      fontawesome_dev: {
        files: [{
          src: [ '**' ],
          dest: "build/dev/fonts/font-awesome",
          cwd: "vendor/font-awesome/fonts",
          expand: true
        }]
      },
      fontawesome_prod: {
        files: [{
          src: [ '**' ],
          dest: "build/target/fonts/font-awesome",
          cwd: "vendor/font-awesome/fonts",
          expand: true
        }]
      },
      img_dev: {
        files: [{
          src: [ '**' ],
          dest: "build/dev/img",
          cwd: "src/img",
          expand: true
        }]
      },
      img_prod: {
        files: [{
          src: [ '**' ],
          dest: "build/target/img",
          cwd: "src/img",
          expand: true
        }]
      },
      reveal_dev: {
        files: [{
          src: [ '**/*' ],
          dest: "build/dev/reveal",
          cwd: "reveal.js",
          expand: true
        }]
      },
      reveal_prod: {
        files: [{
          src: [ '**/*' ],
          dest: "build/target/reveal",
          cwd: "reveal.js",
          expand: true
        }]
      }
    },

    delta: {
      options: {
        livereload: true
      },

      jade: {
        files: [ 'src/jade/**/*.jade' ],
        tasks: [ 'jade:development']
      }
    },

    connect: {
      server: {
        options: {
          hostname: "0.0.0.0",
          port: 9001,
          base: 'build/dev',
          livereload: true
        }
      }
    }
  };

  grunt.initConfig(taskConfig);

  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', ['clean', 'build', 'connect', 'delta' ] );

  grunt.registerTask( 'build', [
      'copy:reveal_dev',
      'copy:lib_dev',
      'copy:fontawesome_dev',
      'copy:img_dev',
      'jade:development',
  ]);

  grunt.registerTask( 'compile', [
    'copy:reveal_prod',
    'copy:lib_prod',
    'copy:fontawesome_prod',
    'copy:img_prod',
    'jade:production',
  ]);
};
