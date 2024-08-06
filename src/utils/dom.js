export function removeChineseCharacters(string) {
  return string.replace(/[\u4e00-\u9fa5]/g, '');
}

export function removeBySelector(element, selector) {
  const elements = Array.from(element.querySelectorAll(selector));

  elements.sort(function (a, b) {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  }); // 根据节点深度进行排序，确保在DOM树中更深的节点先被删除

  elements.forEach(function (element) {
    if (element.parentNode !== null) {
      element.parentNode.removeChild(element);
    }
  });
}
