---
layout: post
title: HTML5, Canvas y Matemáticas
category: javascript
tags: [plotting, math, canvas, html5]
---

Era finales del año 2008 cuando estaba por terminar mi tercer ciclo de carrera en la [FCFM](http://www.fcfm.uanl.mx/){:target="_blank"}; en aquel entonces cursaba la materia "*Programación Orientada a Objetos*" haciendo uso del lenguaje [JAVA](https://java.com/en/download/faq/develop.xml){:target="_blank"} y una de nuestras asignaciones finales era la de construir una pequeña aplicación donde se implementaran los temas del curso.

Mi aplicación básicamente trataba de un pequeño [applet](https://docs.oracle.com/javase/tutorial/deployment/applet/){:target="_blank"} de JAVA que evaluaba y graficaba funciones matemáticas.

<img src="{{ site.baseUrl }}/assets/img/posts/2016-06-02-plotting-math-function-with-canvas-html5/01.png" />

Hoy en día decir algo como *"construiré un applet para implementarlo en la web"* suena como *"Te envío un SMS"*... <del>¿Qué diablos es un SMS?</del>. Así que he intentado explorar algunas alternativas...

  > Warnign: El código siguiente solo funciona para explicar la idea de los pasos a seguir. El código completo se puede encontrar en este [gist](){:target="_blank"}; es demasaido feo y necesita refactorizarse, solo debe tomarse como un prueba de concepto.

# Canvas HTML5
[Canvas](http://www.w3schools.com/html/html5_canvas.asp){:target="_blank"} es un elemento de HTML5 que nos sirve para dibujar "lineas" vía scripting (Javascript) en un navegador web. Al acceder a este elemento podemos hacer uso de un conjunto de métodos que nos ayudan a trazar elementos como lineas, cuadros, circulos, etc.

En w3schools podemos encontrar [un tutorial completo](http://www.w3schools.com/canvas/){:target="_blank"} para el manejo de cavas.

## - Contexto
Primeramente necesitamos construir nuestro elemento en el HTML; a este elemento le asignamos propiedades básicas (id, ancho y alto), así como un pequeño mensaje en caso de que el navegador no tenga soporte para HTML5:

{% gist 19acf5cd09628fdd88f15d48d8bda4b5 %}

Con nuestro elemento `canvas` en el HTML, podemos acceder al contexto:

{% gist 40ca481b7163a6962bea6ba3b942ee68 %}

## - Transformación
Un punto importante a mencionar es el trabajo con las coordenadas del canvas; desde el punto de vista del elemento canvas, visto como un rectángulo, el sistema de coordenadas tiene el punto *orgien* en el vértice superior izquierdo. Sin embargo, para el plano cartesiano requerimos que se encuentre en el centro. Asi que necesitamos trasladar este punto al centro.

<div class="img">
<img src="{{ site.baseUrl }}/assets/img/posts/2016-06-02-plotting-math-function-with-canvas-html5/02.jpg" class="fix" />
</div>

En adelante, todos los puntos evaluados en la función deben ser calculados a partir del origen.

## - Evaluar
Una vez con el contexto en memoria, se debe evaluar cada punto en la función a graficar. Los puntos a evaluar serán todas las `x` transformadas al origen del canvas.

{% gist c9232f86cc0d4f4452210d3f10c7378a %}

Cada iteración del ciclo `for` evalua la `x` en la función `f`. Suponiendo que se desee evaluar una función $$ f(x) = sin(x) + cos(2*x)/2 $$  :

  $$ f(1) = sin(1) + cos(2*1)/2 $$

  $$ f(2) = sin(2) + cos(2*2)/2 $$

  $$ f(3) = sin(3) + cos(2*3)/2 $$

Cada $$ f(x) $$ será el valor del eje $$ Y $$ y con esto generamos un conjunto de puntos:

  $$  [1, 0.51714781994],   [2, 0.53368152183] , [3, 0.54959690392],  ... $$

## - Trazar
A partir de este punto, podemos hacer uso de los métodos para el trazado. Para los fines, básicamente necesitamos los siguientes métodos:

  - `beginPath()`: Begins a path, or resets the current path.
  - `moveTo()`: Moves the path to the specified point in the canvas, without creating a line.
  - `lineTo()`:	Adds a new point and creates a line to that point from the last specified point in the canvas
  - `stroke()`:	Actually draws the path you have defined

El listado completo de métodos y propiedades, lo podemos encontrar en [w3schools](http://www.w3schools.com/tags/ref_canvas.asp){:target="_blank"}.

Agregando al código anterior los métodos para el trazado, se inicializa el contexto y en cada iteración construimos la línea del punto actual:

{% gist 9c20c11359de10a922dabf0c49f67524 %}

## - Implementación
Como se puede ver en el último fragmento de código, para calcular la $$ y $$ real se debe invocar el método `f`. Este método, se puede enviar como parámetro a la función que se encarga de generar la iteración, para tenerlo como parámetro a la hora de ser implementado. Algo como lo siguiente:

{% gist 26f1890be1b95b41703f1a38a92d58f0 %}

De este modo, `plot` será la función encargada de inicializar la gráfica; se le envía la función a evaluar y el rango sobre el cual se desea trabajar en el conjunto de las $$ X $$.

<div id="div-canvas" class="no-wrap">
  <canvas id="canvas"></canvas>
</div>

## - Test
A este ejemplo le he hecho un ligero ajuste para animar la gráfica utilizando el método `requestAnimationFrame`, su documentación se encuentra [aquí](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame){:target="_blank"}.

# Conclusión
Definitivamente muchísimas líneas de código menos con javascript, es un primer buen acercamiento con el trazado de formas en la web utilizando canvas. Aún así, me parece que da mejores resultados implementar este tipo de situaciones con [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG){:target="_blank"}, quizá para un futuro post =)

<script type="text/javascript" src="/assets/third/jQuery.appear/jquery.appear.js"></script>
<script type="text/javascript" src="/assets/js/post/2016-06-02-plotting-math-function-with-canvas-html5/canvas.js"></script>
<script type="text/javascript" src="/assets/js/post/2016-06-02-plotting-math-function-with-canvas-html5/index.js"></script>
