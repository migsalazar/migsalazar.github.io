---
layout: post
title: HTML5, Canvas y Matemáticas
category: javascript
tags: [plotting, math, canvas, html5]
published: false
---

Era finales del año 2008 cuando estaba por terminar mi tercer ciclo de carrera en la [FCFM](http://www.fcfm.uanl.mx/){:target="_blank"}; en aquel entonces cursaba la materia "*Programación Orientada a Objetos*" haciendo uso del lenguaje [JAVA](https://java.com/en/download/faq/develop.xml){:target="_blank"} y una de nuestras asignaciones finales era la de construir una pequeña aplicación donde se implementaran los temas aprendidos.

Aunque en ese momento no alcanzaba a comprender totalmente los conceptos y las situaciones que involucran mecanismos como la [herencia](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)){:target="_blank"}, logré abstraer algunos conceptos y plantear un pequeño modelo. Tiempo después, recapitulando, he pensado que la POO no era lo más adecuado *-al menos no a ese nivel-* para lo que deseaba construir... para no perder el punto, esa discusión la dejaré para otro post.

# El proyecto
Básicamente trataba de un pequeño [applet](https://docs.oracle.com/javase/tutorial/deployment/applet/){:target="_blank"} de JAVA que evaluaba y graficaba funciones matemáticas.

Hoy en día decir algo como *"- construiré un applet para implementarlo en la web"* suena como *"- Te envío un SMS"*... <del>¿Qué joda es un SMS?</del>. Así que he intentado explorar algunas alternativas...

# Canvas HTML5
[Canvas](http://www.w3schools.com/html/html5_canvas.asp){:target="_blank"} es un elemento de HTML5 que nos sirve para dibujar "lineas" vía scripting (Javascript) en un navegador web. Al acceder a este elemento podemos hacer uso de un conjunto de métodos que nos ayudan a trazar elementos como lineas, cuadros, circulos, etc.

En w3schools podemos encontrar [un tutorial completo](){:target="_blank"} para el manejo de cavas.

# Trazando
Primeramente necesitamos construir nuestro elemento en el HTML; a este elemento le asignamos propiedades básicas (id, ancho y alto), así como un pequeño mensaje en caso de que el navegador del usuario no tenga soporte para HTML5:

{% gist 19acf5cd09628fdd88f15d48d8bda4b5 %}

Con nuestro elemento `canvas` en el HTML, podemos acceder al contexto:

{% gist 40ca481b7163a6962bea6ba3b942ee68 %}

A partir de este punto, podemos hacer uso de los métodos para el trazado. Para los fines, básicamente necesitamos los siguientes métodos:

  - `beginPath()`: Begins a path, or resets the current path.
  - `moveTo()`: Moves the path to the specified point in the canvas, without creating a line.
  - `lineTo()`:	Adds a new point and creates a line to that point from the last specified point in the canvas
  - `stroke()`:	Actually draws the path you have defined

El listado completo de los métodos y propiedades, lo podemos encontrar en [w3schools](http://www.w3schools.com/tags/ref_canvas.asp){:target="_blank"}.



# Plano cartesiano
Un punto importante a destacar es el trabajo con las coordenadas del canvas; desde el punto de vista del elemento canvas el sistema de coordenadas funciona de la siguiente manera:

<!-- imagen aqui -->

Sin embargo, desde el punto de vista de un plano cartesiano, debería establecerse el origen en el centro:

<!-- imagen aqui -->

Por lo cual debemos realizar una transformación del punto (0, 0) del canvas al (0,0) del plano cartesiano.
