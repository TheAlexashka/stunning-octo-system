import{chromium}from'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://127.0.0.1:5173/');await p.waitForTimeout(700);
await p.getByRole('button',{name:'ГАЛЕРЕЯ ВНЕШНОСТИ',exact:true}).click();await p.waitForTimeout(400);
const tabs=p.locator('.hair-gallery__tabs');const opts=p.locator('.hair-gallery__options button');
await tabs.nth(0).getByRole('tab',{name:'Женщина'}).click();await p.waitForTimeout(250);
await tabs.nth(1).getByRole('tab',{name:'Одежда'}).click();await p.waitForTimeout(250);
const n=await opts.count();let idx=-1;
for(let i=0;i<n;i++){const t=await opts.nth(i).textContent();if(t&&t.includes('Бордовое')){idx=i;break}}
await opts.nth(idx).click();await p.waitForTimeout(600);
const box=await p.locator('.hair-gallery__portrait').boundingBox();
await p.screenshot({path:'/home/user/qa/ref-top.png',clip:{x:box.x,y:box.y,width:box.width,height:box.height*0.5}});
console.log('ref ok');
await b.close();
