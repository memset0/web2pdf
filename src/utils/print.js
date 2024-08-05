export function printToPdf() {
  for (const $el of document.body.children) {
    if ($el.id && $el.id.startsWith('mem-web2pdf-')) {
      continue;
    }
    $el.classList.add('mem-web2pdf-original-content');
  }
  window.print();
}
