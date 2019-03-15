function al(){
    d = document.getElementById('source');
    message = document.getElementById('source_text')
    console.log(message.value)
    d.value = message.value;

}

function a2(){

    document.getElementById('source_text').value = '';
}


var button_b = document.getElementById('translate');
button_b.onclick = al;

var button_clear = document.getElementById('clear');
button_clear.onclick = a2;