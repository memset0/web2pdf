import BtnGroup from './components/BtnGroup';

import { ZhihuHandler } from './handlers/zhihu';

import './main.less';

async function main() {
  let handler = null;

  const { hostname } = location;
  if (hostname.endsWith('zhihu.com')) {
    handler = new ZhihuHandler(hostname);
  }

  if (handler !== null) {
    const actions = {
      print: () => {
        alert('print!');
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
