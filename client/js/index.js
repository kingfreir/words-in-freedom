var $ = require('jquery')
require('jquery-ui-bundle');

var chroma = require('chroma-js')
var ps = require('perfect-scrollbar');
var h2c = require('html2canvas');

var container = document.getElementById('container');
ps.initialize(container);

$('#save').click(function(){
  var color = $('body').css('background-color');
  h2c($('#main-panel'),{
    background:color,
    onrendered:function(canvas){
       var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png").replace("image/pngg", "image/octet-stream");
        a.download = 'Manifesto.png';
        a.click();
    }
  })
})

$('#edit').click(function(){
  var el = $('#canvas');
  if(el.attr('contenteditable')==='true'){
    el.attr('contenteditable','false')
  }else{
    el.attr('contenteditable','true')
  }
})

$('#range-val').change(function(){
    var val = $(this).val();
    var chromaval = chroma(+val);
    var hsvh = chroma(+val).get('hsv.h')+210;
    var cval = chroma(+val).set('hsv.h',hsvh);
    $('body').css('background',cval.hex());
    $('.sentence').css({'background-color':chromaval.hex(),'color':cval.hex()});
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

$('#range-height').change(function(){
  $('#main-panel').css({'line-height':$(this).val()});
})

$('input[type=range]').on('input', function () {
    $(this).trigger('change');
});

$('.category').click(function() {
  var id = $(this).text()
  var el = $('#'+id)
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
    $(this).append('<span class="colored canvas-text w3-hover-grayscale" style="color:'+color+'">'+text+' </span>');
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