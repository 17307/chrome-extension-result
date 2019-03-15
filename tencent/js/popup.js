var bg = chrome.extension.getBackgroundPage();
var cos = bg.cos
var Bucket = bg.Bucket
var Region = bg.Region

var file;
var key;

// 监听选文件
document.getElementById('file-selector').onchange = function () {
    file = this.files[0];
    //console.log(file);
    var ran_file = Math.random().toString(16).substr(2);
    key = ran_file + '-' + file.name;
    console.log(key);
    $('#file-name').text(file.name);
    if (!file) return;

};

$('#submit').click(
    function(){
        console.log(file,key)
        //分片上传文件
        cos.sliceUploadFile({
            Bucket: Bucket,
            Region: Region,
            Body: file,
            Key: 'o1hy/'+key
        }, function (err, data) {
            console.log(err, data);
            $("#result").html('ImgUrl: ' + data.Location);
        })
    }
);


$('#href').click(
    function(){
        chrome.windows.create({
            url : 'history.html',
            type : 'normal'
        })
    }
)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // console.log(request);
        $("#result").text(request.url);
        sendResponse(request);
        if(request.fileName){
            console.log(request.fileName['current']);
            $('#result').html(request.fileName['current'])
        }
  });
