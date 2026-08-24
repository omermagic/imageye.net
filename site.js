const chromeStore = 'https://chromewebstore.google.com/detail/image-downloader-imageye/agionbommeaifngbhincahgmoflcikhm';

document.querySelectorAll('[data-chrome-link]').forEach((link) => {
  link.href = chromeStore;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const onboarding = document.getElementById('onboarding');

if (onboarding) {
  const pinGuide = document.getElementById('pin-guide');
  const stages = [...document.querySelectorAll('.onboarding-stage')];

  const showStage = (number) => {
    stages.forEach((stage) => {
      stage.classList.toggle('is-active', stage.dataset.stage === String(number));
    });
    pinGuide.hidden = number !== 1;
  };

  document.querySelectorAll('[data-next-stage]').forEach((button) => {
    button.addEventListener('click', () => showStage(button.dataset.nextStage));
  });

  document.querySelector('[data-finish-onboarding]').addEventListener('click', () => {
    window.location.href = 'https://www.google.com/';
  });
}
