import { Handler } from '../handler';
import { removeBySelector } from '../utils/dom';

import './zhihu.less';

export default class ZhihuHandler extends Handler {
  async crawl($paper) {
    let html = '';

    let title = document.querySelector('.Post-Header .Post-Title')?.innerText?.trim();

    let time = document.querySelector('.ContentItem-time')?.innerText?.trim();
    time = time
      .split(/[\s・]+/)
      .slice(1, 3)
      .join(' ');

    const $author = document.querySelector('.UserLink.AuthorInfo-name a');
    const $authorAvatar = document.querySelector('.AuthorInfo-avatarWrapper img.Avatar.AuthorInfo-avatar');

    const pageProps = {
      title: title || null,
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
    if (unsafeWindow.MathJax && unsafeWindow.MathJax.Hub) {
      const MathJax = unsafeWindow.MathJax; // version: 2.7.9
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
    } else {
      console.log('MathJax not discovered!', unsafeWindow.MathJax);
    }

    return pageProps;
  }

  constructor() {
    super('zhihu');
  }
}
