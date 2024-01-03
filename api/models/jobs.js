const mongoose = require('mongoose')

const jobs = mongoose.model('jobs', {
  jid: String,
  jtitle: String,
  jtype: String,
  jd: String,
  jstate: String,
  jdistrict: String,
  jctg: String,
  jshift: String,
  jrole: [String],
  jqualif: [String],
  jskills: [String],
  jsal: [String],
  jdead: String,
  cname: String,
  cemail: String,
  cweb: String,
  jpost: Date
});

module.exports = jobs