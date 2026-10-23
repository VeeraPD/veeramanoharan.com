/* Case pages: theme, smooth scroll and scroll staging. Every scrubbed tween reverses on scroll up. */
(function(){
  var root=document.documentElement;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var off=root.getAttribute('data-paused')==='true';
  var MOTION=!reduce&&!off&&!!(window.gsap&&window.ScrollTrigger);
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}

  var modeBtn=document.getElementById('mode');
  function modeUI(){modeBtn.setAttribute('aria-label',root.dataset.mode==='dark'?'Switch to light theme':'Switch to dark theme')}
  modeUI();
  modeBtn.addEventListener('click',function(){var m=root.dataset.mode==='dark'?'cream':'dark';root.dataset.mode=m;store('mode',m);modeUI()});

  /* demo videos: if the file is not there yet, keep the poster and show "Demo video coming soon" */
  document.querySelectorAll('.vframe video').forEach(function(v){
    var fr=v.closest('.vframe');
    function none(){fr.classList.add('novideo');v.removeAttribute('controls')}
    v.addEventListener('error',none,true);
    var s=v.querySelector('source');if(s)s.addEventListener('error',none);
    /* the error can fire before this script runs, so also check the state now and shortly after */
    function check(){if(v.networkState===3||(v.readyState===0&&v.error))none()}
    check();setTimeout(check,1500);
  });

  /* wide diagrams on phones: drop the edge fade once scrolled to the end, or when it all fits */
  document.querySelectorAll('.dgwrap').forEach(function(w){
    function upd(){w.classList.toggle('end',w.scrollLeft+w.clientWidth>=w.scrollWidth-4)}
    w.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
  });

  if(!MOTION){
    root.classList.add('simple');
    var els=document.querySelectorAll('.rv');
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}
    else els.forEach(function(el){el.classList.add('in')});
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll("details").forEach(function(d){d.addEventListener("toggle",function(){ScrollTrigger.refresh()})});
  var S=.8;
  if(fine&&window.Lenis){var lenis=new Lenis({lerp:.1,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}

  /* opening: title words rise once on load (not scroll-bound) */
  gsap.from('.open .label,.open h1,.stand,.open .links',{opacity:0,y:20,duration:.9,stagger:.1,ease:'power3.out'});
  /* lead image opens from the bottom and settles, scrubbed */
  gsap.fromTo('.lead-img',{clipPath:'inset(18% 0% 0% 0% round 18px)'},{clipPath:'inset(0% 0% 0% 0% round 18px)',ease:'none',scrollTrigger:{trigger:'.lead-img',start:'top 95%',end:'top 45%',scrub:S}});
  gsap.fromTo('.lead-img img,.lead-img svg',{scale:1.12},{scale:1,ease:'none',scrollTrigger:{trigger:'.lead-img',start:'top bottom',end:'bottom top',scrub:S}});
  /* summary cells come in left to right */
  gsap.fromTo('.tldr div',{opacity:0,y:20},{opacity:1,y:0,stagger:.12,ease:'none',scrollTrigger:{trigger:'.tldr',start:'top 92%',end:'top 62%',scrub:S}});
  gsap.fromTo('.summary div',{opacity:0,y:16},{opacity:1,y:0,stagger:.12,ease:'none',scrollTrigger:{trigger:'.summary',start:'top 90%',end:'top 60%',scrub:S}});
  /* section labels and headings */
  gsap.utils.toArray('.sec').forEach(function(s){
    gsap.fromTo(s.querySelectorAll(':scope>.label, h2'),{opacity:.25,y:22},{opacity:1,y:0,ease:'none',scrollTrigger:{trigger:s,start:'top 85%',end:'top 60%',scrub:S}});
    gsap.fromTo(s.querySelectorAll('.prose>*, .quote, .nums, .honest, .flow, .facts, .note, .intro, .blist, .tblwrap, .steps, .outro, .shots, .tree, .tiles, .vframe, .vcap, .road, .fig'),{opacity:0,y:18},{opacity:1,y:0,stagger:.1,ease:'none',scrollTrigger:{trigger:s,start:'top 75%',end:'top 40%',scrub:S}});
  });
  /* screens open like the lead image */
  gsap.utils.toArray('.shots .frame').forEach(function(f){
    gsap.fromTo(f,{clipPath:'inset(22% 0% 0% 0% round 14px)',opacity:.4},{clipPath:'inset(0% 0% 0% 0% round 14px)',opacity:1,ease:'none',scrollTrigger:{trigger:f,start:'top 92%',end:'top 55%',scrub:S}});
  });
  /* numbers count once when seen (real values only, from data-from / data-to) */
  document.querySelectorAll('[data-to]').forEach(function(el){
    var from=+el.dataset.from||0,to=+el.dataset.to,dec=+(el.dataset.dec||0),pre=el.dataset.pre||'',suf=el.dataset.suf||'';
    var o={v:from};el.textContent=pre+from.toFixed(dec)+suf;
    gsap.to(o,{v:to,duration:1.4,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%',toggleActions:'play none none reverse'},onUpdate:function(){el.textContent=pre+o.v.toFixed(dec)+suf}});
  });
  gsap.fromTo('.pn a',{opacity:0,y:20},{opacity:1,y:0,stagger:.12,ease:'none',scrollTrigger:{trigger:'.pn',start:'top 92%',end:'top 65%',scrub:S}});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ScrollTrigger.refresh()});
})();
