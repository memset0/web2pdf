import { removeBySelector } from '../utils/dom';
import { Handler } from '../handler';

export class ZhihuHandler extends Handler {
  async crawl($paper) {
    let html = '';

    const $content = document.querySelectorAll('.Post-RichTextContainer .RichText')[0];
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

  constructor(location) {
    super('zhihu', location);
  }
}
