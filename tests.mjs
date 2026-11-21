import assert from 'node:assert/strict';
import {curriculum,phases,videos,totalHours} from './course.js';
assert.equal(curriculum.length,120,'Exactly 120 days');
assert.equal(phases.length,8,'Eight learning phases');
assert.equal(totalHours,720,'720 scheduled hours');
assert.equal(new Set(curriculum.map(x=>x.day)).size,120,'No duplicate day numbers');
assert.equal(new Set(curriculum.map(x=>x.title)).size,120,'Unique lesson titles');
assert.deepEqual(phases.map(x=>x.lessons.length),[15,20,21,12,15,10,15,12]);
for(let i=0;i<120;i++){
 let x=curriculum[i];
 assert.equal(x.day,i+1,`Day sequence ${i+1}`);
 assert.equal(x.blocks.length,6,`Day ${i+1}: six study blocks`);
 assert.equal(x.blocks.reduce((s,b)=>s+b.minutes,0),360,`Day ${i+1}: 360 minutes`);
 assert.ok(x.title&&x.assignment&&x.dsa,`Day ${i+1}: meaningful content`);
 assert.equal(x.quiz[1].length,4,`Day ${i+1}: four quiz options`);
 assert.ok(Number.isInteger(x.quiz[2])&&x.quiz[2]>=0&&x.quiz[2]<4,`Day ${i+1}: valid answer`);
 assert.ok(videos[x.videoKey],`Day ${i+1}: mapped video`);
}
for(const [name,v] of Object.entries(videos)){
 assert.ok(v.url.startsWith('https://www.youtube.com/'),`Video ${name}: valid YouTube link domain`);
 assert.ok(v.embed.startsWith('https://www.youtube-nocookie.com/embed/'),`Video ${name}: embed URL syntax`);
}
console.log('PASS: 120 unique lessons, eight phases, 6 hours per day, 11 formatted video links, quiz structure and day mapping.');
