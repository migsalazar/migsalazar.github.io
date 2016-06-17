---
layout: post
title: Fluent Style
category: .net
tags: [rfc, sat, .net, design patterns]
published: false
---

El último año he dedicado la mitad de vida rutinaria-laboral-comprobable-profesional-corporativa *-esto requiere un post completo-*, al trabajo con *interfaces* para el manejo de registros de personas, i.e.: UI, plugins/widgets, web services, stored procedures, etc.

Dentro de la información que se persiste, como parte de requerimiento de negocio, el cálculo *automático* de los diferentes tipos de identificación es indispensable. Y dado que los proyectos en los que estoy involucrado son consumidos por LATAM, he tratado con identificaciones de diferentes países, <del>sin exagerar</del> por mencionar:

  - México: RFC, CURP
  - Colombia y Chile: RUT
  - Panamá, Perú, Puerto Rico y Ecuador: DNI, RUC
  - Argentina: CUIT, CUIL, DNI, CDI

Y aunque esto es bastante normal, muchas aplicaciones que involucran información de personas requieren estos pequeños cálculos, puede llegar a convertirse en tu *talón de aquiles*.

Para México, es decir, para el cálculo del RFC ya se contaba con una pequeña librería producto de un desarrollo "in-house", que ha pasado de generación en generación, tras rotación y rotación, de un incontable número de desarrolladores. Existe código suelto, parches, código no comentado, en fin... es una librería a la cual no se le ha <del>dado cariño</del> prestado mucha atención.

No me atrevo a juzgar *-porque sé que cometo montón de errores-* si ha sido o no un buen desarrollo, si cuenta con [best practices](https://en.wikipedia.org/wiki/Best_coding_practices), si tiene un [performance](https://en.wikipedia.org/wiki/Software_performance_testing) aceptable, si es una librería  [testable](https://en.wikipedia.org/wiki/Software_testability), etc. Sin embargo, no puedo negar e ignorar que me ha sido bastante complicado modificar esta librería; fué necesario [debuggear](https://en.wikipedia.org/wiki/Debugging) línea a línea y un par de horas en estatus "Don't disturb" para entender qué/cuándo/cómo/dónde funciona. Y al día de hoy, se siguen presentando problemas en ciertos escenarios.

Además, *-hasta donde sé-* no hay rastros de la base de la construcción de esta librería; es decir, las reglas para el cálculo no están alineadas a un documento oficial. Si a esto le sumamos el hecho de que la librería es de código cerrado, me ha parecido justo y necesario buscar alguna alternativa.

# Búsqueda
Lo habitual, primero hacer un "barrido" rápido por <del>la web</del> google para identificar si alguien más se encuentra trabajando con el cálculo del RFC; podría sacar provecho y quizá alguna referencia.

Casi obvio, sí. Montones de implementaciones para el cálculo en diferentes lenguajes, los hay en: C, C++, VB, VB Script, Fox Pro, Progress, Java, Javascript, T-SQL, PL/SQL, Excel, Excel con macros, etc. Los más astutos te venden un programa con su respectivo wizard que realiza el cálculo.

En fin, concluí la búsqueda al encontrar una implementación en JAVA escrita por josketres. Me ha parecido interesante y, por los argumentos basados en documentos oficiales, decidí basar mi código en esta implementación.

# Resultado
El resultado, [RFC Fácil .NET](). La documentación y el uso se puede en contrar en este mismo sitio.

No quiero a entrar en detalles de la lógica y el contexto, pero me ha parecido interesante compartir el enfoque de la [fachada](https://en.wikipedia.org/wiki/Facade_pattern) de esta librería.

# Fluent Interface
Fluent Interface es un estilo de implementación de código, si me permiten definirlo asi, para hacer más legible *-o al menos en teoría-* la programación. Este concepto viene atribuido por [Martin Fowler](http://martinfowler.com/bliki/FluentInterface.html) por ahí del año 2005.

Lo interesante es el estilo al escribir código, la idea es que sea de manera fluida la invocación de métodos y sean apreciados como un conjunto de pasos o requerimientos para construir un objeto. Para los que conviven en el mundo de javascript, será bastante normal el término de [Method Chaining]() y es este mismo enfoque el que se la dá a la POO con la técnica de Fluent Interface.

Volviendo al tema, sabemos que para cacular el RFC es necesario tener de entrada la siguiente información de una persona:

- Nombre(s)
- Apellido(s)
- Fecha de nacimiento

Lo habitual en POO sería, tener un constructor para inicializar un objeto `Rfc`, establecer propiedades a través de este y entonces realizar el cálculo. Visto desde el punto de vista cliente, se tendría algo así:

{% gist 04534a1580ecb8724121d84f191dfc41 %}

¿Cierto?

Ahora bien, supongamos un descuido al instanciar el objeto. Podría llevarnos a hacer algo como lo siguiente:

{% gist d9c2fc49be7cf6425c45734d17bdd5ad %}

Es decir, dado que los primeros tres argumentos son de tipo `string` no hay una forma de advertir al programador si debe ir primero el nombre y segundo el primer apellido o alguna otra variación. Excepto si se conocen o trabajan juntos <del>o viven juntos</del>.

Si bien es cierto que desde [C# 3.0](https://msdn.microsoft.com/en-us/library/bb308966.aspx#csharp3.0overview_topic13) podemos inicializar un objeto con las propiedades expuestas:

{% gist f2264d4b1a3baba6826a0435ca760958 %}

Sin embargo, para un constructor con un número relativamente grande de parámetros de entrada, sería bastante ilegible. Incluso, pensemos en una composición *anidada*, una inicialización de las propiedades complejas desde el constructor sería bastante tediosa e ilegible.

# Implementación
El punto de inicio para Rfc Facil .NET, partirá de la clase RfcBuilder. Esta clase, contendrá los métodos de tipo chaining para la asignación de las propiedades.

{% gist 53d97e3516772460ba57f8f1e400935d %}

Nótese que en cada método, después de establecer el valor de su respectiva propiedad, se retorna la misma instancia en cuestión. Este retorno, hará que el método se convierta en chainable.

Dado que cada método retorna una instancia de RfcBuilder, requerimos un método de acceso para la instancia que inicialmente pensamos construir, es decir, de la clase Rfc.

{% gist cdfa79ca464a07555981712e7b152b86 %}

Una vez que las propiedades se encuentran establecidas, el método Build se encargará de orquestar las llamadas para el cálculo de cada parte del Rfc. Lo importante a destacar aqui, es que este método retornará el tipo de Rfc a través de la invocación de un método estático de la clase Rfc.

El contenido de Rfc, quedaría algo como lo siguiente:

{% gist 1aef0bf943af06592013df30548a37ca }

La intención de tener un constructor privado y acceder a este mediante un método estático, radica básicamente en bloquear al cliente de poder instanciar la clase Rfc con el operador `new`. De esta manera, se forzará a invocar el método `Build` como único punto para el acceso a la instancia.

# Conclusión
No estoy del todo seguro si este *estilo* sea el más adecuado. Hay bastantes opiniones en contra de usar este enfoque; en general tiene una mala reputación.

Sin embargo, creo que para el contexto en cuestión, es bastante legible hacerlo de esta manera. En lo personal, me ha parecido bastante bien usar este estilo fluido para la calcular el Rfc.
