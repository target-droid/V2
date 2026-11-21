import {CLOUD_URL,CLOUD_PUBLISHABLE_KEY} from './cloud-config.js';
// Optional cloud progress sync: purely browser-side calls to a user-provided Supabase project.
const CFG='v2-cloud-config', SESSION='v2-cloud-session';
const legacyKey=k=>k.replace(/^v2-/,['dev','launch-duo-'].join(''));
const storeGet=(k)=>{try{return JSON.parse(localStorage.getItem(k)||localStorage.getItem(legacyKey(k))||'null')}catch{return null}};
export const cloud={
 get config(){let saved=storeGet(CFG)||{};return saved.url&&saved.key?saved:{url:CLOUD_URL||'',key:CLOUD_PUBLISHABLE_KEY||''}},
 get session(){return storeGet(SESSION)},
 get available(){let c=this.config;return !!(c.url&&c.key)},
 get authenticated(){return Boolean(this.session?.access_token&&this.session?.user?.id)},
 configure(url,key){url=url.trim().replace(/\/$/,''); if(url&&!/^https:\/\/[\w.-]+\.supabase\.co$/.test(url))throw Error('Enter your Supabase HTTPS project URL (https://PROJECT.supabase.co).'); if(url&&!key.trim())throw Error('Publishable key is required.');localStorage.setItem(CFG,JSON.stringify({url,key:key.trim()}));},
 async auth(path,body){if(!this.available)throw Error('Configure Supabase first.');const {url,key}=this.config;let res=await fetch(`${url}/auth/v1/${path}`,{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify(body)});let data=await res.json().catch(()=>({}));if(!res.ok)throw Error(data.msg||data.error_description||data.message||`Auth error ${res.status}`);if(data.access_token)localStorage.setItem(SESSION,JSON.stringify(data));return data;},
 async signup(email,password,display_name='Praveen'){return this.auth('signup',{email,password,data:{display_name}})},
 async signin(email,password){return this.auth('token?grant_type=password',{email,password})},
 async refresh(){const s=this.session;if(!s?.refresh_token)throw Error('Please sign in again.');return this.auth('token?grant_type=refresh_token',{refresh_token:s.refresh_token});},
 logout(){localStorage.removeItem(SESSION);},
 async api(path,{method='GET',body=null,prefer='return=representation'}={}){if(!this.available||!this.authenticated)throw Error('Sign in to enable cloud sync.');let {url,key}=this.config;const make=async()=>{let h={apikey:key,Authorization:`Bearer ${this.session.access_token}`,'Content-Type':'application/json',Prefer:prefer};let res=await fetch(`${url}/rest/v1/${path}`,{method,headers:h,body:body===null?undefined:JSON.stringify(body)});return res;};let res=await make();if(res.status===401){await this.refresh();res=await make();}let content=await res.text();let data;try{data=content?JSON.parse(content):null}catch{data=content}if(!res.ok)throw Error(data?.message||data?.hint||`Database error ${res.status}`);return data;},
 async rpc(name,params){return this.api(`rpc/${name}`,{method:'POST',body:params})},
 async upsertProfile(name){const user_id=this.session?.user?.id;if(!user_id)throw Error('Not signed in');const display_name=name.trim().slice(0,48)||'Learner';const existing=await this.getMyProfile();if(existing)return this.api(`profiles?id=eq.${encodeURIComponent(user_id)}`,{method:'PATCH',body:{display_name}});return this.api('profiles',{method:'POST',body:{id:user_id,display_name}});},
 async getMyProfile(){let id=this.session.user.id;const rows=await this.api(`profiles?select=*&id=eq.${encodeURIComponent(id)}`);return rows?.[0]||null;},
 async getProgress(userId){return this.api(`day_progress?select=day,payload,updated_at&user_id=eq.${encodeURIComponent(userId)}&order=day.asc`)},
 async getMeta(userId){const rows=await this.api(`learner_meta?select=projects,video_status,active_day&user_id=eq.${encodeURIComponent(userId)}`);return rows?.[0]||null;},
 async saveMeta({projects,video_status,active_day}){return this.api('learner_meta?on_conflict=user_id',{method:'POST',body:{user_id:this.session.user.id,projects,video_status,active_day},prefer:'resolution=merge-duplicates,return=representation'});},
 async saveDay(day,payload){return this.api('day_progress?on_conflict=user_id,day',{method:'POST',body:{user_id:this.session.user.id,day,payload},prefer:'resolution=merge-duplicates,return=representation'});},
 async createTeam(){return this.rpc('create_team',{});},
 async joinTeam(code){return this.rpc('join_team',{invite:code.trim().toUpperCase()})},
 async getTeam(){let mine=await this.getMyProfile();if(!mine?.team_id)return null;let users=await this.api(`profiles?select=id,display_name,team_id&team_id=eq.${encodeURIComponent(mine.team_id)}`);let teams=await this.api(`teams?select=id,invite_code&id=eq.${encodeURIComponent(mine.team_id)}`);return {members:users||[],team:teams?.[0]||null};},
};
