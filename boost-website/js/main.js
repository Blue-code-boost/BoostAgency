
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


// Contenido de cada servicio
const serviceDetails = {
  consulting: {
    title: "Consulting",
    text: "Our Consulting service is a strategic alliance—we immerse ourselves in your business to redefine its foundation, discover its edge, and ignite sustainable growth through deep branding, positioning, and business model design."
  },
  viral: {
    title: "Viral Creation",
    text: "We create content that captures attention and emotion. Our Viral Creation is about blending storytelling, trend-jumping, and aesthetic mastery to turn your brand into a cultural moment people can’t ignore."
  },
  automation: {
    title: "Business Automation",
    text: "We build custom no-code tools and automations so your business runs like a machine. Whether it’s onboarding, content distribution or client retention, we turn complexity into flow—and free up your time to scale."
  }
};

function openServiceModal(type) {
  const modal = document.getElementById("servicesModal");
  const title = document.getElementById("modalServiceTitle");
  const text = document.getElementById("modalServiceText");

  const data = serviceDetails[type];
  title.textContent = data.title;
  text.textContent = data.text;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeServiceModal() {
  const modal = document.getElementById("servicesModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function openBoostPlanModal(title, description) {
  const modal = document.getElementById("boostPlanModal");
  document.getElementById("modalPlanTitle").innerText = title;
  document.getElementById("modalPlanDescription").innerText = description;
  modal.classList.add('show');
  modal.style.display = 'flex';
}

function closeBoostPlanModal() {
  const modal = document.getElementById("boostPlanModal");
  modal.classList.remove('show');
  modal.style.display = 'none';
}

// Scroll suave para los links del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
