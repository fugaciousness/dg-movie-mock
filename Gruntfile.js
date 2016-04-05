
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'src/*.js']     
    },
     sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'content/styles/scss/',
            src: ['*.scss'],
            dest: 'content/styles/css',
            ext: '.css'
          }
        ]
      }
    },
    watch: {
      styles: {
        files: 'content/styles/scss/*.scss',
        tasks: ['sass']
      },
      scripts: {
        files: 'scripts/*.js',
        tasks: ['jshint']
      },
    }
  });
  grunt.registerTask('default', ['sass']);
};
