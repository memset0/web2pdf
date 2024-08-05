import './Paper.less';

export default function Paper() {
  const $div = document.createElement('div');
  $div.id = 'mem-web2pdf-paper';
  $div.classList.add('mem-web2pdf-paper');

  return $div;
}
