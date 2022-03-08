// usando timeago.js
const {format} = require('timeago.js')
const helpers = {}
helpers.timeago = (time)=>{
    return format(time)
}
module.exports = helpers