
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.initConfig({
        
        env: {
            test: { NODE_ENV: 'TEST' },
            coverage: { NODE_ENV: 'COVERAGE' }
        },

        cafemocha: {
            test: {
                src: 'test/*.js',
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                },
            },
            coverage: {
                src: 'test/*.js',
                options: {
                    ui: 'bdd',
                    reporter: 'html-cov',
                    coverage: {
                        output: 'coverage.html'
                    }
                }
            }
        },

        mocha_istanbul: {
            coverage: {
                src: 'test', // the folder, not the files,
                options: {
                    mask: '*.js'
                }
            },
            coveralls: {
                src: 'test', // the folder, not the files
                options: {
                    coverage: true
                }
            }
        },

        handlebars: {
          compile: {
            options: {
              namespace: "visiontemplates"
            },
            files: {
              'public/components/vision/templates.js': ['templates/*.hbs']
            }
          }
        }

    });

    grunt.registerTask('test', [ 'env:test',
        'cafemocha:test' ]);

    grunt.registerTask('coverage', [ 'env:coverage',
        'mocha_istanbul:coverage',
        'cafemocha:coverage' ]);

    grunt.registerTask('coveralls', [ 'env:coverage',
        'mocha_istanbul:coveralls',
        'cafemocha:coverage' ]);

};
