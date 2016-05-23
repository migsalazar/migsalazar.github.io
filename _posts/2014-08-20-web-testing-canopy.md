---
layout: post
title: Web testing - Canopy
category: blog
tags: [testing, test, webtesting, canopy, fsharp]
---

Generalmente <del>no paso</del> trato de no pasar de largo las pruebas. Ya sean unitarias, *-a puro ojo-*, de integración, funcionales, etc. Siempre con el fin, obviamente, de mejorar la calidad. Últimamente tengo un poco descuidado este tema entre mis actividades diarias, asi que algo de esto me cae bastante bien.

Estuve revisando algunas herramientas y de un momento a otro apareció [Canopy](https://lefthandedgoat.github.io/canopy/) y llamó bastante mi atención; es la primera vez que trasteo con esto y por eso la novedad del post ;)

# ¿Canopy?
Canopy es un ligero framework que nos permite realizar pruebas directamente sobre la [UI](https://en.wikipedia.org/wiki/User_interface) en una aplicación o sitio web. Internamente utiliza [Selenium](http://www.seleniumhq.org/), lo cual nos da la potencialidad de realizar pruebas en diferentes navegadores.

> f#rictionless web testing

# f#rictjnkjnsjdn… ¿eh?
Canopy, está escrito en [f#](http://fsharp.org/) el cual es un lenguaje que funciona como un [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) y esto hace que tenga una potencia bastante buena *-cual flecha al viento-*. Ya implementado dentro de canopy, se podría decir que trabaja como un [DSL](https://en.wikipedia.org/wiki/Domain-specific_language).

La documentación no es muy buena que digamos, pero es lo suficiente como para empezar escribiendo test *-al vuelo-*. Además, el hecho de estar escrito en f# le da bastante potencia para escribir test muy claros y de una manera muy sencilla, muy al estilo scripting.

# Canopy en .NET
Podemos obtener canopy [desde Nuget](https://www.nuget.org/packages/canopy/) y utilizarlo en cualquier proyecto de .NET, ya sea C# o VB. La desventaja de utilizar VB o C#, es que hay que escribir montón de código que realmente es innecesario. Al contrario, F# nos da una sintaxis bastante limpia y solo se escribe código directamente relacionado con el test.

# Testing
Tomaré como conejillo de indias una app web que he venido desarrollando para uno de nuestros clientes. Aún está en construcción, así que ni les platico :P

Solo utilizaré la vista de login. No importa mucho de que trate la aplicación y mucho menos como esté implementado el [back-end](https://en.wikipedia.org/wiki/Front_and_back_ends). Se trabaja directamente con los elementos de la UI, así que estaremos interactuando directamente con el navegador.

Primeramente, debemos abrir las bibliotecas necesarias:

{% gist 4e6300f3c4e4a927776b %}

Entonces, podemos definir algunas variables para parametrizar las llamadas a las funciones:

{% gist fdfa16c54fef7e92d384 %}

Creamos una función, que será la encargada de realizar el test:

{% gist 9f264a80ece3bdde664b %}

Algo extra a tomar en cuenta es el driver para el navegador. En mi caso, tengo un gusto particular por Chrome; selenium, tiene [el driver para chrome en el mismo Google Code](https://code.google.com/p/selenium/downloads/list). La instalación es bastante trivial:

Una vez instalado, podemos hacer uso del driver apuntando al directorio donde lo hemos almacenado y utilizando la propiedad `configuration.chromeDir`. Esto lo haremos desde nuestro `Program`, que actuará como disparador de la aplicación de consola:

{% gist 12b767f62d1b91b69fa2 %}

Para ejecutar esto, la página a realizar el *testing* debe estar accesible o deberíamos tener *arriba* nuestro servidor web. En mi caso, tengo mi `localhost` encendido para que pueda ser lanzado por el test mediante la instrucción `url`. De este modo, la consola puede lanzar la instancia de chrome y ejecutar la url con `start chrome`.

Deberíamos obtener un resultado como el siguiente:

    Starting ChromeDriver (v2.9.248315) on port 5020
    Iniciando en localhost...
    Introduce credenciales...
    Presiona botón de login...

    0 minuts 0 seconds to execute
    1 passed
    0 failed
    ENTER para salir

Bonito, ¿no?…

Así como la acción `screenshot`, hay suficientes funciones de tipo acción o reporteo que han llamado mi atención. Una en particular, es la de WIP (trabajo en progreso) del test y asi poder visualizar los elementos que va “tocando”. Para esto, se hace uso del operador `&&&&` al definir una función. Generalmente se utilizará en modo `debug` y provoca que el test vaya mas lento e ilumine los elementos del HTML.

Sinceramente, me ha parecido bastante interesante y creo que se le puede sacar bastante provecho, solo es cuestión de crear bien organizados los módulos y *va volando*. Y claro, algo de crédito al lenguaje no está de más; la verdad es que f# hace que sea más claro el test y muy rápida la implementación.
