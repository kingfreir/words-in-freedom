var $ = require('jquery')
require('jquery-ui-bundle');

var chroma = require('chroma-js')
var ps = require('perfect-scrollbar');
var h2c = require('html2canvas');

var container = document.getElementById('container');
ps.initialize(container);

// block enter key
$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

$('#save').click(function(){
  var color = $('body').css('background-color');
  h2c($('#main-panel'),{
    background:color,
    onrendered:function(canvas){
       var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        a.download = 'Manifesto.png';
        a.click();
    }
  })
})

$('#edit').click(function(){
  var el = $('#canvas');
  if(el.attr('contenteditable')==='true'){
    el.attr('contenteditable','false')
    $(this).text('EDIT')
    $('.canvas-text').draggable('enable')
  }else{
    el.attr('contenteditable','true')
    $(this).text('DONE')

    $('.canvas-text').draggable('disable')
  }
})

$.fn.cleanCanvas = function() {

}

$('#range-val').change(function(){
    var val = $(this).val();
    var chromaval = chroma(+val);
    var hsvh = chroma(+val).get('hsv.h')+210;
    var cval = chroma(+val).set('hsv.h',hsvh);
    $('body').css('background',cval.hex());
    $('.sentence').css({'background-color':chromaval.hex(),'color':cval.hex()});
    $('.reversed').css({'background-color':cval.hex(),'color':chromaval.hex()});
    $('.bordered').css('border-color',chromaval.hex());
    //changing color using jquery ui animate
    $('.title').animate({'color':chromaval.hex()},10);
    $('.content').css('color',chromaval.hex());
    $('.category').css('color',chromaval.hex());
    $('.colored').css('color',chromaval.hex());
})

$('#range-font').change(function(){
  $('#main-panel').css({'font-size':$(this).val()+'em'});
})

$('#range-rotation').change(function(){
  $('.selected').css({
    '-webkit-transform':'rotate('+$(this).val()+'deg)',
    '-moz-transform':'rotate('+$(this).val()+'deg)',
    '-ms-transform':'rotate('+$(this).val()+'deg)',
    'transform':'rotate('+$(this).val()+'deg)'
  });
})

$('#canvas > span').click(function() {
  $('#canvas > span.selected').removeClass('selected')
  $(this).addClass('selected')
})

$('#range-height').change(function(){
  $('#main-panel').css({'line-height':$(this).val()});
})

$('input[type=range]').on('input', function () {
    $(this).trigger('change');
});

$('#font-select').change(function(){
  var font = $(this).val();
  $('#canvas').css('font-family',font)
})

$('#show-add').click(function(){
  var el = $(this).next();
  if (!el.hasClass('w3-show')) {
      el.addClass('w3-show');
  } else {
      el.removeClass('w3-show')
  }
})

$('#add-new').click(function(){
  var el = $('#new-sentence')
  var sentence = el.val();
  var bg = $('body').css('background')
  var fg = $('#title').css('color');

  $("[id='Your Words']").append('<span class="sentence draggable" style="background-color:'+fg+';color:'+bg+'">'+sentence+'</span>')
  el.val('');

  $('.draggable').draggable({
    helper:'clone',
    zIndex:4,
    appendTo:'body',
    containment:$('document')
  });

  $("[id='Your Words-button']").effect('highlight');

  fetch('/data/add',{
    method:'POST',
    body:JSON.stringify({
      content:sentence
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function(response){
    if(response.ok) console.log('added')
  })
})

$('.category').click(function() {
  var id = $(this).text()
  var el = $("[id='"+id+"']")
  if (!el.hasClass('w3-show')) {
      el.addClass('w3-show');
  } else {
      el.removeClass('w3-show')
  }
  ps.update(container)
})

$('#canvas').droppable({
  accept:'.sentence',
  tolerance:'intersect',
  activate:function(event,ui){
    //drop here!
  },
  deactivate:function(event,ui){
    //hide drop here
  },
  drop:function(event,ui){
    var text = $(ui.draggable).text();
    var color = $('.colored').css('color');
    $(this).append('<span class="colored canvas-text w3-hover-grayscale" style="display:block;color:'+color+'">'+text+' </span>');
    $('.canvas-text').draggable({
      
    });
  }
})

$('.draggable').draggable({
  helper:'clone',
  zIndex:4,
  appendTo:'body',
  containment:$('document')
});