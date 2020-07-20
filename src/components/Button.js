export default class Button {
  constructor(text, classes, handler, parentSelector) {
    this.text = text;
    this.classes = classes.split(' ');
    this.parent = document.querySelector(parentSelector);
    this.handler = handler;
  }

  render() {
    const element = document.createElement('button');
    this.classes.forEach((className) => {
      element.classList.add(className);
    });
    element.textContent = this.text;
    this.parent.insertAdjacentElement('afterbegin', element);
    element.addEventListener('click', this.handler);
  }
}
