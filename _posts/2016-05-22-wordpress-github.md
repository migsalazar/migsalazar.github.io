---
layout: post
title: De wordpress a github
category: blog
tags: [wordpress, github, blog]
published: false
---

# De Wordpress a Github
Dos años fueron necesarios para tomar la decisión; siempre tuve en mente que mis necesidades estaban cubiertas y no había mucho por hacer, hasta hace unas semanas. Por razones misteriosas, me decidí a colgar mis blog posts en Github y recordé que había dejado pendiente hace tiempo el crear una personal start page en Github Pages. Pues, todo o nada...

Recientemente he dejado mi blog en Wordpress.com para darle el beneficio de la duda a Github Pages. Sinceramente, me siento contento de este cambio. En lo personal, mejor decisión no pude tener respecto a esto.

Lo último que deseo es que esta entrada se vuelva una comparativa entre Wordpress y Github, hoy en día existen muchos post al respecto que se pueden encontrar rápidamente en Google. Sin embargo y a pesar de esto, me gustaría mencionar las razones me han llevado a realizar este cambio. **Warning: todas las razones son perspectivas y gustos personales. Por hoy, dejaré por un lado la objetividad**.

# Razones
*¡Va pues!*, sin orden de relevancia he aqui mis razones:
  
  - **Jekyll**: Simple, blog-aware, static sites. Definitivamente no necesito todo el peso de Wordpress; tener que cargar 1EN scripts para un simple post hoy en día suena ridículo. Lo único que necesito es simple texto e imagenes, Jekyll viene perfecto.
  - **Markdown**: Nada nuevo, pero suficiente para no hardcodear HTML para scrapear css =") 
  - **WYSIWYG**: Nunca podré ser fan de los editores WYSIWYG. Demasiado peso que le da el plugin/widget a la página de edición; se vuelve lento y complicado intercambiar entre vista HTML y Text. Al contrario en Github, las opciones son infinitas, cualquier notepad es útil. Personalmente disfruto mucho utilizando [atom](http://atom.io){:target="_blank"}.
  - **CSS**: Aunque mi fuerte definitivamente no es el diseño, no significa que me parezca menos importante. En *wordpress*, sentía estrés al entrar al `wp-admin` y saber que era necesario pagar para poder personalizar los temas. Si bien entiendo que los temas premium tengan un costo *-los diseños necesitan algo de financiamiento-*, no veo la razón por la cual debo contratar un plan para modificar un free template. Al contrario, en **Github**, tienes la mayoría del control de los archivos del sitio.
  - **Mapeo de dominio**: Si bien no es costoso, para poder hacer hacer el mapeo sin un reedireccionamiento y que el https esté habilitado, se tiene que adquirir un servicio extra en Wordpress ($13 usd). Al contrario, en Github, basta con configurar tu archivo CNAME y listo; suponiendo que se desee aplicar HTTPS/SSL, podemos colgarnos de algún plan y servicio gratis de [Cloudflare](https://www.cloudflare.com/){:target="_blank"}. <del>Oye, todo quieres gratis</del>
  - **Hosting**: Ligado al CSS, si bien no es necesario casarse a Wordpress.com, se puede instalar Wordpress.org y mantener control total de los archivos. Obviamente, se debe contratar un plan de hosting. Si pudiera costearlo, probablemente me cambiaría a ghost.
  - **SEO**: Definitivamente Wordpress tiene un super SEO al instante, sin configuración mínima. Este punto es donde aún estoy algo corto para hacerlo efectivo en mi blog actual. Pero, bah... nada que no se pueda pulir; hoy estoy probando algo de Google Analytics, webmaster tools y la misma consola de google para el indexamiento.
  - **Plugins**: Aunque es poco lo que he llegado a requerir de plugins en Wordpress, no hay algo que me detenga. Existen montones de gems para jekyll que hacen y deshacen al gusto.
  - **Comentarios**: Aquí existen varias opciones; yo he elegido [Disqus]() -claro, es gratis-. Inicialmente opté por mantenerlo bastante minimal el blog dado que Disqus no permite modificar el aspecto visual de su plugin. Pero al final, preferí incluirlo y mantenerlo oculto en un `div` sencillito. Aún así, bastante desventaja; Disqus es pesadísimo y dependiendo de la ubicación de la red en que nos encontremos, no estará accesible.
  - **Redes sociales**: Aquí Wordpress, debido a su naturaleza, se lleva al trofeo. Con simples clics, se pueden integrar muchas cuentas en redes sociales para crear un post al mismo tiempo en que se publica el artículo. Por aquí no he indagado mucho al respecto, pero al menos estoy conforme con la gema para Twitter Cards.
  - *Repositorio*: Definitivamente Github/GIT tiene mucho más peso aquí. Historial de commits, pull requests, etc., definitivamente nada mejor que tener versionado el sitio en geneal. Además que el flujo de trabajo con git es bastante simple y familiar.

En fin, trataré de organizar un poco mas la lista e ir agregando situaciones que vayan surgiendo. Por lo pronto, definitivamente me quedo con Github Pages.

=)
  

  
