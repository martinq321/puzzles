'use strict';
const $=id=>document.getElementById(id),mode=document.body.dataset.lab,c=$('canvas'),ctx=c.getContext('2d'),W=900,H=800;
const val=id=>+$(id).value,on=id=>!!$(id)?.checked;
let strings=[],selected=null,yaw=.65,pitch=.35,timer=null,spin=false,drag=null;
const mint='#76e1c4',purple='#c1a0ff',gold='#ffd279',ink='#b9c9df';
function text(s,x,y,color=ink,size=17){ctx.fillStyle=color;ctx.font=`${size}px system-ui`;ctx.textAlign='center';ctx.fillText(s,x,y)}
function line(a,b,color=mint,width=1.8){ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()}
function dot(p,col=gold,r=5){ctx.beginPath();ctx.arc(...p,r,0,Math.PI*2);ctx.fillStyle=col;ctx.fill()}
function poly(points,color=gold,width=3){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()}
function axes(ext){const u=650/ext;const P=(x,y)=>[90+x*u,720-y*u];ctx.strokeStyle='#263750';ctx.lineWidth=1;for(let i=0;i<=ext;i++){line(P(i,0),P(i,ext),'#203047',1);line(P(0,i),P(ext,i),'#203047',1)}line(P(0,ext),P(0,0),ink,2);line(P(0,0),P(ext,0),ink,2);text('x',775,728);text('y',88,48);text('0',72,747);return P}
function draw2(){ctx.clearRect(0,0,W,H);ctx.fillStyle='#101827';ctx.fillRect(0,0,W,H);
 if(mode==='nails'){const n=val('n'),C=n+1,P=axes(C);for(const [a,b]of strings)line(P(a,0),P(0,b),'#76e1c488',2);for(let i=1;i<=n;i++){dot(P(i,0),selected?.axis==='x'&&selected.i===i?gold:ink,6);dot(P(0,i),selected?.axis==='y'&&selected.i===i?gold:ink,6);text(i,...[P(i,0)[0],748],ink,16);text(i,66,P(0,i)[1]+5,ink,16)}
 if(on('curve')){const pts=[];for(let j=0;j<=250;j++){const t=1/C+(1-2/C)*j/250;pts.push(P(C*t*t,C*(1-t)**2))}poly(pts,gold,4)}
 $('status').textContent=selected?`Selected ${selected.axis} = ${selected.i}. Tap a nail on the other axis.`:`${strings.length} strings · ${$('rule').value==='sum'?`matching numbers add to ${C}`:'choose any pair of nails'}.`;
 }else{const K=val('k'),x=val('x'),y=K/x,ext=2*K+1,P=axes(ext);ctx.save();ctx.beginPath();ctx.rect(90,70,650,650);ctx.clip();
 ctx.fillStyle='#76e1c420';const a=P(0,y),b=P(x,0);ctx.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);line(P(x,0),P(x,y),mint,2);line(P(0,y),P(x,y),mint,2);
 if(on('curve')){let pts=[];for(let i=0;i<=600;i++){const t=K/ext+(ext-K/ext)*i/600;pts.push(P(t,K/t))}poly(pts,gold,3)}
 for(const s of strings)line(P(2*s,0),P(0,2*K/s),'#c1a0ff77',2);
 if(on('tangent'))line(P(2*x,0),P(0,2*y),purple,3);dot(P(x,y),gold,7);ctx.restore();
 const step=K>16?4:2;for(let i=step;i<=2*K;i+=step){text(i,P(i,0)[0],748,ink,16);text(i,65,P(0,i)[1]+5,ink,16)}
 text(`width ${fmt(x)} × height ${fmt(y)} = ${K}`,450,35,mint,22);
 $('status').textContent=`Point (${fmt(x)}, ${fmt(y)}). String joins x = ${fmt(2*x)} to y = ${fmt(2*y)}. ${strings.length} pinned strings.`;
 }}
