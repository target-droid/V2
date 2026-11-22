import assert from 'node:assert/strict';
import fs from 'node:fs';
const store=new Map();
globalThis.localStorage={
 getItem(k){return store.has(k)?store.get(k):null},
 setItem(k,v){store.set(k,String(v))},
 removeItem(k){store.delete(k)}
};
store.set('v2-cloud-config', JSON.stringify({url:'https://v2test.supabase.co',key:'sb_publishable_test'}));
store.set('v2-cloud-session', JSON.stringify({access_token:'token-test',refresh_token:'refresh-test',user:{id:'11111111-1111-4111-8111-111111111111'}}));
const {cloud}=await import('./cloud.js');
let requests=[];
globalThis.fetch=async(url,opt)=>{
 requests.push({url,options:opt});
 if(String(url).includes('/profiles?')) return new Response(JSON.stringify({code:'PGRST205',message:"Could not find the table 'public.profiles' in the schema cache"}),{status:404,headers:{'Content-Type':'application/json'}});
 return new Response('[]',{status:200,headers:{'Content-Type':'application/json'}});
};
await assert.rejects(cloud.checkSchema(), /supabase-repair\.sql.*SAME Supabase project/);
assert.equal(requests[0].url,'https://v2test.supabase.co/rest/v1/profiles?select=*&limit=0');
requests=[];
globalThis.fetch=async(url,opt)=>{requests.push({url,options:opt});return new Response('[]',{status:200,headers:{'Content-Type':'application/json'}})};
assert.equal(await cloud.checkSchema(),true);
assert.deepEqual(requests.map(x=>new URL(x.url).pathname.split('/').at(-1)),['profiles','teams','day_progress','learner_meta']);
cloud.configure('https://different.supabase.co','sb_publishable_other');
assert.equal(cloud.authenticated,false,'Changing the cloud project must remove stale authenticated session');
const sql=fs.readFileSync(new URL('./supabase-repair.sql',import.meta.url),'utf8');
for(const table of ['teams','profiles','day_progress','learner_meta']) assert.match(sql,new RegExp('create table if not exists public\\.'+table+'\\b','i'));
for(const rpc of ['create_team','join_team','set_study_day']) assert.match(sql,new RegExp('function public\\.'+rpc+'\\(','i'));
assert.match(sql,/notify pgrst, 'reload schema'/i);
assert.match(sql,/from auth\.users as u/i);
assert.doesNotMatch(sql.split('\n').filter(line=>!line.trim().startsWith('--')).join('\n'),/drop table|truncate table|delete from public\./i);
console.log('PASS cloud: missing profiles gives repair instructions, all table checks, project switching signs out, schema repair includes required objects and reload.');
