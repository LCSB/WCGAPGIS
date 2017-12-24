const { mysql } = require('../qcloud')


//查询节点详细数据
/**
 * params 
 * tempId 模板ID
 * fixed 固定节点列ID
 */
async function get(ctx, next) {
  var param = ctx.query
  var collect_list = []
  var fixedValue = await mysql("fixed_attribute").where({ "temp_id": param.tempId}).first()

  var collects = await mysql.select('column_comment','column_datatype','value').from("templet_column").leftJoin("collect_data",function(){
    this.on('templet_column.id', '=', 'collect_data.column_id').onIn('templet_column.temp_id', [param.tempId]).onIn('collect_data.fixedId', param.fixedId)
  })

  collect_list.push({
    "name": fixedValue.name,
    "longitude": fixedValue.longitude,
    "latitude": fixedValue.latitude,
    "address": fixedValue.address,
    "image": fixedValue.image,
    "collects": collects
  })

  ctx.body = collect_list
}

//增加节点数据
async function post(ctx,next) {
  var params = ctx.request.body
  var fixed = {
    name: params.name,
    addrss: params.addrss,
    latitude: params.latitude,
    longitude: params.longitude,
    image: params.image,
    temp_id: params.temp_id
  }
 
  var collects = params.columns

  var id = await mysql("fixed_attribute").returning("id").insert(fixed)
  //var fix = await mysql("fixed_attribute").where({ temp_id: params.temp_id }).first()
  if (id>0) {
    var collect_list = []
    for (var collect of collects) {
      collect_list.push({
        column_id: collect.id,
        value: collect.value,
        fixedId: id
      })
    }

    var rs = await mysql("collect_data").returning("id").insert(collect_list)
    if (rs>0) {
      ctx.body = "success"
    } else {
      ctx.body = "error"
    }
  }
}

module.exports = {
  post,
  get
}
