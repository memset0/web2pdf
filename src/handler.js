import { printToPdf } from './utils/print';
import Header from './components/Header';

export class Handler {
  async render() {
    const props = {
      title: document.title,
      link: location.href,
      website: location.host.split('.').slice(-2).join('.'),
      ...(await this.crawl(this.$paper)), // 在渲染打印内容的同时抓去页面元数据
    };

    this.$paper.insertBefore(Header(props), this.$paper.firstChild);
    // this.$paper.insertBefore(PageHeader(props), this.$paper.firstChild); // removed
    // this.$paper.appendChild(PageFooter(props)); // removed

    return props;
  }

  async print() {
    const props = await this.render();
    document.title = [
      `${props.author} (${props.website})`, //
      props.title,
    ].join(' - ');
    printToPdf();
  }

  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.$paper = window.$web2pdf.$paper;

    document.body.classList.add('mem-web2pdf-websize-' + this.name);
  }
}
