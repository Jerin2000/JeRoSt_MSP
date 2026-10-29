const serviceLinks = [
  ['it-security.html','IT & Security Solutions','Secure. Connect. Perform.'],
  ['electrical-plumbing.html','Electrical & Plumbing','Built right. Kept reliable.'],
  ['solar.html','Solar & Renewable Energy','Smarter energy, thoughtfully planned.'],
  ['events.html','Event Management','Plan less. Celebrate more.'],
  ['media.html','Photography & Digital Media','Moments, meaning and motion.'],
  ['relocation.html','Home Relocation','A calmer way to move.']
];

const enquiryContacts = {
  solar: { name: 'Stephen', phone: '918428832854' },
  events: { name: 'Kiruthika', phone: '918056554656' },
  default: { name: 'Robinson', phone: '918220083162' }
};
const getEnquiryContact = service => /solar/i.test(service || '') ? enquiryContacts.solar : /event/i.test(service || '') ? enquiryContacts.events : enquiryContacts.default;

const currentPage = location.pathname.split('/').pop() || 'index.html';
if (currentPage === 'team.html') location.replace('about.html#team');
const headerMarkup = `
  <header class="site-header" id="top"><div class="nav-shell">
    <a class="wordmark brand-wordmark" href="index.html" aria-label="JeRoSt home"><img class="brand-logo" src="assets/brand/jerost-logo.png" alt="JeRoSt Multi Service Providers"></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Open navigation"><span></span><span></span></button>
    <nav class="main-nav" id="main-nav" aria-label="Main navigation">
      <a href="index.html">Home</a><a href="about.html">About Us</a>
      <div class="services-nav"><button aria-expanded="false">Services</button><div class="mega-menu"><div class="mega-intro"><small>OUR EXPERTISE</small><h3>Six divisions.<br>One coordinated team.</h3><a href="services.html">View all services →</a></div><div class="mega-links">${serviceLinks.map((s,i)=>`<a href="${s[0]}"><b>0${i+1}</b><span>${s[1]}<small>${s[2]}</small></span></a>`).join('')}</div></div></div>
      <a href="projects.html">Projects</a><a href="contact.html">Contact Us</a>
    </nav>
  </div></header>`;

const footerMarkup = `
  <footer class="footer"><div class="container footer-grid"><div><a class="wordmark brand-wordmark light-wordmark" href="index.html" aria-label="JeRoSt home"><img class="brand-logo" src="assets/brand/jerost-logo.png" alt="JeRoSt Multi Service Providers"></a><p>One Trusted Partner. Multiple Services. Complete Solutions.</p></div><div><h3>Navigate</h3><a href="about.html">About Us</a><a href="services.html">Services</a><a href="projects.html">Projects</a></div><div><h3>Service Divisions</h3>${serviceLinks.map(s=>`<a href="${s[0]}">${s[1]}</a>`).join('')}</div><div><h3>Talk to us</h3><p>Robinson · Primary enquiries</p><a href="tel:+918220083162">+91 822 008 3162</a><a href="mailto:jerosttechnologies@gmail.com">jerosttechnologies@gmail.com</a></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} JeRoSt Multi Service Providers</span><span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a></span></div></footer>
  <a class="floating-wa" href="https://wa.me/918220083162?text=Hello%20JeRoSt%20Multi%20Service%20Providers%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp"><svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.3 11.7a8.3 8.3 0 0 1-12.2 7.4L3.8 20.4l1.3-4.1A8.3 8.3 0 1 1 20.3 11.7Z"/><path d="M8.1 7.5c.4-.4 1-.3 1.3.2l1 1.8c.2.4.1.8-.2 1.1l-.8.7c.8 1.5 1.8 2.5 3.3 3.3l.7-.8c.3-.3.7-.4 1.1-.2l1.8 1c.5.3.6.9.2 1.3l-.8.8c-.6.6-1.5.9-2.4.6-3.1-.9-5.6-3.4-6.5-6.5-.3-.9 0-1.8.6-2.4Z"/></svg><span>WhatsApp</span></a><button class="back-top" aria-label="Back to top">↑</button>`;

document.querySelector('#site-header')?.insertAdjacentHTML('afterbegin', headerMarkup);
document.querySelector('#site-footer')?.insertAdjacentHTML('afterbegin', footerMarkup);

const header = document.querySelector('.site-header');
const backTop = document.querySelector('.back-top');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const servicesNav = document.querySelector('.services-nav');
const servicesButton = servicesNav?.querySelector('button');

