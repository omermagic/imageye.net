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
    const stageNumber = Number(number);

    if (stageNumber === 3) {
      // Imageye also detects CSS background images. Use a plain color in the
      // gallery phase so the four gallery photos are the only detected files.
      onboarding.style.backgroundImage = 'none';
    }

    stages.forEach((stage) => {
      const isActive = stage.dataset.stage === String(stageNumber);
      stage.classList.toggle('is-active', isActive);

      // The extension scans every image in the document, including images in
      // hidden stages. Remove the earlier stages so phase 3 contains exactly
      // the four gallery images.
      if (stageNumber === 3 && !isActive) {
        stage.remove();
      }
    });
    pinGuide.hidden = stageNumber !== 1;

    // Imageye's content script listens for this message and opens the
    // extension. Send it only after the previous stage images are gone.
    if (stageNumber === 3) {
      window.postMessage('imageye_open', '*');
    }
  };

  document.querySelectorAll('[data-next-stage]').forEach((button) => {
    button.addEventListener('click', () => showStage(button.dataset.nextStage));
  });

  document.querySelector('[data-finish-onboarding]').addEventListener('click', () => {
    window.location.href = 'https://www.google.com/';
  });
}

const uninstallForm = document.getElementById('uninstall-feedback');

if (uninstallForm) {
  const message = document.getElementById('uninstall-message');
  const send = uninstallForm.querySelector('.uninstall-send');

  message.addEventListener('input', () => {
    send.disabled = message.value.length === 0;
  });

  uninstallForm.addEventListener('submit', (event) => {
    event.preventDefault();
    message.disabled = true;
    send.disabled = true;
    send.textContent = 'Sent';
    uninstallForm.classList.add('is-submitted');
  });
}
