const serviceData = {
  it: { title: 'IT & Security Solutions', summary: 'Practical technology for safer, smarter spaces.', items: ['CCTV installation', 'CCTV maintenance & troubleshooting', 'Desktop & laptop services', 'Custom PC building', 'Networking & IT support', 'Website & digital technology services'] },
  electrical: { title: 'Electrical & Plumbing Services', summary: 'Complete infrastructure support from first planning to final installation.', items: ['New EB connection application assistance', 'House wiring, rewiring & safety checks', 'Electrical repairs & maintenance', 'New-house plumbing', 'Bathroom & kitchen plumbing', 'Leak repairs & drainage troubleshooting'], note: 'Electricity approvals and utility work remain subject to local authority requirements and appropriately licensed professionals.' },
  solar: { title: 'Solar & Renewable Energy', summary: 'Power your future with smarter solar solutions.', items: ['Residential solar installation', 'Commercial solar solutions', 'Solar plant setup', 'Cleaning, inspection & maintenance', 'Inverters & supporting equipment', 'Government scheme assistance'], note: 'Government subsidy availability and amounts depend on the applicable scheme, eligibility criteria, vendor requirements and approval by the responsible authorities.' },
  events: { title: 'Event Management', summary: 'Beautiful celebrations. Thoughtful planning. Memorable experiences.', items: ['Wedding planning & decoration', 'Engagements & family celebrations', 'Theme decoration', 'Catering coordination', 'Bridal & event makeup', 'Corporate events & on-site support'], note: 'Services and vendor availability are confirmed during enquiry and planning.' },
  media: { title: 'Photography, Videography & Digital Media', summary: 'Every moment has a story. Let us capture yours.', items: ['Pre-wedding photography', 'Wedding photography & videography', 'Post-wedding sessions', 'Event photography', 'Video editing & content production', 'Social media handling'] },
  relocation: { title: 'Home Relocation Services', summary: 'Moving homes made simpler.', items: ['Home shifting assistance', 'Packing material coordination', 'Fragile-item packing', 'Furniture preparation', 'Loading, unloading & transport coordination', 'Unpacking & basic placement'], note: 'Transport scope, timing and special handling are confirmed after reviewing the move requirements.' }
};

const header = document.querySelector('.site-header');
const backTop = document.querySelector('.back-top');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const servicesNav = document.querySelector('.services-nav');
const servicesButton = servicesNav.querySelector('button');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  backTop.classList.toggle('visible', window.scrollY > 700);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});
servicesButton.addEventListener('click', () => {
  if (window.innerWidth <= 800) {
    const open = servicesNav.classList.toggle('open');
    servicesButton.setAttribute('aria-expanded', open);
  }
});
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.filter-row button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-row button').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.project-card').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
}));

const dialog = document.querySelector('#service-dialog');
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = serviceData[button.dataset.service];
  document.querySelector('#dialog-title').textContent = service.title;
  document.querySelector('#dialog-summary').textContent = service.summary;
  document.querySelector('#dialog-list').innerHTML = service.items.map(item => `<span>${item}</span>`).join('');
  const note = document.querySelector('#dialog-note'); note.textContent = service.note || ''; note.hidden = !service.note;
  const message = `Hello JeRoSt Multi Service Providers, I would like to enquire about ${service.title}.`;
  document.querySelector('#dialog-enquire').href = `https://wa.me/918220083162?text=${encodeURIComponent(message)}`;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget; const status = form.querySelector('.form-status');
  if (!form.checkValidity()) { status.textContent = 'Please complete the required fields before continuing.'; form.reportValidity(); return; }
  const data = new FormData(form);
  const message = `Hello JeRoSt Multi Service Providers,\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email') || 'Not provided'}\nLocation: ${data.get('location')}\nService: ${data.get('service')}\nPreferred contact: ${data.get('contactMethod')}\n\nRequirement: ${data.get('message')}`;
  window.open(`https://wa.me/918220083162?text=${encodeURIComponent(message)}`, '_blank', 'noopener'); status.textContent = '';
});

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('.footer p').forEach(p => {
  if (p.textContent.trim() === 'Robinson · Primary enquiries') p.innerHTML = 'Robinson · Co-Founder &amp; Primary enquiries';
});
document.querySelectorAll('.contact-person small').forEach(label => {
  if (label.textContent.trim() === 'PRIMARY ENQUIRIES') label.textContent = 'CO-FOUNDER · PRIMARY ENQUIRIES';
});
