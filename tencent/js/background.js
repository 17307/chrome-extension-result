//tencent COS 初始化类
var Bucket = ''; //你的实例名
var Region = ''; //所在地区

var getAuthorization = function (options, callback) {
// 格式四、（不推荐，适用于前端调试，避免泄露密钥）前端使用固定密钥计算签名
    var authorization = COS.getAuthorization({
        SecretId: '', // ID
        SecretKey: '', // key
        Method: options.Method,
        Pathname: options.Pathname,
        Query: options.Query,
        Headers: options.Headers,
        Expires: 900,
    });
    callback({
        Authorization: authorization,
    });
};

var cos = new COS({
    getAuthorization: getAuthorization
});


//base64图片转成blob对象，COS支持这种类型
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}

//根据网址获取图片base64
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+'png');
    return dataURL;
}

function click2(params){

    var img = params.srcUrl;
    
    var image = new Image();
    image.crossOrigin = '';
    image.src = img;
    image.onload = function(){
        //获得 base64
        var base64 = getBase64Image(image);
        // console.log(base64);

        //获取文件后缀
        base64_pre = base64.split(',')[0]
        base64_pre = base64_pre.split(';')[0]
        base64_pre = base64_pre.split('/')[1]
        //随机文件名称
        var file_pre = Math.random().toString(16).substr(2);
        var file_suf = Math.random().toString(16).substr(2,4);
        key = 'o1hy/'+ file_pre + '-' + file_suf + '.' + base64_pre
        // console.log(key)

        // base64 转 blob
        blog_file = dataURItoBlob(base64);

        // 分片上传文件
        cos.sliceUploadFile({
            Bucket: Bucket,
            Region: Region,
            // TO-DO
            // 需要搞定存储名，防止覆盖
            Key: key, 
            Body: blog_file,
            ContentType: 'image/png'
        }, function (err, data) {
            // TO-DO 
            //需要返回给popup.html
            //console.log(err, data);
            //弹出popup
            initPopupPage(undefined,(win)=>{
                //console.log(win)
                //取不到
                // var views = chrome.extension.getViews({type:'popup'});
                // console.log(views);
                const tabId = win.tabs[0].id;
                //console.log(tabId)
                chrome.tabs.onUpdated.addListener(function (id , info) {
                    if (info.status === 'complete' && id === tabId) {
                        var views = chrome.extension.getViews({type:'tab'});
                        console.log(views);
                        chrome.tabs.sendMessage(tabId,{'url':data.Location},(data)=>{
                            //console.log(data);
                        });
                    }
                }); 
            });
            
        });
    }
}

function initPopupPage(url = 'popup.html', callback) {
    var w = 800;
      var h = 550;
      var left = Math.round((screen.width / 2) - (w / 2));
      var top = Math.round((screen.height / 2) - (h / 2));
      chrome.windows.create({
          url : url,
          width : w,
          height : h,
          focused : true,
          'left' : left,
          'top' : top,
          type : 'popup'
      }, callback);
  }

//下载功能
function click(params){
    //alert(params.srcUrl);

    var downloadOptions = {
        "url" : params.srcUrl,
        "saveAs" : false
    };

    chrome.downloads.download(downloadOptions,function(downloadId) {
        console.log(downloadId);
    });

    console.log(params);
}

chrome.contextMenus.create({
    title: "Tencent COS",
    contexts: ['image'], 
    onclick: function(params){
        click2(params)
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
	
    //console.log('hahha');
	var w = 800;
	var h = 550;
	var left = Math.round((screen.width / 2) - (w / 2));
	var top = Math.round((screen.height / 2) - (h / 2));
	chrome.windows.create({
		url : 'popup.html',
		width : w,
		height : h,
		focused : true,
		'left' : left,
		'top' : top,
		type : 'popup'
	});
});



// var filename;
// chrome.downloads.onChanged.addListener(
//     function(downloadItem){
//     if(downloadItem['filename']){filename=downloadItem['filename']};
//     if(downloadItem['endTime']){
//         filename = filename['current']
//         filename_list = filename.split('.');
//         // console.log(downloadItem);
        
//         if(filename_list[filename_list.length-1]=="jpg"||filename_list[filename_list.length-1]=="png"){
//         initPopupPage(undefined,(win)=>{
//             //console.log(win)
//             //取不到
//             // var views = chrome.extension.getViews({type:'popup'});
//             // console.log(views);
//             const tabId = win.tabs[0].id;
//             //console.log(tabId)
//             chrome.tabs.onUpdated.addListener(function (id , info) {
//                 if (info.status === 'complete' && id === tabId) {
//                     var views = chrome.extension.getViews({type:'tab'});
//                     console.log(views);
//                     chrome.tabs.sendMessage(tabId,{'fileName':filename},(data)=>{
//                         console.log(data);
//                     });
//                 }
//             }); 
//         });
//     }

//     }
//     }
// )