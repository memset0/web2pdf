import './Paper.less';

export default function Paper() {
  const $div = document.createElement('div');
  $div.id = 'web2pdf-paper';
  $div.classList.add('web2pdf-paper');

  return $div;
}
