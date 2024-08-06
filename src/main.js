import { getWindow } from './utils/browser';
import ZhihuHandler from './handlers/zhihu';
import CsdnHandler from './handlers/csdn';
import BtnGroup from './components/BtnGroup';
import Paper from './components/Paper';

import './main.less';

async function main() {
  const window = getWindow();
  window.$web2pdf = {};

  const $paper = Paper();
  document.body.appendChild($paper);
  window.$web2pdf.$paper = $paper;

  const { hostname } = location;
  let handler = null;
  if (hostname.endsWith('zhihu.com')) {
    handler = new ZhihuHandler();
  } else if (hostname.endsWith('csdn.net')) {
    handler = new CsdnHandler();
  }

  if (handler !== null) {
    const actions = {
      readmode: () => {
        handler.readmode();
      },
      print: () => {
        handler.print();
      },
    };
    document.body.appendChild(BtnGroup(actions));
  } else {
    throw new Error('No matched handler!');
  }

  // setTimeout(() => handler.print(), 100); // for debug
}

try {
  main();
} catch (err) {
  console.error('[web2pdf]', err);
}
