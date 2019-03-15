function add_url(url){
    console.log(url)
    $('.row').append("<div class=\"col-md-2 animated fadeInUp\"><div class=\"page-content fancybox\" title=\"<input type='text' class='form-control imgsrc' value="+url+">\" data-fancybox-group=\"gallery\" rel=\"gallery\" href="+url+"  style=\"background-image:url("+url+")\"></div></div>")
}
var bg = chrome.extension.getBackgroundPage();
var cos = bg.cos
var Bucket = bg.Bucket
var Region = bg.Region


cos.getBucket({
    Bucket: Bucket, 
    Region: Region,     
    Prefix: 'o1hy/',  
}, function(err, data) {
    //console.log(err || data.Contents);
    var contents = data.Contents
    
    for(i=0;i<contents.length;i++){
        //console.log(contents[i].Key)
        var t_url = cos.getObjectUrl({
            Bucket: Bucket, 
            Region: Region,
            Key: contents[i].Key,
            Sign: false
        })
        add_url(t_url)
    }
});


$(".fancybox").fancybox({
    maxWidth: 1000,
    openEffect: 'fade',
    closeEffect: 'elastic',
    helpers: {
        title: {
            type: 'inside'
        }
    }
});