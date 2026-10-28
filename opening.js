(()=>{
  window.scrollTo({top:0,left:0,behavior:'instant'});
  const reset=()=>window.scrollTo({top:0,left:0,behavior:'instant'});
  window.addEventListener('load',reset,{once:true});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const intro=document.createElement('div');intro.className='fire-opening';intro.setAttribute('aria-label','Kasım Ateşi açılışı');
  intro.innerHTML='<canvas aria-hidden="true"></canvas><div class="opening-halo"></div><div class="opening-tongues" aria-hidden="true">'+Array.from({length:17},(_,i)=>`<i style="--i:${i};--h:${35+(i*37)%55}%;--d:${(i%5)*-.21}s"></i>`).join('')+'</div><div class="opening-title"><span>LARA ÇARŞI AVM / KASIM 2026</span><strong>KASIM<br><em>ATEŞİ</em></strong><p>ŞİMDİ BAŞLIYOR.</p></div><button class="skip-opening">Açılışı geç ↗</button>';
  document.body.prepend(intro);document.body.classList.add('opening-active');
  const canvas=intro.querySelector('canvas'),ctx=canvas.getContext('2d');let raf,finished=false,particles=[],last=0;
  function size(){const d=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*d;canvas.height=innerHeight*d;ctx?.setTransform(d,0,0,d,0,0)}size();
  function draw(t){if(finished||!ctx)return;const dt=Math.min((t-last)||16,34)/16;last=t;ctx.clearRect(0,0,innerWidth,innerHeight);if(particles.length<130)for(let i=0;i<4;i++)particles.push({x:Math.random()*innerWidth,y:innerHeight+20,vx:(Math.random()-.5)*1.5,vy:2+Math.random()*5,life:1,r:.7+Math.random()*2.6});ctx.globalCompositeOperation='lighter';particles=particles.filter(p=>p.life>0&&p.y>0);for(const p of particles){p.x+=p.vx*dt+Math.sin(t*.002+p.y*.01)*.4;p.y-=p.vy*dt;p.life-=.0035*dt;ctx.beginPath();ctx.fillStyle=`rgba(255,${100+Math.round(p.life*100)},45,${p.life*.8})`;ctx.shadowBlur=12;ctx.shadowColor='#ff6522';ctx.ellipse(p.x,p.y,p.r,p.r*2.2,0,0,Math.PI*2);ctx.fill()}raf=requestAnimationFrame(draw)}
  if(ctx)raf=requestAnimationFrame(draw);
  function finish(){if(finished)return;finished=true;cancelAnimationFrame(raf);clearTimeout(timer);intro.classList.add('finished');document.body.classList.remove('opening-active');reset();setTimeout(()=>intro.remove(),700)}
  intro.querySelector('button').onclick=finish;const timer=setTimeout(finish,2800);
  addEventListener('keydown',e=>{if(e.key==='Escape')finish()},{once:true});
})();
