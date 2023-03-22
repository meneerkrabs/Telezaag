(() => {
  'use strict';

  const displayArticleBodyAndPaytest = () => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');

    for (const script of scripts) {
      const json = JSON.parse(script.innerHTML);

      if (json.hasOwnProperty('articleBody')) {
        const articleBody = json['articleBody'];
        console.log(articleBody);

        const span = document.createElement('span');
        span.innerHTML = articleBody;

        document.body.appendChild(span);
      }
    }

    const lala = document.getElementById('lala');
    if (lala) {
      lala.parentNode.removeChild(lala);
    }

    const metering = document.getElementById('TEMPRORARY_METERING_ID');
    if (metering) {
      metering.parentNode.style.display = 'none';

      const sc = document.getElementsByTagName('script');
      let textblock = '';

      for (const script of sc) {
        if (script.innerHTML.includes('"@type":"NewsArticle"')) {
          console.log('Test 1');
          const article = JSON.parse(script.innerHTML);
          textblock = article.articleBody.replace(/\n/g, '<br>');
          break;
        }
      }

      const newp = document.createElement('p');
      newp.id = 'lala';
      newp.innerHTML = textblock;
      document.getElementsByClassName('TextArticlePage__bodyBlocksContent')[0].appendChild(newp);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    displayArticleBodyAndPaytest();

    const observer = new MutationObserver(displayArticleBodyAndPaytest);
    const observerConfig = { childList: true };
    const observeNode = document.querySelector('title');
    observer.observe(observeNode, observerConfig);
  });
})();
