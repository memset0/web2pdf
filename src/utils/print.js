import { getWindow } from './browser';

export function handleOriginalContent() {
  // 给页面原式元素加上指定className，确保在打印时隐藏
  for (const $el of document.body.children) {
    if ($el.id && $el.id.startsWith('web2pdf-')) {
      // 如果是我们自己创建的元素，则跳过
      continue;
    }
    $el.classList.add('web2pdf-original-content');
  }
}

export function printToPdf() {
  getWindow().print();
}
