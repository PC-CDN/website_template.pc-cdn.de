---
layout: none
title: Example Template
h2title: Example headline
h3title: lorem ipsum dolor tres amet
h4title: lorem ipsum dolor quadro amet 
text: lorem ipsum contentus exemplarus
permalink: /content/themes/light-template/index.html
themelogo: ""
---
<html>
<head>
<title>{{ page.title | default: site.name }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://template.pc-cdn.de/assets/fontawesome/css/all.css">
<link rel="stylesheet" href="https://template.pc-cdn.de/content/themes/light-template/style.css">

</head>
<body>

<div class="header">
  <h2 style="text-align:center;"><i style="font-family:Verdana,sans-serif;font-weight:150; ">{{ page.h2title | default: site.name }}</i></h2>
  <h4 style="text-align:center;"><i style="font-family:Arial,sans-serif;font-weight:50; ">{{ page.h4title | default: site.name }}</i></h4>
</div>

<div class="row">
  <div class="col-3 col-s-3 menu">
{% include navigation.html %}
  </div>

  <div class="col-6 col-s-9">
    <h3>{{ page.h3title | default: site.name }}</h3>
    <p>{{ page.text | default: site.name }}</p>
  </div>

  <div class="col-3 col-s-12">
    <div class="aside">
      Hello World 
      <!-- origin: https://github.com/ervkgithub/html-css-js-jquery/blob/master/Blink-text-responsive.html -->
    </div>
  </div>
</div>

<div class="footer">
  {% include page-footer.html %}
</div>

</body>
</html>