function fmt(n){return Number(n.toFixed(2)).toString()}
function project(p){const[x,y,z]=p;const X=x*Math.cos(yaw)-y*Math.sin(yaw),Y=x*Math.sin(yaw)+y*Math.cos(yaw);const Z=z*Math.cos(pitch)-Y*Math.sin(pitch),depth=z*Math.sin(pitch)+Y*Math.cos(pitch);const sc=170*val('zoom')*(6/(6+depth));return [450+X*sc,410-Z*sc,depth]}
function model(){let seg=[];const add=(a,b,col,w=1.7)=>seg.push({a,b,col,w});const n=val('n');
 if(mode==='saddle'){const b=val('bend');for(let i=0;i<n;i++){const t=-1+2*i/(n-1);add([t,-1,-b*t],[t,1,b*t],mint,2);if(on('second'))add([-1,t,-b*t],[1,t,b*t],purple,2)}const corners=[[-1,-1,b],[1,-1,-b],[1,1,b],[-1,1,-b]];for(let i=0;i<4;i++)add(corners[i],corners[(i+1)%4],ink,4);
 if(on('slice')){const z=val('level');const q=[[-1.15,-1.15,z],[1.15,-1.15,z],[1.15,1.15,z],[-1.15,1.15,z]];for(let i=0;i<4;i++)add(q[i],q[(i+1)%4],gold,2);if(b>0){if(Math.abs(z)<1e-8){add([-1,0,0],[1,0,0],gold,4);add([0,-1,0],[0,1,0],gold,4)}else for(let sign of [-1,1]){let last=null;for(let i=1;i<=400;i++){let x=sign*i/400,y=z/(b*x);if(Math.abs(y)<=1){let p=[x,y,z];if(last)add(last,p,gold,4);last=p}}}}
 $('status').textContent=b===0?(z===0?'The slice coincides with the whole flat surface.':'Flat surface: this slice does not meet it.'):Math.abs(z)>b?'This slice misses the saddle.':z===0?'Slice through the middle: two crossing straight lines.':'Yellow intersection: two pieces of a hyperbola.';
 }else $('status').textContent=b===0?'Bend = 0: a flat sheet.':'Every coloured thread is straight. Drag to see the saddle.';
 }else{const alpha=val('twist')*Math.PI/180,H=on('rigid')?Math.sqrt(9-4*Math.sin(alpha/2)**2):2.6,r=Math.cos(alpha/2);for(let i=0;i<n;i++){const t=i*2*Math.PI/n;for(const sign of on('second')?[1,-1]:[1])add([Math.cos(t),Math.sin(t),-H/2],[Math.cos(t+sign*alpha),Math.sin(t+sign*alpha),H/2],sign===1?mint:purple,2)}
 for(const z of [-H/2,H/2])for(let j=0;j<100;j++){const a=j*Math.PI/50,b=(j+1)*Math.PI/50;add([Math.cos(a),Math.sin(a),z],[Math.cos(b),Math.sin(b),z],ink,3)}
 if(on('waist'))for(let j=0;j<100;j++){const a=j*Math.PI/50,b=(j+1)*Math.PI/50;add([r*Math.cos(a),r*Math.sin(a),0],[r*Math.cos(b),r*Math.sin(b),0],gold,3)}
 const L=Math.sqrt(H*H+4*Math.sin(alpha/2)**2);$('status').textContent=`${alpha===0?'Cylinder':'Hyperboloid'} · height ${H.toFixed(2)} · waist radius ${r.toFixed(2)} · rod length ${L.toFixed(2)}.`;
 }return seg}
