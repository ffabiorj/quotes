(function() {
    "use strict";


    var $button = document.querySelector('[js-data="button"]');
    var $twitter = document.querySelector('[js-data="twitter"]');
    
    onLoadText();
    
    function openURL(url) {
        window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
    }

    function takeContent() {
        var textP = document.getElementsByTagName('p')[0];
        return textP.textContent;
    }
    // encode uri to url on browser
    function ajustadoEncodeURIComponent (str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
          return '%' + c.charCodeAt(0).toString(16);
        });
    }

    $twitter.addEventListener('click', function(){
        openURL('https://twitter.com/intent/tweet?hashtags=quotes&text='+ ajustadoEncodeURIComponent(takeContent()));
    });

    // load data from json file
    function onLoadText() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/data.json', true);
        ajax.onreadystatechange = function () {
            if(ajax.readyState === 4 && ajax.status === 200) {
                var data = JSON.parse(ajax.responseText);
                var leng = Object.keys(data).length;
                var randomPhrases = Math.floor(Math.random() * leng + 1);
                document.getElementById('phrases').innerHTML = data[randomPhrases];
            }
        };
        ajax.send();
    }
    
    $button.addEventListener('click', function(){
        changeColor();
        onLoadText();
    });
    
    function randomColor() {
        return '#' + Math.random().toString(16).slice(2, 8);
     }
    
    function changeColor() {
        document.body.style.backgroundColor = randomColor();
    
    }
    
}());