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

//增加模板
async function post(ctx,next) {
  var params = ctx.request.body
  var temp_name = params.temp_name
  var columns = params.columns
  var res = await mysql("templet").where({ "temp_name": temp_name}).first()
  if (res != null) {
     ctx.body = "模板已经存在！"
  } else {
    var templet = {
      temp_name: temp_name
    }
    var id = await mysql("templet").returning("id").insert(templet)
    if (id > 0) {
      //var fixedId = await mysql("fixed_attribute").returning("id").insert({ temp_id: id })
     // if (fixedId > 0) {
        var column_list = []
        for (var column of columns) {
          column_list.push({
            temp_id: id,
            column_comment: column.column_comment,
            column_datatype: column.column_datatype
          })
        }

        //动态字段
        var rs = await mysql("templet_column").returning(['id', 'temp_id', 'column_comment', 'column_datatype']).insert(column_list)
        if (rs > 0) {
          var columns = await mysql("templet_column").where({ "temp_id": id })
          var templetList = []
          templetList.push({
            "temp_id": id,
            "temp_name": temp_name,
            "columns": columns
          })
          ctx.body = templetList
        } else {
          ctx.body = "error"
        }

     // }

    }
  }
  
}


module.exports = {
  post,
  get
  
}