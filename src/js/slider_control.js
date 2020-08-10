const sliderControl = (() => {
  const slides = document.querySelectorAll('.slide-wrap');
  const sliderButtons = document.querySelectorAll('button.slider-btn');
  let activeIndex = 0;
  let previousIndex = getPreviousIndex();
  let nextIndex = getNextIndex();

  function moveToRight() {
    slides[activeIndex].classList.add('remove-to-right');
  }

  function moveToLeft() {
    slides[activeIndex].classList.add('remove-to-left');
  }

  function getPreviousIndex() {
    const prevValue = activeIndex - 1;
    const slidesLimit = slides.length - 1;

    return prevValue >= 0 ? prevValue : slidesLimit;
  }

  function getNextIndex() {
    const nextValue = activeIndex + 1;
    const slidesLimit = slides.length - 1;
    const firstSlide = 0;

    return nextValue <= slidesLimit ? nextValue : firstSlide;
  }

  function updateIndices(direction) {
    activeIndex = direction === 'right' ? nextIndex : previousIndex;
    previousIndex = getPreviousIndex();
    nextIndex = getNextIndex();
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') moveToRight();
    if (e.code === 'ArrowLeft') moveToLeft();
  });

  sliderButtons.forEach(button => {
    button.addEventListener('click', e => {
      if (button.classList.contains("next")) moveToRight();
      if (button.classList.contains("prev")) moveToLeft();
    });
  });

  slides.forEach((slide) => {
    slide.addEventListener('animationend', (e) => {
      // slide removal
      if (e.animationName === 'remove-to-right') {
        slide.classList.remove('active', 'remove-to-right');
        slides[nextIndex].classList.add('appear-from-left', 'active');
        updateIndices('right');
      } else if (e.animationName === 'remove-to-left') {
        slide.classList.remove('active', 'remove-to-left');
        slides[previousIndex].classList.add('appear-from-right', 'active');
        updateIndices('left');
      }

      // slide appearing
      if (e.animationName.includes('appear')) {
        slide.classList.remove('appear-from-left', 'appear-from-right');
      }
    });
  });
})();

export default sliderControl;
