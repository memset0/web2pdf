import { removeBySelector } from '../utils/dom';
import { Handler } from '../handler';

export class ZhihuHandler extends Handler {
  async crawl($paper) {
    let html = '';

    let title = document.title;
    if (title.endsWith(' - 知乎')) {
      title = title.slice(0, -5).trim();
    }

    let time = document.querySelector('.ContentItem-time')?.innerText?.trim();
    time = time
      .split(/[\s・]+/)
      .slice(1, 3)
      .join(' ');

    const $author = document.querySelector('.UserLink.AuthorInfo-name a');
    const $authorAvatar = document.querySelector('.AuthorInfo-avatarWrapper img.Avatar.AuthorInfo-avatar');

    const pageProps = {
      title,
      updateTime: time || null,
      websiteLogo: 'https://static.zhihu.com/heifetz/favicon.ico',
      author: $author?.innerText?.trim() || null,
      authorLink: $author?.href || null,
      authorAvatar: $authorAvatar?.src || null,
    };
    console.log('pageProps', pageProps);

    const $content = document.querySelector('.Post-RichTextContainer .RichText');
    html += $content.outerHTML;

    $paper.innerHTML = html;

    // 直接加载lazyload的图片
    $paper.querySelectorAll('img.lazy').forEach(($img) => {
      $img.classList.remove('lazy');
      $img.removeAttribute('loading');
      $img.removeAttribute('data-lazy-status');
      let dataSrc = $img.getAttribute('data-actualsrc');
      if (dataSrc) {
        $img.src = dataSrc;
      }
    });

    // 渲染数学公式
    const MathJax = window.MathJax; // version: 2.7.9
    if (MathJax && MathJax.Hub) {
      const waitForMathJax = () =>
        new Promise(function (resolve, reject) {
          // 这是一个等待所有MathJax队列内的公式渲染完成的Promise
          try {
            MathJax.Hub.Queue(() => resolve());
          } catch (error) {
            reject(error);
          }
        });
      $paper.querySelectorAll('.ztext-math').forEach(($math) => {
        removeBySelector($math, '.MathJax_Preview');
        removeBySelector($math, '.MathJax_SVG');
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, $math]);
      });
      await waitForMathJax();
    }

    return pageProps;
  }

  constructor(location) {
    super('zhihu', location);
  }
}
