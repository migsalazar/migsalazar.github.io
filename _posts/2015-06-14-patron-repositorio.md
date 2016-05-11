---
layout: post
title: Patrón repositorio
---

Con el tema en moda -aunque algo viejo- de [aplicaciones orientadas al dominio](https://en.wikipedia.org/wiki/Domain-driven_design), seguramente nos hemos llenado la cabeza de conceptos relacionados. Existen montones de implementaciones, y particularmente para los que viajamos al mundo de .NET, tenemos la referencia de [DDD N-Layered .NET 4.0 Architecture Guide](https://blogs.msdn.microsoft.com/marblogging/2011/05/23/domain-drive-design-n-layered-net-4-0-architecture-guide/).

Entre muchos, el tema de patrones de diseño es principal y uno de estos patrones, en donde yo considero que existe mucho debate, es el [Patrón Repositorio](https://msdn.microsoft.com/en-us/library/ff649690.aspx). Asi que, decidí publicar esto...

# La base
Tomaré como base [la definición](http://martinfowler.com/eaaCatalog/repository.html) un poco más general y -creo- acertada de [Martin Fowler](http://martinfowler.com/) sobre el patrón respositorio:

> A Repository mediates between the domain and data mapping layers, acting like an in-memory domain object collection.

> A system with a complex domain model often benefits from a layer, such as the one provided by Data Mapper, that isolates domain objects from details of the database access code. In such systems it can be worthwhile to build another layer of abstraction over the mapping layer where query construction code is concentrated. This becomes more important when there are a large number of domain classes or heavy querying. In these cases particularly, adding this layer helps minimize duplicate query logic.

Asi que, la idea de crear repositorios es la de crear una abstracción para proteger nuestro código frente a cambios. El proceso de abstraer, además, nos proporciona evitar conocer las características puntuales e irrelevantes para la esencia del problema en cuestión *-De una manera vulgar yo le llamo “lógica aplicativa”-*.

# El objetivo

 De lo anterior, podemos rescatar -mágicamente- los siguientes puntos como justificación del patrón repositorio:

Abstraer la lógica de persistencia y acceso a datos de la lógica de dominio.
* Un lugar central donde podemos mantener las “consultas de objetos”.
* Facilidad para la construcción de pruebas unitarias sin necesidad de tener acceso a datos. -Claro, todo depende de como hayamos separado responsabilidades en nuestro código. El hecho de crear repositirios no significa que se corregirán nuestros problemas de diseño.-

# La implementación

Consideremos la siguiente interface:

{% gist https://gist.github.com/mikengine/e99db4f5ceaac4a97cb8 %}

Motivada por la idea de construir un “hero” mecanismo para implementar estos métodos en todas las entidades y abstraer mediante interfaces el acceso a datos. De esta manera no habría la necesidad de crear dicho mecanismo cada que aparezca una entidad.

Intentando exagerar más, podemos crear una clase Repository que utilice genéricos para luego heredar de ella.

{% gist https://gist.github.com/mikengine/8daa5811cf86bbf0030c %}

Si hay una nueva entidad, volvemos a implementar IRepository o extender de alguna otra interfaz con métodos mas puntuales, por ejemplo IEntityRepository y volver a proveer funcionalidad. De este modo todo quedaría en una hermosa jerarquía, no tendríamos que reescribir código y exponer funcionalidades específicas.

{% gist https://gist.github.com/mikengine/70ec1f63b4beaca092df %}

El resultado, desde el punto de vista de la entidad, sería algo asi:

{% gist https://gist.github.com/mikengine/85808a3f4ebf849fc88a%}

# La discusión

¿Realmente necesito tantos métodos para todas las entidades? ¿Realmente todas las entidades necesitan de ese tipo de operaciones?. Finalmente, el repositorio al ser construido con interfaces nos indica un contrato; las entidades que lo implementan establecen un contrato con la interfaz IRepository y deberían utilizar todos sus métodos pero, como ya lo mencioné, no siempre es el caso.

Quizá, en el caso de una aplicación centrada en los datos, podría funcionar y aún así me reservo a cuestionarlo; en este escenario el dominio de la aplicación sería bastante simple y solo funcionaría como un “puente” que no aportaría nada, así que da igual el diseño del repositorio.

Por otro lado, habrá entidades que no deban ser eliminadas, almacenes de datos donde no requerimos que se comporten como entidades, tal es el caso de las tablas “intermedias” para generar las relaciones, etc.

Aunque es claro que se reutiliza código, ¿Realmente el costo de esto vale la pena para la solución que estamos atendiendo? Al final, muchas veces, esto cuesta más y nos “encerramos” en mantener este orden, lo que nos provoca en generar código excesivo y hasta ridículo.

Creo que debería actuar mas como un helper que como un contrato y reutilizar mediante la composición. En lo personal, me parece mas útil y limpia una solución de este tipo:

{% gist https://gist.github.com/mikengine/57f0221bf6a423b53b15 %}

# La conclusión

Aunque cualquiera de estos enfoques pueden ser útiles creo que es indispensable siempre tratar de justificar -de alguna manera- el tipo de solución que se piense implementar, tratando de no caer en situaciones como Secundum quid o Non sequitur. Esta justificación siempre debería ser en base al contexto en que se aplique la solución y no basada en otras soluciones o ejemplos.
