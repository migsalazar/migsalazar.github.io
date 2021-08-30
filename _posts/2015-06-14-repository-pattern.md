---
layout: post
title: Patrón repositorio
category: dotnet
tags: [design patterns, dotnet]
---

Con el tema en moda *-aunque algo oldie-* de [aplicaciones orientadas al dominio](https://en.wikipedia.org/wiki/Domain-driven_design){:target="_blank"}, seguramente nos hemos llenado la cabeza de conceptos relacionados. Existen montones de implementaciones, y particularmente para los que viajamos al mundo de .NET, tenemos la referencia de [DDD N-Layered .NET 4.0 Architecture Guide](https://blogs.msdn.microsoft.com/marblogging/2011/05/23/domain-drive-design-n-layered-net-4-0-architecture-guide/){:target="_blank"}.

Entre muchos, el tema de patrones de diseño es principal y uno de estos patrones, en donde yo considero que existe mucho debate, es el [Patrón Repositorio](https://msdn.microsoft.com/en-us/library/ff649690.aspx){:target="_blank"}. Asi que, decidí publicar esto...

# La base
Tomaré como base [la definición](http://martinfowler.com/eaaCatalog/repository.html){:target="_blank"} un poco más general y -creo- acertada de [Martin Fowler](http://martinfowler.com/){:target="_blank"} sobre el patrón respositorio:

> A Repository mediates between the domain and data mapping layers, acting like an in-memory domain object collection.

> A system with a complex domain model often benefits from a layer, such as the one provided by Data Mapper, that isolates domain objects from details of the database access code. In such systems it can be worthwhile to build another layer of abstraction over the mapping layer where query construction code is concentrated. This becomes more important when there are a large number of domain classes or heavy querying. In these cases particularly, adding this layer helps minimize duplicate query logic.

Asi que, la idea de crear repositorios es la de construir una abstracción que funcione como intermediario con el objetivo de proteger nuestro código frente a cambios. Dicho de otro modo, al dominio no debería conocer como funciona el acceso a datos.

# El objetivo

Abstraer la lógica de persistencia y acceso a datos de la lógica de dominio.

- Un lugar central donde podemos mantener las “consultas de objetos”.
- Facilidad para la construcción de pruebas unitarias sin necesidad de tener acceso a datos. Por supuesto, todo depende de como hayamos separado responsabilidades en nuestro código. Crear repositorios no significa que se corregirán problemas de diseño.

# La implementación

Motivados por la idea de construir un *hero* mecanismo con el cual se pueda implementar métodos en todas las entidades y que mediante interfaces podamos abstraer el acceso a datos.

{% gist e99db4f5ceaac4a97cb8 %}

De esta manera no habría la necesidad de crear dicho mecanismo cada que aparezca una entidad. Pero venga!, intentemos exagerar más...

Podemos crear una clase Repository que utilice genéricos para luego heredar de ella.

{% gist 8daa5811cf86bbf0030c %}

Si surge una nueva entidad, volvemos a implementar IRepository o extender de alguna otra interfaz con métodos mas puntuales, por ejemplo IEntityRepository y volver a proveer funcionalidad. De este modo todo quedaría en una hermosa jerarquía, no tendríamos que reescribir código y exponer funcionalidades específicas.

{% gist 70ec1f63b4beaca092df %}

El resultado, desde el punto de vista de la entidad, sería algo asi:

{% gist 85808a3f4ebf849fc88a%}

# La discusión

¿Realmente necesitamos tantos métodos para todas las entidades? ¿Realmente todas las entidades necesitan de ese tipo de operaciones?

Sabemos que el repositorio al ser construido con interfaces nos indica un **contrato**; las entidades que lo implementan establecen un contrato con la interfaz IRepository y deberían utilizar todos sus métodos pero, como ya lo mencioné, no siempre es el caso. **No debería obligarnos a implementar todas estas operaciones.**

Quizá, en el caso de una aplicación centrada en los datos podría funcionar y aún así me reservo a cuestionarlo; en este escenario el dominio de la aplicación sería bastante simple y solo funcionaría como un “puente” que no aportaría nada, así que da igual el diseño del repositorio.

Por otro lado, habrá entidades que no deban ser eliminadas, almacenes de datos donde no requerimos que se comporten como entidades, tal es el caso de las tablas “intermedias” para generar las relaciones, registros intocables, etc.

Aunque es claro que se reutiliza código, ¿Realmente el costo de esto vale la pena para la solución que estamos atendiendo? Al final, muchas veces esto cuesta más y nos “encerramos” en mantener este orden, lo que nos provoca en generar código excesivo y hasta ridículo... Le pasó al primo de un amigo.

# La conclusión

Podría ser factible que el repositorio actúe como un `helper` y no como un contrato. De este modo, reutilizar mediante [composición](https://en.wikipedia.org/wiki/Composition_over_inheritance){:target="_blank"}. En mi opinión, me parece mas útil y limpia una solución de este tipo:

{% gist 57f0221bf6a423b53b15 %}

No contradigo a DDD, cualquiera de estos enfoques pueden ser útiles, pero creo que **es indispensable** siempre **iniciar justificando el tipo de solución que se piense implementar**. **Esta justificación siempre debería ser en base al contexto en que se aplique la solución** y no basada en otras soluciones, ejemplos o buenas prácticas recomendadas por el consultor gurú-experto que financió la empresa.
