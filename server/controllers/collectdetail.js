const { mysql } = require('../qcloud')


//获取模板下的所有内容
async function get(ctx,next) {
  var param = ctx.query
  var collect = await mysql("fixed_attribute").where({ "temp_id": param.tempId })
  ctx.body = collect
}

module.exports =  {
  get
}