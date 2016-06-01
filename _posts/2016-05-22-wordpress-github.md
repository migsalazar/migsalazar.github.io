---
layout: post
title: De Wordpress a Github
category: blog
tags: [wordpress, github, blog]
---

Dos años fueron necesarios para tomar la decisión; siempre tuve en mente que mis necesidades estaban cubiertas y no había mucho por hacer, hasta hace unas semanas. Por razones misteriosas, me decidí a colgar mis blog posts en algun repo de Github y recordé que hace tiempo había dejado pendiente el crear una personal start page en Github Pages. Pues todo o nada...

Así que he dejado mi blog en [Wordpress.com](https://wordpress.com/){:target="_blank"} para darle el beneficio de la duda a [Github Pages](https://pages.github.com/){:target="_blank"}. Sinceramente, me siento contento de este cambio, creo que fué la mejor decisión que pude tener respecto a esto.

Sabemos que Wordpress y Github Pages tienen objetivos/enfoques un tanto diferentes, pero para los fines del blogging y en terminos de elegir, creo que es prudente hacer una ligera revisión. Lo que menos deseo es que esta entrada se convierta en una comparativa, para eso hoy en día existen muchos post al respecto que se pueden encontrar rápidamente en [Google](https://www.google.com.mx/#q=wordpress+vs+github+pages){:target="_blank"}; sin embargo y a pesar de esto, me gustaría mencionar las razones que me han llevado a realizar este cambio.

> **Warning: Todas las razones siguientes son gustos y perspectivas personales. Por hoy, dejaré a un lado la objetividad**.

# Razones

  - **Jekyll**: Simple, blog-aware, static sites. Definitivamente no necesito todo el peso de Wordpress; tener que cargar `1000E+1000` scripts para un simple post, hoy en día suena ridículo. Lo único que necesito es simple texto e imagenes, [Jekyll](https://jekyllrb.com){:target="_blank"} me viene perfecto.
  - **Markdown**: Nada nuevo, pero suficiente para no hardcodear HTML para scrapear css de los templates en Wordpress =")
  - **WYSIWYG**: Nunca podré ser fan de los editores [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG){:target="_blank"}. Demasiado peso que le da el plugin/widget a la página de edición; se vuelve lento y complicado intercambiar entre vista HTML y Text. Al contrario en Github, las opciones son infinitas; cualquier notepad es útil. Personalmente disfruto mucho utilizando [atom](http://atom.io){:target="_blank"}.
  - **CSS**: Aunque mi fuerte definitivamente no es el diseño, no significa que me parezca menos importante. En Wordpress, sentía estrés al entrar al `wp-admin` y saber que era necesario pagar para poder personalizar los temas. Si bien entiendo que los temas premium deben tener un costo *-los diseños necesitan algo de financiamiento-*, no veo la razón por la cual debo contratar un plan para modificar un free template. Al contrario en Github, tienes la mayoría del control de los archivos del sitio.
  - **Hosting**: Aunque no es necesario utilizar Wordpress.com y bien podemos instalar Wordpress.org en algun servidor y mantener control total de los archivos, Obviamente, se debe contratar un plan de hosting... pero si pudiera costear algún plan mensual, probablemente me cambiaría a [Ghost](https://ghost.org/){:target="_blank"}. Asi que mejor con Jekyll, en Github es gratis.
  - **Mapeo de dominio**: Si bien no es costoso, para poder hacer hacer el mapeo sin un reedireccionamiento y que el https esté habilitado, se tiene que adquirir un servicio extra en Wordpress ($13 usd). Al contrario en Github, basta con [configurar el archivo CNAME](https://help.github.com/articles/using-a-custom-domain-with-github-pages/){:target="_blank"} y listo; además, suponiendo que se desee aplicar HTTPS/SSL, podemos colgarnos de algún plan y servicio gratis de [Cloudflare](https://www.cloudflare.com/){:target="_blank"}. <del>Oye, de verdad que todo quieres gratis</del>
  - **SEO**: Definitivamente Wordpress tiene un super SEO al instante, sin configuración mínima. Este punto es donde aún estoy algo corto para hacerlo efectivo en mi blog actual. Pero, bah... nada que no se pueda pulir; hoy estoy probando algo de [Google Analytics](https://analytics.google.com){:target="_blank"}, [Google Webmasters y la misma consola](https://www.google.com/webmasters){:target="_blank"} para el indexamiento, además de esta [gema](https://github.com/jekyll/jekyll-seo-tag){:target="_blank"}
  - **Plugins**: Aunque es poco lo que he llegado a requerir de plugins en Wordpress, esto no debería detener. Existen montones de gems de Ruby para Jekyll que hacen y deshacen lo que se necesite al gusto.
  - **Comentarios**: Aquí existen varias opciones; yo he elegido [Disqus](https://disqus.com){:target="_blank"} *-claro, es gratis-*. Inicialmente opté por mantener el blog bastante minimal dado que Disqus no permite modificar el aspecto visual de su plugin. Pero al final, preferí incluirlo y mantenerlo oculto en un simple `div`. Aún así, bastante desventaja; Disqus es pesadísimo y dependiendo de la ubicación de la red en que nos encontremos, no estará accesible.
  - **Redes sociales**: Aquí Wordpress, debido a su naturaleza, se lleva al trofeo. Con simples clics, se pueden integrar muchas cuentas en redes sociales para crear un post al mismo tiempo en que se publica el artículo. Por esta parte no he indagado mucho al respecto, pero al menos estoy conforme con la gema para [Twitter Cards](https://dev.twitter.com/cards/overview), aunque bien se puede realizar *a mano*.
  - **Repositorio**: Definitivamente Github/GIT tiene mucho más peso aquí. Historial de commits, forks-pull requests, etc., nada mejor que tener versionado el sitio en general. Además, el flujo de trabajo con git es bastante simple y familiar.

En fin, trataré de organizar un poco mas la lista e ir agregando situaciones que vayan surgiendo así como enlaces útiles. Por lo pronto, por si no quedo claro... definitivamente me quedo con Github Pages =)
