
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            all: {
                files: {
                    'public/js/build/script.min.js': ['public/js/page.js','public/js/products.js','public/js/main.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};