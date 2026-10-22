const crossingSets={
 classic:{name:'Wolf, goat & lettuce',capacity:1,items:[['Wolf','🐺'],['Goat','🐐'],['Lettuce','🥬']],pairs:[[0,1],[1,2]]},
 expedition:{name:'The mixed cargo crossing',capacity:2,items:[['Wolf','🐺'],['Goat','🐐'],['Lettuce','🥬'],['Fox','🦊'],['Goose','🪿']],pairs:[[0,1],[1,2],[3,4],[4,2]]}
};
function crossingMoves(set,state){const [mask,side]=state,here=set.items.map((_,i)=>i).filter(i=>((mask>>i)&1)===side),loads=[[]];for(const i of here)loads.push([i]);if(set.capacity>=2)for(let i=0;i<here.length;i++)for(let j=i+1;j<here.length;j++)loads.push([here[i],here[j]]);return loads.map(load=>{let next=mask;for(const i of load)next^=1<<i;return{load,state:[next,1-side]}}).filter(m=>!unsafe(set,m.state))}
function unsafe(set,[mask,side]){return set.pairs.find(([a,b])=>((mask>>a)&1)===((mask>>b)&1)&&((mask>>a)&1)!==side)}
function solveCrossing(set,state){const goal=(1<<set.items.length)-1,q=[{state,steps:[]}],seen=new Set([state.join(',')]);for(let h=0;h<q.length;h++){const cur=q[h];if(cur.state[0]===goal&&cur.state[1]===1)return cur.steps;for(const m of crossingMoves(set,cur.state)){const key=m.state.join(',');if(!seen.has(key)){seen.add(key);q.push({state:m.state,steps:[...cur.steps,m]})}}}return null}

crossingSets.expeditionPlus={...crossingSets.expedition,name:'Seven-item expedition',items:[...crossingSets.expedition.items,['Grain','🌾'],['Tools','🧰']],pairs:[...crossingSets.expedition.pairs,[4,5]]};
