// 这个模块专门实现文件上传功能
const formidable = require('formidable');
const path = require('path');

exports.uploadFile = (req,res)=>{

    
    // 使用formidable实现文件上传
    // 创建文件上传对象
    var form = new formidable.IncomingForm();
    // 设置编码
    form.encoding = 'utf-8';
    // 设置文件存储目录
    // 路径一定要设置正确
    form.uploadDir = __dirname + '/../uploads';
    // 设置保留文件扩展名
    form.keepExtensions = true;
    // 调用方法实现文件上传
    // req：请求报文，传递的文件数据就是在请求报文的请求头里面
    // fields：普通键值对
    // files： 文件上传完成之后的相关信息
    form.parse(req,(err,fields,files)=>{
        if(err){
            
            res.json({
                code:400,
                msg:'文件上传失败',
            })
            // console.log(err);
        }else{
            // console.log(fields);
            // console.log(files.img.path);
            var imgname = path.basename(files.img.path);
            res.json({
                code:200,
                msg:'文件上传成功',
                img: imgname
            })
        }
    });
}