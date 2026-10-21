'use strict';
const $=s=>document.querySelector(s),app=$('#app');
const Games={};
const say=s=>$('#status').textContent=s;
function button(label,fn,parent=app){const b=document.createElement('button');b.textContent=label;b.onclick=fn;parent.append(b);return b}
function options(id,label,values){return `<label>${label} <select id="${id}">${values.map(v=>`<option value="${Array.isArray(v)?v[0]:v}">${Array.isArray(v)?v[1]:v}</option>`).join('')}</select></label>`}
function download(name,data,type='text/plain'){const a=document.createElement('a'),u=URL.createObjectURL(new Blob([data],{type}));a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
window.addEventListener('DOMContentLoaded',()=>Games[document.body.dataset.game]());
