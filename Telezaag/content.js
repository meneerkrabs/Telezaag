(() => {
  'use strict';

  const styleArticle = (element) => {
    element.setAttribute('style', 'font-family: "Helvetica Neue", Arial, sans-serif; font-size: 16px; line-height: 1.5em; margin: 0 auto; max-width: 800px; padding: 20px; text-align: justify;');
  };

  const styleHeader = (element) => {
    element.style.fontWeight = 'bold';
  };

  const createArticle = (articleBody) => {
    const span = document.createElement('span');
    span.innerHTML = articleBody;
    styleArticle(span);
    document.body.appendChild(span);
  };

  const createImage = (imageUrl) => {
    const img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    img.setAttribute('style', 'display: block; margin: 0 auto; max-width: 800px;');
    document.body.appendChild(img);
  };

  const displayArticleBodyAndPaytest = () => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');

    let articleBody = '';
    let imageUrl = '';

    for (const script of scripts) {
      const json = JSON.parse(script.innerHTML);

      if (json.articleBody) {
        articleBody = json.articleBody.replace(/\n\n(.+?)\n\n/g, '<strong>$1</strong>');
      }

      if (json.image) {
        imageUrl = json.image[0];
      }

      if (articleBody && imageUrl) {
        break;
      }
    }

    if (articleBody) {
      createArticle(articleBody);
    }

    if (imageUrl) {
      createImage(imageUrl);
    }

    const lala = document.getElementById('lala');
    if (lala) {
      lala.parentNode.removeChild(lala);
    }

    const metering = document.getElementById('TEMPRORARY_METERING_ID');
    if (metering) {
      metering.parentNode.style.display = 'none';

      const sc = document.getElementsByTagName('script');

      for (const script of sc) {
        if (script.innerHTML.includes('"@type":"NewsArticle"')) {
          const article = JSON.parse(script.innerHTML);
          const textblock = article.articleBody.replace(/\n/g, '<br>');
          const image = article.image[0];

          if (textblock) {
            const newp = document.createElement('p');
            newp.id = 'lala';
            newp.innerHTML = textblock;
            styleArticle(newp);
            const headers = newp.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headers.forEach(header => {
              styleHeader(header);
            });
            document.getElementsByClassName('TextArticlePage__bodyBlocksContent')[0].appendChild(newp);
          }

          if (image) {
            createImage(image);
          }
          break;
        }
      }
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
