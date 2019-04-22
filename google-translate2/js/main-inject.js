// 向页面注入JS
function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    // console.log(document)
    document.body.append(temp);
}

function injectText(){

    var temp = document.createElement('input');
    temp.type = 'text';
    // temp.value = '';
    temp.id = 'source_text';
    temp.className = 'tlid-source-target main-header'
    temp.style = "border-bottom-width:0;height: 20px;padding-top: 0px;width: 50%; margin-top: 8px;"
    document.getElementsByClassName('tlid-result-view cllist')[0].append(temp);
    // document.body.append(temp);

    temp = document.createElement('button');
    temp.textContent = 'Translate';
    temp.id = 'my-trans'
    temp.className="tlid-input-button input-button header-button tlid-input-button-text"
    temp.style="padding-left: 16px; height: 24px;left: 10px;"
    document.getElementsByClassName('tlid-result-view cllist')[0].append(temp);
    // document.body.append(temp);

    temp = document.createElement('button');
    temp.textContent = 'Clear';
    temp.id = 'clear'
    temp.className="tlid-input-button input-button header-button tlid-input-button-text"
    temp.style="padding-left: 16px; height: 24px;left: 10px;"
    document.getElementsByClassName('tlid-result-view cllist')[0].append(temp);
    // document.body.append(temp);

   
}

injectCustomJs();
injectText();