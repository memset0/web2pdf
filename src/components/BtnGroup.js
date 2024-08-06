import './BtnGroup.less';

export default function BtnGroup(actions = {}) {
  const $div = document.createElement('div');
  $div.classList.add('web2pdf-button-group');

  if (Object.keys(actions).length === 0) {
    throw new Error('No actions provided!');
  }
  console.log(actions);

  for (const action in actions) {
    const $btn = document.createElement('button');
    $btn.innerText = action;
    $btn.classList.add('web2pdf-button');
    $btn.onclick = actions[action];
    $div.appendChild($btn);
  }

  return $div;
}
