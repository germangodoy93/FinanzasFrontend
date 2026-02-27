import { useState, useEffect, useMemo, useCallback } from "react";
import * as api from "./api"; // helper functions wrapping axios


/* ═══════════════════════════════════════════════════════════════════
   ESTILOS GLOBALES
═══════════════════════════════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #07080d;
  --s1:       #0d0f17;
  --s2:       #121520;
  --s3:       #181c2a;
  --s4:       #1e2336;
  --b1:       #252d45;
  --b2:       #2e3858;
  --tx:       #dde3f5;
  --tx2:      #7a87b0;
  --tx3:      #3d4a6b;
  --ac:       #5b8fff;
  --ac2:      #9b6dff;
  --gr:       #24d4a0;
  --rd:       #f04f72;
  --yl:       #f5c440;
  --or:       #f5894a;
  --r:        12px;
  --r2:       8px;
  --r3:       6px;
  --sh:       0 4px 24px rgba(0,0,0,.45);
  --sh2:      0 2px 12px rgba(0,0,0,.3);
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--tx);
  font-family: 'Geist', sans-serif;
  font-size: 13.5px;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

h1,h2,h3,h4,h5 { font-family: 'Instrument Serif', serif; line-height: 1.2; }
.mono { font-family: 'Geist Mono', monospace; }

input, select, textarea {
  background: var(--s3);
  border: 1px solid var(--b1);
  border-radius: var(--r2);
  color: var(--tx);
  font-family: 'Geist', sans-serif;
  font-size: 13px;
  padding: 8px 12px;
  outline: none;
  transition: border-color .18s, box-shadow .18s;
  width: 100%;
}
input:focus, select:focus, textarea:focus {
  border-color: var(--ac);
  box-shadow: 0 0 0 3px rgba(91,143,255,.12);
}
select option { background: var(--s2); }

button {
  cursor: pointer;
  font-family: 'Geist', sans-serif;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: var(--r2);
  padding: 8px 16px;
  transition: all .15s;
  white-space: nowrap;
}
.btn-p  { background: var(--ac);  color: #fff; }
.btn-p:hover  { background: #4578f0; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(91,143,255,.3); }
.btn-s  { background: var(--s3); color: var(--tx); border: 1px solid var(--b1); }
.btn-s:hover  { border-color: var(--ac); color: var(--ac); }
.btn-g  { background: var(--gr); color: #07080d; font-weight: 600; }
.btn-g:hover  { background: #1ebf90; }
.btn-d  { background: var(--rd); color: #fff; }
.btn-d:hover  { background: #d8385a; }
.btn-sm { padding: 5px 11px; font-size: 12px; }
.btn-xs { padding: 3px 8px; font-size: 11px; border-radius: var(--r3); }

label { color: var(--tx2); font-size: 12px; display: block; margin-bottom: 5px; font-weight: 500; letter-spacing: .3px; }

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: var(--s1); }
::-webkit-scrollbar-thumb { background: var(--b2); border-radius: 99px; }

.card {
  background: var(--s1);
  border: 1px solid var(--b1);
  border-radius: var(--r);
  padding: 20px;
}
.card-inner {
  background: var(--s2);
  border: 1px solid var(--b1);
  border-radius: var(--r2);
  padding: 14px 16px;
}

.tag {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600;
}
.tag-fijo     { background: rgba(245,196,64,.12); color: var(--yl); border: 1px solid rgba(245,196,64,.25); }
.tag-variable { background: rgba(91,143,255,.12); color: var(--ac); border: 1px solid rgba(91,143,255,.25); }
.tag-ingreso  { background: rgba(36,212,160,.12); color: var(--gr); border: 1px solid rgba(36,212,160,.25); }
.tag-gasto    { background: rgba(240,79,114,.12); color: var(--rd); border: 1px solid rgba(240,79,114,.25); }
.tag-avanzado { background: rgba(155,109,255,.12); color: var(--ac2); border: 1px solid rgba(155,109,255,.25); }
.tag-simple   { background: rgba(36,212,160,.12); color: var(--gr); border: 1px solid rgba(36,212,160,.25); }

@keyframes fadeIn { from { opacity:0; transform:translateY(6px);} to { opacity:1; transform:translateY(0);} }
.fade { animation: fadeIn .25s ease; }

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
.pulse { animation: pulse 2s infinite; }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
.grid4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
.flex  { display: flex; }
.fc    { flex-direction: column; }
.gap4  { gap: 4px; }
.gap8  { gap: 8px; }
.gap12 { gap: 12px; }
.gap16 { gap: 16px; }
.jb    { justify-content: space-between; }
.ac2   { align-items: center; }
.f1    { flex: 1; }
.mb8   { margin-bottom: 8px; }
.mb12  { margin-bottom: 12px; }
.mb16  { margin-bottom: 16px; }
.mb20  { margin-bottom: 20px; }
.mb24  { margin-bottom: 24px; }

@media (max-width: 900px) {
  .grid2, .grid3, .grid4 { grid-template-columns: 1fr; }
  .hide-mob { display: none !important; }
  .sidebar { transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); }
  .main-content { margin-left: 0 !important; }
}
@media (min-width: 901px) {
  .hide-desk { display: none !important; }
}
`;

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════ */
const COP = n => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n||0);
const PCT = (a,b) => b===0 ? 0 : Math.min(100,Math.round(a/b*100));
const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const hoy = () => new Date().toISOString().slice(0,10);
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;

function calcAmort(saldo, tasaEA, cuotas) {
  if (!saldo||!tasaEA||!cuotas) return {cuota:0,tabla:[],totalIntereses:0};
  const tm = Math.pow(1+tasaEA/100,1/12)-1;
  const cuota = saldo*(tm*Math.pow(1+tm,cuotas))/(Math.pow(1+tm,cuotas)-1);
  const tabla=[]; let s=saldo;
  for(let i=1;i<=cuotas;i++){
    const int=s*tm; const cap=cuota-int; s=Math.max(0,s-cap);
    tabla.push({mes:i,cuota:Math.round(cuota),interes:Math.round(int),capital:Math.round(cap),saldo:Math.round(s)});
  }
  return {cuota:Math.round(cuota),tabla,totalIntereses:Math.round(tabla.reduce((a,r)=>a+r.interes,0))};
}

/* ═══════════════════════════════════════════════════════════════════
   DATOS INICIALES
═══════════════════════════════════════════════════════════════════ */
const INIT_PROFILE = {
  ingresos:{ salario:5500000, extras:150000, pasivos:60000, bonos:7000000, bonosMes:6 },
  gastosFijos:[
    {id:"gf1",nombre:"Hipoteca",monto:1457000,icono:"🏠",tipo:"fijo",categoria:"Vivienda",diaCorte:5},
    {id:"gf2",nombre:"Administración",monto:206000,icono:"🏢",tipo:"fijo",categoria:"Vivienda",diaCorte:5},
    {id:"gf3",nombre:"Plan móvil",monto:55000,icono:"📱",tipo:"fijo",categoria:"Servicios",diaCorte:15},
    {id:"gf4",nombre:"Internet hogar",monto:59000,icono:"🌐",tipo:"fijo",categoria:"Servicios",diaCorte:20},
    {id:"gf5",nombre:"Luz",monto:35000,icono:"💡",tipo:"fijo",categoria:"Servicios",diaCorte:10},
    {id:"gf6",nombre:"Agua",monto:26000,icono:"💧",tipo:"fijo",categoria:"Servicios",diaCorte:10},
    {id:"gf7",nombre:"Gas",monto:10000,icono:"🔥",tipo:"fijo",categoria:"Servicios",diaCorte:10},
    {id:"gf8",nombre:"Spotify",monto:18000,icono:"🎵",tipo:"fijo",categoria:"Suscripciones",diaCorte:1},
    {id:"gf9",nombre:"Gasolina moto",monto:150000,icono:"⛽",tipo:"fijo",categoria:"Transporte",diaCorte:null},
  ],
  gastosVariables:[
    {id:"gv1",nombre:"Mercado",presupuesto:350000,icono:"🛒",tipo:"variable",categoria:"Alimentación"},
    {id:"gv2",nombre:"Comida por fuera",presupuesto:300000,icono:"🍽️",tipo:"variable",categoria:"Alimentación"},
    {id:"gv3",nombre:"Ocio",presupuesto:100000,icono:"🎮",tipo:"variable",categoria:"Entretenimiento"},
    {id:"gv4",nombre:"Ropa",presupuesto:70000,icono:"👕",tipo:"variable",categoria:"Personal"},
    {id:"gv5",nombre:"Transporte extra",presupuesto:30000,icono:"🚌",tipo:"variable",categoria:"Transporte"},
    {id:"gv6",nombre:"Salud/medicamentos",presupuesto:40000,icono:"💊",tipo:"variable",categoria:"Salud"},
    {id:"gv7",nombre:"Hogar/imprevistos",presupuesto:100000,icono:"🔧",tipo:"variable",categoria:"Hogar"},
    {id:"gv8",nombre:"Viajes moto",presupuesto:200000,icono:"🏍️",tipo:"variable",categoria:"Transporte"},
    {id:"gv9",nombre:"Regalos",presupuesto:40000,icono:"🎁",tipo:"variable",categoria:"Personal"},
  ],
};

const INIT_CUENTAS = [
  {id:"c1",nombre:"Lulo Bank",saldo:8000000,tipo:"Ahorro",tasa:9.5,color:"#24d4a0"},
  {id:"c2",nombre:"Colpatria",saldo:1000000,tipo:"Corriente",tasa:0,color:"#5b8fff"},
];

const INIT_DEUDAS = [
  {id:"d1",nombre:"Hipoteca",entidad:"Banco",saldo:67262555,tasaEA:12.95,tasaTipo:"fija",cuota:1457000,cuotasRestantes:67,cuotasTotal:67,diaCorte:5,fechaPago:"2026-03-05",tipo:"Hipotecario",modulo:"avanzado",notas:"Crédito Vivienda",icono:"🏠",cuotasPagadas:0},
  {id:"d2",nombre:"Moto (familiar)",entidad:"Préstamo familiar",saldo:10000000,tasaEA:0,tasaTipo:"fija",cuota:833333,cuotasRestantes:12,cuotasTotal:12,diaCorte:1,fechaPago:"2026-02-01",tipo:"Personal",modulo:"simple",notas:"Enero–Diciembre 2026",icono:"🏍️",cuotasPagadas:0},
];

const INIT_METAS = [
  {id:"m1",nombre:"Viaje a Brasil",emoji:"🇧🇷",meta:6000000,acumulado:0,aporteMensual:500000,fechaMeta:"2026-06"},
  {id:"m2",nombre:"Matrimonio",emoji:"💍",meta:40000000,acumulado:0,aporteMensual:1400000,fechaMeta:"2028-05"},
  {id:"m3",nombre:"DCA / Inversión",emoji:"📈",meta:null,acumulado:0,aporteMensual:400000,fechaMeta:null},
  {id:"m4",nombre:"Viajes en moto",emoji:"🏍️",meta:null,acumulado:0,aporteMensual:200000,fechaMeta:null},
];

const INIT_NOTIFICACIONES_CONFIG = {
  email: { activo: true, direccion: "" },
  whatsapp: { activo: false, numero: "" },
  sms: { activo: false, numero: "" },
  telegram: { activo: false, chatId: "" },
  diasAnticipacion: 3,
  hora: "08:00",
  frecuencia: "diario",
  zona: "America/Bogota",
};

