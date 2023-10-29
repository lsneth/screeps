require('dotenv').config()

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-screeps')

  grunt.initConfig({
    screeps: {
      options: {
        email: process.env.EMAIL,
        token: process.env.AUTH_TOKEN,
        branch: 'test',
        //server: 'season'
      },
      dist: {
        src: ['dist/*.js'],
      },
    },
  })
}
