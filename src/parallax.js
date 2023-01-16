export default class Parallax {
  /**
   * @param {any} element
   */
  constructor(element) {
      this.element = element;
      this.speed = 0.5;
      this.bindEvents();
  }

  bindEvents() {
      document.addEventListener("mousemove", (event) => {
          this.handleMouseMove(event);
      });
  }

  /**
   * @param {MouseEvent} event
   */
  handleMouseMove(event) {
      const x = event.clientX;
      const y = event.clientY;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const offsetX = (x / w - 0.5) * this.speed;
      const offsetY = (y / h - 0.5) * this.speed;

      this.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
}