document.querySelectorAll('.main-nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});
if (serviceLinks.some(s => s[0] === currentPage) || currentPage === 'services.html') servicesButton?.classList.add('active');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
  backTop?.classList.toggle('visible', window.scrollY > 600);
});
backTop?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); document.body.classList.toggle('menu-open', open);
});
servicesButton?.addEventListener('click', () => {
  if (innerWidth <= 800) { const open = servicesNav.classList.toggle('open'); servicesButton.setAttribute('aria-expanded', open); }
});
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); document.body.classList.remove('menu-open'); }));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
} else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

document.querySelectorAll('[data-wa-service]').forEach(link => {
  const contact = getEnquiryContact(link.dataset.waService);
  link.href = `https://wa.me/${contact.phone}?text=${encodeURIComponent(`Hello ${contact.name}, I would like to enquire about ${link.dataset.waService} through JeRoSt Multi Service Providers.`)}`;
});

document.querySelector('#enquiry-form')?.addEventListener('submit', event => {
  event.preventDefault(); const form=event.currentTarget; if(!form.checkValidity()){form.reportValidity();return}
  const d=new FormData(form); const contact=getEnquiryContact(d.get('service')); const text=`Hello ${contact.name},\n\nI am contacting you through JeRoSt Multi Service Providers.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nEmail: ${d.get('email')||'Not provided'}\nLocation: ${d.get('location')}\nService: ${d.get('service')}\nPreferred contact: ${d.get('contactMethod')}\n\nRequirement: ${d.get('message')}`;
  window.open(`https://wa.me/${contact.phone}?text=${encodeURIComponent(text)}`,'_blank','noopener');
});

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  const updateEnquiryRecipient = () => {
    const contact = getEnquiryContact(enquiryForm.elements.service.value);
    const note = enquiryForm.querySelector('.form-note');
    const button = enquiryForm.querySelector('button[type="submit"]');
    if (note) note.textContent = `This enquiry will open in WhatsApp with ${contact.name}. Nothing is stored on this site.`;
    if (button) button.textContent = `Continue with ${contact.name} on WhatsApp →`;
  };
  enquiryForm.elements.service.addEventListener('change', updateEnquiryRecipient);
  updateEnquiryRecipient();
}

