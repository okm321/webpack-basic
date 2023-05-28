type AccordionOptions = {
  /** アコーディオンの親 */
  elementId: string;
  /** アコーディオンの中身 */
  contentId: string;
  /** アコーディオンの初期状態 */
  initialState?: boolean;
  /** トランジション速度 */
  transitionSpeed?: number;
};

export class Accordion {
  private isOpen: boolean;
  private element: HTMLElement | null;
  private content: HTMLElement | null;
  private transitionSpeed: number;

  constructor(options: AccordionOptions) {
    this.isOpen = options.initialState ?? false;
    this.element = document.getElementById(options.elementId);
    this.content = document.getElementById(options.contentId);
    this.transitionSpeed = options.transitionSpeed ?? 0.5;

    if (this.element && this.content) {
      this.setInitialState();
    }
  }

  toggle(): void {
    if (!this.element || !this.content) return;

    this.isOpen = !this.isOpen;
    this.element.style.overflow = "hidden";
    this.element.style.height = `${this.element.clientHeight}px`;

    setTimeout(() => {
      if (this.element == null || this.content == null) {
        return;
      }
      this.element.style.height = this.isOpen
        ? `${this.content.clientHeight}px`
        : `0px`;
    }, 100);

    this.element.ontransitionend = () => {
      if (this.element == null) {
        return;
      }
      if (this.isOpen) {
        this.element.style.height = "";
        this.element.style.overflow = "";
      }
    };
  }

  private setInitialState(): void {
    if (!this.element || !this.content) return;

    this.element.style.height = this.isOpen
      ? `${this.content.clientHeight}px`
      : `0px`;
    this.element.style.transition = `height ${this.transitionSpeed}s ease-in-out`;
    this.element.style.overflow = "hidden";
  }
}
