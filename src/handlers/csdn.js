import { Handler } from '../handler';
import { removeChineseCharacters } from '../utils/dom';

import './csdn.less';

export default class CsdnHandler extends Handler {
  crawl($paper) {
    const $title = document.getElementById('articleContentId');
    const title = $title.innerText.trim();

    const $author = document.querySelector('#asideProfile a#uid');
    const author = $author.querySelector('.name').innerText.trim();
    const authorLink = $author.href;

    const $date = document.querySelector('.article-info-box .time');
    const date = removeChineseCharacters($date.innerText).trim();

    const $content = document.querySelector('#article_content #content_views');
    $paper.innerHTML = '<div class="markdown_views">' + $content.innerHTML + '</div>';

    // 删除空白的p标签
    for (const $p of $paper.querySelectorAll('p')) {
      if ($p.innerText.trim() === '') {
        $p.remove();
      }
    }

    return {
      title,
      author,
      authorLink,
      updateTime: date,
      websiteLogo: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
    };
  }

  constructor() {
    super('csdn');
  }
}
