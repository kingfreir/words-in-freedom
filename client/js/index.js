var $ = require('jquery')
var chroma = require('chroma-js')

$('#range-val').change(function(){
    var val = $(this).val();
    var chromaval = chroma(+val);
    var hsvh = chroma(+val).get('hsv.h')+210;
    var cval = chroma(+val).set('hsv.h',hsvh);
    $('body').css({'background':cval});
    $('.shared').css({'border-color':chromaval});
    $('#title').css({'color':chromaval});
    $('.content').css({'color':chromaval});
    $('.category').css({'color':chromaval});
    $('.colored').css({'color':chromaval});
})

$('#range-font').change(function(){
  $('#main-panel').css({'font-size':$(this).val()+'em'});
})

$('#range-height').change(function(){
  $('#main-panel').css({'line-height':$(this).val()});
})

$('.category').click(function() {
  var el = $(this).next();
    if (!el.hasClass('w3-show')) {
        el.addClass('w3-show');
    } else {
        el.removeClass('w3-show')
    }
})

$('.sentence').click(function(){
  console.log('content click '+$(this).text())
  var sentence = $(this).text();
  var color = $('#title').css('color');
  $('#main-panel').append(
    '<span class="colored w3-hover-grayscale" style="color:'+color+'">'+sentence+' </span>'
    +'<div class="w3-display-topright" style="display:none">&times;</div>'
  );
})