document.addEventListener('DOMContentLoaded',()=>{
  // Sticky navbar
  const header=document.getElementById('header');
  window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40));
  // Mobile nav
  const navToggle=document.getElementById('navToggle'),navList=document.getElementById('navList');
  navToggle?.addEventListener('click',()=>{
    navList.classList.toggle('open');
    const bars=navToggle.querySelectorAll('span'),open=navList.classList.contains('open');
    bars[0].style.transform=open?'translateY(7px) rotate(45deg)':'';
    bars[1].style.opacity=open?'0':'';
    bars[2].style.transform=open?'translateY(-7px) rotate(-45deg)':'';
  });
  document.querySelectorAll('.nav__link').forEach(l=>l.addEventListener('click',()=>{
    navList.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});
  }));
  // Counter animation
  let counted=false;
  const startCounting=()=>{
    if(counted)return;counted=true;
    document.querySelectorAll('.stat__num').forEach(el=>{
      const target=+el.dataset.count,dur=1800,step=16,inc=target/(dur/step);
      let cur=0;
      const t=setInterval(()=>{cur+=inc;if(cur>=target){cur=target;clearInterval(t);}el.textContent=Math.floor(cur);},step);
    });
  };
  const hero=document.querySelector('.hero');
  if(hero){const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting)startCounting();},{threshold:0.3});obs.observe(hero);}
  // Portfolio filter
  const filterBtns=document.querySelectorAll('.filter-btn'),workCards=document.querySelectorAll('#workGrid .work-card');
  filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    const filter=btn.dataset.filter;
    workCards.forEach(card=>{
      const match=filter==='all'||card.dataset.category===filter;
      card.style.transition='opacity 0.3s,transform 0.3s';
      if(match){card.classList.remove('hidden');card.style.opacity='1';card.style.transform='';}
      else{card.style.opacity='0';card.style.transform='scale(0.95)';setTimeout(()=>{if(filter!=='all'&&card.dataset.category!==filter)card.classList.add('hidden');},300);}
    });
  }));
  // Contact form
  const form=document.getElementById('contactForm');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('button[type="submit"]'),orig=btn.innerHTML;
    btn.innerHTML='<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
    btn.style.background='#22c55e';btn.disabled=true;
    setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';btn.disabled=false;form.reset();},4000);
  });
  // Back to top
  const backTop=document.getElementById('backTop');
  window.addEventListener('scroll',()=>backTop?.classList.toggle('visible',window.scrollY>500));
  backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  // Scroll reveal
  const reveals=document.querySelectorAll('.service-card,.work-card,.testi-card,.about__inner,.contact__inner');
  const ro=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';ro.unobserve(entry.target);}
  }),{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  reveals.forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(28px)';el.style.transition=`opacity 0.6s ease ${i*.06}s,transform 0.6s ease ${i*.06}s`;ro.observe(el);});
  // Active nav
  const navObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting)document.querySelectorAll('.nav__link').forEach(l=>{l.style.color=l.getAttribute('href')==='#'+entry.target.id?'#fff':''});
  }),{threshold:0.4});
  document.querySelectorAll('section[id]').forEach(s=>navObs.observe(s));
  // Chart hover
  document.querySelectorAll('.chart__bar').forEach(bar=>{
    bar.addEventListener('mouseenter',()=>bar.style.background='var(--orange)');
    bar.addEventListener('mouseleave',()=>bar.style.background='');
  });
});
