//<!-- JS for Zoom Modal -->

const zoomableImages = document.querySelectorAll('.zoomable');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      const imageUrl = img.dataset.image;
      modalImage.src = imageUrl;
      modal.classList.remove('hidden');
    });
  });

  modal.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalImage.src = '';
  });