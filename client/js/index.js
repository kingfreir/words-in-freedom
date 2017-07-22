var $ = require('jquery')
require('jquery-ui-bundle');

var chroma = require('chroma-js')

$('#range-val').change(function(){
    var val = $(this).val();
    var chromaval = chroma(+val);
    var hsvh = chroma(+val).get('hsv.h')+210;
    var cval = chroma(+val).set('hsv.h',hsvh);
    $('body').css('background',cval);
    $('.shared').css('border-color',chromaval.hex());
    //changing color using jquery ui animate
    $('#title').animate({'color':chromaval.hex()},10);
    $('.content').css('color',chromaval.hex());
    $('.category').css('color',chromaval.hex());
    $('.colored').css('color',chromaval.hex());
})

$('#range-font').change(function(){
  $('#main-panel').css({'font-size':$(this).val()+'em'});
})

$('#range-height').change(function(){
  $('#main-panel').css({'line-height':$(this).val()});
})

$('input[type=range]').on('input', function () {
    $(this).trigger('change');
});

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

$('#main-panel').draggable()