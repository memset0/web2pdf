import { ZhihuHandler } from './handlers/zhihu';

import BtnGroup from './components/BtnGroup';
import Paper from './components/Paper';

import './main.less';

async function main() {
  window.$web2pdf = {};

  const $paper = Paper();
  document.body.appendChild($paper);
  window.$web2pdf.$paper = $paper;

  const { hostname } = location;
  let handler = null;
  if (hostname.endsWith('zhihu.com')) {
    handler = new ZhihuHandler(hostname);
  }

  if (handler !== null) {
    const actions = {
      print: () => {
        handler.print();
      },
    };
    document.body.appendChild(BtnGroup(actions));
  } else {
    throw new Error('No matched handler!');
  }
}

try {
  main();
} catch (err) {
  console.error('[mem-web2pdf]', err);
}
