module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/**/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    inlinecss: {
      main: {
        options: {
        },
        files: {
          'build/hookfy.template.html' : 'src/hookfy-popup-template.html'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    'clear-html':{
      files : ['build/hookfy.template.html'],
      tags: ['html', 'body']
    },

    'inject-template':{
      template : 'build/hookfy.template.html',
      templatePlate: '@@template',
      injectOn : 'build/hookfy-js.min.js'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-inline-css');

  grunt.registerTask('default', [ 'karma', 'uglify', 'template', 'inject-template']);
  grunt.registerTask('template', ['inlinecss', 'clear-html']);

  grunt.registerTask('clear-html', function(){
    var clearHtml = grunt.config.get('clear-html');
    for(i in clearHtml.files){
      var filePath = clearHtml.files[i];
      var fileContent = grunt.file.read(filePath);
      for(j in clearHtml.tags ){
        var regex = new RegExp('<(\/|)'+clearHtml.tags[j]+'>', 'g');
        fileContent = fileContent.replace(regex, '');
      }
      grunt.file.write(filePath, fileContent);
      grunt.log.write( 'File ' );
      grunt.log.write( filePath['cyan'] );
      grunt.log.write( " cleaned.\n");
    }
  });

  grunt.registerTask('inject-template', function(){
    var configs = grunt.config.get('inject-template');
    var fileContent = grunt.file.read(configs.injectOn);
    var template = grunt.file.read(configs.template);
    template = template.replace(/\"/g, "\\\"");
    template = template.replace(/\n/g, "");
    fileContent = fileContent.replace(configs.templatePlate, template );
    grunt.file.write(configs.injectOn, fileContent);
    grunt.log.write( 'Template injected on ' );
    grunt.log.write( configs.injectOn['cyan'] );
    grunt.log.write( "\n");
  });
}