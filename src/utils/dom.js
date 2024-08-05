export function removeBySelector(element, selector) {
  const elements = Array.from(element.querySelectorAll(selector));

  elements.sort(function (a, b) {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  elements.forEach(function (element) {
    if (element.parentNode !== null) {
      element.parentNode.removeChild(element);
    }
  });
}