function draw3(){ctx.fillStyle='#101827';ctx.fillRect(0,0,W,H);const seg=model().map(s=>({...s,A:project(s.a),B:project(s.b)})).sort((a,b)=>(b.A[2]+b.B[2])-(a.A[2]+a.B[2]));for(const s of seg){ctx.globalAlpha=.8;line(s.A.slice(0,2),s.B.slice(0,2),s.col,s.w)}ctx.globalAlpha=1;text('Drag to turn • shape controls keep your view',450,765,ink,18)}
function draw(){document.querySelectorAll('input[type=range]').forEach(e=>{$(e.id+'Value').textContent=e.value});if(mode==='nails'||mode==='hyperbola')draw2();else draw3()}
function halt(){clearInterval(timer);timer=null;if($('auto'))$('auto').textContent='▶ Build slowly'}
function addString(){if(mode==='nails'){const n=val('n'),a=Array.from({length:n},(_,i)=>i+1).find(a=>!strings.some(s=>s[0]===a&&s[1]===n+1-a));if(a===undefined){halt();return}strings.push([a,n+1-a]);selected=null}else{const x=val('x');if(!strings.includes(x))strings.push(x)}draw()}
for(const id of ['add','clear','undo','auto','factors','view','spin'])if($(id))$(id).onclick=()=>{if(id==='add')addString();if(id==='clear'){halt();strings=[];selected=null;draw()}if(id==='undo'){halt();strings.pop();selected=null;draw()}if(id==='auto'){if(timer)halt();else{$('rule').value='sum';$('auto').textContent='Ⅱ Pause';timer=setInterval(addString,450);addString()}}if(id==='factors'){strings=Array.from({length:val('k')},(_,i)=>i+1).filter(x=>val('k')%x===0);draw()}if(id==='view'){yaw=.65;pitch=.35;$('zoom').value=1;draw()}if(id==='spin'){spin=!spin;$('spin').textContent=spin?'Ⅱ Pause turning':'▶ Turn slowly';if(spin)requestAnimationFrame(animate)}};
let previous=0;function animate(t){if(!spin)return;const dt=previous?Math.min(50,t-previous):16;previous=t;yaw+=dt*.0003;draw();requestAnimationFrame(animate)}
document.querySelectorAll('input,select').forEach(e=>e.addEventListener('input',()=>{if(e.id==='n'&&mode==='nails'||e.id==='k'){halt();strings=[];selected=null}if(e.id==='k'){$('x').max=e.value;$('x').value=Math.min(val('x'),val('k'))}if(e.id==='rule'){halt();selected=null}draw()}));
function pointer(e){const r=c.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]}
c.onpointerdown=e=>{const pos=pointer(e);if(mode==='nails'){halt();const n=val('n'),u=650/(n+1);let best=null,dist=32;for(let i=1;i<=n;i++)for(const axis of ['x','y']){const p=axis==='x'?[90+i*u,720]:[90,720-i*u];const d=Math.hypot(pos[0]-p[0],pos[1]-p[1]);if(d<dist){best={axis,i};dist=d}}if(!best)return;if(selected&&selected.axis!==best.axis){const a=selected.axis==='x'?selected.i:best.i,b=selected.axis==='y'?selected.i:best.i;if($('rule').value==='sum'&&a+b!==n+1){$('status').textContent=`Try a pair that adds to ${n+1}. Keep ${selected.i} and find ${n+1-selected.i}.`;return}if(!strings.some(s=>s[0]===a&&s[1]===b))strings.push([a,b]);selected=null}else selected=best;draw()}else if(mode==='saddle'||mode==='tower'){drag=pos;c.setPointerCapture(e.pointerId)}};
c.onpointermove=e=>{if(!drag)return;const p=pointer(e);yaw+=(p[0]-drag[0])*.007;pitch=Math.max(-1.45,Math.min(1.45,pitch+(p[1]-drag[1])*.007));drag=p;draw()};c.onpointerup=c.onpointercancel=()=>drag=null;
c.onkeydown=e=>{if(!['saddle','tower'].includes(mode))return;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();yaw+=e.key==='ArrowLeft'?-.12:e.key==='ArrowRight'?.12:0;pitch=Math.max(-1.45,Math.min(1.45,pitch+(e.key==='ArrowUp'?.12:e.key==='ArrowDown'?-.12:0)));draw()}};
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('save').onclick=()=>c.toBlob(blob=>download(blob,mode+'-investigation.png'));
if($('template'))$('template').onclick=()=>{const n=val('n'),C=n+1;let s=`<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="210mm" viewBox="0 0 800 800"><rect width="800" height="800" fill="white"/><text x="50" y="35" font-family="sans-serif" font-size="20">String art: match numbers that add to ${C}</text><path d="M70 70V710H710" fill="none" stroke="black"/>`;for(let i=1;i<=n;i++){const z=640*i/C;s+=`<circle cx="${70+z}" cy="710" r="4"/><circle cx="70" cy="${710-z}" r="4"/><text x="${70+z}" y="738" text-anchor="middle" font-family="sans-serif" font-size="17">${i}</text><text x="48" y="${716-z}" text-anchor="middle" font-family="sans-serif" font-size="17">${i}</text>`}s+='</svg>';download(new Blob([s],{type:'image/svg+xml'}),'string-nail-template.svg')};
draw();
