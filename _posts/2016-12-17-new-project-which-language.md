---
layout: post
title: ¿Qué lenguaje y herramientas debo elegir?
category: software
tags: [languages, software, software development]
---

Ya casi se acaba el año y no quiero dejar pasar la Navidad sin poder regalarles un comentario :B

Ha sido bastante variable este período -al menos para mí-, pasando de horarios muy rigurosos a otros más flexibles y me ha llevado a tener la oportunidad de participar en más ideas o proyectos con más variaciones y diferentes contextos. Esto mismo, ha ocasionado que participe en el inicio de un proyecto y, desde el lado técnico, partiendo de la decisión del [stack](https://en.wikipedia.org/wiki/Solution_stack) completo de herramientas y lenguajes a utilizar.

Quiero *rescatar* algunos puntos que nosotros, en [Devian](http://www.devianlabs.com), tomamos en cuenta sobre el lenguaje y herramientas a utilizar en un proyecto de software. Trataré de ir en orden de importancia, pero no necesariamente tiene que aplicar para todos los casos.

# Entorno
En muchas ocasiones no tenemos restricciones por el conjunto de tecnologías, frameworks y/o herramientas a utilizar. Pero si es así, no tenemos otra opción más que adecuar nuestros conocimientos a estas.

Por ejemplo, tener un cliente específico que ya ha experimentado con alguna herramienta y ha decidido basar su línea de trabajo sobre ella; supongamos que cuenta con un Windows Server, sin poder instalar [Passenger](https://www.phusionpassenger.com/) o [Puma](http://puma.io/) para [Rails](http://rubyonrails.org/) o [Gunicorn](http://gunicorn.org/) para [Flask](http://flask.pocoo.org/)/[Django](https://www.djangoproject.com/), mucho menos alguno de los anteriores con [Nginx](https://www.nginx.com/) y forzados a utilizar únicamente [IIS](https://www.iis.net/). [Quizá no podríamos](http://www.hanselman.com/blog/AnnouncingRunningRubyOnRailsOnIIS8OrAnythingElseReallyWithTheNewHttpPlatformHandler.aspx) *instalar* algo construido en Ruby o Python y únicamente tenemos disponible tecnología de [ASP .NET](https://www.asp.net/) ya sea con C# o VB.

No importa cual sea la restricción del lenguaje, el caso es que tenemos una. En este punto deberíamos considerar los [requerimientos de sistema](https://en.wikipedia.org/wiki/System_requirements) de cada herramienta.

# Equipo
Definitivamente este es uno de los puntos más importantes a considerar. Las aplicaciones seguirán siendo construidas por personas *-al menos por ahora-* y son estas quienes aportarán su conocimiento. Así que, el equipo es sumamente importante.

Si la tecnología no es un restricción, lo ideal es utilizar el [stack](https://en.wikipedia.org/wiki/Solution_stack) de herramientas y lenguajes donde el equipo se mueva mejor. Esto suprimirá cualquier tiempo por la curva de aprendizaje y aportará experiencia de lecciones aprendidas en el pasado.

Por el contrario podemos vernos forzados en adoptar una nueva tecnología, lo cual no es fácil para un equipo completo, si no llega a adaptarse pronto podría perder de vista el objetivo. Pero tampoco es imposible adaptarse, siempre debería ser lo esperado.

Los saltos de adopción de tecnología deben hacerse con cuidado. Quizá una buena opción es acercándose mediante tecnologías similares hasta conseguir el [stack](https://en.wikipedia.org/wiki/Solution_stack) completo de algo paralelo a lo que conocemos. Siempre es importante que un equipo se mantenga actualizado y de manera individual los integrantes deben mantenerse en constante preparación.

Supongamos, por ejemplo, que requerimos utilizar Java para un nuevo proyecto; es más fácil que alguien con experiencia en C# se mueva a Java, que alguien con experiencia en Ruby pase a Java. O supongamos que estamos por utilizar [Laravel](https://laravel.com/), sería más sencillo adoptarlo para alguien que conoce [ASP .NET](https://www.asp.net/) que alguien para alguien que esta acostubrado a [Django](https://www.djangoproject.com/).

En fin, múltiples ejemplos pueden mencionarse, pero el punto es que habrá tecnologías similares y otras no tanto, que puede costarnos más el aprendizaje.

# Consumo
Este punto quizá va de la mano con el entorno, pero preferí separarlo. La tecnología a desarrollar va depender del tipo de consumo que se pretenda generar para algún producto de software.

Hay casos donde podemos compartir funcionalidades entre diferentes entornos. Por ejemplo, visualización resumida en móvil y un detalle más sofisticado en la web. Sin embargo, habrá casos que tengan un uso específico.

Por ejemplo, Whatsapp funciona treméndamente bien en móvil, pero por el contrario su versión web no es del todo popular y aceptada; de igual forma Instagram tiene más empuje en su versión móvil que la versión web; además puede enfocarse a usuarios de [iOS](http://www.apple.com/ios/ios-10/) ([utilizando Swift](https://developer.apple.com/swift/)) o usuarios de Android ([utilizando el SDK de Android para JAVA](https://developer.android.com/index.html)). Quizá no se requiera una app nativa y podemos optar por algo como [Ionic](https://ionicframework.com/), [PhoneGap](http://phonegap.com/), o cualquiera cosa que se les ocurra que esté construido sobre [Cordova](https://cordova.apache.org/), o quizá [Xamarin](https://www.xamarin.com/), etc.

En otro escenario, pensemos en algo totalmente diferente: un [ERP](https://en.wikipedia.org/wiki/Enterprise_resource_planning) para una planta de manufactura; quizá lo mas útil podría ser una aplicación web.

En definitiva, el consumo que se busque generar podría hacernos replantear el conjunto de herramientas a utilizar.

# Ecosistema
Otro punto importante, es el *nivel* de ecosistema que tenga algun lenguaje o herramienta. Una vez que evaluemos los puntos anteriores, tenemos que pensar que tan fuerte es la comunidad que apoya o utiliza el lenguaje y herramienta deseada. Seguramente vamos a requerir ayuda ya sea para mejorar, refactorizar o corregir posibles fallos de nuestro código.

Debemos indagar un poco la cantidad de desarrolladores. Aquí podemos apoyarnos de [github](https://www.github.com) midiendo [los repositorios, forks, stars, pull request, etc. de algun lenguaje a través del tiempo](http://githut.info/). También sirve mucho indagar la cantidad de preguntas en stackoverflow. Y obviamente, la cantidad de documentación que haya al respecto.

Por otra parte, aunque un poco menos importante pero útil, ayuda mucho tener la información sobre el costo de incluir un nuevo miembro con ese conocimiento particular al equipo. Es decir, en pocas palabras, ¿Cuánto gana un desarrollador de X lenguaje/herramienta?.

Con esta información y observando la evolución de los lenguajes, podemos entonces pensar un poco el futuro que tiene. Todos sabemos [lo que les pasó](https://www.quora.com/Adobe-Flash-How-did-Flash-die-so-quickly) a los desarrolladores de [Flash](http://www.adobe.com/software/flash/about/) y [ActionScript](http://www.adobe.com/devnet/actionscript.html).

Todo lo anterior nos lleva a voltear a ver a la empresa o comunidad que se encuentre detrás del desarrollo de alguna herramienta y/o lenguaje. Aquí pudieramos extendernos en términos como [vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in) y entre otros debates, pero no es la intención del post.


# Filosofía y Paradigma
El mismo lenguaje en sí podría darnos restricciones o ventajas. Y aunque en la mayoría de las ocasiones es cuestión de gustos, es cierto que existen situaciones que pueden llegar a mentenernos dependientes de algo en particular.

Con filosofía del lenguaje, me refiero a aquello que motiva la construcción de un lenguaje o herramienta. Cada lenguaje tiene un trasfondo ideológico que intenta expresar desde su sintaxis *-quizá me estoy volviendo loco-*.

Por ejemplo, en [la portada de la página](https://www.ruby-lang.org/en/) de Ruby se encuentra la siguiente frase:

> A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

Por otro lado, pensemos en el paradigma. Actualmente es muy usual construir aplicaciones para humanos con programación orientada a objetos, pero existen montones de paradigmas y no necesariamente tenemos que hablar de aplicaciones con un uso operativo.

Quizá requerimos un [test de interfaz de usuario] y nos vendría bien utilizar [F#], que al ser un lenguaje de [programación funcional] hace que los test quedan bastante legibles -al menos a mi gusto-; y aunque es posible darle un enfoque de [OOP], hacerlo no aportaría alguna ventaja contra otro lenguaje del mismo paradigma.

También podemos profundizar un poco más e indagar sobre el [tipado] del lenguaje, si cuenta con mecanismos que promuevan la legibilidad y productividad como el [pattern matching]() y la [inmutabilidad](http://www.scala-lang.org/docu/files/collections-api/collections_1.html) en [Scala](), etc, etc, y más etc. Pero todas estas situaciones pueden ser algo más subjetivo en la mayoría de los casos.

# Rendimiento
El performance siempre es super importante, pero actualmente la mayoría de los lenguajes y el hardware existente nos dán bastantes herramientas para no tener que preocuparnos por esto.

Lo cierto es que un código mal hecho puede afectar al performance. Pero obviamente esto no es culpa del lenguaje si no más bien del desarrollador.

Por lo cual, el performance es mas bien un tema de arquitectura y diseño que del mismo lenguaje como tal.

# Conclusiones

Venga ya!, no alarguemos mas esto porque se me acaba la Navidad. Para decidir que lenguaje a utilizar me gustaría resumierlo en lo siguientes puntos:

- Conocimiento actual
- Curva de aprendizaje
- Velocidad de desarrollo
- Ecosistema y comunidad
- Portabilidad y Compatibilidad
- Propósito del lenguaje y/o herramienta
- Rendimiento
- y Feliz Navidad =)
