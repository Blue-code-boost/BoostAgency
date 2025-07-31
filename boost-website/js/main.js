
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener('click', (e) => {
    const verticalModal = document.getElementById('videoModal');
    const horizontalModal = document.getElementById('videoModalHorizontal');
    if (e.target === verticalModal) closeModal();
    if (e.target === horizontalModal) closeModal('horizontal');
  });
});
function openModal(typeOrUrl, optionalUrl) {
  if (typeOrUrl === 'horizontal') {
    const modal = document.getElementById('videoModalHorizontal');
    const frame = document.getElementById('modalFrameHorizontal');
    frame.src = optionalUrl;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('modalFrame');
    frame.src = typeOrUrl;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(type) {
  if (type === 'horizontal') {
    const modal = document.getElementById('videoModalHorizontal');
    const frame = document.getElementById('modalFrameHorizontal');
    frame.src = '';
    modal.style.display = 'none';
  } else {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('modalFrame');
    frame.src = '';
    modal.style.display = 'none';
  }
  document.body.style.overflow = 'auto';
}
