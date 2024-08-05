import { printToPdf } from './utils/print';

export class Handler {
  async print() {
    await this.crawl(this.$paper);
    printToPdf();
  }

  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.$paper = window.$web2pdf.$paper;
  }
}
