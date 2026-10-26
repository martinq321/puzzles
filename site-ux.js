(()=>{
'use strict';
const labels=/^(?:[↶↷↺↻⟲⟳]\s*)?(undo(?:\s+.*)?|redo(?:\s+.*)?|back one square)$/i;
function polishButton(button){
 if(button.closest('.mw-educator-dialog'))return;
 const label=button.textContent.trim().replace(/\s+/g,' '),match=label.match(labels);
 if(!match){if(button.dataset.mwIcon){delete button.dataset.mwIcon;button.classList.remove('mw-icon-action');if(button.dataset.mwGeneratedLabel){button.removeAttribute('aria-label');button.removeAttribute('title');delete button.dataset.mwGeneratedLabel}}return;}
 const readable=match[1].replace(/^./,x=>x.toUpperCase()),icon=/^redo/i.test(readable)?'↷':'↶';
 if(button.dataset.mwIcon===icon&&button.dataset.mwLabel===readable)return;
 button.dataset.mwIcon=icon;button.dataset.mwLabel=readable;button.classList.add('mw-icon-action');
 if(!button.hasAttribute('aria-label')){button.setAttribute('aria-label',readable);button.dataset.mwGeneratedLabel='true'}
 if(!button.title)button.title=readable;
}
let dialog,launch,returnFocus;
const educatorLabel=/^(?:for\s+)?(?:educators?|teachers?|facilitators?)(?:\s|[·:—–-]|$)/i;
function collectNotes(){
 const notes=[...document.querySelectorAll('details')].filter(d=>!d.closest('.mw-educator-dialog')&&(d.hasAttribute('data-mw-educator')||educatorLabel.test(d.querySelector(':scope > summary')?.textContent.trim()||'')));
 if(!notes.length)return;
 if(!dialog){
  dialog=document.createElement('dialog');dialog.className='mw-educator-dialog';dialog.setAttribute('aria-labelledby','mw-educator-title');
  dialog.innerHTML='<div class="mw-dialog-heading"><h2 id="mw-educator-title">Educator notes</h2><button type="button" class="mw-close" aria-label="Close educator notes" title="Close educator notes">×</button></div><div class="mw-note-content"></div>';
  document.body.append(dialog);
  launch=document.createElement('button');launch.type='button';launch.className='mw-educator-launch';launch.setAttribute('aria-label','Educator notes');launch.setAttribute('aria-haspopup','dialog');launch.title='Educator notes';
  launch.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v15M12 5C8 2 4 3 2 4v15c3-2 7-2 10 1 3-3 7-3 10-1V4c-2-1-6-2-10 1Z"/></svg>';
  const bar=document.createElement('div');bar.className='mw-page-tools';bar.append(launch);
  const header=document.querySelector('main > header, body > header, header');
  if(header)header.prepend(bar);else (document.querySelector('main')||document.body).prepend(bar);
  launch.onclick=()=>{returnFocus=document.activeElement;dialog.showModal();dialog.querySelector('.mw-close').focus()};
  dialog.querySelector('.mw-close').onclick=()=>dialog.close();
  dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus()});
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
 }
 for(const note of notes){note.hidden=false;note.open=true;note.setAttribute('data-mw-educator','');dialog.querySelector('.mw-note-content').append(note)}
}
function update(){document.querySelectorAll('button').forEach(polishButton);collectNotes()}
update();
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;update()})}).observe(document.body,{subtree:true,childList:true,characterData:true});
})();
