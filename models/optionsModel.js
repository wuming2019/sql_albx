// 这个文件专门用于处理options表的数据操作
// 实现所有分类数据相关操作
var conn = require('../commen/myconn.js');

// 新增导航菜单项
exports.addMenu = (obj,callback)=>{
    let sql = 'select value from `potions` where id = 9';
    conn.query(sql,(err,results)=>{
        if(err){
            callback(err);
        }else{
             // [{"icon":"fa fa-glass","text":"奇趣事","title":"奇趣事","link":"/category/funny"},{"icon":"fa fa-phone","text":"潮科技","title":"潮科技","link":"/category/tech"},{"icon":"fa fa-fire","text":"会生活","title":"会生活","link":"/category/living"},{"icon":"fa fa-gift","text":"美奇迹","title":"美奇迹","link":"/category/travel"}]
            let jsonStr = results[0].value;
            // 将json字符串转换为js数组
            let arr = JSON.parse(jsonStr);
            // 将传入的数据添加到数组
            arr.push(obj);
            // 将添加了数据的数组重新转换为json格式字符串
            let finalStr = JSON.stringify(arr);
            // 实现数据的更新
            sql = `update options set value = ? where id = 9`;
            conn.query(sql,[finalStr],(err1) => {
                if(err1){
                    callback(err1)
                }else{
                    callback(null)
                }
            })
        }
    });
}

// 获取网站默认设置
exports.getOptions = (callback)=>{
    var sql = `select value from options where id < 9`;
    conn.query(sql,(err,results)=>{
        if(err){
            callback(err);
        }else{
            callback(null,results);
        }
    })
}

// 修改网站的设置
// { site_logo: '/assets/img/logo.png',
//   site_name: '阿里百秀 - 发现生活，发现美！11',
//   site_description: '阿里百秀同阿里巴巴有咩关系，答案当然系一啲都冇',
//   site_keywords: '生活, 旅行, 自由, 诗歌, 科技22',
//   comment_status: 0,
//   comment_reviewed: 0 }
exports.updateOptions = (obj,callback)=>{
    var cnt = 0;
    // 创建sql语句：动态生成多条sql语句
    for(let key in obj){
        let sql = `update options set value = ? where key = ?`;
        conn.query(sql,[obj[key],key],(err,results)=>{
            if(err){
                callback(err);
            }else{
                cnt ++ ;
                if(cnt == 6){
                    callback(null);
                }
            }
        })
    }
}