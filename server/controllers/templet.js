const { mysql } = require('../qcloud')


//查询所有模板列表
async function get(ctx, next) {
  var rs = await mysql("templet")
  var templetList = []
  for(var item of rs) {
    tempId = item.id
    var columns = await mysql("templet_column").where({ "temp_id": tempId })
    templetList.push({
      "temp_id":item.id,
      "temp_name":item.temp_name,
      "columns": columns
    })

  }

  ctx.body = templetList
}


//插入新模板消息
async function post(ctx, next) {
  var name = ctx.body.name
  var columns = ctx.body.columns
  var templet = {
    temp_name:name
  }
  var rs = await mysql("templet").returning("id").insert(templet)
  
  if (rs > 0) {
    ctx.body = 'success'
  } else {
    ctx.body = 'error'
  }
  
}


module.exports = {
  get,
  post
}