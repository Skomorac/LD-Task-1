class ImageTextSection extends HTMLElement {
  constructor() {
    super();
    // Elements
    this.textContainer = null;
    this.button = null;
    this.paragraphToggle = null;
    this.observer = null;
  }

  connectedCallback() {
    // Find elements
    this.textContainer = this.querySelector(".image-text__text-container");
    this.button = this.querySelector(".image-text__button");
    this.paragraphToggle = this.querySelector(".image-text__paragraph-toggle");

    // Set initial state (expanded)
    if (this.textContainer) {
      this.textContainer.classList.add("image-text__text-container--expanded");
    }

    // Hide the toggle paragraph by default
    if (this.paragraphToggle) {
      this.paragraphToggle.classList.remove(
        "image-text__paragraph-toggle--visible"
      );
    }

    // Toggle logic: button disappears, paragraph appears, container expands
    if (this.button && this.paragraphToggle && this.textContainer) {
      this.button.addEventListener("click", () => {
        this.button.classList.add("image-text__button--hidden");
        this.paragraphToggle.classList.add(
          "image-text__paragraph-toggle--visible"
        );
        this.textContainer.classList.add(
          "image-text__text-container--expanded"
        );
      });
    }

    // Intersection Observer for reveal/hide
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.classList.add("image-text--visible");
          } else {
            this.classList.remove("image-text--visible");
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
      }
    );
    this.observer.observe(this);
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

customElements.define("image-text-section", ImageTextSection);
