/*****************************************************************************
 * casual-markdown-page - view markdown as web page
 * last updated on 2022/12/28, v0.62. 
 *
 * Copyright (c) 2022, Casualwriter (MIT Licensed)
 * https://github.com/casualwriter/casual-markdown
*****************************************************************************/

//=== toggle HTML in right-panel. (this is a hidden function for developer)
function toggleHTML() {
  var html = document.getElementById('right-panel').innerHTML
  if (html.substr(0,5)=='<xmp>') {
     document.getElementById('right-panel').innerHTML = html.substr(5, html.length-11)
  } else {
     document.getElementById('right-panel').innerHTML = '<xmp>' + html.replace(/xmp\>/g,'xmp&gt;') + '</xmp>' 
  }
}

//=== apply dark mode style
function darkmode() {
  var css = document.getElementById('theme').textContent
  var dark = ' body, pre, code { background:#333!important; color:#ccc!important } '
  dark += '\n #header, a  {background:#555;} th, tr:nth-child(even) {color:#333} '
  dark += '\n .active { color:white!important } #left-panel {background:#444;}  ' 
  document.getElementById('theme').textContent = (css===(md.yaml.style||'')? dark : md.yaml.style||'')
}

//=== load and parser markdown file. 
md.load = function (fname) { 
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onload = function (e) {
  
    document.getElementById('right-panel').innerHTML = md.html(md.text=this.responseText) + '<br>'
    document.getElementById('right-panel').scrollTop = 0
    md.toc( 'right-panel', 'left-panel', { title:'none', scrollspy:'right-panel'} )
    
    document.title = document.getElementById('title').innerHTML = md.yaml.title || 'Markdown Page' 
    document.getElementById('theme').textContent = md.yaml.style ||''

    document.body.style.display='block';
    if (fname.indexOf('#')>0) location.href = fname.substr( fname.indexOf('#') ) 
	
    var i, html = ''
    for (i in md.yaml.menu) { 
       html += '<a href="' + (md.yaml.menu[i].substr(-3)==='.md'? '?file=' : '' )
       html += md.yaml.menu[i] + '">' + i + '</a>' 
    }
    document.getElementById('menu').innerHTML = html
  }
  
  xmlhttp.open("GET", fname , true)
  xmlhttp.send();
}


//=== touch event for mobile (swipe to show/hide left-panel)
if (window.innerWidth<900) {

  function toggleTOC(show) {
    var disp = document.getElementById('left-panel').style.display
    document.getElementById('left-panel').style.display = show||(disp=='none')? 'block' : 'none'
    document.getElementById('right-panel').style.display = show||(disp=='none')? 'none' : 'block' 
  }
  
  window.addEventListener( 'touchstart', function(e) { document.touch=e.changedTouches[0] } )
  
  window.addEventListener( 'touchend', function(e) { 
  	 var distX = e.changedTouches[0].clientX - document.touch.clientX
  	 var distY = e.changedTouches[0].clientY - document.touch.clientY
  	 if ( Math.abs(distY) < 15 && distX > 90 ) {
  			e.preventDefault(); 
        toggleTOC(true)
  	 } else if ( Math.abs(distY) < 15 && distX < -30 ) {
  			e.preventDefault(); 
        toggleTOC(false) 
  	 }
    } );
    
    document.getElementById('left-panel').onclick = function() {toggleTOC(false)}
    document.getElementById('title').onclick = function() {toggleTOC()} 
}
