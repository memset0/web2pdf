import { Handler } from '../handler';

export class ZhihuHandler extends Handler {
  crawl() {
    this.$paper.innerHTML = 'hello, world';
  }

  constructor(location) {
    super('zhihu', location);
  }
}
