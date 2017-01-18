---
layout: post
title: Hardcoding. Basura para unos, tesoro para otros
category: web_scraping
tags: [hardcoding, web scraping, inegi]
---

Hace más de un año que doy clases en la [UANL](http://www.uanl.mx/){:target="_blank"}. Me resulta bastante interesante por un muchas razones que por el momento prefiero omitir. Durante este tiempo, me he dado cuenta como aprenden diferentes tipos de personas. He encontrado perfiles de todo tipo; desde los que necesitan una guía paso a paso, hasta los que se adelantan en los temas todo el tiempo.

![Image: stevenchasestudios.com]({{ site.baseurl }}/assets/img/posts/2014-09-02-hardcoding-inegi/khancoding.jpg)

Durante las clases, generalmente insisto bastante en aspectos algo teóricos tratando de no descuidar lo práctico. En ocasiones, hay quienes insisten en que lo teórico es poco relevante y prefieren omitir mucha información para llegar a la práctica sin ver un poco la teoría. No pienso que sea algo malo, me parece una manera perfecta de aprender, el aprender con el hacer... pero tampoco hay que exagerar.

El asunto aquí, es sobre los usos del lenguaje y/o herramientas, hasta la aplicación que se les dá. Sin ánimo de crítica <del>mala leche</del> negativa a los desarrolladores que empiezan (o empezamos) en algún lenguaje o framework nuevo, mi entrada viene motivada por la siguiente historia...

# Hardcoding

Ya hace tiempo que tenía *la espinita* de construir un [crawler / web spider](http://en.wikipedia.org/wiki/Web_crawler){:target="_blank"}. Siempre han llamado mi atención y que mejor si lo combinamos con otros temas como la información que se obtiene de los censos y demás.

Así que pensé en hacerle [scraping](http://en.wikipedia.org/wiki/Web_scraping){:target="_blank"} al sitio del [INEGI](http://www.inegi.org.mx/){:target="_blank"}; comencé inspeccionando el html del sitio, *despiojando* url's y variando los parámetros de las mismas url's, únicamente con la finalidad de evaluar la idea del scrapper y su complejidad.

Intenté con información económica:

<a href="{{ site.baseurl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi01.png" target="_blank"><img src="{{ site.baseUrl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi01.png" width="600" height="365" /></a>

Hasta aquí me pareca que podría funcionar, los parámetros de la url no necesitan alguna *traducción* y al variar la url arroja diferentes tablas. Es un buen comienzo.

Entonces, revisé un poco ms a fondo sobre los censos económicos, puntualmente, del 2009; aquí parece haber una mezcla de tecnologías. Dentro de cada página hay muchos frames y archivos `swf` embebidos:

<a href="{{ site.baseUrl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi02.png" target="_blank"><img src="{{ site.baseUrl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi02.png" width="600" height="364" /></a>

Para indagar que contenido tienen estos archivos embebidos, se puede utilizar cualquier herramienta web para decodificar cada archivo y ver el contenido de las funciones. Echo un vistazo rápido con [ShowMyCode](http://www.showmycode.com/){:target="_blank"}, una herramientilla que me acabo de encontrar <del>entre los arbustos</del> por ahí.

Dentro de estos *embebidos*, aparecen rutas que apuntan a archivos de excel. Supongo están al mismo nivel de directorio de la ruta de la página, pero da igual...

<a href="{{ site.baseUrl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi03.png" target="_blank"><img src="{{ site.baseUrl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi03.png" width="600" height="471" /></a>

En fin, sigo indagando... Así como archivos físicos, veo que también hay algunas opciones para exportar a `xlsx`. Entonces, descargo un par de ellos, para ver su tamaño, comparar la información con la de la página y quizá podría inyectar algunos *bot-clicks* con javascript; quizá sea útil descargar automáticamente estos archivos. O incluso, un [mágico](https://www.gnu.org/software/wget/) `wget` podría funcionar, pero... *nah que flojera*.

Entonces... quizá haya algo interesante en el HTML que <del>escupe</del> arroja alguno de los enlaces que están ligados al `post` de los botones de exportar, para ir directo a los archivos. Incluso, estos archivos muy probablemente sean generados dinámicamente -*al vuelo*-.

( **Update 21/05/2016**: El enlace del párrago siguiente, lo han deshabilitado. Pero alcancé a tomar un screenshot...*)

Y es entonces que me encuentro [esta url](http://www.inegi.org.mx/est/contenidos/espanol/proyectos/censos/ce2009/saic/exportar.asp?Cuadro=INEGI.+Censos+Econ%C3%B3micos+2009.+Resultados+definitivos&amp;Censo=2009&amp;Nacional=&amp;vcampo=H001A&amp;Sector=23&amp;c=17166&amp;Genera=1&amp;formato=Hoja+de+C%C3%A1lculo+Excel%28.xls%29&amp;Modelo=SCIAN&amp;Grupo=AA&amp;Municipio=01001){:target="_blank"} que descarga en automático un archivo excel; la url no apunta al archivo físico, mas bien, va a un documento de HTML que visualmente está en blanco y sin contenido:

<a href="{{ site.baseUrl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi04.png" target="_blank"><img src="{{ site.baseUrl }}/assets/img/posts/2014-09-02-hardcoding-inegi/inegi04.png" width="600" height="212" /></a>

Nótese lo señalado con la flecha y las líneas previas... No solo hay consultas SQL en hiddens, también una [cadena de conexión](https://www.connectionstrings.com/)!.

**HTML**, definitivamente, **no es para almacenar ese tipo de información**, esto debería estar escrito en otro lugar. No sé cual haya sido la razón de hacerlo de esa manera; quiero suponer que está ligado con el modo en que se generan los documentos en excel, que a juzgar por el resto del html, es lógico que se construyen dinámicamente y no son archivos físicos en disco. Pero de cualquier forma, esto último no lo justifica...

En definitiva, esto se trata de crítica constructiva. Mi intención y mensaje es que **se debe prestar atención y, aunque para algunos puede no importar, habrá quienes sacarán el mayor provecho de estas malas prácticas y mal uso de los lenguajes y/o herramientas**. Es por esto que en ocasiones es importante conocer un mínimo suficiente de teoría.

Finalmente, siento decepcionarlos, pero dejé la idea del scraper para el INEGI *ba dum tss!*. Encontré este proyecto: [INEGI Fácil](http://inegifacil.com/){:target="_blank"}, y me ha parecido bastante interesante.