const detailedContent = {
  'it-security.html': {
    label:'PLANNED AROUND YOUR SPACE', title:'Technology should solve a clear requirement.',
    intro:'A useful system begins with the property, users and day-to-day need—not simply a list of devices. CCTV planning considers coverage, lighting, recording, remote access and cable routes. Computer and network planning considers workloads, connected devices, existing equipment and future use.',
    panels:[['Homes','Camera coverage, Wi-Fi improvement, computer servicing and practical device connectivity.'],['Small businesses','Security monitoring, office networks, workstation support and business websites.'],['Existing systems','Fault assessment and upgrade possibilities before recommending complete replacement.']],
    faqs:[['Can you work with an existing CCTV system?','Yes. The recorder, cameras and current problem can be assessed to determine whether repair, reconfiguration or upgrading is practical.'],['Do you build computers for non-gaming use?','Yes. Systems can be planned for office work, study, content creation, gaming or another defined workload.'],['Can you improve home Wi-Fi?','Router placement, coverage gaps, devices and available cabling can be reviewed before suggesting an approach.']]
  },
  'electrical-plumbing.html': {
    label:'FROM PLANNING TO MAINTENANCE', title:'Infrastructure work that considers the whole property.',
    intro:'Electrical and plumbing systems affect safety, comfort and future usability. Early coordination for a new home helps align points, loads, water routes, fixtures and equipment locations before finishes are completed. Existing properties begin with careful fault or renovation assessment.',
    panels:[['New construction','Room-by-room point planning, distribution, earthing, water supply and drainage coordination.'],['Renovation','Review existing systems, layout changes, replacement scope and practical work stages.'],['Repairs','Identify the observed problem, diagnose access conditions, select an approach and test the result.']],
    faqs:[['Can JeRoSt obtain a new electricity connection?','JeRoSt may assist with the process. Approval and utility work remain subject to authorities and licensed professionals.'],['Are small jobs accepted?','Both complete-house and smaller requirements can be discussed, subject to location and availability.'],['Why coordinate both systems early?','Early planning can reduce point conflicts, rework and access problems later.']]
  },
  'solar.html': {
    label:'SYSTEMS BEGIN WITH REQUIREMENTS', title:'Solar planning is more than choosing panel capacity.',
    intro:'A suitable proposal considers electricity usage, usable roof or site area, shade, structural access, connection type, equipment location and the customer’s goals. The right direction differs between homes, commercial facilities and existing installations.',
    panels:[['Site conditions','Usable area, shade, mounting, access, cable routes and existing infrastructure.'],['Energy profile','Consumption pattern, daytime usage, system purpose and likely future load changes.'],['Ongoing care','Monitoring expectations, cleaning access, inspection and equipment troubleshooting.']],
    faqs:[['Is every property suitable?','Suitability depends on area, shade, access, roof conditions and electrical infrastructure.'],['Is a subsidy guaranteed?','No. It depends on the current scheme, eligibility, vendor requirements and authority approval.'],['Can an existing system be serviced?','Cleaning, inspection, performance checks and troubleshooting can be considered after review.']]
  },
  'events.html': {
    label:'DETAILS CREATE THE EXPERIENCE', title:'An event works when creative and practical planning meet.',
    intro:'A well-coordinated event connects the guest count, venue, visual direction, food service, schedule and service partners. Early decisions help identify priorities and prevent decoration, catering, makeup, photography and venue activities from competing for time or space.',
    panels:[['Before the event','Discuss the occasion, venue, guest count, budget direction and preferred experience.'],['Creative planning','Shape décor, stage, lighting, menu and media requirements around one direction.'],['Event-day coordination','Align vendors, setup windows, key timings, service flow and on-site responsibilities.']],
    faqs:[['Can individual services be booked?','Yes. A customer may enquire about decoration, catering, makeup or coordination individually.'],['Is availability automatic?','No. Dates, artists, venues and vendors are confirmed during planning.'],['Do you support smaller functions?','Birthdays, engagements, housewarmings and other family functions can be discussed.']]
  },
  'media.html': {
    label:'PLAN THE STORY BEFORE THE SHOOT', title:'Good coverage begins before the camera starts.',
    intro:'Photography and video planning considers the occasion, schedule, locations, people, important moments, preferred visual style and intended outputs. Business content additionally needs clarity about audience, brand tone, platforms and publishing requirements.',
    panels:[['Occasion coverage','Build a practical timeline around ceremonies, portraits, family groups and key moments.'],['Post-production','Clarify highlights, long-form documentation, reels, image selection and editing direction.'],['Business content','Plan recurring subjects, platform formats, brand consistency and a manageable calendar.']],
    faqs:[['Can photography and video be combined?','Yes. Coverage requirements can be coordinated together based on the occasion and schedule.'],['Are social media results guaranteed?','No. Content support does not guarantee followers, engagement or sales.'],['Can existing footage be edited?','The team can review available files, quality and intended output before confirming feasibility.']]
  },
  'relocation.html': {
    label:'PREPARATION MAKES MOVING EASIER', title:'A move begins well before loading day.',
    intro:'Useful planning starts with the two locations, access conditions, household size, item types, fragile belongings, furniture, packing needs and preferred date. These details help determine materials, handling requirements, vehicle coordination and the expected moving-day sequence.',
    panels:[['Origin review','Floor access, parking, household volume, furniture and items requiring extra preparation.'],['Packing plan','Materials, room grouping, fragile-item handling, labels and customer-packed items.'],['Destination plan','Unloading access, room placement, unpacking needs and basic furniture positioning.']],
    faqs:[['Is insurance automatically included?','No. Any insurance or liability arrangement must be specifically confirmed with the transport provider.'],['Are delivery times guaranteed?','No. Timing depends on scope, access, route and transport arrangements confirmed for the move.'],['Can only packing help be requested?','Yes. Packing or unpacking assistance may be discussed separately, subject to availability.']]
  }
};

