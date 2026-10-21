'use strict';
const Session={
 setDeck(d){return Array.from({length:3**d},(_,id)=>({id,values:Array.from({length:d},(_,i)=>Math.floor(id/3**i)%3)}));},
 isSet(a,b,c){return a.values.every((v,i)=>(v+b.values[i]+c.values[i])%3===0);},
 findSet(cards){for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++)for(let k=j+1;k<cards.length;k++)if(this.isSet(cards[i],cards[j],cards[k]))return [cards[i],cards[j],cards[k]];return null;},
 winningTriple(hand){for(let i=0;i<hand.length;i++)for(let j=i+1;j<hand.length;j++)for(let k=j+1;k<hand.length;k++)if(hand[i]+hand[j]+hand[k]===15)return [hand[i],hand[j],hand[k]];return null;},
 fifteenMove(hands,turn){const cache=new Map(),self=this;function search(h,t){const other=1-t;if(self.winningTriple(h[other]))return -1;const remaining=Array.from({length:9},(_,i)=>i+1).filter(x=>!h.flat().includes(x));if(!remaining.length)return 0;const key=h.map(a=>[...a].sort((a,b)=>a-b).join(',')).join('|')+':'+t;if(cache.has(key))return cache.get(key);let best=-2;for(const x of remaining){const next=h.map(a=>[...a]);next[t].push(x);best=Math.max(best,-search(next,other));if(best===1)break;}cache.set(key,best);return best;}
 const remaining=Array.from({length:9},(_,i)=>i+1).filter(x=>!hands.flat().includes(x));let best=-2,move=null;for(const x of remaining){const next=hands.map(a=>[...a]);next[turn].push(x);const score=-search(next,1-turn);if(score>best){best=score;move=x;}}return {move,score:best};},
 nimWins(n,max,lastLoses){const win=Array(n+1).fill(false);for(let r=1;r<=n;r++)for(let take=1;take<=Math.min(max,r);take++){if(lastLoses&&take===r)continue;if(take===r||!win[r-take]){win[r]=true;break;}}return win;},
 nimMove(n,max,lastLoses){const wins=this.nimWins(n,max,lastLoses);for(let t=1;t<=Math.min(max,n);t++){if(lastLoses&&t===n)continue;if(t===n||!wins[n-t])return t;}return 1;},
 sortTrace(original,weights,method){const a=[...original],trace=[];function push(x,y,text){trace.push({pair:[x,y],text,order:[...a]});}
 if(method==='selection'){for(let i=0;i<a.length-1;i++){let min=i;for(let j=i+1;j<a.length;j++){const x=a[min],y=a[j];if(weights[y]<weights[x])min=j;push(x,y,`${weights[x]<weights[y]?x:y} is lighter.`);}if(min!==i)[a[i],a[min]]=[a[min],a[i]];trace.at(-1).order=[...a];trace.at(-1).text+=` Put ${a[i]} in position ${i+1}.`;}}
 else{for(let i=1;i<a.length;i++){let j=i;while(j>0){const x=a[j-1],y=a[j],swap=weights[x]>weights[y];if(swap)[a[j-1],a[j]]=[a[j],a[j-1]];push(x,y,swap?`${y} is lighter: move it left.`:`${x} is lighter: this insertion is complete.`);if(!swap)break;j--;}}}return trace;}
};
if(typeof module!=='undefined')module.exports=Session;
