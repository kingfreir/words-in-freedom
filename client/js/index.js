var $ = require('jquery')
var chroma = require('chroma-js')

function colorchange(val){
    var chromaval = chroma(+val);
    var hsvh = chroma(+val).get('hsv.h')+210;
    var cval = chroma(+val).set('hsv.h',hsvh);
    $('body').css({'background':cval});
    $('.shared').css({'border-color':chromaval});
    $('#title').css({'color':chromaval});
    $('.content').css({'color':chromaval});
    $('.category').css({'color':chromaval});
    $('.colored').css({'color':chromaval});
    $('.simplebar-scrollbar').css({'background':chromaval})
}

function fontSizeChange(val){
  $('#main-panel').css({'font-size':val+'em'});
}

function lineHeightChange(val){
  $('#main-panel').css({'line-height':val});
}
function openAccordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function addSentence(sentence){

  var color = $('#title').css('color');
  console.log(sentence+' '+color);
  $('#main-panel').append(
    '<span class="colored w3-hover-grayscale" style="color:'+color+'">'+sentence+' </span>'
    +'<div class="w3-display-topright" style="display:none">&times;</div>'
  );
}