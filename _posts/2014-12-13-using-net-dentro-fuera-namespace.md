---
layout: post
title: ¿Dentro o fuera del namespace? Using .NET
category: .NET
tags: [using, .net, namespace]
---

Hace algunas semanas atrás, una alumna me preguntaba sobre el impacto del rendimiento al importar librerías en .NET. Recordé que tenía una entrada sobre el tema en mi antigüo blog, quizá de hace casi dos años; prometí postearlo, así que copio y pego la entrada.

Trabajando con MVC de .NET y la estructura que maneja por defecto, recientemente tuve un problema al utilizar `ViewModels`, ya que el espacio de nombres donde los incluía era dentro del espacio de nombres del modelo. Independientemente de la implementación de los ViewModels que elegí, el problema consistía en como estaban organizados.

Modifiqué algunas cosas para solucionar el problema, pero al mismo tiempo me di cuenta que variando  la declaración de los using (dentro o fuera del namespace actual) obtenía resultados diferentes. Es por esto último que decidí <del>cambiarme de lenguaje</del> escribir una entrada sobre dicha problemática.

# Situación
Por lo regular siempre ubicamos los `using` fuera del espacio de nombres que se está trabajando. Es decir, con la siguiente estructura:

{% gist 7805f69d9fac4998fc14 %}

¿Por qué razón? No lo sé, porque así <del>me dijo tu madre</del> están estructuradas las plantillas de Visual Studio para crear elementos y nunca atenté contra su naturaleza. Pero el no saber como funcionan las llamadas dependiendo del lugar donde se declaren los nombres de espacio, puede traernos problemas.

# El problema

Construyo una mini aplicación de consola donde hago una llamada a la clase `DateTime` para mostrar la fecha del día actual:

{% gist ba7932e511e30f24c9d7 %}

En este caso, el using está dentro del namespace y éste es mi resultado:

    Console output: 02/02/2013 08:19:37 p.m.


Ahora bien, modificamos el código poniendo el `using` fuera:

{% gist 15ce2de480b5698ff910 %}

El resultado es el siguiente:

    Console output: No me importa que día es hoy.

¿Ah..? Previamente he creado una clase dentro del namespace `UsingTest` con el siguiente código:

{% gist c1f3eae6940e067e997b %}

# La razón
La razón es muy simple; cuando los using están fuera, las clases que nosotros hemos creado tendrán prioridad. En el otro caso, cuando los using están dentro, las clases de .NET o de los using que estén dentro serán las que tendrán prioridad.

El compilador, siempre concatena la directiva using con el nombre de la clase. Al crearse el IL o MSIL (lenguaje intermedio), *- independientemente del lenguaje de alto nivel, el código IL generado es el mismo -* no contiene los famosos namespace, es decir, en IL no existen tales cosas. Lo único que hay son los nombres completos calificados de las clases [(Full Qualified Class Name)](https://en.wikipedia.org/wiki/Fully_qualified_name). Por ejemplo, la clase `DateTime` se identifica realmente como `System.DateTime`.

# La discusión
En algunos blogs llegué a leer que está decisión, el ponerlos dentro o fuera, afectaba el rendimiento. Ya que el ponerlos fuera generaba que se cargaran todos los ensamblados que se declararon con los usings. Pero permítame comentarle que esto es totalmente falso :V

Claro, no estaba seguro si esto era cierto. Pero para realmente quitarnos de dudas necesitamos ir más abajo, adentrarnos hasta el mismísimo IL. Si analizamos el código generado por el primer ejemplo, veremos algo así:

{% gist c63506b3f32995c0fed5 %}

Ahora veamos el código generado del segundo ejemplo

{% gist 4dd1fd4f82c21e552aed %}

Es claro que las llamadas a las clases se hace utilizando el nombre completo calificado de clase.

> "Un espacio de nombres es un esquema lógico de nombres para tipos en el que un nombre de tipo simple, como MiTipo, aparece precedido por un nombre jerárquico separado por puntos. [...]". [msdn](https://msdn.microsoft.com/en-us/library/ms973231.aspx)

Por lo tanto, esto no afecta en el rendimiento. La declaración de los namespace dentro o fuera del namespace actual, solo modificará la prioridad del namespace deba utilizar. Al final, siempre se llamará a la clase por su nombre completo, incluyendo el namespace.

Otra buena justificación para sustentar esto sería, ¿Qué pasa con los using que no se declaran? Es decir, aquellos namespace que están dentro del código. Por ejemplo, hacerlo de esta manera:

{% gist dc9b7c1c268eb51ae98f %}

;)