/* ═══════════════════════════════════════════════════════════════════
   ESTADO GLOBAL
═══════════════════════════════════════════════════════════════════ */
function useApp() {
  const load = (k,d) => { try { const v=localStorage.getItem(k); return v?JSON.parse(v):d; } catch { return d; }};
  const save = (k,v) => { try { localStorage.setItem(k,JSON.stringify(v)); } catch {} };

  const [authed, setAuthed]   = useState(()=>load("fc_authed",false));
  const [user,   setUser]     = useState(()=>load("fc_user",null));
  const [profile,setProfile]  = useState(()=>load("fc_profile",INIT_PROFILE));
  const [cuentas,setCuentas]  = useState(()=>load("fc_cuentas",INIT_CUENTAS));
  const [deudas, setDeudas]   = useState(()=>load("fc_deudas",INIT_DEUDAS));
  const [metas,  setMetas]    = useState(()=>load("fc_metas",INIT_METAS));
  const [txns,   setTxns]     = useState(()=>load("fc_txns",[]));
  const [notifCfg,setNotifCfg]= useState(()=>load("fc_notif",INIT_NOTIFICACIONES_CONFIG));
  const [notifLog,setNotifLog]= useState(()=>load("fc_notiflog",[]));
  const [mes,    setMes]      = useState(()=>{ const d=new Date(); return {m:d.getMonth(),y:d.getFullYear()}; });

  // when authenticated, fetch initial data from backend
  useEffect(()=>{
    if(!authed) return;
    api.fetchProfile().then(r=>{ if(r.data) setProfile(r.data); }).catch(()=>{});
    api.fetchTxns().then(r=>{ if(r.data) setTxns(r.data); }).catch(()=>{});
  },[authed]);

  useEffect(()=>save("fc_authed",authed),[authed]);
  useEffect(()=>save("fc_user",user),[user]);
  useEffect(()=>save("fc_profile",profile),[profile]);
  useEffect(()=>save("fc_cuentas",cuentas),[cuentas]);
  useEffect(()=>save("fc_deudas",deudas),[deudas]);
  useEffect(()=>save("fc_metas",metas),[metas]);
  useEffect(()=>save("fc_txns",txns),[txns]);

  // synchronize profile and transactions with backend when changed
  useEffect(()=>{
    if(authed){ api.saveProfileReq(profile).catch(()=>{}); }
  },[profile,authed]);
  // transactions pushed on add/delete already; no extra syncing needed here
  useEffect(()=>save("fc_notif",notifCfg),[notifCfg]);
  useEffect(()=>save("fc_notiflog",notifLog),[notifLog]);

  const login = async (email,pass) => {
    try{
      await api.loginReq(email,pass);
      setUser({email}); setAuthed(true);
      return null;
    }catch(err){
      return err.response?.data?.error || "Error al autenticar";
    }
  };
  const register = async (email,pass) => {
    if(pass.length<8) return "Contraseña mínimo 8 caracteres.";
    try{
      await api.registerReq(email,pass);
      setUser({email}); setAuthed(true);
      return null;
    }catch(err){
      return err.response?.data?.error || "Error al registrar";
    }
  };
  const logout = () => { setAuthed(false); setUser(null); };

  const addTxn = async t => {
    try{
      const res = await api.addTxnReq(t);
      setTxns(p=>[res.data,...p]);
    }catch(e){ console.error(e); }
  };
  const delTxn = async id => {
    try{
      await api.deleteTxnReq(id);
      setTxns(p=>p.filter(t=>t.id!==id));
    }catch(e){ console.error(e); }
  };

  // Simular envío de notificación (stub)
  const enviarNotif = (msg, canal="email") => {
    const entry = { id:uid(), fecha:new Date().toISOString(), canal, mensaje:msg, estado:"enviado" };
    setNotifLog(p=>[entry,...p.slice(0,99)]);
    console.log(`[NOTIF ${canal.toUpperCase()}]`, msg);
    return entry;
  };

  // Txns del mes activo
  const txnsMes = useMemo(()=>txns.filter(t=>{
    const d=new Date(t.fecha); return d.getMonth()===mes.m&&d.getFullYear()===mes.y;
  }),[txns,mes]);

  const gastosMes   = useMemo(()=>txnsMes.filter(t=>t.tipo==="gasto").reduce((s,t)=>s+t.monto,0),[txnsMes]);
  const ingresosMes = useMemo(()=>txnsMes.filter(t=>t.tipo==="ingreso").reduce((s,t)=>s+t.monto,0),[txnsMes]);

  const totalIngresos = profile.ingresos.salario+profile.ingresos.extras+profile.ingresos.pasivos;
  const totalFijos    = profile.gastosFijos.reduce((s,g)=>s+g.monto,0);
  const totalVarBudget= profile.gastosVariables.reduce((s,g)=>s+g.presupuesto,0);
  const flujoLibre    = totalIngresos-totalFijos-totalVarBudget;
  const totalAhorros  = cuentas.reduce((s,c)=>s+c.saldo,0);

  // Alertas próximas
  const alertasProximas = useMemo(()=>{
    const dias = notifCfg.diasAnticipacion;
    const hoyDate = new Date(); const limite = new Date(); limite.setDate(hoyDate.getDate()+dias);
    const alerts=[];
    deudas.forEach(d=>{
      const fp = new Date(d.fechaPago);
      if(fp>=hoyDate&&fp<=limite) alerts.push({tipo:"deuda",nombre:d.nombre,fecha:d.fechaPago,monto:d.cuota,icono:d.icono});
    });
    profile.gastosFijos.forEach(g=>{
      if(g.diaCorte){ const f=new Date(hoyDate.getFullYear(),hoyDate.getMonth(),g.diaCorte);
        if(f>=hoyDate&&f<=limite) alerts.push({tipo:"gasto",nombre:g.nombre,fecha:f.toISOString().slice(0,10),monto:g.monto,icono:g.icono});
      }
    });
    return alerts;
  },[deudas,profile,notifCfg]);

  return {
    authed,user,login,register,logout,
    profile,setProfile,cuentas,setCuentas,deudas,setDeudas,
    metas,setMetas,txns,txnsMes,addTxn,delTxn,
    gastosMes,ingresosMes,mes,setMes,
    totalIngresos,totalFijos,totalVarBudget,flujoLibre,totalAhorros,
    notifCfg,setNotifCfg,notifLog,setNotifLog,enviarNotif,alertasProximas,
  };
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTES BASE
═══════════════════════════════════════════════════════════════════ */
function Card({children,style={},className=""}) {
  return <div className={`card fade ${className}`} style={style}>{children}</div>;
}
function CardInner({children,style={}}) {
  return <div className="card-inner" style={style}>{children}</div>;
}
function Bar({val,max,color="var(--ac)",h=6}) {
  const p=PCT(val,max);
  const c=p>=95?"var(--rd)":p>=75?"var(--yl)":color;
  return (
    <div style={{background:"var(--s3)",borderRadius:99,overflow:"hidden",height:h}}>
      <div style={{width:`${p}%`,height:"100%",background:c,borderRadius:99,transition:"width .5s ease"}}/>
    </div>
  );
}
function Stat({label,value,sub,color="var(--tx)",icon,accent=false}) {
  return (
    <Card style={accent?{borderColor:"var(--ac)",boxShadow:"0 0 0 1px rgba(91,143,255,.15)"}:{}}>
      <div className="flex jb ac2">
        <div>
          <p style={{color:"var(--tx3)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:.9,marginBottom:8}}>{label}</p>
          <p className="mono" style={{fontSize:21,fontWeight:500,color}}>{value}</p>
          {sub&&<p style={{color:"var(--tx2)",fontSize:11,marginTop:4}}>{sub}</p>}
        </div>
        {icon&&<span style={{fontSize:22,opacity:.55}}>{icon}</span>}
      </div>
    </Card>
  );
}
function Modal({open,onClose,title,children,width=520}) {
  if(!open) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(7,8,13,.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="card fade" style={{width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto"}}>
        <div className="flex jb ac2 mb16">
          <h3 style={{fontSize:18}}>{title}</h3>
          <button className="btn-s btn-sm" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Tabs({tabs,active,onChange}) {
  return (
    <div className="flex gap4" style={{background:"var(--bg)",borderRadius:10,padding:4,width:"fit-content",flexWrap:"wrap"}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>onChange(t.id)}
          style={{background:active===t.id?"var(--ac)":"transparent",color:active===t.id?"#fff":"var(--tx2)",borderRadius:7,padding:"6px 14px",fontSize:12,border:"none",fontWeight:active===t.id?600:400}}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════════════ */
function AuthScreen({login,register}) {
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");
  const [ok,setOk]=useState("");

  const submit=async ()=>{
    setErr(""); setOk("");
    const e = mode==="login"? await login(email,pass) : await register(email,pass);
    if(e) setErr(e);
  };
  const recover=()=>{
    if(!email){setErr("Ingresa tu email.");return;}
    setOk(`Enlace enviado a ${email} (demo – revisa consola).`);
    console.log(`[RESET] Token para ${email}: ${btoa(email+Date.now())}`);
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:20}}>
      <div style={{width:"100%",maxWidth:420}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:44,marginBottom:10}}>₿</div>
          <h1 style={{fontSize:34,background:"linear-gradient(130deg,#5b8fff,#24d4a0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>FinanzasCO</h1>
          <p style={{color:"var(--tx2)",marginTop:6,fontSize:13}}>Control financiero personal · COP</p>
        </div>
        <Card>
          <div className="flex gap4 mb16" style={{background:"var(--bg)",borderRadius:8,padding:4}}>
            {[{id:"login",l:"Ingresar"},{id:"registro",l:"Registro"},{id:"recuperar",l:"Recuperar"}].map(m=>(
              <button key={m.id} onClick={()=>{setMode(m.id);setErr("");setOk("");}}
                style={{flex:1,background:mode===m.id?"var(--ac)":"transparent",color:mode===m.id?"#fff":"var(--tx2)",borderRadius:6,padding:"6px 4px",fontSize:11,border:"none",fontWeight:mode===m.id?600:400}}>
                {m.l}
              </button>
            ))}
          </div>
          <div className="flex fc gap12">
            <div><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
            {mode!=="recuperar"&&<div><label>Contraseña</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="mínimo 8 caracteres" onKeyDown={e=>e.key==="Enter"&&submit()}/></div>}
            {err&&<p style={{color:"var(--rd)",fontSize:12}}>⚠ {err}</p>}
            {ok &&<p style={{color:"var(--gr)",fontSize:12}}>✓ {ok}</p>}
            {mode==="recuperar"
              ?<button className="btn-p" onClick={recover}>Enviar enlace de recuperación</button>
              :<button className="btn-p" onClick={submit}>{mode==="login"?"Ingresar":"Crear cuenta"}</button>}
          </div>
        </Card>
        <p style={{textAlign:"center",color:"var(--tx3)",fontSize:11,marginTop:16}}>Datos guardados localmente · Demo MVP</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LAYOUT / NAVEGACIÓN
═══════════════════════════════════════════════════════════════════ */
const NAV=[
  {id:"dashboard",  icon:"⬡",label:"Dashboard"},
  {id:"transacciones",icon:"↕",label:"Transacciones"},
  {id:"presupuesto",icon:"◫",label:"Presupuesto"},
  {id:"cuentas",    icon:"◈",label:"Cuentas"},
  {id:"deudas",     icon:"⬠",label:"Deudas"},
  {id:"metas",      icon:"◎",label:"Metas"},
  {id:"notificaciones",icon:"🔔",label:"Notificaciones"},
  {id:"reportes",   icon:"⬗",label:"Reportes"},
];

function Layout({page,setPage,user,logout,alertasProximas,children}) {
  const [mobOpen,setMobOpen]=useState(false);
  const NItem=({n})=>(
    <button onClick={()=>{setPage(n.id);setMobOpen(false);}}
      style={{width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:8,
        background:page===n.id?"var(--s3)":"transparent",
        color:page===n.id?"var(--ac)":"var(--tx2)",border:"none",
        borderLeft:page===n.id?"2px solid var(--ac)":"2px solid transparent",
        marginBottom:2,fontSize:13,fontWeight:page===n.id?500:400,transition:"all .15s"}}>
      <span style={{fontSize:15,opacity:.75}}>{n.icon}</span>
      {n.label}
      {n.id==="notificaciones"&&alertasProximas.length>0&&(
        <span style={{background:"var(--rd)",color:"#fff",borderRadius:99,fontSize:10,padding:"1px 6px",marginLeft:"auto",minWidth:18,textAlign:"center"}}>{alertasProximas.length}</span>
      )}
    </button>
  );
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      {/* Overlay móvil */}
      {mobOpen&&<div className="hide-desk" onClick={()=>setMobOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:199}}/>}
      {/* Sidebar */}
      <aside className={`sidebar ${mobOpen?"open":""}`}
        style={{width:210,background:"var(--s1)",borderRight:"1px solid var(--b1)",display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh",zIndex:200,transition:"transform .25s"}}>
        <div style={{padding:"22px 18px 14px"}}>
          <div style={{fontFamily:"Instrument Serif",fontSize:22,background:"linear-gradient(130deg,#5b8fff,#24d4a0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₿ FinanzasCO</div>
        </div>
        <nav style={{flex:1,padding:"6px 10px",overflowY:"auto"}}>
          {NAV.map(n=><NItem key={n.id} n={n}/>)}
        </nav>
        <div style={{padding:"14px 18px",borderTop:"1px solid var(--b1)"}}>
          <p style={{color:"var(--tx3)",fontSize:11,marginBottom:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.email}</p>
          <button className="btn-s btn-sm" onClick={logout} style={{width:"100%"}}>Cerrar sesión</button>
        </div>
      </aside>
      {/* Top bar móvil */}
      <div className="hide-desk" style={{position:"fixed",top:0,left:0,right:0,height:52,background:"var(--s1)",borderBottom:"1px solid var(--b1)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",zIndex:198}}>
        <div style={{fontFamily:"Instrument Serif",fontSize:18,background:"linear-gradient(130deg,#5b8fff,#24d4a0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₿ FinanzasCO</div>
        <button className="btn-s btn-sm" onClick={()=>setMobOpen(o=>!o)}>☰</button>
      </div>
      {/* Main */}
      <main className="main-content hide-mob" style={{marginLeft:210,flex:1,padding:"28px 30px",minHeight:"100vh"}}>
        {children}
      </main>
      <main className="hide-desk" style={{flex:1,padding:"68px 14px 20px",minHeight:"100vh"}}>
        {children}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════════ */
function Dashboard({app}) {
  const {profile,totalIngresos,totalFijos,totalVarBudget,flujoLibre,totalAhorros,
    txnsMes,gastosMes,ingresosMes,deudas,metas,mes,setMes,alertasProximas} = app;

  const gastosXCat = useMemo(()=>{
    const m={};
    txnsMes.filter(t=>t.tipo==="gasto").forEach(t=>{m[t.categoria]=(m[t.categoria]||0)+t.monto;});
    return m;
  },[txnsMes]);

  const navMes=(d)=>{
    setMes(p=>{
      let m=p.m+d, y=p.y;
      if(m<0){m=11;y--;} if(m>11){m=0;y++;}
      return {m,y};
    });
  };

  return (
    <div className="fade">
      <div className="flex jb ac2 mb24">
        <div>
          <h2 style={{fontSize:28,fontWeight:400}}>Dashboard</h2>
          <p style={{color:"var(--tx2)",fontSize:12}}>Resumen financiero personal · COP</p>
        </div>
        <div className="flex ac2 gap8">
          <button className="btn-s btn-sm" onClick={()=>navMes(-1)}>‹</button>
          <span className="mono" style={{fontSize:12,minWidth:88,textAlign:"center",color:"var(--tx2)"}}>{MESES[mes.m]} {mes.y}</span>
          <button className="btn-s btn-sm" onClick={()=>navMes(1)}>›</button>
        </div>
      </div>

      {/* Alertas */}
      {alertasProximas.length>0&&(
        <div className="mb16">
          {alertasProximas.map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(245,196,64,.07)",border:"1px solid rgba(245,196,64,.2)",borderRadius:10,padding:"9px 14px",marginBottom:6}}>
              <span>{a.icono}</span>
              <span style={{color:"var(--yl)",fontSize:12}}>Pago próximo: <strong>{a.nombre}</strong> — {COP(a.monto)} el {a.fecha}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid4 mb16">
        <Stat label="Ingresos mensuales" value={COP(totalIngresos)} icon="💼" color="var(--gr)"/>
        <Stat label="Gastos fijos" value={COP(totalFijos)} icon="📌" color="var(--rd)"/>
        <Stat label="Flujo libre" value={COP(flujoLibre)} icon="🌊" color={flujoLibre>0?"var(--gr)":"var(--rd)"} accent={flujoLibre>0}/>
        <Stat label="Total ahorros" value={COP(totalAhorros)} icon="🏦" color="var(--ac)"/>
      </div>

      {/* Gastos mes / presupuesto */}
      <div className="grid2 mb16">
        <Card>
          <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:16}}>Presupuesto vs Real — {MESES[mes.m]}</p>
          {[...profile.gastosFijos,...profile.gastosVariables].map(g=>{
            const real=gastosXCat[g.nombre]||0;
            const bud=g.monto||g.presupuesto;
            return (
              <div key={g.id} style={{marginBottom:11}}>
                <div className="flex jb ac2" style={{marginBottom:3}}>
                  <span style={{fontSize:12}}>{g.icono} {g.nombre} <span className={`tag tag-${g.tipo}`} style={{fontSize:9}}>{g.tipo}</span></span>
                  <span className="mono" style={{fontSize:11,color:real>bud?"var(--rd)":"var(--tx2)"}}>{COP(real)}/{COP(bud)}</span>
                </div>
                <Bar val={real} max={bud}/>
              </div>
            );
          })}
        </Card>
        <div className="flex fc gap16">
          <Card>
            <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Metas financieras</p>
            {metas.filter(m=>m.meta).map(m=>(
              <div key={m.id} style={{marginBottom:14}}>
                <div className="flex jb ac2" style={{marginBottom:4}}>
                  <span style={{fontSize:12}}>{m.emoji} {m.nombre}</span>
                  <span className="mono" style={{fontSize:11,color:"var(--tx2)"}}>{PCT(m.acumulado,m.meta)}%</span>
                </div>
                <Bar val={m.acumulado} max={m.meta} color="var(--ac2)"/>
                <div className="flex jb" style={{marginTop:3}}>
                  <span style={{fontSize:10,color:"var(--tx3)"}}>{COP(m.acumulado)}</span>
                  <span style={{fontSize:10,color:"var(--tx3)"}}>Meta: {COP(m.meta)}</span>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Deudas activas</p>
            {deudas.map(d=>(
              <div key={d.id} className="flex jb ac2" style={{padding:"8px 0",borderBottom:"1px solid var(--b1)"}}>
                <span style={{fontSize:12}}>{d.icono} {d.nombre}</span>
                <div className="flex ac2 gap8">
                  <span className="mono" style={{fontSize:12,color:"var(--rd)"}}>{COP(d.saldo)}</span>
                  <span className={`tag tag-${d.modulo}`}>{d.modulo}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Últimas transacciones */}
      <Card>
        <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Últimas transacciones del mes</p>
        {txnsMes.length===0
          ?<p style={{color:"var(--tx3)",textAlign:"center",padding:"24px 0",fontSize:12}}>Sin transacciones este mes. Regístralas en Transacciones.</p>
          :txnsMes.slice(0,10).map(t=>(
            <div key={t.id} className="flex jb ac2" style={{padding:"9px 0",borderBottom:"1px solid var(--b1)"}}>
              <div className="flex ac2 gap10">
                <span style={{fontSize:20}}>{t.emoji||"📄"}</span>
                <div>
                  <p style={{fontSize:12,fontWeight:500}}>{t.descripcion}</p>
                  <div className="flex ac2 gap6" style={{marginTop:2}}>
                    <span style={{fontSize:10,color:"var(--tx3)"}}>{t.categoria} · {t.fecha}</span>
                    <span className={`tag tag-${t.tipoGasto||"variable"}`} style={{fontSize:9}}>{t.tipoGasto||"variable"}</span>
                  </div>
                </div>
              </div>
              <span className="mono" style={{fontSize:13,color:t.tipo==="ingreso"?"var(--gr)":"var(--rd)",fontWeight:500}}>
                {t.tipo==="ingreso"?"+":"-"}{COP(t.monto)}
              </span>
            </div>
          ))
        }
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TRANSACCIONES
═══════════════════════════════════════════════════════════════════ */
function Transacciones({app}) {
  const {txns,addTxn,delTxn,profile}=app;
  const [f,setF]=useState({tipo:"gasto",tipoGasto:"variable",descripcion:"",monto:"",categoria:"",fecha:hoy(),emoji:"📄",cuenta:"",notas:""});
  const [filt,setFilt]=useState("all");
  const [search,setSearch]=useState("");
  const [showImport,setShowImport]=useState(false);

  const cats=[...new Set([...profile.gastosVariables.map(g=>g.nombre),...profile.gastosFijos.map(g=>g.nombre),"Salario","Ingreso extra","Bono/Prima","Transferencia","Inversión DCA","Otro"])];
  const emojiAuto={"Mercado":"🛒","Comida por fuera":"🍽️","Ocio":"🎮","Ropa":"👕","Salud/medicamentos":"💊","Gasolina moto":"⛽","Viajes moto":"🏍️","Spotify":"🎵","Salario":"💼","Ingreso extra":"💸","Inversión DCA":"📈","Hipoteca":"🏠"};

  const onCat=cat=>setF(p=>({...p,categoria:cat,emoji:emojiAuto[cat]||p.emoji}));

  const guardar=()=>{
    if(!f.descripcion||!f.monto||!f.categoria){alert("Completa descripción, monto y categoría.");return;}
    addTxn({...f,monto:parseFloat(f.monto)});
    setF(p=>({...p,descripcion:"",monto:"",notas:""}));
  };

  const filtradas=txns.filter(t=>(filt==="all"||t.tipo===filt)||(filt==="fijo"&&t.tipoGasto==="fijo")||(filt==="variable"&&t.tipoGasto==="variable")).filter(t=>!search||(t.descripcion+t.categoria).toLowerCase().includes(search.toLowerCase()));

  const totalGasto=filtradas.filter(t=>t.tipo==="gasto").reduce((s,t)=>s+t.monto,0);
  const totalIngreso=filtradas.filter(t=>t.tipo==="ingreso").reduce((s,t)=>s+t.monto,0);

  return (
    <div className="fade">
      <div className="flex jb ac2 mb24">
        <div><h2 style={{fontSize:28,fontWeight:400}}>Transacciones</h2><p style={{color:"var(--tx2)",fontSize:12}}>Registro de ingresos y gastos</p></div>
        <button className="btn-s btn-sm" onClick={()=>setShowImport(true)}>⬆ Importar CSV</button>
      </div>

      <div className="grid2 mb16" style={{alignItems:"start"}}>
        {/* Formulario */}
        <Card>
          <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Nueva transacción</p>
          <div className="flex gap4 mb12" style={{background:"var(--bg)",borderRadius:8,padding:4}}>
            {["gasto","ingreso","transferencia"].map(t=>(
              <button key={t} onClick={()=>setF(p=>({...p,tipo:t}))}
                style={{flex:1,background:f.tipo===t?(t==="ingreso"?"var(--gr)":t==="gasto"?"var(--rd)":"var(--ac)"):"transparent",color:f.tipo===t?"#fff":"var(--tx2)",borderRadius:6,padding:"6px 4px",fontSize:11,border:"none",fontWeight:f.tipo===t?600:400,textTransform:"capitalize"}}>
                {t}
              </button>
            ))}
          </div>

          {/* Selector fijo/variable */}
          {f.tipo==="gasto"&&(
            <div className="mb12">
              <label>Tipo de gasto</label>
              <div className="flex gap8">
                <button onClick={()=>setF(p=>({...p,tipoGasto:"fijo"}))} className={f.tipoGasto==="fijo"?"btn-sm":"btn-s btn-sm"} style={f.tipoGasto==="fijo"?{background:"var(--yl)",color:"#07080d"}:{}}>Fijo</button>
                <button onClick={()=>setF(p=>({...p,tipoGasto:"variable"}))} className={f.tipoGasto==="variable"?"btn-sm":"btn-s btn-sm"} style={f.tipoGasto==="variable"?{background:"var(--ac)",color:"#fff"}:{}}>Variable</button>
              </div>
            </div>
          )}

          <div className="flex fc gap10">
            <div><label>Descripción</label><input value={f.descripcion} onChange={e=>setF(p=>({...p,descripcion:e.target.value}))} placeholder="Ej: Compras supermercado"/></div>
            <div><label>Monto (COP)</label><input type="number" value={f.monto} onChange={e=>setF(p=>({...p,monto:e.target.value}))} placeholder="350000"/></div>
            <div>
              <label>Categoría</label>
              <select value={f.categoria} onChange={e=>onCat(e.target.value)}>
                <option value="">Seleccionar...</option>
                {cats.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label>Fecha</label><input type="date" value={f.fecha} onChange={e=>setF(p=>({...p,fecha:e.target.value}))}/></div>
            <div><label>Notas (opcional)</label><input value={f.notas} onChange={e=>setF(p=>({...p,notas:e.target.value}))} placeholder="Notas adicionales"/></div>
            <button className="btn-p" onClick={guardar}>+ Registrar transacción</button>
          </div>
        </Card>

        {/* Filtros y totales */}
        <div className="flex fc gap12">
          <Card>
            <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Filtros</p>
            <input placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:10}}/>
            <div className="flex gap6" style={{flexWrap:"wrap"}}>
              {[{v:"all",l:"Todos"},{v:"gasto",l:"Gastos"},{v:"ingreso",l:"Ingresos"},{v:"fijo",l:"Fijos"},{v:"variable",l:"Variables"}].map(b=>(
                <button key={b.v} onClick={()=>setFilt(b.v)} className={filt===b.v?"btn-p btn-sm":"btn-s btn-sm"}>{b.l}</button>
              ))}
            </div>
          </Card>
          <Card>
            <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Resumen ({filtradas.length})</p>
            <div className="flex jb" style={{marginBottom:8}}>
              <span style={{color:"var(--tx2)",fontSize:12}}>Total gastos</span>
              <span className="mono" style={{color:"var(--rd)",fontSize:13}}>{COP(totalGasto)}</span>
            </div>
            <div className="flex jb">
              <span style={{color:"var(--tx2)",fontSize:12}}>Total ingresos</span>
              <span className="mono" style={{color:"var(--gr)",fontSize:13}}>{COP(totalIngreso)}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Lista */}
      <Card>
        {filtradas.length===0
          ?<p style={{color:"var(--tx3)",textAlign:"center",padding:"32px 0",fontSize:12}}>Sin transacciones.</p>
          :filtradas.map(t=>(
            <div key={t.id} className="flex jb ac2" style={{padding:"10px 0",borderBottom:"1px solid var(--b1)"}}>
              <div className="flex ac2 gap10">
                <span style={{fontSize:21}}>{t.emoji||"📄"}</span>
                <div>
                  <p style={{fontSize:12,fontWeight:500}}>{t.descripcion}</p>
                  <div className="flex ac2 gap6" style={{marginTop:2}}>
                    <span style={{fontSize:10,color:"var(--tx3)"}}>{t.categoria} · {t.fecha}</span>
                    {t.tipo==="gasto"&&<span className={`tag tag-${t.tipoGasto||"variable"}`} style={{fontSize:9}}>{t.tipoGasto||"variable"}</span>}
                    <span className={`tag tag-${t.tipo}`} style={{fontSize:9}}>{t.tipo}</span>
                  </div>
                </div>
              </div>
              <div className="flex ac2 gap10">
                <span className="mono" style={{fontSize:13,color:t.tipo==="ingreso"?"var(--gr)":"var(--rd)",fontWeight:500}}>
                  {t.tipo==="ingreso"?"+":"-"}{COP(t.monto)}
                </span>
                <button className="btn-d btn-xs" onClick={()=>delTxn(t.id)}>✕</button>
              </div>
            </div>
          ))
        }
      </Card>

      <Modal open={showImport} onClose={()=>setShowImport(false)} title="Importar CSV / Excel">
        <div className="flex fc gap12">
          <CardInner>
            <p style={{color:"var(--tx2)",fontSize:12,marginBottom:8}}>Formato esperado del CSV:</p>
            <code style={{fontFamily:"Geist Mono",fontSize:11,color:"var(--ac)",lineHeight:2}}>
              fecha,tipo,descripcion,categoria,tipoGasto,monto<br/>
              2026-02-01,gasto,Mercado,Mercado,variable,85000<br/>
              2026-02-05,ingreso,Salario,Salario,,5500000
            </code>
          </CardInner>
          <input type="file" accept=".csv,.xlsx" onChange={e=>{
            const file=e.target.files[0]; if(!file) return;
            const reader=new FileReader();
            reader.onload=ev=>{
              const lines=ev.target.result.split("\n").slice(1);
              let count=0;
              lines.forEach(line=>{
                const [fecha,tipo,descripcion,categoria,tipoGasto,monto]=line.split(",");
                if(fecha&&tipo&&descripcion&&monto&&!isNaN(parseFloat(monto))){
                  addTxn({fecha:fecha.trim(),tipo:tipo.trim(),descripcion:descripcion.trim(),categoria:categoria?.trim()||"Otro",tipoGasto:tipoGasto?.trim()||"variable",monto:parseFloat(monto),emoji:"📄"});
                  count++;
                }
              });
              alert(`${count} transacciones importadas.`);
              setShowImport(false);
            };
            reader.readAsText(file);
          }}/>
          <button className="btn-s" onClick={()=>setShowImport(false)}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MODAL NUEVO GASTO — componente externo para evitar re-renders
═══════════════════════════════════════════════════════════════════ */
const BLANK_ITEM = {nombre:"",monto:"",icono:"📋",categoria:"Otro",tipo:"fijo",diaCorte:""};

function ModalNuevoGasto({tipo, show, onClose, onAgregar}) {
  const [item, setItem] = useState(BLANK_ITEM);

  // Limpiar al abrir
  useEffect(()=>{ if(show) setItem(BLANK_ITEM); }, [show]);

  const handleAgregar = () => {
    if(!item.nombre||!item.monto){ alert("Completa nombre y monto."); return; }
    onAgregar(tipo, item);
    setItem(BLANK_ITEM);
  };

  return (
    <Modal open={show} onClose={onClose} title={tipo==="gastosFijos"?"Nuevo Gasto Fijo":"Nuevo Gasto Variable"}>
      <div className="flex fc gap10">
        <div>
          <label>Nombre</label>
          <input
            value={item.nombre}
            onChange={e=>setItem(p=>({...p,nombre:e.target.value}))}
            placeholder={tipo==="gastosFijos"?"Ej: Netflix":"Ej: Comida"}
            autoFocus
          />
        </div>
        <div>
          <label>Icono (emoji)</label>
          <input value={item.icono} onChange={e=>setItem(p=>({...p,icono:e.target.value}))}/>
        </div>
        <div>
          <label>Monto / Presupuesto mensual</label>
          <input
            value={item.monto}
            onChange={e=>setItem(p=>({...p,monto:e.target.value}))}
            placeholder="Ej: 350000"
            style={{fontFamily:"Geist Mono"}}
            onKeyDown={e=>e.key==="Enter"&&handleAgregar()}
          />
        </div>
        <div>
          <label>Categoría</label>
          <select value={item.categoria} onChange={e=>setItem(p=>({...p,categoria:e.target.value}))}>
            {["Vivienda","Servicios","Alimentación","Transporte","Salud","Entretenimiento","Suscripciones","Personal","Hogar","Otro"].map(c=>(
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        {tipo==="gastosFijos"&&(
          <div>
            <label>Día de corte (1–31)</label>
            <input
              type="number" min="1" max="31"
              value={item.diaCorte}
              onChange={e=>setItem(p=>({...p,diaCorte:e.target.value}))}
              placeholder="Ej: 5"
            />
          </div>
        )}
        <div className="flex gap8" style={{marginTop:4}}>
          <button className="btn-p" style={{flex:1}} onClick={handleAgregar}>+ Agregar</button>
          <button className="btn-s" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRESUPUESTO
═══════════════════════════════════════════════════════════════════ */
function Presupuesto({app}) {
  const {profile,setProfile,totalIngresos,totalFijos,totalVarBudget} = app;
  const [editId,setEditId]=useState(null);
  const [editVal,setEditVal]=useState("");
  const [showAddFijo,setShowAddFijo]=useState(false);
  const [showAddVar,setShowAddVar]=useState(false);


  // Convierte string con puntos/comas a número: "1.457.000" o "1457000" → 1457000
  const parseMonto = str => {
    if(str===null||str===undefined) return 0;
    const clean = String(str).replace(/\./g,"").replace(/,/g,".").trim();
    const v = parseFloat(clean);
    return isNaN(v) ? 0 : v;
  };

  const editar=(tipo,id,cur)=>{ setEditId(`${tipo}-${id}`); setEditVal(String(cur)); };
  const salvar=(tipo,id,campo)=>{
    const v=parseMonto(editVal); if(v<=0) return;
    setProfile(p=>({...p,[tipo]:p[tipo].map(g=>g.id===id?{...g,[campo]:v}:g)}));
    setEditId(null);
  };
  const eliminar=(tipo,id)=>setProfile(p=>({...p,[tipo]:p[tipo].filter(g=>g.id!==id)}));
  const agregar=(tipo, itemData)=>{
    const monto=parseMonto(itemData.monto);
    const item={...itemData,id:`${tipo}-${uid()}`,monto,presupuesto:monto,diaCorte:parseInt(itemData.diaCorte)||null};
    setProfile(p=>({...p,[tipo]:[...p[tipo],item]}));
    tipo==="gastosFijos"?setShowAddFijo(false):setShowAddVar(false);
  };

  const nec=totalIngresos*.5, des=totalIngresos*.3, aho=totalIngresos*.2;

  const RowEdit=({item,tipo,campo})=>(
    <div className="flex jb ac2" style={{padding:"8px 0",borderBottom:"1px solid var(--b1)"}}>
      <div className="flex ac2 gap8">
        <span>{item.icono}</span>
        <div>
          <span style={{fontSize:12}}>{item.nombre}</span>
          {item.diaCorte&&<span style={{fontSize:10,color:"var(--tx3)",marginLeft:6}}>Día {item.diaCorte}</span>}
        </div>
      </div>
      {editId===`${tipo}-${item.id}`
        ?<div className="flex ac2 gap6">
          <input
            value={editVal}
            onChange={e=>setEditVal(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter") salvar(tipo,item.id,campo); if(e.key==="Escape") setEditId(null); }}
            placeholder="Ej: 350000"
            style={{width:150,fontFamily:"Geist Mono",fontSize:13}}
            autoFocus
          />
          <button className="btn-g btn-sm" onClick={()=>salvar(tipo,item.id,campo)}>✓</button>
          <button className="btn-s btn-sm" onClick={()=>setEditId(null)}>✕</button>
        </div>
        :<div className="flex ac2 gap8">
          <span className="mono" style={{fontSize:12,color:tipo==="gastosFijos"?"var(--rd)":"var(--yl)"}}>{COP(item[campo])}</span>
          <button className="btn-s btn-xs" onClick={()=>editar(tipo,item.id,item[campo])}>✏</button>
          <button className="btn-d btn-xs" onClick={()=>eliminar(tipo,item.id)}>✕</button>
        </div>
      }
    </div>
  );

  return (
    <div className="fade">
      <h2 style={{fontSize:28,fontWeight:400,marginBottom:24}}>Presupuesto</h2>

      {/* ── INGRESOS ── */}
      <Card style={{marginBottom:16}}>
        <div className="flex jb ac2 mb14">
          <p style={{fontFamily:"Instrument Serif",fontSize:17}}>Ingresos mensuales</p>
          <span className="mono" style={{color:"var(--gr)",fontSize:15,fontWeight:600}}>{COP(totalIngresos)}</span>
        </div>
        {[
          {campo:"salario",     label:"Salario mensual neto",       icono:"💼"},
          {campo:"extras",      label:"Ingresos extra mensuales",   icono:"💸"},
          {campo:"pasivos",     label:"Ingresos pasivos mensuales", icono:"📦"},
        ].map(({campo,label,icono})=>{
          const eid=`ing-${campo}`;
          return (
            <div key={campo} className="flex jb ac2" style={{padding:"8px 0",borderBottom:"1px solid var(--b1)"}}>
              <div className="flex ac2 gap8">
                <span>{icono}</span>
                <span style={{fontSize:12}}>{label}</span>
              </div>
              {editId===eid
                ?<div className="flex ac2 gap6">
                  <input
                    value={editVal}
                    onChange={e=>setEditVal(e.target.value)}
                    onKeyDown={e=>{
                      if(e.key==="Enter"){
                        const v=parseMonto(editVal); if(v>=0) setProfile(p=>({...p,ingresos:{...p.ingresos,[campo]:v}}));
                        setEditId(null);
                      }
                      if(e.key==="Escape") setEditId(null);
                    }}
                    placeholder="Ej: 5500000"
                    style={{width:150,fontFamily:"Geist Mono",fontSize:13}}
                    autoFocus
                  />
                  <button className="btn-g btn-sm" onClick={()=>{
                    const v=parseMonto(editVal); if(v>=0) setProfile(p=>({...p,ingresos:{...p.ingresos,[campo]:v}}));
                    setEditId(null);
                  }}>✓</button>
                  <button className="btn-s btn-sm" onClick={()=>setEditId(null)}>✕</button>
                </div>
                :<div className="flex ac2 gap8">
                  <span className="mono" style={{fontSize:12,color:"var(--gr)"}}>{COP(profile.ingresos[campo])}</span>
                  <button className="btn-s btn-xs" onClick={()=>{setEditId(eid);setEditVal(String(profile.ingresos[campo]));}}>✏</button>
                </div>
              }
            </div>
          );
        })}
        {/* Bono/Prima — con mes configurable */}
        <div style={{padding:"8px 0",borderBottom:"1px solid var(--b1)"}}>
          <div className="flex jb ac2">
            <div className="flex ac2 gap8">
              <span>🎁</span>
              <span style={{fontSize:12}}>Bono / Prima anual</span>
            </div>
            {editId==="ing-bonos"
              ?<div className="flex ac2 gap6">
                <input value={editVal} onChange={e=>setEditVal(e.target.value)}
                  onKeyDown={e=>{ if(e.key==="Enter"){const v=parseMonto(editVal);if(v>=0)setProfile(p=>({...p,ingresos:{...p.ingresos,bonos:v}}));setEditId(null);} if(e.key==="Escape")setEditId(null); }}
                  placeholder="Ej: 7000000" style={{width:150,fontFamily:"Geist Mono",fontSize:13}} autoFocus/>
                <button className="btn-g btn-sm" onClick={()=>{const v=parseMonto(editVal);if(v>=0)setProfile(p=>({...p,ingresos:{...p.ingresos,bonos:v}}));setEditId(null);}}>✓</button>
                <button className="btn-s btn-sm" onClick={()=>setEditId(null)}>✕</button>
              </div>
              :<div className="flex ac2 gap8">
                <span className="mono" style={{fontSize:12,color:"var(--ac)"}}>{COP(profile.ingresos.bonos)}</span>
                <button className="btn-s btn-xs" onClick={()=>{setEditId("ing-bonos");setEditVal(String(profile.ingresos.bonos));}}>✏</button>
              </div>
            }
          </div>
          <div className="flex ac2 gap8" style={{marginTop:6}}>
            <span style={{fontSize:11,color:"var(--tx3)"}}>Mes de pago:</span>
            <select value={profile.ingresos.bonosMes} onChange={e=>setProfile(p=>({...p,ingresos:{...p.ingresos,bonosMes:parseInt(e.target.value)}}))}
              style={{width:110,fontSize:11,padding:"3px 8px"}}>
              {["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"].map((m,i)=>(
                <option key={i} value={i+1}>{m}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex jb" style={{marginTop:12,paddingTop:10,borderTop:"1px solid var(--b2)"}}>
          <span style={{fontWeight:600,fontSize:13}}>Total mensual base</span>
          <span className="mono" style={{fontWeight:700,color:"var(--gr)"}}>{COP(totalIngresos)}</span>
        </div>
      </Card>

      {/* 50/30/20 */}
      <Card style={{marginBottom:16}}>
        <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Regla 50 / 30 / 20</p>
        <div className="grid3">
          {[
            {l:"50% Necesidades",v:nec,actual:totalFijos,c:"var(--yl)"},
            {l:"30% Deseos",v:des,actual:totalVarBudget,c:"var(--ac)"},
            {l:"20% Ahorro / Inv.",v:aho,actual:0,c:"var(--gr)"},
          ].map((x,i)=>(
            <CardInner key={i}>
              <p style={{color:"var(--tx2)",fontSize:11,marginBottom:6}}>{x.l}</p>
              <p className="mono" style={{fontSize:19,color:x.c}}>{COP(x.v)}</p>
              {x.actual>0&&<><Bar val={x.actual} max={x.v} color={x.c} h={5}/><p style={{fontSize:10,color:"var(--tx3)",marginTop:3}}>Asignado: {COP(x.actual)}</p></>}
            </CardInner>
          ))}
        </div>
      </Card>

      <div className="grid2">
        <Card>
          <div className="flex jb ac2 mb12">
            <p style={{fontFamily:"Instrument Serif",fontSize:17}}>Gastos Fijos</p>
            <button className="btn-p btn-sm" onClick={()=>setShowAddFijo(true)}>+ Nuevo</button>
          </div>
          {profile.gastosFijos.map(g=><RowEdit key={g.id} item={g} tipo="gastosFijos" campo="monto"/>)}
          <div className="flex jb" style={{marginTop:12,paddingTop:10,borderTop:"1px solid var(--b2)"}}>
            <span style={{fontWeight:600,fontSize:13}}>Total</span>
            <span className="mono" style={{fontWeight:700,color:"var(--rd)"}}>{COP(totalFijos)}</span>
          </div>
        </Card>
        <Card>
          <div className="flex jb ac2 mb12">
            <p style={{fontFamily:"Instrument Serif",fontSize:17}}>Gastos Variables</p>
            <button className="btn-p btn-sm" onClick={()=>setShowAddVar(true)}>+ Nuevo</button>
          </div>
          {profile.gastosVariables.map(g=><RowEdit key={g.id} item={g} tipo="gastosVariables" campo="presupuesto"/>)}
          <div className="flex jb" style={{marginTop:12,paddingTop:10,borderTop:"1px solid var(--b2)"}}>
            <span style={{fontWeight:600,fontSize:13}}>Total</span>
            <span className="mono" style={{fontWeight:700,color:"var(--yl)"}}>{COP(totalVarBudget)}</span>
          </div>
        </Card>
      </div>

      {/* Resumen */}
      <Card style={{marginTop:16}}>
        <div className="grid4">
          {[
            {l:"Ingresos",v:totalIngresos,c:"var(--gr)"},
            {l:"Fijos",v:totalFijos,c:"var(--rd)"},
            {l:"Variables",v:totalVarBudget,c:"var(--yl)"},
            {l:"Flujo libre",v:totalIngresos-totalFijos-totalVarBudget,c:(totalIngresos-totalFijos-totalVarBudget)>0?"var(--gr)":"var(--rd)"},
          ].map((x,i)=>(
            <CardInner key={i} style={{textAlign:"center"}}>
              <p style={{color:"var(--tx3)",fontSize:10,marginBottom:6}}>{x.l}</p>
              <p className="mono" style={{fontSize:16,fontWeight:600,color:x.c}}>{COP(x.v)}</p>
            </CardInner>
          ))}
        </div>
      </Card>

      <ModalNuevoGasto tipo="gastosFijos" show={showAddFijo} onClose={()=>setShowAddFijo(false)} onAgregar={agregar}/>
      <ModalNuevoGasto tipo="gastosVariables" show={showAddVar} onClose={()=>setShowAddVar(false)} onAgregar={agregar}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CUENTAS
═══════════════════════════════════════════════════════════════════ */
function Cuentas({app}) {
  const {cuentas,setCuentas}=app;
  const [showAdd,setShowAdd]=useState(false);
  const [showEdit,setShowEdit]=useState(false);
  const [editCuenta,setEditCuenta]=useState(null);
  const [f,setF]=useState({nombre:"",tipo:"Ahorro",saldo:"",tasa:"",color:"#5b8fff"});
  const [transfer,setTransfer]=useState({de:"",a:"",monto:""});
  const [movim,setMovim]=useState({id:"",tipo:"retiro",monto:""});

  const total=cuentas.reduce((s,c)=>s+c.saldo,0);
  const renMensual=c=>c.saldo*(Math.pow(1+c.tasa/100,1/12)-1);
  const renAnual=c=>c.saldo*(Math.pow(1+c.tasa/100,1)-1);

  const agregar=()=>{
    if(!f.nombre||!f.saldo) return;
    setCuentas(p=>[...p,{...f,id:`cnt-${uid()}`,saldo:parseFloat(f.saldo),tasa:parseFloat(f.tasa||0)}]);
    setF({nombre:"",tipo:"Ahorro",saldo:"",tasa:"",color:"#5b8fff"});
    setShowAdd(false);
  };
  const eliminar=id=>setCuentas(p=>p.filter(c=>c.id!==id));
  const hacerMovimiento=()=>{
    const m=parseFloat(movim.monto); if(!m||!movim.id) return;
    setCuentas(p=>p.map(c=>{
      if(c.id!==movim.id) return c;
      const nuevoSaldo=movim.tipo==="retiro"?c.saldo-m:c.saldo+m;
      if(nuevoSaldo<0){alert("Saldo insuficiente para el retiro.");return c;}
      return {...c,saldo:Math.round(nuevoSaldo)};
    }));
    setMovim({id:"",tipo:"retiro",monto:""});
  };
  const abrirEditar=c=>{ setEditCuenta({...c,saldo:String(c.saldo),tasa:String(c.tasa)}); setShowEdit(true); };
  const guardarEditar=()=>{
    if(!editCuenta) return;
    setCuentas(p=>p.map(c=>c.id===editCuenta.id?{...editCuenta,saldo:parseFloat(editCuenta.saldo)||c.saldo,tasa:parseFloat(editCuenta.tasa)||0}:c));
    setShowEdit(false); setEditCuenta(null);
  };
  const hacerTransfer=()=>{
    const m=parseFloat(transfer.monto);
    if(!m||!transfer.de||!transfer.a||transfer.de===transfer.a) return alert("Datos inválidos.");
    setCuentas(p=>p.map(c=>c.id===transfer.de?{...c,saldo:c.saldo-m}:c.id===transfer.a?{...c,saldo:c.saldo+m}:c));
    setTransfer({de:"",a:"",monto:""});
  };

  return (
    <div className="fade">
      <div className="flex jb ac2 mb24">
        <div><h2 style={{fontSize:28,fontWeight:400}}>Cuentas</h2><p style={{color:"var(--tx2)",fontSize:12}}>Gestión de cuentas y ahorros</p></div>
        <button className="btn-p btn-sm" onClick={()=>setShowAdd(true)}>+ Nueva cuenta</button>
      </div>

      <div className="grid2 mb16">
        {cuentas.map(c=>(
          <Card key={c.id} style={{borderLeft:`3px solid ${c.color}`}}>
            <div className="flex jb ac2 mb12">
              <div className="flex ac2 gap10">
                <div style={{width:10,height:10,borderRadius:"50%",background:c.color}}/>
                <h3 style={{fontSize:17}}>{c.nombre}</h3>
                <span style={{background:"var(--s3)",borderRadius:4,padding:"2px 7px",fontSize:10,color:"var(--tx2)"}}>{c.tipo}</span>
              </div>
              <div className="flex gap6">
                <button className="btn-s btn-xs" onClick={()=>abrirEditar(c)}>✏</button>
                <button className="btn-d btn-xs" onClick={()=>eliminar(c.id)}>✕</button>
              </div>
            </div>
            <p className="mono" style={{fontSize:26,fontWeight:400,color:c.color,marginBottom:8}}>{COP(c.saldo)}</p>
            <div className="flex gap6" style={{marginBottom:8}}>
              <button className="btn-sm" style={{background:"rgba(240,79,114,.15)",color:"var(--rd)",border:"1px solid rgba(240,79,114,.25)",fontSize:11}} onClick={()=>setMovim({id:c.id,tipo:"retiro",monto:""})}>− Retirar</button>
              <button className="btn-sm" style={{background:"rgba(36,212,160,.15)",color:"var(--gr)",border:"1px solid rgba(36,212,160,.25)",fontSize:11}} onClick={()=>setMovim({id:c.id,tipo:"deposito",monto:""})}>+ Depositar</button>
            </div>
            {movim.id===c.id&&(
              <div className="flex gap6 ac2" style={{marginBottom:8,padding:8,background:"var(--s3)",borderRadius:8}}>
                <span style={{fontSize:11,color:"var(--tx2)",whiteSpace:"nowrap"}}>{movim.tipo==="retiro"?"Retirar:":"Depositar:"}</span>
                <input value={movim.monto} onChange={e=>setMovim(p=>({...p,monto:e.target.value}))} placeholder="Monto" onKeyDown={e=>e.key==="Enter"&&hacerMovimiento()} style={{fontFamily:"Geist Mono"}} autoFocus/>
                <button className="btn-g btn-sm" onClick={hacerMovimiento}>✓</button>
                <button className="btn-s btn-sm" onClick={()=>setMovim({id:"",tipo:"retiro",monto:""})}>✕</button>
              </div>
            )}
            {c.tasa>0&&(
              <div className="flex gap16" style={{paddingTop:12,borderTop:"1px solid var(--b1)"}}>
                <div><p style={{color:"var(--tx3)",fontSize:10}}>Tasa EA</p><p className="mono" style={{color:"var(--gr)",fontSize:13}}>{c.tasa}%</p></div>
                <div><p style={{color:"var(--tx3)",fontSize:10}}>Rend. mensual</p><p className="mono" style={{color:"var(--gr)",fontSize:13}}>+{COP(renMensual(c))}</p></div>
                <div><p style={{color:"var(--tx3)",fontSize:10}}>Rend. anual</p><p className="mono" style={{color:"var(--gr)",fontSize:13}}>+{COP(renAnual(c))}</p></div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card style={{marginBottom:16}}>
        <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Total ahorros</p>
        <p className="mono" style={{fontSize:32,color:"var(--gr)"}}>{COP(total)}</p>
        <p style={{color:"var(--tx2)",fontSize:12,marginTop:4}}>Rendimiento mensual estimado: +{COP(cuentas.reduce((s,c)=>s+renMensual(c),0))}</p>
      </Card>

      {/* Transferencia interna */}
      <Card>
        <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Transferencia interna</p>
        <div className="grid3 mb12">
          <div><label>Desde</label>
            <select value={transfer.de} onChange={e=>setTransfer(p=>({...p,de:e.target.value}))}>
              <option value="">Seleccionar...</option>
              {cuentas.map(c=><option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div><label>Hacia</label>
            <select value={transfer.a} onChange={e=>setTransfer(p=>({...p,a:e.target.value}))}>
              <option value="">Seleccionar...</option>
              {cuentas.map(c=><option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div><label>Monto</label><input type="number" value={transfer.monto} onChange={e=>setTransfer(p=>({...p,monto:e.target.value}))} placeholder="500000"/></div>
        </div>
        <button className="btn-p" onClick={hacerTransfer}>Transferir</button>
      </Card>

      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Nueva cuenta">
        <div className="flex fc gap10">
          <div><label>Nombre</label><input value={f.nombre} onChange={e=>setF(p=>({...p,nombre:e.target.value}))}/></div>
          <div><label>Tipo</label>
            <select value={f.tipo} onChange={e=>setF(p=>({...p,tipo:e.target.value}))}>
              {["Ahorro","Corriente","CDT","Inversión","Efectivo"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div><label>Saldo inicial</label><input type="number" value={f.saldo} onChange={e=>setF(p=>({...p,saldo:e.target.value}))}/></div>
          <div><label>Tasa EA (%)</label><input type="number" step="0.01" value={f.tasa} onChange={e=>setF(p=>({...p,tasa:e.target.value}))}/></div>
          <div className="flex ac2 gap10"><input type="color" value={f.color} onChange={e=>setF(p=>({...p,color:e.target.value}))} style={{width:40,height:34,padding:2}}/><label style={{margin:0}}>Color de cuenta</label></div>
          <button className="btn-p" onClick={agregar}>+ Agregar cuenta</button>
        </div>
      </Modal>

      {/* Modal editar cuenta */}
      <Modal open={showEdit} onClose={()=>{setShowEdit(false);setEditCuenta(null);}} title="Editar cuenta">
        {editCuenta&&(
          <div className="flex fc gap10">
            <div><label>Nombre</label><input value={editCuenta.nombre} onChange={e=>setEditCuenta(p=>({...p,nombre:e.target.value}))}/></div>
            <div><label>Tipo</label>
              <select value={editCuenta.tipo} onChange={e=>setEditCuenta(p=>({...p,tipo:e.target.value}))}>
                {["Ahorro","Corriente","CDT","Inversión","Efectivo"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div><label>Saldo actual</label><input type="number" value={editCuenta.saldo} onChange={e=>setEditCuenta(p=>({...p,saldo:e.target.value}))}/></div>
            <div><label>Tasa EA (%)</label><input type="number" step="0.01" value={editCuenta.tasa} onChange={e=>setEditCuenta(p=>({...p,tasa:e.target.value}))}/></div>
            <div className="flex ac2 gap10"><input type="color" value={editCuenta.color} onChange={e=>setEditCuenta(p=>({...p,color:e.target.value}))} style={{width:40,height:34,padding:2}}/><label style={{margin:0}}>Color</label></div>
            <div className="flex gap8">
              <button className="btn-p" style={{flex:1}} onClick={guardarEditar}>Guardar cambios</button>
              <button className="btn-s" onClick={()=>{setShowEdit(false);setEditCuenta(null);}}>Cancelar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DEUDAS — CRUD completo + simple/avanzado
═══════════════════════════════════════════════════════════════════ */
function Deudas({app}) {
  const {deudas,setDeudas,enviarNotif,notifCfg} = app;
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("resumen");
  const [showAdd,setShowAdd]=useState(false);
  const [simTasa,setSimTasa]=useState("");
  const [simPlazo,setSimPlazo]=useState("");
  const [abonoM,setAbonoM]=useState("");
  const [abonoTipo,setAbonoTipo]=useState("plazo");

  const blankDeuda={nombre:"",entidad:"",saldo:"",tasaEA:"",tasaTipo:"fija",cuota:"",cuotasRestantes:"",cuotasTotal:"",diaCorte:"",fechaPago:hoy(),tipo:"Personal",modulo:"simple",notas:"",icono:"💳",cuotasPagadas:0};
  const [newD,setNewD]=useState(blankDeuda);
  const [showEditDeuda,setShowEditDeuda]=useState(false);
  const [editD,setEditD]=useState(null);

  const deuda=sel?deudas.find(d=>d.id===sel):null;
  const actualCalc=deuda?calcAmort(deuda.saldo,deuda.tasaEA,deuda.cuotasRestantes):{cuota:0,tabla:[],totalIntereses:0};
  const simCalc=deuda?calcAmort(deuda.saldo,parseFloat(simTasa)||deuda.tasaEA,parseInt(simPlazo)||deuda.cuotasRestantes):{cuota:0,tabla:[],totalIntereses:0};

  const agregarDeuda=()=>{
    const d={...newD,id:`deu-${uid()}`,saldo:parseFloat(newD.saldo)||0,tasaEA:parseFloat(newD.tasaEA)||0,cuota:parseFloat(newD.cuota)||0,cuotasRestantes:parseInt(newD.cuotasRestantes)||0,cuotasTotal:parseInt(newD.cuotasTotal||newD.cuotasRestantes)||0,diaCorte:parseInt(newD.diaCorte)||null};
    setDeudas(p=>[...p,d]);
    setNewD(blankDeuda);
    setShowAdd(false);
  };
  const eliminarDeuda=id=>{ setDeudas(p=>p.filter(d=>d.id!==id)); if(sel===id)setSel(null); };
  const abrirEditarDeuda=d=>{ setEditD({...d,saldo:String(d.saldo),tasaEA:String(d.tasaEA),cuota:String(d.cuota),cuotasRestantes:String(d.cuotasRestantes),cuotasTotal:String(d.cuotasTotal),diaCorte:String(d.diaCorte||"")}); setShowEditDeuda(true); };
  const guardarEditarDeuda=()=>{
    if(!editD) return;
    setDeudas(p=>p.map(d=>d.id===editD.id?{...editD,saldo:parseFloat(editD.saldo)||d.saldo,tasaEA:parseFloat(editD.tasaEA)||d.tasaEA,cuota:parseFloat(editD.cuota)||d.cuota,cuotasRestantes:parseInt(editD.cuotasRestantes)||d.cuotasRestantes,cuotasTotal:parseInt(editD.cuotasTotal)||d.cuotasTotal,diaCorte:parseInt(editD.diaCorte)||null}:d));
    setShowEditDeuda(false); setEditD(null);
  };
  const pagarCuota=id=>{
    setDeudas(p=>p.map(d=>d.id===id?{...d,cuotasPagadas:d.cuotasPagadas+1,cuotasRestantes:Math.max(0,d.cuotasRestantes-1),saldo:Math.max(0,d.saldo-d.cuota)}:d));
    if(deuda) enviarNotif(`✅ Cuota pagada: ${deuda.nombre} — ${COP(deuda.cuota)}`,"email");
  };
  const aplicarAbono=()=>{
    const m=parseFloat(abonoM); if(!m||!deuda) return;
    const nuevoSaldo=Math.max(0,deuda.saldo-m);
    let nuevasCuotas=deuda.cuotasRestantes;
    let nuevaCuota=deuda.cuota;
    if(abonoTipo==="plazo"&&deuda.tasaEA>0){
      const tm=Math.pow(1+deuda.tasaEA/100,1/12)-1;
      nuevasCuotas=Math.max(1,Math.ceil(Math.log(deuda.cuota/(deuda.cuota-nuevoSaldo*tm))/Math.log(1+tm)));
    } else if(abonoTipo==="cuota"&&deuda.tasaEA>0){
      const tm=Math.pow(1+deuda.tasaEA/100,1/12)-1;
      nuevaCuota=Math.round(nuevoSaldo*(tm*Math.pow(1+tm,deuda.cuotasRestantes))/(Math.pow(1+tm,deuda.cuotasRestantes)-1));
    }
    setDeudas(p=>p.map(d=>d.id===deuda.id?{...d,saldo:nuevoSaldo,cuotasRestantes:nuevasCuotas,cuota:nuevaCuota}:d));
    setAbonoM("");
  };

  return (
    <div className="fade">
      <div className="flex jb ac2 mb24">
        <div><h2 style={{fontSize:28,fontWeight:400}}>Deudas y Créditos</h2><p style={{color:"var(--tx2)",fontSize:12}}>CRUD completo · Simple y Avanzado</p></div>
        <button className="btn-p btn-sm" onClick={()=>setShowAdd(true)}>+ Nueva deuda</button>
      </div>

      <div className="grid2">
        {/* Lista de deudas */}
        <div className="flex fc gap10">
          {deudas.map(d=>(
            <div key={d.id} onClick={()=>{ setSel(d.id); setTab("resumen"); setSimTasa(d.tasaEA); setSimPlazo(d.cuotasRestantes); }}
              style={{background:"var(--s1)",border:`1px solid ${sel===d.id?"var(--ac)":"var(--b1)"}`,borderRadius:12,padding:16,cursor:"pointer",transition:"border-color .2s",boxShadow:sel===d.id?"0 0 0 1px rgba(91,143,255,.15)":"none"}}>
              <div className="flex jb ac2 mb8">
                <div className="flex ac2 gap8">
                  <span style={{fontSize:22}}>{d.icono}</span>
                  <div>
                    <p style={{fontWeight:600,fontSize:13}}>{d.nombre}</p>
                    <p style={{color:"var(--tx3)",fontSize:11}}>{d.entidad} · {d.tipo}</p>
                  </div>
                </div>
                <div className="flex ac2 gap6">
                  <span className={`tag tag-${d.modulo}`}>{d.modulo}</span>
                  <button className="btn-s btn-xs" onClick={e=>{e.stopPropagation();abrirEditarDeuda(d);}}>✏</button>
                  <button className="btn-d btn-xs" onClick={e=>{e.stopPropagation();eliminarDeuda(d.id);}}>✕</button>
                </div>
              </div>
              <div className="flex jb">
                <div><p style={{fontSize:10,color:"var(--tx3)"}}>Saldo</p><p className="mono" style={{color:"var(--rd)",fontSize:15}}>{COP(d.saldo)}</p></div>
                <div><p style={{fontSize:10,color:"var(--tx3)"}}>Cuota</p><p className="mono" style={{fontSize:14}}>{COP(d.cuota)}</p></div>
                <div><p style={{fontSize:10,color:"var(--tx3)"}}>Tasa EA</p><p className="mono" style={{fontSize:14}}>{d.tasaEA}%</p></div>
                <div><p style={{fontSize:10,color:"var(--tx3)"}}>Cuotas rest.</p><p className="mono" style={{fontSize:14}}>{d.cuotasRestantes}</p></div>
              </div>
              {d.cuotasTotal>0&&<Bar val={d.cuotasPagadas} max={d.cuotasTotal} color="var(--gr)" h={5}/>}
            </div>
          ))}
          {deudas.length===0&&<Card><p style={{color:"var(--tx3)",textAlign:"center",padding:20,fontSize:12}}>Sin deudas registradas.</p></Card>}
        </div>

        {/* Detalle */}
        {deuda?(
          <div>
            <Tabs tabs={[
              {id:"resumen",label:"Resumen"},
              ...(deuda.modulo==="avanzado"?[{id:"amort",label:"Amortización"},{id:"sim",label:"Simulación"},{id:"abono",label:"Abono"}]:[{id:"pagos",label:"Pagos"}])
            ]} active={tab} onChange={setTab}/>
            <div style={{marginTop:14}}>
              {tab==="resumen"&&(
                <Card>
                  <div className="flex jb ac2 mb12">
                    <p style={{fontFamily:"Instrument Serif",fontSize:18}}>{deuda.icono} {deuda.nombre}</p>
                    <span className={`tag tag-${deuda.modulo}`}>{deuda.modulo}</span>
                  </div>
                  {[
                    {l:"Entidad",v:deuda.entidad},
                    {l:"Tipo",v:deuda.tipo},
                    {l:"Saldo actual",v:COP(deuda.saldo),c:"var(--rd)"},
                    {l:"Tasa EA",v:`${deuda.tasaEA}% (${deuda.tasaTipo})`,c:"var(--yl)"},
                    {l:"Cuota mensual",v:COP(deuda.cuota)},
                    {l:"Cuotas restantes",v:`${deuda.cuotasRestantes} meses`},
                    {l:"Próxima fecha pago",v:deuda.fechaPago,c:"var(--ac)"},
                    {l:"Intereses restantes",v:COP(actualCalc.totalIntereses),c:"var(--rd)"},
                    ...(deuda.notas?[{l:"Notas",v:deuda.notas}]:[]),
                  ].map((r,i)=>(
                    <div key={i} className="flex jb" style={{padding:"8px 0",borderBottom:"1px solid var(--b1)"}}>
                      <span style={{color:"var(--tx2)",fontSize:12}}>{r.l}</span>
                      <span className="mono" style={{fontSize:12,color:r.c||"var(--tx)"}}>{r.v}</span>
                    </div>
                  ))}
                  <div style={{marginTop:14}}>
                    <Bar val={deuda.cuotasPagadas} max={deuda.cuotasTotal||deuda.cuotasRestantes} h={8}/>
                    <p style={{fontSize:11,color:"var(--tx3)",marginTop:4}}>{deuda.cuotasPagadas} de {deuda.cuotasTotal||deuda.cuotasRestantes} cuotas pagadas</p>
                  </div>
                  <div className="flex gap8" style={{marginTop:14}}>
                    <button className="btn-g btn-sm" onClick={()=>pagarCuota(deuda.id)}>✓ Registrar pago</button>
                    <button className="btn-s btn-sm" onClick={()=>setDeudas(p=>p.map(d=>d.id===deuda.id?{...d,cuotasPagadas:Math.max(0,d.cuotasPagadas-1),cuotasRestantes:d.cuotasRestantes+1,saldo:d.saldo+d.cuota}:d))}>↩ Deshacer pago</button>
                  </div>
                </Card>
              )}

              {tab==="pagos"&&(
                <Card>
                  <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Calendario de pagos</p>
                  <div style={{maxHeight:340,overflowY:"auto"}}>
                    {Array.from({length:deuda.cuotasTotal||deuda.cuotasRestantes},(_, i)=>{
                      const pagada=i<deuda.cuotasPagadas;
                      const fp=new Date(deuda.fechaPago); fp.setMonth(fp.getMonth()+i);
                      return (
                        <div key={i} className="flex jb ac2" style={{padding:"7px 0",borderBottom:"1px solid var(--b1)",opacity:pagada?.5:1}}>
                          <span style={{fontSize:12}}>{pagada?"✅":"⏳"} Cuota {i+1}</span>
                          <span style={{fontSize:11,color:"var(--tx2)"}}>{fp.toLocaleDateString("es-CO")}</span>
                          <span className="mono" style={{fontSize:12,color:pagada?"var(--gr)":"var(--tx)"}}>{COP(deuda.cuota)}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {tab==="amort"&&(
                <Card>
                  <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Tabla de amortización</p>
                  <p style={{fontSize:12,color:"var(--tx2)",marginBottom:12}}>Total intereses: <strong style={{color:"var(--rd)"}}>{COP(actualCalc.totalIntereses)}</strong></p>
                  <div style={{overflowX:"auto",maxHeight:380,overflowY:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                      <thead style={{position:"sticky",top:0,background:"var(--s2)"}}>
                        <tr>{["Mes","Cuota","Interés","Capital","Saldo"].map(h=>(
                          <th key={h} style={{padding:"7px 10px",textAlign:"right",color:"var(--tx2)",fontFamily:"Geist",fontWeight:600,borderBottom:"1px solid var(--b1)"}}>{h}</th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {actualCalc.tabla.map((r,i)=>(
                          <tr key={i} style={{borderBottom:"1px solid var(--b1)",background:i%2?"var(--s2)":"transparent"}}>
                            {[r.mes,COP(r.cuota),COP(r.interes),COP(r.capital),COP(r.saldo)].map((v,j)=>(
                              <td key={j} className="mono" style={{padding:"6px 10px",textAlign:"right",color:j===2?"var(--rd)":j===3?"var(--gr)":"var(--tx)",fontSize:11}}>{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}

              {tab==="sim"&&(
                <div className="flex fc gap12">
                  <Card>
                    <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Parámetros</p>
                    <div className="flex fc gap10">
                      <div><label>Nueva tasa EA (%)</label><input type="number" step=".01" value={simTasa} onChange={e=>setSimTasa(e.target.value)}/></div>
                      <div>
                        <label>Plazo (meses)</label>
                        <div className="flex gap6 mb8" style={{flexWrap:"wrap"}}>
                          {[60,96,180,240].map(p=>(
                            <button key={p} onClick={()=>setSimPlazo(p)} className={parseInt(simPlazo)===p?"btn-p btn-sm":"btn-s btn-sm"}>{p/12} años</button>
                          ))}
                        </div>
                        <input type="number" value={simPlazo} onChange={e=>setSimPlazo(e.target.value)}/>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Comparativo</p>
                    {[
                      {l:"Tasa EA",v1:`${deuda.tasaEA}%`,v2:`${simTasa}%`},
                      {l:"Plazo",v1:`${deuda.cuotasRestantes}m`,v2:`${simPlazo}m`},
                      {l:"Cuota mensual",v1:COP(actualCalc.cuota),v2:COP(simCalc.cuota)},
                      {l:"Total intereses",v1:COP(actualCalc.totalIntereses),v2:COP(simCalc.totalIntereses)},
                      {l:"Ahorro en intereses",v1:"",v2:COP(Math.max(0,actualCalc.totalIntereses-simCalc.totalIntereses)),hl:true},
                    ].map((r,i)=>(
                      <div key={i} className="flex jb ac2" style={{padding:"8px 0",borderBottom:"1px solid var(--b1)",background:r.hl?"rgba(36,212,160,.06)":"transparent",borderRadius:r.hl?6:0,paddingLeft:r.hl?8:0}}>
                        <span style={{color:"var(--tx2)",fontSize:12}}>{r.l}</span>
                        <div className="flex gap16">
                          <span className="mono" style={{fontSize:11,color:"var(--tx3)",textDecoration:r.v2&&!r.hl?"line-through":"none"}}>{r.v1}</span>
                          <span className="mono" style={{fontSize:12,color:r.hl?"var(--gr)":"var(--ac)"}}>{r.v2}</span>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              )}

              {tab==="abono"&&(
                <div className="flex fc gap12">
                  <Card>
                    <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Abono a capital</p>
                    <div className="flex fc gap10">
                      <div><label>Monto del abono</label><input type="number" value={abonoM} onChange={e=>setAbonoM(e.target.value)} placeholder="Ej: 2.000.000"/></div>
                      <div>
                        <label>Objetivo</label>
                        <div className="flex gap8">
                          <button onClick={()=>setAbonoTipo("plazo")} className={abonoTipo==="plazo"?"btn-p":"btn-s"}>Reducir plazo</button>
                          <button onClick={()=>setAbonoTipo("cuota")} className={abonoTipo==="cuota"?"btn-p":"btn-s"}>Reducir cuota</button>
                        </div>
                      </div>
                      <button className="btn-g" onClick={aplicarAbono}>Aplicar abono</button>
                    </div>
                  </Card>
                  <Card>
                    <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:10}}>Estado hipoteca</p>
                    <div className="flex jb mb8"><span style={{color:"var(--tx2)",fontSize:12}}>Saldo</span><span className="mono" style={{color:"var(--rd)"}}>{COP(deuda.saldo)}</span></div>
                    <div className="flex jb mb8"><span style={{color:"var(--tx2)",fontSize:12}}>Cuota</span><span className="mono">{COP(deuda.cuota)}</span></div>
                    <div className="flex jb mb12"><span style={{color:"var(--tx2)",fontSize:12}}>Cuotas restantes</span><span className="mono">{deuda.cuotasRestantes}m</span></div>
                    <Bar val={deuda.cuotasPagadas} max={deuda.cuotasTotal||deuda.cuotasRestantes} h={8}/>
                  </Card>
                </div>
              )}
            </div>
          </div>
        ):(
          <Card style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <p style={{color:"var(--tx3)",fontSize:12,textAlign:"center"}}>← Selecciona una deuda para ver el detalle</p>
          </Card>
        )}
      </div>

      {/* Modal nueva deuda */}
      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Nueva deuda / crédito" width={600}>
        <div className="grid2 gap12">
          <div><label>Nombre</label><input value={newD.nombre} onChange={e=>setNewD(p=>({...p,nombre:e.target.value}))} placeholder="Ej: Tarjeta Visa"/></div>
          <div><label>Entidad</label><input value={newD.entidad} onChange={e=>setNewD(p=>({...p,entidad:e.target.value}))} placeholder="Ej: Bancolombia"/></div>
          <div><label>Icono (emoji)</label><input value={newD.icono} onChange={e=>setNewD(p=>({...p,icono:e.target.value}))}/></div>
          <div><label>Tipo de deuda</label>
            <select value={newD.tipo} onChange={e=>setNewD(p=>({...p,tipo:e.target.value}))}>
              {["Hipotecario","Vehículo","Personal","Tarjeta crédito","Libre inversión","Educativo","Familiar/0%","Otro"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div><label>Saldo actual</label><input type="number" value={newD.saldo} onChange={e=>setNewD(p=>({...p,saldo:e.target.value}))}/></div>
          <div><label>Tasa EA (%)</label><input type="number" step=".01" value={newD.tasaEA} onChange={e=>setNewD(p=>({...p,tasaEA:e.target.value}))}/></div>
          <div><label>Tipo de tasa</label>
            <select value={newD.tasaTipo} onChange={e=>setNewD(p=>({...p,tasaTipo:e.target.value}))}>
              <option value="fija">Fija</option><option value="variable">Variable</option>
            </select>
          </div>
          <div><label>Cuota mensual</label><input type="number" value={newD.cuota} onChange={e=>setNewD(p=>({...p,cuota:e.target.value}))}/></div>
          <div><label>Cuotas totales</label><input type="number" value={newD.cuotasTotal} onChange={e=>setNewD(p=>({...p,cuotasTotal:e.target.value}))}/></div>
          <div><label>Cuotas restantes</label><input type="number" value={newD.cuotasRestantes} onChange={e=>setNewD(p=>({...p,cuotasRestantes:e.target.value}))}/></div>
          <div><label>Día de corte (1–31)</label><input type="number" min="1" max="31" value={newD.diaCorte} onChange={e=>setNewD(p=>({...p,diaCorte:e.target.value}))}/></div>
          <div><label>Fecha próximo pago</label><input type="date" value={newD.fechaPago} onChange={e=>setNewD(p=>({...p,fechaPago:e.target.value}))}/></div>
        </div>
        <div style={{marginTop:12}}>
          <label>Módulo</label>
          <div className="flex gap8">
            <button onClick={()=>setNewD(p=>({...p,modulo:"simple"}))} className={newD.modulo==="simple"?"btn-g":"btn-s"}>Simple — pagos y recordatorios</button>
            <button onClick={()=>setNewD(p=>({...p,modulo:"avanzado"}))} className={newD.modulo==="avanzado"?"btn-p":"btn-s"}>Avanzado — amortización y simulación</button>
          </div>
        </div>
        <div style={{marginTop:12}}><label>Notas</label><textarea value={newD.notas} onChange={e=>setNewD(p=>({...p,notas:e.target.value}))} rows={2} placeholder="Observaciones adicionales"/></div>
        <button className="btn-p" style={{marginTop:14,width:"100%"}} onClick={agregarDeuda}>+ Agregar deuda</button>
      </Modal>
      {/* Modal editar deuda */}
      <Modal open={showEditDeuda} onClose={()=>{setShowEditDeuda(false);setEditD(null);}} title="Editar deuda" width={600}>
        {editD&&(
          <div>
            <div className="grid2 gap12">
              <div><label>Nombre</label><input value={editD.nombre} onChange={e=>setEditD(p=>({...p,nombre:e.target.value}))}/></div>
              <div><label>Entidad</label><input value={editD.entidad} onChange={e=>setEditD(p=>({...p,entidad:e.target.value}))}/></div>
              <div><label>Icono</label><input value={editD.icono} onChange={e=>setEditD(p=>({...p,icono:e.target.value}))}/></div>
              <div><label>Tipo</label>
                <select value={editD.tipo} onChange={e=>setEditD(p=>({...p,tipo:e.target.value}))}>
                  {["Hipotecario","Vehículo","Personal","Tarjeta crédito","Libre inversión","Educativo","Familiar/0%","Otro"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label>Saldo actual</label><input type="number" value={editD.saldo} onChange={e=>setEditD(p=>({...p,saldo:e.target.value}))}/></div>
              <div><label>Tasa EA (%)</label><input type="number" step=".01" value={editD.tasaEA} onChange={e=>setEditD(p=>({...p,tasaEA:e.target.value}))}/></div>
              <div><label>Tipo tasa</label>
                <select value={editD.tasaTipo} onChange={e=>setEditD(p=>({...p,tasaTipo:e.target.value}))}>
                  <option value="fija">Fija</option><option value="variable">Variable</option>
                </select>
              </div>
              <div><label>Cuota mensual</label><input type="number" value={editD.cuota} onChange={e=>setEditD(p=>({...p,cuota:e.target.value}))}/></div>
              <div><label>Cuotas totales</label><input type="number" value={editD.cuotasTotal} onChange={e=>setEditD(p=>({...p,cuotasTotal:e.target.value}))}/></div>
              <div><label>Cuotas restantes</label><input type="number" value={editD.cuotasRestantes} onChange={e=>setEditD(p=>({...p,cuotasRestantes:e.target.value}))}/></div>
              <div><label>Día de corte</label><input type="number" min="1" max="31" value={editD.diaCorte} onChange={e=>setEditD(p=>({...p,diaCorte:e.target.value}))}/></div>
              <div><label>Fecha próximo pago</label><input type="date" value={editD.fechaPago} onChange={e=>setEditD(p=>({...p,fechaPago:e.target.value}))}/></div>
            </div>
            <div style={{marginTop:12}}>
              <label>Módulo</label>
              <div className="flex gap8">
                <button onClick={()=>setEditD(p=>({...p,modulo:"simple"}))} className={editD.modulo==="simple"?"btn-g":"btn-s"}>Simple</button>
                <button onClick={()=>setEditD(p=>({...p,modulo:"avanzado"}))} className={editD.modulo==="avanzado"?"btn-p":"btn-s"}>Avanzado</button>
              </div>
            </div>
            <div style={{marginTop:12}}><label>Notas</label><textarea value={editD.notas} onChange={e=>setEditD(p=>({...p,notas:e.target.value}))} rows={2}/></div>
            <div className="flex gap8" style={{marginTop:14}}>
              <button className="btn-p" style={{flex:1}} onClick={guardarEditarDeuda}>Guardar cambios</button>
              <button className="btn-s" onClick={()=>{setShowEditDeuda(false);setEditD(null);}}>Cancelar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   METAS
═══════════════════════════════════════════════════════════════════ */
function Metas({app}) {
  const {metas,setMetas}=app;
  const [showAdd,setShowAdd]=useState(false);
  const [showEditM,setShowEditM]=useState(false);
  const [editMeta,setEditMeta]=useState(null);
  const [f,setF]=useState({nombre:"",emoji:"⭐",meta:"",acumulado:"",aporteMensual:"",fechaMeta:""});
  const [abonoId,setAbonoId]=useState(null);
  const [abonoM,setAbonoM]=useState("");

  const agregar=()=>{
    if(!f.nombre) return;
    setMetas(p=>[...p,{...f,id:`meta-${uid()}`,meta:parseFloat(f.meta)||null,acumulado:parseFloat(f.acumulado)||0,aporteMensual:parseFloat(f.aporteMensual)||0}]);
    setF({nombre:"",emoji:"⭐",meta:"",acumulado:"",aporteMensual:"",fechaMeta:""});
    setShowAdd(false);
  };
  const abonar=id=>{
    const m=parseFloat(abonoM); if(!m) return;
    setMetas(p=>p.map(mt=>mt.id===id?{...mt,acumulado:mt.acumulado+m}:mt));
    setAbonoM(""); setAbonoId(null);
  };
  const eliminar=id=>setMetas(p=>p.filter(m=>m.id!==id));
  const abrirEditarMeta=m=>{ setEditMeta({...m,meta:m.meta!=null?String(m.meta):"",acumulado:String(m.acumulado),aporteMensual:String(m.aporteMensual)}); setShowEditM(true); };
  const guardarEditarMeta=()=>{
    if(!editMeta) return;
    setMetas(p=>p.map(m=>m.id===editMeta.id?{...editMeta,meta:editMeta.meta?parseFloat(editMeta.meta):null,acumulado:parseFloat(editMeta.acumulado)||0,aporteMensual:parseFloat(editMeta.aporteMensual)||0}:m));
    setShowEditM(false); setEditMeta(null);
  };

  const mesesRest=(m)=>{
    if(!m.fechaMeta) return null;
    const [y,mo]=m.fechaMeta.split("-").map(Number);
    const n=new Date();
    return (y-n.getFullYear())*12+(mo-1-n.getMonth());
  };

  return (
    <div className="fade">
      <div className="flex jb ac2 mb24">
        <div><h2 style={{fontSize:28,fontWeight:400}}>Metas Financieras</h2><p style={{color:"var(--tx2)",fontSize:12}}>Fondos virtuales independientes</p></div>
        <button className="btn-p btn-sm" onClick={()=>setShowAdd(true)}>+ Nueva meta</button>
      </div>

      <div className="grid2">
        {metas.map(m=>{
          const mr=mesesRest(m);
          return (
            <Card key={m.id}>
              <div className="flex jb ac2 mb10">
                <div className="flex ac2 gap10">
                  <span style={{fontSize:30}}>{m.emoji}</span>
                  <div>
                    <h3 style={{fontSize:17}}>{m.nombre}</h3>
                    {m.fechaMeta&&<p style={{color:"var(--tx3)",fontSize:11}}>{m.fechaMeta}{mr!==null?` · ${mr>0?mr+" meses":"¡Ya llegó!"}`:""}</p>}
                  </div>
                </div>
                <div className="flex gap4">
                  <button className="btn-s btn-xs" onClick={()=>abrirEditarMeta(m)}>✏</button>
                  <button className="btn-d btn-xs" onClick={()=>eliminar(m.id)}>✕</button>
                </div>
              </div>
              {m.meta&&(
                <>
                  <div className="flex jb ac2 mb8">
                    <span className="mono" style={{fontSize:22,color:"var(--ac2)"}}>{COP(m.acumulado)}</span>
                    <span className="mono" style={{fontSize:12,color:"var(--tx3)"}}>{COP(m.meta)}</span>
                  </div>
                  <Bar val={m.acumulado} max={m.meta} color="var(--ac2)" h={10}/>
                  <p style={{color:"var(--tx3)",fontSize:11,marginTop:4}}>{PCT(m.acumulado,m.meta)}% completado</p>
                </>
              )}
              <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid var(--b1)"}}>
                <div className="flex jb mb8">
                  <span style={{color:"var(--tx2)",fontSize:12}}>Aporte mensual</span>
                  <span className="mono" style={{color:"var(--gr)",fontSize:12}}>{COP(m.aporteMensual)}</span>
                </div>
                {m.meta&&mr&&mr>0&&(
                  <div className="flex jb mb10">
                    <span style={{color:"var(--tx2)",fontSize:12}}>Necesario/mes</span>
                    <span className="mono" style={{color:"var(--yl)",fontSize:12}}>{COP(Math.max(0,(m.meta-m.acumulado)/mr))}</span>
                  </div>
                )}
                {abonoId===m.id
                  ?<div className="flex gap6">
                    <input type="number" placeholder="Monto a abonar" value={abonoM} onChange={e=>setAbonoM(e.target.value)} autoFocus/>
                    <button className="btn-g btn-sm" onClick={()=>abonar(m.id)}>✓</button>
                    <button className="btn-s btn-sm" onClick={()=>setAbonoId(null)}>✕</button>
                  </div>
                  :<button className="btn-s btn-sm" onClick={()=>setAbonoId(m.id)}>+ Abonar</button>
                }
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Nueva meta financiera">
        <div className="flex fc gap10">
          <div><label>Nombre</label><input value={f.nombre} onChange={e=>setF(p=>({...p,nombre:e.target.value}))}/></div>
          <div><label>Emoji</label><input value={f.emoji} onChange={e=>setF(p=>({...p,emoji:e.target.value}))}/></div>
          <div><label>Monto objetivo (deja vacío si es recurrente)</label><input type="number" value={f.meta} onChange={e=>setF(p=>({...p,meta:e.target.value}))}/></div>
          <div><label>Acumulado inicial</label><input type="number" value={f.acumulado} onChange={e=>setF(p=>({...p,acumulado:e.target.value}))}/></div>
          <div><label>Aporte mensual sugerido</label><input type="number" value={f.aporteMensual} onChange={e=>setF(p=>({...p,aporteMensual:e.target.value}))}/></div>
          <div><label>Fecha meta (mes-año)</label><input type="month" value={f.fechaMeta} onChange={e=>setF(p=>({...p,fechaMeta:e.target.value}))}/></div>
          <button className="btn-p" onClick={agregar}>+ Crear meta</button>
        </div>
      </Modal>

      {/* Modal editar meta */}
      <Modal open={showEditM} onClose={()=>{setShowEditM(false);setEditMeta(null);}} title="Editar meta financiera">
        {editMeta&&(
          <div className="flex fc gap10">
            <div><label>Nombre</label><input value={editMeta.nombre} onChange={e=>setEditMeta(p=>({...p,nombre:e.target.value}))}/></div>
            <div><label>Emoji</label><input value={editMeta.emoji} onChange={e=>setEditMeta(p=>({...p,emoji:e.target.value}))}/></div>
            <div><label>Monto objetivo (vacío si es recurrente)</label><input type="number" value={editMeta.meta} onChange={e=>setEditMeta(p=>({...p,meta:e.target.value}))}/></div>
            <div><label>Acumulado actual</label><input type="number" value={editMeta.acumulado} onChange={e=>setEditMeta(p=>({...p,acumulado:e.target.value}))}/></div>
            <div><label>Aporte mensual sugerido</label><input type="number" value={editMeta.aporteMensual} onChange={e=>setEditMeta(p=>({...p,aporteMensual:e.target.value}))}/></div>
            <div><label>Fecha meta (mes-año)</label><input type="month" value={editMeta.fechaMeta||""} onChange={e=>setEditMeta(p=>({...p,fechaMeta:e.target.value}))}/></div>
            <div className="flex gap8">
              <button className="btn-p" style={{flex:1}} onClick={guardarEditarMeta}>Guardar cambios</button>
              <button className="btn-s" onClick={()=>{setShowEditM(false);setEditMeta(null);}}>Cancelar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NOTIFICACIONES
═══════════════════════════════════════════════════════════════════ */
function Notificaciones({app}) {
  const {notifCfg,setNotifCfg,notifLog,enviarNotif,deudas,profile,alertasProximas}=app;
  const [tab,setTab]=useState("config");

  const canales=[
    {id:"email",icon:"📧",label:"Email",desc:"SMTP / SendGrid",campos:["direccion"],placeholder:["tu@email.com"]},
    {id:"whatsapp",icon:"💬",label:"WhatsApp",desc:"Meta Cloud API / Twilio",campos:["numero"],placeholder:["+57300..."]},
    {id:"sms",icon:"📱",label:"SMS",desc:"Twilio SMS",campos:["numero"],placeholder:["+57300..."]},
    {id:"telegram",icon:"✈️",label:"Telegram",desc:"Bot API",campos:["chatId"],placeholder:["Chat ID"]},
  ];

  const testNotif=(canal)=>{
    const cfg=notifCfg[canal];
    if(!cfg.activo){ alert(`Canal ${canal} no está activo.`); return; }
    enviarNotif(`🔔 Prueba de notificación desde FinanzasCO (${new Date().toLocaleString("es-CO")})`,canal);
    alert(`Notificación de prueba enviada por ${canal} (revisa historial).`);
  };

  return (
    <div className="fade">
      <div className="flex jb ac2 mb24">
        <div>
          <h2 style={{fontSize:28,fontWeight:400}}>Notificaciones</h2>
          <p style={{color:"var(--tx2)",fontSize:12}}>Motor de alertas multi-canal</p>
        </div>
        {alertasProximas.length>0&&(
          <span style={{background:"var(--rd)",color:"#fff",borderRadius:99,padding:"4px 12px",fontSize:12,fontWeight:600}}>{alertasProximas.length} alertas próximas</span>
        )}
      </div>

      <Tabs tabs={[{id:"config",label:"Configuración"},{id:"proximas",label:`Próximas (${alertasProximas.length})`},{id:"historial",label:`Historial (${notifLog.length})`}]} active={tab} onChange={setTab}/>
      <div style={{marginTop:16}}>

        {tab==="config"&&(
          <div className="flex fc gap16">
            {/* Canales */}
            <div className="grid2">
              {canales.map(c=>{
                const cfg=notifCfg[c.id]||{activo:false};
                return (
                  <Card key={c.id} style={{borderLeft:`3px solid ${cfg.activo?"var(--gr)":"var(--b2)"}`}}>
                    <div className="flex jb ac2 mb12">
                      <div className="flex ac2 gap8">
                        <span style={{fontSize:22}}>{c.icon}</span>
                        <div>
                          <p style={{fontWeight:600,fontSize:13}}>{c.label}</p>
                          <p style={{color:"var(--tx3)",fontSize:11}}>{c.desc}</p>
                        </div>
                      </div>
                      <div className="flex ac2 gap8">
                        <span style={{fontSize:11,color:cfg.activo?"var(--gr)":"var(--tx3)"}}>{cfg.activo?"Activo":"Inactivo"}</span>
                        <button onClick={()=>setNotifCfg(p=>({...p,[c.id]:{...p[c.id],activo:!cfg.activo}}))} className={cfg.activo?"btn-d btn-sm":"btn-g btn-sm"}>{cfg.activo?"Desactivar":"Activar"}</button>
                      </div>
                    </div>
                    {c.campos.map((campo,i)=>(
                      <div key={campo} style={{marginBottom:8}}>
                        <label style={{textTransform:"capitalize"}}>{campo}</label>
                        <input value={cfg[campo]||""} onChange={e=>setNotifCfg(p=>({...p,[c.id]:{...p[c.id],[campo]:e.target.value}}))} placeholder={c.placeholder[i]}/>
                      </div>
                    ))}
                    <button className="btn-s btn-sm" style={{marginTop:4}} onClick={()=>testNotif(c.id)}>📤 Enviar prueba</button>
                  </Card>
                );
              })}
            </div>

            {/* Parámetros globales */}
            <Card>
              <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Parámetros globales de notificación</p>
              <div className="grid4">
                <div>
                  <label>Anticipación (días)</label>
                  <select value={notifCfg.diasAnticipacion} onChange={e=>setNotifCfg(p=>({...p,diasAnticipacion:parseInt(e.target.value)}))}>
                    {[1,2,3,5,7,10,15].map(d=><option key={d} value={d}>{d} día{d>1?"s":""}</option>)}
                  </select>
                </div>
                <div>
                  <label>Hora de envío</label>
                  <input type="time" value={notifCfg.hora} onChange={e=>setNotifCfg(p=>({...p,hora:e.target.value}))}/>
                </div>
                <div>
                  <label>Frecuencia</label>
                  <select value={notifCfg.frecuencia} onChange={e=>setNotifCfg(p=>({...p,frecuencia:e.target.value}))}>
                    <option value="una_vez">Una sola vez</option>
                    <option value="diario">Diario hasta pago</option>
                    <option value="cada3">Cada 3 días</option>
                    <option value="semanal">Semanal</option>
                  </select>
                </div>
                <div>
                  <label>Zona horaria</label>
                  <select value={notifCfg.zona} onChange={e=>setNotifCfg(p=>({...p,zona:e.target.value}))}>
                    <option value="America/Bogota">America/Bogota (COT)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Info arquitectura */}
            <Card style={{borderColor:"var(--b2)"}}>
              <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:12}}>Arquitectura de integración</p>
              <div className="grid2">
                {[
                  {i:"📧",t:"Email (MVP)", d:"SMTP directo o SendGrid API. Requiere: SENDGRID_API_KEY, FROM_EMAIL. Implementado con stub mock en esta demo."},
                  {i:"💬",t:"WhatsApp (stub)", d:"Meta WhatsApp Cloud API o Twilio. Requiere: WABA_TOKEN, PHONE_ID. Stub listo — activar con credenciales reales."},
                  {i:"📱",t:"SMS (stub)", d:"Twilio SMS API. Requiere: TWILIO_SID, TWILIO_AUTH, FROM_NUMBER. Stub listo."},
                  {i:"✈️",t:"Telegram (stub)", d:"Bot API de Telegram. Requiere: BOT_TOKEN, CHAT_ID. Stub listo — solo activar token."},
                ].map((x,i)=>(
                  <CardInner key={i}>
                    <p style={{fontWeight:600,fontSize:12,marginBottom:4}}>{x.i} {x.t}</p>
                    <p style={{color:"var(--tx2)",fontSize:11,lineHeight:1.5}}>{x.d}</p>
                  </CardInner>
                ))}
              </div>
            </Card>
          </div>
        )}

        {tab==="proximas"&&(
          <div className="flex fc gap10">
            {alertasProximas.length===0
              ?<Card><p style={{color:"var(--tx3)",textAlign:"center",padding:24,fontSize:12}}>Sin pagos próximos en los próximos {notifCfg.diasAnticipacion} días.</p></Card>
              :alertasProximas.map((a,i)=>(
                <Card key={i} style={{borderLeft:"3px solid var(--yl)"}}>
                  <div className="flex jb ac2">
                    <div className="flex ac2 gap10">
                      <span style={{fontSize:24}}>{a.icono}</span>
                      <div>
                        <p style={{fontWeight:600,fontSize:13}}>{a.nombre}</p>
                        <p style={{color:"var(--tx2)",fontSize:11}}>{a.tipo==="deuda"?"Cuota de deuda":"Gasto fijo recurrente"} · {a.fecha}</p>
                      </div>
                    </div>
                    <div className="flex ac2 gap10">
                      <span className="mono" style={{color:"var(--yl)",fontSize:14}}>{COP(a.monto)}</span>
                      <button className="btn-s btn-sm" onClick={()=>enviarNotif(`⏰ Recordatorio: ${a.nombre} — ${COP(a.monto)} el ${a.fecha}`,"email")}>📤 Notificar</button>
                    </div>
                  </div>
                </Card>
              ))
            }
          </div>
        )}

        {tab==="historial"&&(
          <Card>
            <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Historial de notificaciones</p>
            {notifLog.length===0
              ?<p style={{color:"var(--tx3)",textAlign:"center",padding:24,fontSize:12}}>Sin notificaciones enviadas aún.</p>
              :notifLog.map(n=>(
                <div key={n.id} className="flex jb ac2" style={{padding:"9px 0",borderBottom:"1px solid var(--b1)"}}>
                  <div className="flex ac2 gap10">
                    <span style={{fontSize:16}}>{n.canal==="email"?"📧":n.canal==="whatsapp"?"💬":n.canal==="sms"?"📱":"✈️"}</span>
                    <div>
                      <p style={{fontSize:12}}>{n.mensaje}</p>
                      <p style={{fontSize:10,color:"var(--tx3)"}}>{new Date(n.fecha).toLocaleString("es-CO")} · {n.canal}</p>
                    </div>
                  </div>
                  <span style={{fontSize:11,color:n.estado==="enviado"?"var(--gr)":"var(--rd)",fontWeight:600}}>{n.estado==="enviado"?"✓ Enviado":"✗ Fallido"}</span>
                </div>
              ))
            }
          </Card>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   REPORTES
═══════════════════════════════════════════════════════════════════ */
function Reportes({app}) {
  const {txns,profile,totalIngresos,totalFijos,totalVarBudget,flujoLibre,cuentas,deudas,metas}=app;

  const gastosXCat=useMemo(()=>{
    const m={};
    txns.filter(t=>t.tipo==="gasto").forEach(t=>{ m[t.categoria]=(m[t.categoria]||0)+t.monto; });
    return Object.entries(m).sort((a,b)=>b[1]-a[1]);
  },[txns]);

  const gastosXTipo=useMemo(()=>{
    const fijo=txns.filter(t=>t.tipo==="gasto"&&t.tipoGasto==="fijo").reduce((s,t)=>s+t.monto,0);
    const variable=txns.filter(t=>t.tipo==="gasto"&&t.tipoGasto==="variable").reduce((s,t)=>s+t.monto,0);
    return {fijo,variable};
  },[txns]);

  const totalGastado=gastosXCat.reduce((s,[,v])=>s+v,0);
  const totalIngresado=txns.filter(t=>t.tipo==="ingreso").reduce((s,t)=>s+t.monto,0);
  const totalDeudas=deudas.reduce((s,d)=>s+d.saldo,0);

  const exportCSV=()=>{
    const rows=[["Fecha","Tipo","Tipo Gasto","Descripción","Categoría","Monto"],...txns.map(t=>[t.fecha,t.tipo,t.tipoGasto||"",t.descripcion,t.categoria,t.monto])];
    const csv=rows.map(r=>r.map(v=>`"${v}"`).join(",")).join("\n");
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download=`finanzas-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <div className="fade">
      <div className="flex jb ac2 mb24">
        <div><h2 style={{fontSize:28,fontWeight:400}}>Reportes</h2><p style={{color:"var(--tx2)",fontSize:12}}>Análisis financiero completo</p></div>
        <button className="btn-s" onClick={exportCSV}>⬇ Exportar CSV</button>
      </div>

      <div className="grid4 mb16">
        {[
          {l:"Total ingresado",v:COP(totalIngresado),c:"var(--gr)"},
          {l:"Total gastado",v:COP(totalGastado),c:"var(--rd)"},
          {l:"Total deudas",v:COP(totalDeudas),c:"var(--or)"},
          {l:"Txns registradas",v:txns.length,c:"var(--ac)"},
        ].map((x,i)=>(
          <CardInner key={i} style={{textAlign:"center"}}>
            <p style={{color:"var(--tx3)",fontSize:10,marginBottom:6}}>{x.l}</p>
            <p className="mono" style={{fontSize:17,fontWeight:600,color:x.c}}>{x.v}</p>
          </CardInner>
        ))}
      </div>

      <div className="grid2 mb16">
        <Card>
          <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Gastos por categoría</p>
          {gastosXCat.length===0
            ?<p style={{color:"var(--tx3)",fontSize:12}}>Sin datos.</p>
            :gastosXCat.map(([cat,val])=>(
              <div key={cat} style={{marginBottom:10}}>
                <div className="flex jb ac2" style={{marginBottom:3}}>
                  <span style={{fontSize:12}}>{cat}</span>
                  <span className="mono" style={{fontSize:11,color:"var(--tx2)"}}>{COP(val)} · {PCT(val,totalGastado)}%</span>
                </div>
                <Bar val={val} max={totalGastado} color="var(--ac2)"/>
              </div>
            ))
          }
        </Card>
        <div className="flex fc gap14">
          <Card>
            <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Fijo vs Variable</p>
            <div className="flex jb mb8">
              <span style={{fontSize:12}}>Gastos fijos</span>
              <span className="mono" style={{color:"var(--yl)",fontSize:12}}>{COP(gastosXTipo.fijo)} ({PCT(gastosXTipo.fijo,gastosXTipo.fijo+gastosXTipo.variable)}%)</span>
            </div>
            <Bar val={gastosXTipo.fijo} max={gastosXTipo.fijo+gastosXTipo.variable} color="var(--yl)" h={8}/>
            <div className="flex jb mt8 mb8" style={{marginTop:10}}>
              <span style={{fontSize:12}}>Gastos variables</span>
              <span className="mono" style={{color:"var(--ac)",fontSize:12}}>{COP(gastosXTipo.variable)} ({PCT(gastosXTipo.variable,gastosXTipo.fijo+gastosXTipo.variable)}%)</span>
            </div>
            <Bar val={gastosXTipo.variable} max={gastosXTipo.fijo+gastosXTipo.variable} color="var(--ac)" h={8}/>
          </Card>
          <Card>
            <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Resumen anual estimado</p>
            {[
              {l:"Ingresos/año",v:COP(totalIngresos*12),c:"var(--gr)"},
              {l:"Gastos fijos/año",v:COP(totalFijos*12),c:"var(--rd)"},
              {l:"Presupuesto variables/año",v:COP(totalVarBudget*12),c:"var(--yl)"},
              {l:"Flujo libre/año",v:COP(flujoLibre*12),c:flujoLibre>0?"var(--gr)":"var(--rd)"},
              {l:"Prima/bono",v:COP(profile.ingresos.bonos),c:"var(--ac)"},
            ].map((r,i)=>(
              <div key={i} className="flex jb" style={{padding:"7px 0",borderBottom:"1px solid var(--b1)"}}>
                <span style={{color:"var(--tx2)",fontSize:12}}>{r.l}</span>
                <span className="mono" style={{color:r.c,fontSize:12}}>{r.v}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Tabla completa */}
      <Card>
        <p style={{fontFamily:"Instrument Serif",fontSize:17,marginBottom:14}}>Todas las transacciones ({txns.length})</p>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead style={{position:"sticky",top:0,background:"var(--s1)"}}>
              <tr>{["Fecha","Tipo","T. Gasto","Descripción","Categoría","Monto"].map(h=>(
                <th key={h} style={{padding:"7px 10px",textAlign:"left",color:"var(--tx2)",fontWeight:600,borderBottom:"1px solid var(--b1)"}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {txns.map((t,i)=>(
                <tr key={t.id} style={{borderBottom:"1px solid var(--b1)",background:i%2?"var(--s2)":"transparent"}}>
                  <td style={{padding:"6px 10px",color:"var(--tx2)"}}>{t.fecha}</td>
                  <td style={{padding:"6px 10px"}}><span className={`tag tag-${t.tipo}`} style={{fontSize:9}}>{t.tipo}</span></td>
                  <td style={{padding:"6px 10px"}}>{t.tipo==="gasto"&&<span className={`tag tag-${t.tipoGasto||"variable"}`} style={{fontSize:9}}>{t.tipoGasto||"variable"}</span>}</td>
                  <td style={{padding:"6px 10px",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.descripcion}</td>
                  <td style={{padding:"6px 10px",color:"var(--tx2)"}}>{t.categoria}</td>
                  <td className="mono" style={{padding:"6px 10px",color:t.tipo==="ingreso"?"var(--gr)":"var(--rd)"}}>{t.tipo==="ingreso"?"+":"-"}{COP(t.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {txns.length===0&&<p style={{color:"var(--tx3)",textAlign:"center",padding:28,fontSize:12}}>Sin transacciones registradas.</p>}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const app = useApp();
  const [page,setPage] = useState("dashboard");

  const pages = {
    dashboard:      <Dashboard app={app}/>,
    transacciones:  <Transacciones app={app}/>,
    presupuesto:    <Presupuesto app={app}/>,
    cuentas:        <Cuentas app={app}/>,
    deudas:         <Deudas app={app}/>,
    metas:          <Metas app={app}/>,
    notificaciones: <Notificaciones app={app}/>,
    reportes:       <Reportes app={app}/>,
  };

  return (
    <>
      <style>{G}</style>
      {!app.authed
        ? <AuthScreen login={app.login} register={app.register}/>
        : <Layout page={page} setPage={setPage} user={app.user} logout={app.logout} alertasProximas={app.alertasProximas}>
            {pages[page]}
          </Layout>
      }
    </>
  );
}
