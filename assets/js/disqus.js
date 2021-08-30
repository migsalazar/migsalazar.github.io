var disqus_config = function () {
  this.page.url = '{{ site.url }}';
  this.page.identifier ='migsalazar';
};

var disqusSript = document.createElement('script');
disqusSript.src = '//migsalazar.disqus.com/embed.js';
disqusSript.setAttribute('data-timestamp', +new Date());

let clickComments = document.getElementById('.comments__label');

clickComments.addEventListener('click', function (event) {
  document.getElementById("comments__label").style.display = 'none';
  document.getElementById("disqus_thread").style.display = 'block';
  (document.header || document.body).appendChild(disqusSript);
}, false);
