
function a2(){
    console.log('aaaaaaaaaaaaaa2')

    document.getElementById('source_text').value = '';
}

function al(){
    
    message = document.getElementById('source_text')
    // console.log(message.value)
    d = document.getElementById('source');
    // console.log(d.value)
    d.value = message.value;
    console.log('aaaaaaaaaaaaaa1')
}


var button_clear = document.getElementById('clear');
button_clear.onclick = a2;

var button_b = document.getElementById('aiyaya');
// button_b.addEventListener('click',al);
button_b.onclick = a1;

