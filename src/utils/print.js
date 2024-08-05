import { handleOriginalContent } from './page';

export function printToPdf() {
  handleOriginalContent();
  window.print();
}
