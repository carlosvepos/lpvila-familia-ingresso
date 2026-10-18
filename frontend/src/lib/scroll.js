let lenisInstance = null;

export const setLenis = (instance) => {
  lenisInstance = instance;
};

export const scrollToId = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -70, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
