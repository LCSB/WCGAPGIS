const { mysql } = require('../qcloud')


//查询所有模板列表
async function get(ctx, next) {
  var param = ctx.query
  var rs = await mysql("templet_column").where({ "temp_id": param.tempId})
  
  ctx.body = rs
}

async function post(ctx,next) {
  var params = ctx.body.collect_list
  var collectList = JSON.parse(params)
 
  
  


}

module.exports = {
  get
}