const detail = detailedContent[currentPage];
const pageCta = document.querySelector('.page-cta');
if (detail && pageCta) {
  const panels = detail.panels.map((p,i)=>`<article class="info-panel reveal"><span>0${i+1}</span><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('');
  const faqs = detail.faqs.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
  const extra = `<section class="detail-section"><div class="container"><div class="detail-intro reveal"><div><p class="eyebrow">${detail.label}</p><h2>${detail.title}</h2></div><p>${detail.intro}</p></div><div class="info-grid">${panels}</div></div></section><section class="detail-section white"><div class="container"><div class="section-kicker"><p class="eyebrow">HOW WE COORDINATE</p><h2>A clear path from enquiry to completion.</h2></div><div class="work-steps"><article class="work-step"><b>01</b><h3>Share the requirement</h3><p>Explain the location, need, priorities and preferred timing.</p></article><article class="work-step"><b>02</b><h3>Review &amp; assess</h3><p>Relevant conditions, dependencies and constraints are considered.</p></article><article class="work-step"><b>03</b><h3>Plan &amp; quote</h3><p>The proposed scope and next steps are made clear before work.</p></article><article class="work-step"><b>04</b><h3>Execute &amp; support</h3><p>The service is coordinated with relevant testing or handover.</p></article></div></div></section><section class="detail-section"><div class="container"><div class="section-kicker"><p class="eyebrow">COMMON QUESTIONS</p><h2>Useful points before you enquire.</h2></div><div class="faq-list">${faqs}</div></div></section>`;
  pageCta.insertAdjacentHTML('beforebegin', extra);
  document.querySelectorAll('.detail-section .reveal').forEach(el=>el.classList.add('visible'));
}

document.querySelectorAll('.footer p').forEach(p => {
  if (p.textContent.trim() === 'Robinson · Primary enquiries') p.innerHTML = 'Robinson · Co-Founder &amp; Primary enquiries';
});
if (currentPage === 'contact.html') {
  document.querySelectorAll('.contact-card p').forEach(p => {
    if (p.textContent.trim() === 'Robinson') p.textContent = 'Robinson · Co-Founder';
  });
}

if (currentPage === 'about.html') {
  const promiseSection = document.querySelector('.promise');
  const leadershipMarkup = `<section class="section team-section" id="team"><div class="container"><div class="section-heading reveal visible"><div><p class="eyebrow">OUR LEADERSHIP</p><h2>The people behind<br>the coordination.</h2></div><p>Focused service leadership helps each enquiry reach the right person, with Robinson serving as Co-Founder and primary customer contact.</p></div><div class="team-page-grid">
  <article class="profile-card reveal visible"><img src="assets/team/jerin.jfif" alt="Jerin Jude Allan"><div class="profile-info"><small>FOUNDER · IT &amp; TECHNOLOGY</small><h2>Jerin Jude Allan</h2><h3>Founder &amp; Head of IT &amp; Technology Solutions</h3><p>Founded JeRoSt and leads technology-focused requirements across security systems, computers, networks and digital solutions.</p><ul><li>CCTV installation and maintenance</li><li>Computer and laptop services</li><li>Custom PC building</li><li>Networking and website services</li></ul><a href="tel:+917010221287">+91 701 022 1287</a></div></article>
<article class="profile-card primary reveal visible"><img src="assets/team/robin.jpg" alt="Robinson"><div class="profile-info"><small>CO-FOUNDER · PRIMARY CUSTOMER CONTACT</small><h2>Robinson</h2><h3>Co-Founder · Photography &amp; Media Lead · Marketing · Electrical &amp; Plumbing</h3><p>Co-leads JeRoSt with a primary focus on photography and media, followed by marketing and business development, while also coordinating electrical and plumbing services and customer enquiries.</p><ul><li>Photography, videography and media production</li><li>Marketing and business development</li><li>Electrical and plumbing coordination</li><li>Primary customer communication</li></ul><a href="tel:+918220083162">+91 822 008 3162</a></div></article>
  <article class="profile-card reveal visible"><img src="assets/team/stephen.jpg" alt="Stephen Raj"><div class="profile-info"><small>SOLAR &amp; RENEWABLE ENERGY</small><h2>Stephen Raj</h2><h3>Head of Solar &amp; Renewable Energy Solutions</h3><p>Coordinates residential, commercial and larger solar requirements from consultation through maintenance planning.</p><ul><li>Residential and commercial solar</li><li>Solar plant installations</li><li>Maintenance and consultation</li><li>Eligible scheme assistance</li></ul><a href="tel:+918428832854">+91 842 883 2854</a></div></article>
<article class="profile-card reveal visible"><img src="assets/team/kiruthika.jpg" alt="Kiruthika"><div class="profile-info"><small>EVENTS · PROJECTS &amp; COORDINATION</small><h2>Kiruthika</h2><h3>Head of Event Management, Projects, Research &amp; Coordination</h3><p>Leads event planning and coordination while supporting project planning, research, documentation and communication across the growing service network.</p><ul><li>Event planning and vendor coordination</li><li>Project planning and management support</li><li>Research and documentation</li><li>Internal coordination</li></ul><a href="tel:+918056554656">+91 805 655 4656</a></div></article>
  </div></div></section>`;
  promiseSection?.insertAdjacentHTML('beforebegin', leadershipMarkup);
  document.querySelectorAll('a[href="team.html"]').forEach(link => link.setAttribute('href','about.html#team'));
}
document.querySelectorAll('a[href="team.html"]').forEach(link => link.setAttribute('href','about.html#team'));
