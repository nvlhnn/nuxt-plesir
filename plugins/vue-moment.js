import Vue from 'vue'
import moment_vue from 'vue-moment'
const moment = require('moment')
require('moment/locale/id')

// moment.locale('id')
// or you can use it with require
// var Toasted = require('vue-toasted').default

Vue.use(moment_vue, {
    moment
})
