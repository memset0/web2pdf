import { printToPdf } from './utils/print';

export class Handler {
  print() {
    this.crawl();
    printToPdf();
  }

  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.$paper = window.$web2pdf.$paper;
  }
}
