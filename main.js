/* CURSOR */
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;

if (cursor && window.matchMedia('(min-width: 901px)').matches) {
  document.addEventListener('mousemove', e=>{
    mx=e.clientX;my=e.clientY;
    cursor.style.left=mx+'px';cursor.style.top=my+'px';
  });
  function loop(){
    rx+=(mx-rx)*.18;ry+=(my-ry)*.18;
    if (ring) { ring.style.left=rx+'px';ring.style.top=ry+'px'; }
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, [data-hover]').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{
      cursor.classList.add('hover');
      if (ring) {
        ring.classList.add('hover');
        if(el.dataset.hover==='view') ring.classList.add('hover-view');
      }
    });
    el.addEventListener('mouseleave', ()=>{
      cursor.classList.remove('hover');
      if (ring) {
        ring.classList.remove('hover');
        ring.classList.remove('hover-view');
      }
    });
  });
}

/* NAV SCROLL */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

/* REVEAL ON SCROLL */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold:.15, rootMargin:'0px 0px -80px 0px'});
document.querySelectorAll('.reveal,.reveal-stagger').forEach(el=>io.observe(el));

/* PILLS (filters) */
document.querySelectorAll('.era-pill, .filter-pill').forEach(p=>{
  p.addEventListener('click', ()=>{
    const group = p.parentElement;
    group.querySelectorAll('.era-pill, .filter-pill').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
  });
});

/* HERO PARALLAX */
const frames = document.querySelectorAll('.frame');
if (frames.length && window.matchMedia('(min-width: 901px)').matches) {
  document.addEventListener('mousemove', e=>{
    const cx = window.innerWidth/2;
    const cy = window.innerHeight/2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    frames.forEach((f,i)=>{
      const depth = (i+1)*8;
      f.style.transform = `translate(${dx*depth}px, ${dy*depth}px)`;
    });
  });
}

/* HERO SIDE NUMS */
const sideNums = document.querySelectorAll('.side-num');
let activeNum = 0;
if (sideNums.length) {
  setInterval(()=>{
    sideNums.forEach(n=>n.classList.remove('active'));
    activeNum = (activeNum+1)%sideNums.length;
    sideNums[activeNum].classList.add('active');
  },3500);
}

/* MENU OVERLAY */
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
if (menuBtn && menuOverlay) {
  menuBtn.addEventListener('click', ()=>{
    menuOverlay.classList.add('open');
    document.body.style.overflow='hidden';
  });
}
if (menuClose && menuOverlay) {
  menuClose.addEventListener('click', ()=>{
    menuOverlay.classList.remove('open');
    document.body.style.overflow='';
  });
}
if (menuOverlay) {
  menuOverlay.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      menuOverlay.classList.remove('open');
      document.body.style.overflow='';
    });
  });
}

/* TIMELINE RAIL (eras page) */
const timelineDots = document.querySelectorAll('.tl-dot');
if (timelineDots.length) {
  const obsTl = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        const i = e.target.dataset.idx;
        document.querySelectorAll('.tl-dot').forEach(d => d.classList.remove('active'));
        const dot = document.querySelector(`.tl-dot[data-idx="${i}"]`);
        if (dot) dot.classList.add('active');
      }
    });
  }, {threshold: .5});
  document.querySelectorAll('.era-section').forEach(s => obsTl.observe(s));
}

/* GALLERY HOVER PREVIEW */
const galleryItems = document.querySelectorAll('.gal-item');
const galleryPreview = document.getElementById('galleryPreview');
if (galleryItems.length && galleryPreview && window.matchMedia('(min-width: 901px)').matches) {
  galleryItems.forEach(item=>{
    item.addEventListener('mousemove', e=>{
      galleryPreview.style.left=e.clientX+'px';
      galleryPreview.style.top=e.clientY+'px';
    });
  });
}

/* GALLERY FILTER */
const filterPills = document.querySelectorAll('.gallery-controls .filter-pill');
filterPills.forEach(p=>{
  p.addEventListener('click', ()=>{
    const cat = p.dataset.filter;
    document.querySelectorAll('.gal-item').forEach(item=>{
      if (cat === 'all' || !cat) item.style.display = '';
      else item.style.display = item.dataset.cat === cat ? '' : 'none';
    });
  });
});
