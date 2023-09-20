const
 nomeDB='bp.db',
 classmappa='class="mappa"',
 maxgioc=30,
 sq=maxgioc+1,
 tot=maxgioc+2,
 vcprt=0,
 vconc=vcprt+1,
 vcdq=vcprt+2,
 vcst=vcprt+3,
 vcmin=vcprt+4,
 vcsec=vcprt+5,
 vcff=vcprt+6,
 vcfs=vcprt+7,
 vcts1=vcprt+8,
 vcts0=vcprt+9,
 vctf1=vcprt+10,
 vctf0=vcprt+11,
 vct31=vcprt+12,
 vct30=vcprt+13,
 vctl1=vcprt+14,
 vctl0=vcprt+15,
 vcro=vcprt+16,
 vcrd=vcprt+17,
 vcsd=vcprt+18,
 vcss=vcprt+19,
 vcpp=vcprt+20,
 vcpr=vcprt+21,
 vcas=vcprt+22,
 vcsc1=vcprt+23,
 vcpm=vcprt+24,
 vcstl1=vcprt+25,
 vcstl6=vcprt+26,
 voci=vcstl6,
 vcpri=vcprt+24,
 vcap=vcprt+25,
 vcrft=vcprt+26,
 vcffp=vcprt+27,
 vcfsp=vcprt+28,
 vcffa=vcprt+29,
 vcfsa=vcprt+30,
 vctlm=vcprt+31,
 vctx1=vcprt+32,
 vctx0=vcprt+33,
 vcty1=vcprt+34,
 vcty0=vcprt+35,
 dcpunti=1,
 dcbonus=dcpunti+1,
 dcff=dcpunti+2,
 dcfs=dcpunti+3,
 dcrd=dcpunti+4,
 dcrdavv=dcpunti+5,
 dcsd=dcpunti+6,
 dcss=dcpunti+7,
 dcpp=dcpunti+8,
 dcpr=dcpunti+9,
 dcposs=dcpunti+10,
 dcmp=dcposs;

const adf={
 nomi:['camp','soc','sq','gioc','sqgioc','campsq','prt','prt2','dati'],
 camp:{codcamp:0,annosport:1,nomecamp:2,girone:3,fase:4,tempi:5,durata:6,suppl:7,maxfalli:8,
  tipo:['n','s','s','s','s','n','n','n','n'],
  nomi:['codcamp','annosport','nomecamp','girone','fase','tempi','durata','suppl','maxfalli'],
  cambiaval:function(ar,r,v){
   if (r.codcamp!=v){
    ar.camp[r.codcamp]=v;
    r.codcamp=v;
   }
  }},
 soc:{codsoc:0,societa:1,
  tipo:['n','s'],
  nomi:['codsoc','societa'],
  cambiaval:function(ar,r,v){
   if (r.codsoc!=v){
    ar.soc[r.codsoc]=v;
    r.codsoc=v;
   }
  }},
 sq:{codsq:0,codsoc:1,annosport:2,nomesq:3,cat:4,sesso:5,
  tipo:['n','n','s','s','s','s'],
  nomi:['codsq','codsoc','annosport','nomesq','cat','sesso'],
  cambiaval:function(ar,r,v){
   if (r.codsq!=v){
    ar.sq[r.codsq]=v;
    r.codsq=v;
   }
   if (ar.soc[r.codsoc]) r.codsoc=ar.soc[r.codsoc];
  }},
 gioc:{codgioc:0,cognome:1,nome:2,anno:3,altezza:4,ruolo:5,
  tipo:['n','s','s','s','s','s'],
  nomi:['codgioc','cognome','nome','anno','altezza','ruolo'],
  cambiaval:function(ar,r,v){
   if (r.codgioc!=v){
    ar.gioc[r.codgioc]=v;
    r.codgioc=v;
   }
  }},
 sqgioc:{codsqgioc:0,codsq:1,codgioc:2,nmaglia:3,
  tipo:['n','n','n','s'],
  nomi:['codsqgioc','codsq','codgioc','nmaglia'],
  cambiaval:function(ar,r,v){
   r.codsqgioc=v;
   if (ar.sq[r.codsq]) r.codsq=ar.sq[r.codsq];
   if (ar.gioc[r.codgioc]) r.codgioc=ar.gioc[r.codgioc];
  }},
 campsq:{codcampsq:0,codcamp:1,codsq:2,
  tipo:['n','n','n'],
  nomi:['codcampsq','codcamp','codsq'],
  cambiaval:function(ar,r,v){
   r.codcampsq=v;
   if (ar.camp[r.codcamp]) r.codcamp=ar.camp[r.codcamp];
   if (ar.sq[r.codsq]) r.codsq=ar.sq[r.codsq];
  }},
 prt:{codprt:0,codcamp:1,codsqa:2,codsqb:3,dataora:4,luogo:5,giornata:6,ngara:7,
  tipo:['n','n','n','n','s','s','n','n'],
  nomi:['codprt','codcamp','codsqa','codsqb','dataora','luogo','giornata','ngara'],
  cambiaval:function(ar,r,v){
   if (r.codprt!=v){
    ar.prt[r.codprt]=v;
    r.codprt=v;
   }
   if (ar.camp[r.codcamp]) r.codcamp=ar.camp[r.codcamp];
   if (ar.sq[r.codsqa]) r.codsqa=ar.sq[r.codsqa];
   if (ar.sq[r.codsqb]) r.codsqb=ar.sq[r.codsqb];
  }},
 prt2:{codprt:0,referto:1,nomesqa:2,nomesqb:3,coacha:4,coachb:5,ris:6,parz:7,arbitri:8,rilevatori:9,note:10,
  tipo:['n','s','s','s','s','s','s','s','s','s','s'],
  nomi:['codprt','referto','nomesqa','nomesqb','coacha','coachb','ris','parz','arbitri','rilevatori','note'],
  cambiaval:function(ar,r,v){
   var j,m,n,p,q,ref,x;
   if (ar.prt[r.codprt]) v=ar.prt[r.codprt];
   r.codprt=v;
   ref=r.referto;
   if (ref.length>0){
    p=ref.indexOf('codprt=')+7;
    q=ref.indexOf('\n',p);
    ref=ref.substr(0,p)+v+ref.substr(q);
    p=ref.indexOf('codcamp=')+8;
    q=ref.indexOf('\n',p);
    x=parseInt(ref.substring(p,q),10);
    if (ar.camp[x]) ref=ref.substr(0,p)+ar.camp[x]+ref.substr(q);
    p=ref.indexOf('codsqa=')+7;
    q=ref.indexOf('\n',p);
    x=parseInt(ref.substring(p,q),10);
    if(ar.sq[x]) ref=ref.substr(0,p)+ar.sq[x]+ref.substr(q);
    p=ref.indexOf('codsqb=')+7;
    q=ref.indexOf('\n',p);
    x=parseInt(ref.substring(p,q),10);
    if(ar.sq[x]) ref=ref.substr(0,p)+ar.sq[x]+ref.substr(q);
    p=ref.indexOf('<num>\n')+6;
    q=ref.indexOf('\n</num>\n');
    if (q>p){
     m=ref.substring(p,q).split('\n');
     for(j=0;j<m.length;j++){
      n=m[j].split(',');
      x=parseInt(n[1],10);
      if (ar.gioc[x]){
       n[1]=ar.gioc[x];
       m[j]=n.join(',');
      }
     }
     ref=ref.substr(0,p)+m.join('\n')+ref.substr(q);
    }
    r.referto=ref
   }
  }},
 dati:{coddati:0,codprt:1,codgioc:2,codsq:3,nmaglia:4,prt:5,dq:6,st:7,min:8,sec:9,ff:10,fs:11,ts1:12,ts0:13,tf1:14,tf0:15,t31:16,t30:17,tl1:18,tl0:19,ro:20,rd:21,sd:22,ss:23,pp:24,pr:25,ass:26,sc:27,pm:28,stl1:29,stl6:30,seqtl:31,tiri:32,
  tipo:['n','n','n','n','s','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','s','s'],
  nomi:['coddati','codprt','codgioc','codsq','nmaglia','prt','dq','st','min','sec','ff','fs','ts1','ts0','tf1','tf0','t31','t30','tl1','tl0','ro','rd','sd','ss','pp','pr','ass','sc','pm','stl1','stl6','seqtl','tiri'],
  cambiaval:function(ar,r,v){
   r.coddati=v;
   if (ar.prt[r.codprt]) r.codprt=ar.prt[r.codprt];
   if (ar.sq[r.codsq]) r.codsq=ar.sq[r.codsq];
   if ((ar.gioc[r.codgioc])&&(r.codgioc>0)) r.codgioc=ar.gioc[r.codgioc];
  }}
}

const sqlInit='CREATE TABLE IF NOT EXISTS camp (codcamp integer primary key, annosport varchar, nomecamp varchar, girone varchar, fase varchar, tempi integer, durata integer, suppl integer, maxfalli integer);\n'+
 'CREATE TABLE IF NOT EXISTS soc (codsoc integer primary key, societa varchar);\n'+
 'CREATE TABLE IF NOT EXISTS sq (codsq integer primary key, codsoc integer, annosport varchar, nomesq varchar, cat varchar, sesso varchar);\n'+
 'CREATE TABLE IF NOT EXISTS gioc (codgioc integer primary key, cognome varchar, nome varchar, anno integer, altezza integer, ruolo varchar);\n'+
 'CREATE TABLE IF NOT EXISTS sqgioc (codsqgioc integer primary key, codsq integer, codgioc integer, nmaglia varchar);\n'+
 'CREATE TABLE IF NOT EXISTS campsq (codcampsq integer primary key, codcamp integer, codsq integer);\n'+
 'CREATE TABLE IF NOT EXISTS prt (codprt integer primary key, codcamp integer, codsqa integer, codsqb integer, dataora varchar, luogo varchar, giornata word, ngara integer);\n'+
 'CREATE TABLE IF NOT EXISTS prt2 (codprt integer primary key, referto text, nomesqa varchar, nomesqb varchar, coacha varchar, coachb varchar, ris varchar, parz varchar, arbitri varchar, rilevatori varchar, note text);\n'+
 'CREATE TABLE IF NOT EXISTS dati (coddati integer primary key, codprt integer, codgioc integer, codsq integer, nmaglia varchar, prt integer, dq integer, st integer, min integer, sec integer, ff integer, fs integer, ts1 integer, ts0 integer, tf1 integer, tf0 integer, t31 integer, t30 integer, tl1 integer, tl0 integer, ro integer, rd integer, sd integer, ss integer, pp integer, pr integer, ass integer, sc integer, pm integer, stl1 integer, stl6 integer, seqtl varchar, tiri varchar);\n'+
 'CREATE TRIGGER IF NOT EXISTS camp_campsq_prt before delete on camp for each row begin delete from campsq where campsq.codcamp = old.codcamp; delete from prt where prt.codcamp = old.codcamp; end;\n'+
 'CREATE TRIGGER IF NOT EXISTS soc_sq before delete on soc for each row begin delete from sq where sq.codsoc = old.codsoc; end;\n'+
 'CREATE TRIGGER IF NOT EXISTS sq_sqgioc_prt before delete on sq for each row begin delete from campsq where campsq.codsq = old.codsq; delete from sqgioc where sqgioc.codsq = old.codsq; delete from prt where prt.codsqa = old.codsq or prt.codsqb = old.codsq; end;\n'+
 'CREATE TRIGGER IF NOT EXISTS prt_prt2_dati before delete on prt for each row begin delete from prt2 where prt2.codprt = old.codprt; delete from dati where dati.codprt = old.codprt; end;\n'+
 'CREATE TRIGGER IF NOT EXISTS gioc_sqgioc_dati before delete on gioc for each row begin delete from sqgioc where sqgioc.codgioc = old.codgioc; delete from dati where dati.codgioc = old.codgioc; end;\n';

var adb,bpStatus,dbready=false,fdb,openReq;

$(function(){
 DBInit();
});

function DBInit(){
 try{
  if (localStorage.getItem('bpstatus')===null){
   bpStatus=0;
  } else {
   bpStatus=parseInt(localStorage.bpstatus,10);
  }
 }catch(e){
  alert('Errore LS '+e);
 }
 switch (bpStatus&28){//installa db
  case 4://IndexedDb
   fdb=new IndexedDbFn();
   break;
  case 8://ArrayDb
   fdb=new ArrayDbFn();
   break;
  case 16://WebSqlDb
   fdb=new WebSqlDbFn();
   break;
  default:
 }
 if (fdb) fdb.iniziaDB(function(){
  alert('Archivio installato!');
 });
}

function newRec(tab,id){//crea un record vergine
 var k,r,t;
 k=adf[tab].nomi;
 t=adf[tab].tipo;
 r=k.reduce(function(obj,elem,index){
  obj[elem]=(index==0)?id:((t[index]=='s')?'':0);
  return obj;
 },{});
 return r;
}

function ArrayDbFn(){
 //inizio gestione DB
 this.deleteDB=function(callback){
  dbready=false;
  adb=null;
  localStorage.removeItem('adb');
  eseguiCB(callback);
 };

 this.iniziaDB=function(callback){
  var k;
  dbready=false;
  k=adf.nomi;
  adb=k.reduce(function(obj,elem,index){
   obj[elem]=[];
   return obj;
  },{});
  if (!localStorage.adb){
   savedb();
   dbready=true;
   eseguiCB(callback);
  } else {
   loaddb();
   dbready=true;
  }
 };

 function loaddb(){
  adb=JSON.parse(localStorage.adb);
 }

 function savedb(){
  localStorage.adb=JSON.stringify(adb);
 }

 this.esportaDB=function(ta,callback){//passare come argomento la textarea che riceverà i dati
  var i,j,k,r,s,t,tab;
  dbready=false;
  s='BEGIN TRANSACTION;\n';
  s+=sqlInit;
  ta.value=s;
  for(j=0;j<adf.nomi.length;j++){
   tab=adf.nomi[j];
   if (adb[tab].length>0){
    t=adf[tab].tipo;
    s='delete from "'+tab+'";\n';
    for(i=0;i<adb[tab].length;i++){
     r=adb[tab][i];
     s+=t.reduce(function(str,elem,index){
      str+=((index>0)?',':'')+((elem=='s')?quotedstr(r[index]):r[index]);
      return str;
     },'INSERT INTO "'+tab+'" VALUES (');
     s+=');\n';
    }
    ta.value+=s;
   }
  }
  ta.value+='COMMIT;\n';
  dbready=true;
  eseguiCB(callback);
 };

 this.importaDB=function(ta,callback){//passare come argomento la textarea da cui prendere i dati
  var ar,i,j,linee,t,tab,s;
  dbready=false;
  linee=ta.value.split(';\n');
  ta.value='';
  ar=[];
  for(i=0;i<linee.length;i++){
   t=trim(linee[i]);
   if (t.substr(0,6).toUpperCase()=='INSERT') ar.push(t);
  }
  linee=[];
  tab='';
  for(i=0;i<ar.length;i++){
   t=ar[i].split(' ');
   t[2]=t[2].replace(/['"]+/g,'');
   if (tab!=t[2]) {
    tab=t[2];
    linee.push('delete from '+tab);
   }
   linee.push(t.join(' '));
  }
  for(i=0;i<linee.length;i++){
   t=linee[i].split(' ');
   tab=t[2];
   if (t[0].toUpperCase()=='INSERT'){
    ar=[];
    s=trim(linee[i].slice(linee[i].indexOf('(')+1,linee[i].lastIndexOf(')')))+',';
    while(s.length>0){
     if (s.charAt(0)=="'"){
      j=1;
      while(j=s.indexOf("'",j)){
       if (s.charAt(j+1)!="'") break;
       else j+=2;
      }
      ar.push(s.slice(1,j).replace(/''/g,"'"));
      s=ltrim(s.substr(s.indexOf(',',j)+1));
     } else {
      j=s.indexOf(',');
      ar.push(1*(rtrim(s.substr(0,j))));
      s=ltrim(s.substr(j+1));
     }
    }
    adb[tab].push(ar);
   } else if (t[0].toUpperCase()=='DELETE') adb[tab]=[];
  }
  savedb();
  dbready=true;
  eseguiCB(callback,linee.join(';\n')+';\n');
 };

 this.reindexDB=function(callback){
  var ar,i,k,t,tab,v;
  dbready=false;
  ar={
   camp:[],
   soc:[],
   sq:[],
   gioc:[],
   prt:[]
  };
  for(t=0;t<adf.nomi.length;t++){
   tab=adf.nomi[t];
   k=adf[tab].nomi;
   for(i=0;i<adb[tab].length;i++){
    v=i+1;
    r=k.reduce(function(obj,elem,index){
     obj[elem]=adb[tab][i][index];
     return obj;
    },{});
    adf[tab].cambiaval(ar,r,v);
    r=k.map(function(elem){
     return r[elem];
    });
    adb[tab][i]=r;
   }
  }
  savedb();
  dbready=true;
  eseguiCB(callback);
 };
 //fine gestione DB

 //inizio gestione record
 this.deleteRec=function(tab,funzione,parametro,callback){
  var i,id,r;
  dbready=false;
  deleteRec2(tab,funzione,parametro);
  savedb();
  dbready=true;
  eseguiCB(callback);

  function deleteRec2(tab,funzione,parametro){
   for(i=adb[tab].length-1;i>=0;i--){
    r=adf[tab].nomi.reduce(function(obj,elem,index){
     obj[elem]=adb[tab][i][index];
     return obj;
    },{});
    if (funzione(r,parametro)){
     switch(tab){
      case 'camp':
       id=adb.camp[i][0];
       deleteRec2('campsq',function(x,y){
        return (x.codcamp==y);
       },id);
       deleteRec2('prt',function(x,y){
        return (x.codcamp==y);
       },id);
       break;
      case 'gioc':
       id=adb.gioc[i][0];
       deleteRec2('sqgioc',function(x,y){
        return (x.codgioc==y);
       },id);
       deleteRec2('dati',function(x,y){
        return (x.codgioc==y);
       },id);
       break;
      case 'prt':
       id=adb.prt[i][0];
       deleteRec2('prt2',function(x,y){
        return (x.codprt==y);
       },id);
       deleteRec2('dati',function(x,y){
        return (x.codprt==y);
       },id);
       break;
      case 'soc':
       id=adb.soc[i][0];
       deleteRec2('sq',function(x,y){
        return (x.codsoc==y);
       },id);
       break;
      case 'sq':
       id=adb.sq[i][0];
       deleteRec2('campsq',function(x,y){
        return (x.codsq==y);
       },id);
       deleteRec2('sqgioc',function(x,y){
        return (x.codsq==y);
       },id);
       deleteRec2('prt',function(x,y){
        return ((x.codsqa==y)||(x.codsqb==y));
       },id);
       break;
      default:
     }
     adb[tab].splice(i,1);
    }
   }
  }
 };

 this.idNewRec=function(tab,callback){//ritorna l'id di un nuovo record
  var id,lung;
  dbready=false;
  lung=adb[tab].length;
  if (lung==0) id=0;
  else id=adb[tab][lung-1][0];
  id++;
  dbready=true;
  eseguiCB(callback,id);
 };

 function findrec(tab,cod){
  var medio,primo,ultimo,v;
  ultimo=adb[tab].length-1;
  if (ultimo-cod>=0) ultimo=cod-1;
  primo=0;
  while(primo<=ultimo){
   medio=Math.floor((primo+ultimo)/2);
   v=adb[tab][medio][0];
   if (v>cod) ultimo=medio-1;
   else if (v<cod) primo=medio+1;
   else return medio;
  }
  return -1
 }

 this.updateRec=function(tab,record,callback){//aggiorna un record
  var indice,k,r,t;
  dbready=false;
  k=adf[tab].nomi;
  t=adf[tab].tipo;
  indice=findrec(tab,record[k[0]]);
  if (indice<0){//crea nuovo record
   indice=-1+adb[tab].push([]);
  }
  r=k.map(function(elem,index){
   return (t[index]=='s')?''+record[elem]:1*record[elem];
  });
  adb[tab][indice]=r;
  if (callback){
   savedb();
   dbready=true;
   eseguiCB(callback);
  }
 };
 // fine gestione record

 // inizio routine gestione
 this.tabAs=function(tab,callback){//ritorna gli anni sportivi di una tabella, solo camp e sq che hanno l'indice
  var i,mappa=[];
  dbready=false;
  for(i=adb[tab].length-1;i>=0;i--) if (mappa.indexOf(adb[tab][i][adf[tab].annosport])<0) mappa.push(adb[tab][i][adf[tab].annosport]);
  mappa.sort(function(a,b){
   return ((a==b)?0:((a<b)?1:-1));
  });
  dbready=true;
  eseguiCB(callback,mappa);
 };

 this.tabGet=function(tab,id,callback){//ritorna un record specifico di una tabella
  var k,indice,r;
  dbready=false;
  k=adf[tab].nomi;
  indice=findrec(tab,id);
  r=k.reduce(function(obj,elem,index){
   obj[elem]=adb[tab][indice][index];
   return obj;
  },{});
  dbready=true;
  eseguiCB(callback,r);
 };

 this.tabPut=function(tab,mappa,callback){//salva array di record in una tabella
  var i,o,tx;
  dbready=false;
  for(i=0;i<mappa.length;i++) this.updateRec(tab,mappa[i]);
  savedb();
  dbready=true;
  eseguiCB(callback);
 };

 this.tabRec=function(tab,callback){//ritorna tutti i record di una tabella
  var i,k,mappa=[],r;
  dbready=false;
  k=adf[tab].nomi;
  for(i=0;i<adb[tab].length;i++){
   r=k.reduce(function(obj,elem,index){
    obj[elem]=adb[tab][i][index];
    return obj;
   },{});
   mappa.push(r);
  }
  dbready=true;
  eseguiCB(callback,mappa);
 };

 this.tabRecAs=function(tab,ansp,callback){//ritorna i record in un anno sportivo di camp o sq
  var i,k,mappa=[],r;
  dbready=false;
  k=adf[tab].nomi;
  for(i=0;i<adb[tab].length;i++){
   if (adb[tab][i][adf[tab].annosport]==ansp){
    r=k.reduce(function(obj,elem,index){
     obj[elem]=adb[tab][i][index];
     return obj;
    },{});
    mappa.push(r);
   }
  }
  dbready=true;
  eseguiCB(callback,mappa);
 };

 this.tabRecFilter=function(tab,filtro,param,callback){//ritorna i dati di una tabella dopo filtro(record,paramfiltro,datiritornati)
  var i,k,mappa=[],r;
  dbready=false;
  for(i=0;i<adb[tab].length;i++){
   r=k.reduce(function(obj,elem,index){
    obj[elem]=adb[tab][i][index];
    return obj;
   },{});
   filtro(r,param,mappa);
  }
  dbready=true;
  eseguiCB(callback,mappa);
 };
 // fine routine gestione
}

function IndexedDbFn(){
 //inizio gestione DB
 this.deleteDB=function(callback){
  dbready=false;
  openReq=indexedDB.deleteDatabase(nomeDB);
  openReq.onsuccess=function(){
   eseguiCB(callback);
  };
 };

 this.iniziaDB=function(callback){
  dbready=false;
  openReq=indexedDB.open(nomeDB,1);
  openReq.onblocked=function(event){
   alert('Upgrade necessario.\nChiudere tutte le altre pagine aperte sul sito!');
  };
  openReq.onupgradeneeded=function(event){
   var i,o,tx;
   adb=event.target.result;
   tx=event.target.transaction;
   tx.oncomplete=function(){
    dbready=true;
    eseguiCB(callback);
   };
   for(i=0;i<adf.nomi.length;i++)
    if (!adb.objectStoreNames.contains(adf.nomi[i])){
     o=adb.createObjectStore(adf.nomi[i],{keyPath:adf[adf.nomi[i]].nomi[0]});
     if (adf[adf.nomi[i]].nomi.indexOf('annosport')>=0) o.createIndex('annosport','annosport');
    }
   if (!adb.objectStoreNames.contains('tmp')){
    adb.createObjectStore('tmp',{keyPath:'id'});
   }
  };
  openReq.onerror=function(event){
    alert('Errore '+openReq.error);
  };
  openReq.onsuccess=function(event){
   adb=event.target.result;
   dbready=true;
   adb.onversionchange=function(event){
    dbready=false;
    adb.close();//senza questo il dbreset non funziona
   }
  };
 };

 this.esportaDB=function(ta,callback){//passare come argomento la textarea che riceverà i dati
  var cursor,k,r,s,t,tab,tx;
  s='BEGIN TRANSACTION;\n';
  s+=sqlInit;
  ta.value=s;
  dbready=false;
  esportaDBcb(0);

  function esportaDBcb(idx){
   tab=adf.nomi[idx];
   s='';
   k=adf[tab].nomi;
   t=adf[tab].tipo;
   tx=adb.transaction([tab]);
   tx.objectStore(tab).openCursor().onsuccess=function(event){
    cursor=event.target.result;
    if (cursor){
     r=cursor.value;
     if (s.length==0) s='delete from "'+tab+'";\n';
     s+=k.reduce(function(str,elem,index){
      str+=((index>0)?',':'')+((t[index]=='s')?quotedstr(r[elem]):r[elem]);
      return str;
     },'INSERT INTO "'+tab+'" VALUES (');
     s+=');\n';
     cursor.continue();
    } else {
     ta.value+=s;
     idx++;
     if (idx<adf.nomi.length) esportaDBcb(idx);
     else {
      ta.value+='COMMIT;\n';
      dbready=true;
      eseguiCB(callback);
     }
    }
   };
  }
 };

 this.importaDB=function(ta,callback){//passare come argomento la textarea da cui prendere i dati
  var ar,i,j,k,linee,o,pa,s,t,tab,tx;
  linee=ta.value.split(';\n');
  ta.value='';
  ar=[];
  for(i=0;i<linee.length;i++){
   t=trim(linee[i]);
   if (t.substr(0,6).toUpperCase()=='INSERT') ar.push(t);
  }
  linee=[];
  tab='';
  for(i=0;i<ar.length;i++){
   t=ar[i].split(' ');
   t[2]=t[2].replace(/['"]+/g,'');
   if (tab!=t[2]) {
    tab=t[2];
    linee.push('delete from '+tab);
   }
   linee.push(t.join(' '));
  }
  dbready=false;
  tx=adb.transaction(adf.nomi,'readwrite');
  tx.oncomplete=function(){
   dbready=true;
   eseguiCB(callback,linee.join(';\n')+';\n');
  };
  tab='';
  for(i=0;i<linee.length;i++){
   t=linee[i].split(' ');
   if (tab!=t[2]){
    tab=t[2];
    k=adf[tab].nomi;
    o=tx.objectStore(tab);
   }
   if (t[0].toUpperCase()=='INSERT'){
    ar={};
    pa=0;
    s=trim(linee[i].slice(linee[i].indexOf('(')+1,linee[i].lastIndexOf(')')))+',';
    while(s.length>0){
     if (s.charAt(0)=="'"){
      j=1;
      while(j=s.indexOf("'",j)){
       if (s.charAt(j+1)!="'") break;
       else j+=2;
      }
      ar[k[pa]]=s.slice(1,j).replace(/''/g,"'");
      s=ltrim(s.substr(s.indexOf(',',j)+1));
     } else {
      j=s.indexOf(',');
      ar[k[pa]]=1*(rtrim(s.substr(0,j)));
      s=ltrim(s.substr(j+1));
     }
     pa++;
    }
    o.put(ar);
   } else if (t[0].toUpperCase()=='DELETE') o.clear();
  }
 };

 this.reindexDB=function(callback){
  var ar,cursor,idx,o,otmp,r,tab,tx,v;
  ar={
   camp:[],
   soc:[],
   sq:[],
   gioc:[],
   prt:[]
  };
  dbready=false;
  idx=0;
  reindexcb();

  function reindexcb(){
   tab=adf.nomi[idx];
   tx=adb.transaction([tab,'tmp'],'readwrite');
   tx.oncomplete=function(){
    idx++;
    if (idx<adf.nomi.length) reindexcb();
    else {
     dbready=true;
     eseguiCB(callback);
    }
   };
   otmp=tx.objectStore('tmp');
   otmp.clear();
   o=tx.objectStore(tab);
   v=0;
   o.openCursor().onsuccess=function(event){
    cursor=event.target.result;
    if (cursor){
     v++;
     r=cursor.value;
     adf[tab].cambiaval(ar,r,v);
     otmp.put({'id':v,'va':r});
     cursor.continue();
    } else {
     o.clear();
     otmp.openCursor().onsuccess=function(event){
      cursor=event.target.result;
      if (cursor){
       r=cursor.value;
       o.put(r.va);
       cursor.continue();
      } else if (idx==adf.nomi.length-1) otmp.clear();
     };
    }
   };
  }
 };
 //fine gestione DB

 //inizio gestione record
 this.deleteRec=function(tab,funzione,parametro,callback){
  var tx;
  dbready=false;
  tx=adb.transaction(adf.nomi,'readwrite');
  tx.oncomplete=function(){
   dbready=true;
   eseguiCB(callback);
  }
  deleterec2(tab,funzione,parametro);

  function deleterec2(tab,f,p){
   var cursor,id=[],o,v;
   o=tx.objectStore(tab);
   o.openCursor().onsuccess=function(event){
    cursor=event.target.result;
    if (cursor){
     if (f(cursor.value,p)){
      id.push(cursor.key);
      cursor.delete();
     }
     cursor.continue();
    } else if (id.length>0){
     switch(tab){
      case 'camp':
       deleterec2('campsq',function(x,y){
        return (y.indexOf(x.codcamp)>=0);
       },id);
       deleterec2('prt',function(x,y){
        return (y.indexOf(x.codcamp)>=0);
       },id);
       break;
      case 'gioc':
       deleterec2('sqgioc',function(x,y){
        return (y.indexOf(x.codgioc)>=0);
       },id);
       deleterec2('dati',function(x,y){
        return (y.indexOf(x.codgioc)>=0);
       },id);
       break;
      case 'prt':
       deleterec2('prt2',function(x,y){
        return (y.indexOf(x.codprt)>=0);
       },id);
       deleterec2('dati',function(x,y){
        return (y.indexOf(x.codprt)>=0);
       },id);
       break;
      case 'soc':
       deleterec2('sq',function(x,y){
        return (y.indexOf(x.codsoc)>=0);
       },id);
       break;
      case 'sq':
       deleterec2('campsq',function(x,y){
        return (y.indexOf(x.codsq)>=0);
       },id);
       deleterec2('sqgioc',function(x,y){
        return (y.indexOf(x.codsq)>=0);
       },id);
       deleterec2('prt',function(x,y){
        return ((y.indexOf(x.codsqa)>=0)||(y.indexOf(x.codsqb)>=0));
       },id);
       break;
      default:
     }
    }
   };
  }
 };

 this.idNewRec=function(tab,callback){//ritorna l'id di un nuovo record
  var cursor,id,tx;
  dbready=false;
  tx=adb.transaction([tab]);
  tx.objectStore(tab).openKeyCursor(null,'prev').onsuccess=function(event){
   cursor=event.target.result;
   if (cursor) id=cursor.key;
   else id=0;
   id++;
   dbready=true;
   eseguiCB(callback,id);
  };
 };

 this.updateRec=function(tab,record,callback){//aggiorna un record
  var k,r,t,tx;
  k=adf[tab].nomi;
  t=adf[tab].tipo;
  r=k.reduce(function(obj,elem,index){
   obj[elem]=(t[index]=='s')?''+record[elem]:1*record[elem];
   return obj;
  },{});
  dbready=false;
  tx=adb.transaction(tab,'readwrite');
  tx.oncomplete=function(){
   dbready=true;
   eseguiCB(callback);
  };
  tx.objectStore(tab).put(r);
 };
 // fine gestione record

 // inizio routine gestione
 this.tabAs=function(tab,callback){//ritorna gli anni sportivi di una tabella, solo camp e sq che hanno l'indice
  var cursor,mappa=[],o,tx;
  dbready=false;
  tx=adb.transaction([tab]);
  o=tx.objectStore(tab).index('annosport').openKeyCursor(null,'prevunique');
  o.onerror=function(event){//per evitare l'errore IOS 'Unable to open cursor' su ricerca unique in tabelle vuote
   dbready=true;
   eseguiCB(callback,mappa);
  };
  o.onsuccess=function(event){
   cursor=event.target.result;
   if (cursor){
    mappa.push(cursor.key);
    cursor.continue();
   } else {
    dbready=true;
    eseguiCB(callback,mappa);
   }
  };
 };

 this.tabGet=function(tab,id,callback){//ritorna un record specifico di una tabella
  var r,tx;
  dbready=false;
  tx=adb.transaction([tab]);
  tx.objectStore(tab).get(1*id).onsuccess=function(event){
   r=event.target.result;
   dbready=true;
   eseguiCB(callback,r);
  };
 };

 this.tabPut=function(tab,mappa,callback){//salva array di record in una tabella
  var i,k,o,r,t,tx;
  dbready=false;
  k=adf[tab].nomi;
  t=adf[tab].tipo;
  tx=adb.transaction([tab],'readwrite');
  tx.oncomplete=function(){
   dbready=true;
   eseguiCB(callback);
  }
  o=tx.objectStore(tab);
  for(i=0;i<mappa.length;i++){
   r=k.reduce(function(obj,elem,index){
    obj[elem]=(t[index]=='s')?''+mappa[i][elem]:1*mappa[i][elem];
    return obj;
   },{});
   o.put(r);
  }
 };

 this.tabRec=function(tab,callback){//ritorna tutti i record di una tabella
  var mappa=[],tx;
  dbready=false;
  tx=adb.transaction([tab]);
  tx.objectStore(tab).getAll().onsuccess=function(event){
   dbready=true;
   mappa=event.target.result;
   eseguiCB(callback,mappa);
  };
 };

 this.tabRecAs=function(tab,ansp,callback){//ritorna i record in un anno sportivo di camp o sq
  var mappa=[],tx;
  if (ansp.length==0){
   eseguiCB(callback,mappa);
   return;
  }
  dbready=false;
  tx=adb.transaction([tab]);
  tx.objectStore(tab).index('annosport').getAll(IDBKeyRange.only(ansp)).onsuccess=function(event){
   dbready=true;
   mappa=event.target.result;
   eseguiCB(callback,mappa);
  };
 };

 this.tabRecFilter=function(tab,filtro,param,callback){//ritorna i dati di una tabella dopo filtro(record,paramfiltro,datiritornati)
  var cursor,mappa=[],r,tx;
  dbready=false;
  tx=adb.transaction([tab]);
  tx.objectStore(tab).openCursor().onsuccess=function(event){
   cursor=event.target.result;
   if (cursor){
    r=cursor.value;
    filtro(r,param,mappa);
    cursor.continue();
   } else {
    dbready=true;
    eseguiCB(callback,mappa);
   }
  };
 };
 // fine routine gestione
}

function WebSqlDbFn(){
 //inizio gestione DB
 this.deleteDB=function(callback){
  var i;
  dbready=false;
  adb.transaction(
   function(tx){
    bpStatus=((bpStatus|32)-32);
    localStorage.bpstatus=bpStatus;
    for(i=0;i<adf.nomi.length;i++) tx.executeSql('drop table '+adf.nomi[i]);
   },
   errorHandler,
   function(){
    eseguiCB(callback)
   }
  );
 };

 this.iniziaDB=function(callback){
  dbready=false;
  try{
   adb=openDatabase(nomeDB,'1.0','BaskPad database',10*1024*1024);//solo 10Mb perché 50 danno un bug su IOS10
   if ((bpStatus&32)==0) upgradeNeeded();
   else dbready=true;
  } catch (e) {
   alert('Errore WS '+e);
  }

  function upgradeNeeded(){
   var i,s;
   bpStatus=(bpStatus|32);
   localStorage.bpstatus=bpStatus;
   s=sqlInit.split(';\n');
   adb.transaction(
    function(tx){
     for(i=0;i<s.length-1;i++){
      tx.executeSql(s[i]);
     }
    },
    errorHandler,
    function(){
     dbready=true;
     eseguiCB(callback)
    }
   );
  }
 };

 this.esportaDB=function(ta,callback){//passare come argomento la textarea che riceverà i dati
  var i,idx,k,r,s,t,tab;
  dbready=false;
  s='BEGIN TRANSACTION;\n';
  s+=sqlInit;
  ta.value=s;
  idx=0;
  for(t=0;t<adf.nomi.length;t++) sqlDB('select * from '+adf.nomi[t]+' order by 1',[],esportaDBcb);

  function esportaDBcb(transaction,results){
   tab=adf.nomi[idx];
   s=(results.rows.length>0)?'delete from "'+tab+'";\n':'';
   k=adf[tab].nomi;
   t=adf[tab].tipo;
   for(i=0;i<results.rows.length;i++){
    r=results.rows.item(i);
    s+=k.reduce(function(str,elem,index){
     str+=((index>0)?',':'')+((t[index]=='s')?quotedstr(r[elem]):r[elem]);
     return str;
    },'INSERT INTO "'+tab+'" VALUES (');
    s+=');\n';
   }
   ta.value+=s;
   idx++;
   if (idx==adf.nomi.length){
    ta.value+='COMMIT;\n';
    dbready=true;
    eseguiCB(callback);
   }
  }
 };

 this.importaDB=function(ta,callback){//passare come argomento la textarea da cui prendere i dati
  var ar,i,linee,t,tab;
  dbready=false;
  linee=ta.value.split(';\n');
  ta.value='';
  ar=[];
  for(i=0;i<linee.length;i++){
   t=trim(linee[i]);
   if (t.substr(0,6).toUpperCase()=='INSERT') ar.push(t);
  }
  linee=[];
  tab='';
  for(i=0;i<ar.length;i++){
   t=ar[i].split(' ');
   t[2]=t[2].replace(/['"]+/g,'');
   if (tab!=t[2]) {
    tab=t[2];
    linee.push('delete from '+tab);
   }
   linee.push(t.join(' '));
  }
  adb.transaction(
   function(tx){
    for(i=0;i<linee.length;i++) tx.executeSql(linee[i]);
   },
   errorHandler,
   function(){
    dbready=true;
    eseguiCB(callback,linee.join(';\n')+';\n');
   }
  );
 };

 this.reindexDB=function(callback){
  var ar,idx=0;
  dbready=false;
  ar={
   camp:[],
   soc:[],
   sq:[],
   gioc:[],
   prt:[]
  };
  idx=0;
  adb.transaction(function(tx){
   tx.executeSql('CREATE TABLE IF NOT EXISTS tmp (id integer primary key, va text)',[],reindexcb);
  });

  function reindexcb(tx){
   tx.executeSql('select * from '+adf.nomi[idx]+' order by 1',[],reindexcb1);
  }

  function reindexcb1(tx,results){
   var i,k,r,s,t,tab,v;
   tab=adf.nomi[idx];
   k=adf[tab].nomi;
   t=adf[tab].tipo;
   if (results.rows.length>0) tx.executeSql('insert into tmp (va) values ('+quotedstr('delete from '+tab)+')');
   for(i=0;i<results.rows.length;i++){
    v=i+1;
    r=results.rows.item(i);//cloniamo, il risultato di item() non è modificabile
    r=k.reduce(function(obj,elem){
     obj[elem]=r[elem];
     return obj;
    },{});
    adf[tab].cambiaval(ar,r,v);
    s=k.reduce(function(str,elem,index){
     str+=((index>0)?',':'')+((t[index]=='s')?quotedstr(r[elem]):r[elem]);
     return str;
    },'insert into '+tab+' values (');
    s+=')';
    tx.executeSql('insert into tmp (va) values ('+quotedstr(s)+')');
   }
   idx++;
   if (idx<adf.nomi.length) reindexcb(tx);
   else tx.executeSql('select va from tmp order by id',[],reindexcb2);
  }

  function reindexcb2(tx,results){
   for(i=0;i<results.rows.length;i++){
    r=results.rows.item(i);
    tx.executeSql(r.va);
   }
   tx.executeSql('drop table tmp',[],function(tx){eseguiCB(callback);});
  }
 };

 function sqlDB(sql,dati,successo,errore){
  if (!successo) successo=nullDB;
  if (!errore) errore=errorHandler;
  adb.transaction(function(tx){
   tx.executeSql(sql,dati,successo,errore);
  });
 }

 function nullDB(tx,results){}

 function errorHandler(tx,error){
  alert('Errore: '+error.message+' (Codice '+error.code+')');
  return false;
 }
 //fine gestione DB

 //inizio gestione record
 this.deleteRec=function(tab,funzione,parametro,callback){
  var f,p,r,tx;
  dbready=false;
  f=funzione.toString();
  p=f.indexOf('x.');
  r=f.indexOf('==',p);
  f=f.substring(p+2,r);
  f='delete from '+tab+' where '+f+'='+parametro;
  sqlDB(
   f,
   [],
   function(){
    eseguiCB(callback);
   }
  );
 };

 this.idNewRec=function(tab,callback){//ritorna l'id di un nuovo record
  var c,id,r;
  dbready=false;
  c=adf[tab].nomi[0];
  sqlDB(
   'select '+c+' from '+tab+' order by 1 desc limit 1',
   [],
   function(tx,results){
    if (results.rows.length>0){
     r=results.rows.item(0);
     id=r[c];
    } else id=0;
    id++;
    dbready=true;
    eseguiCB(callback,id);
   }
  );
 };

 this.updateRec=function(tab,record,callback){//aggiorna un record
  var k,s,t;
  k=adf[tab].nomi;
  t=adf[tab].tipo;
  s=k.reduce(function(str,elem,index){
   str+=((index>0)?',':'')+((t[index]=='s')?quotedstr(record[elem]):record[elem]);
   return str;
  },'insert or replace into '+tab+' values (');
  s+=')';
  sqlDB(
   s,
   [],
   function(){
    dbready=true;
    eseguiCB(callback);
   }
  );
 };
 // fine gestione record

 // inizio routine gestione
 this.tabAs=function(tab,callback){//ritorna gli anni sportivi di una tabella, solo camp e sq che hanno l'annosport
  var i,mappa=[],r;
  dbready=false;
  sqlDB(
   'select distinct annosport from '+tab+' order by 1 desc',
   [],
   function(tx,results){
    for(i=0;i<results.rows.length;i++){
     r=results.rows.item(i);
     mappa.push(r.annosport);
    }
    dbready=true;
    eseguiCB(callback,mappa);
   }
  );
 };

 this.tabGet=function(tab,id,callback){//ritorna un record specifico di una tabella
  var r,tx;
  dbready=false;
  sqlDB(
   'select * from '+tab+' where '+adf[tab].nomi[0]+'=?',
   [id],
   function(tx,results){
    r=results.rows.item(0);
    dbready=true;
    eseguiCB(callback,r);
   }
  );
 };

 this.tabPut=function(tab,mappa,callback){//salva array di record in una tabella
  var i,k,linee=[],r,s,t;
  dbready=false;
  k=adf[tab].nomi;
  t=adf[tab].tipo;
  for(i=0;i<mappa.length;i++){
   r=mappa[i];
   s=k.reduce(function(str,elem,index){
    str+=((index>0)?',':'')+((t[index]=='s')?quotedstr(r[elem]):r[elem]);
    return str;
   },'insert or replace into '+tab+' values (');
   s+=')';
   linee.push(s);
  }
  adb.transaction(
   function(tx){
    for(i=0;i<linee.length;i++) tx.executeSql(linee[i]);
   },
   errorHandler,
   function(){
    dbready=true;
    eseguiCB(callback);
   }
  );
 };

 this.tabRec=function(tab,callback){//ritorna tutti i record di una tabella
  var mappa=[],tx;
  dbready=false;
  sqlDB(
   'select * from '+tab,
   [],
   function(tx,results){
    for(i=0;i<results.rows.length;i++){
     r=results.rows.item(i);
     mappa.push(r);
    }
    dbready=true;
    eseguiCB(callback,mappa);
   }
  );
 };

 this.tabRecAs=function(tab,ansp,callback){//ritorna i record in un anno sportivo di camp o sq
  var i,mappa=[],r;
  dbready=false;
  sqlDB(
   'select * from '+tab+' where annosport=?',
   [ansp],
   function(tx,results){
    for(i=0;i<results.rows.length;i++){
     r=results.rows.item(i);
     mappa.push(r);
    }
    dbready=true;
    eseguiCB(callback,mappa);
   }
  );
 };

 this.tabRecFilter=function(tab,filtro,param,callback){//ritorna i dati di una tabella dopo filtro(record,paramfiltro,datiritornati)
  var cursor,mappa=[],r,tx;
  dbready=false;
  sqlDB(
   'select * from '+tab,
   [],
   function(tx,results){
    for(i=0;i<results.rows.length;i++){
     r=results.rows.item(i);
     filtro(r,param,mappa);
    }
    dbready=true;
    eseguiCB(callback,mappa);
   }
  );
 };
 // fine routine gestione
}

function htmlentities(str){
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function quotedstr(str){
 return "'"+String(str).replace(/'/g, "''")+"'";
}

function disorizz(canvas,lungo,largo,sfondo){
 canvas.width=1;
 canvas.width=lungo;
 canvas.height=largo;
 if (canvas.getContext){
  var mlt=largo/15000;
  var dx=560*largo/300;
  var ctx=canvas.getContext("2d");
  var colore=(sfondo)?'white':'black';
  ctx.lineWidth=1;
  ctx.strokeStyle=colore;
  ctx.fillStyle=colore;
  //zone neutre tiri liberi
  ctx.fillRect(2675*mlt,4975*mlt,350*mlt,100*mlt);
  ctx.fillRect(2675*mlt,9925*mlt,350*mlt,100*mlt);
  ctx.fillRect(24975*mlt,4975*mlt,350*mlt,100*mlt);
  ctx.fillRect(24975*mlt,9925*mlt,350*mlt,100*mlt);
  //area
  ctx.beginPath();
  ctx.moveTo(0,5075*mlt);
  ctx.lineTo(5775*mlt,5075*mlt);
  ctx.lineTo(5775*mlt,9925*mlt);
  ctx.moveTo(0,9925*mlt);
  ctx.lineTo(5775*mlt,9925*mlt);
  ctx.moveTo(dx,5075*mlt);
  ctx.lineTo(22225*mlt,5075*mlt);
  ctx.lineTo(22225*mlt,9925*mlt);
  ctx.moveTo(dx,9925*mlt);
  ctx.lineTo(22225*mlt,9925*mlt);
  ctx.stroke();
  //lunetta
  ctx.beginPath();
  ctx.arc(5775*mlt,7500*mlt,1775*mlt,Math.PI/2,-Math.PI/2,true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(22225*mlt,7500*mlt,1775*mlt,Math.PI/2,-Math.PI/2,false);
  ctx.stroke();
  //tre punti
  ctx.beginPath();
  ctx.moveTo(0,925*mlt);
  ctx.lineTo(2990*mlt,925*mlt);
  ctx.moveTo(0,14075*mlt);
  ctx.lineTo(2990*mlt,14075*mlt);
  ctx.moveTo(dx,925*mlt);
  ctx.lineTo(25010*mlt,925*mlt);
  ctx.moveTo(dx,14075*mlt);
  ctx.lineTo(25010*mlt,14075*mlt);
  ctx.stroke();
  var ang=Math.asin((2990-1575)/(7500-925));
  ctx.beginPath();
  ctx.arc(1575*mlt,7500*mlt,6725*mlt,Math.PI/2-ang,-Math.PI/2+ang,true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(26425*mlt,7500*mlt,6725*mlt,Math.PI/2+ang,-Math.PI/2-ang,false);
  ctx.stroke();
  //canestri
  ctx.beginPath();
  ctx.arc(1575*mlt,7500*mlt,225*mlt,Math.PI,-Math.PI,false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(26425*mlt,7500*mlt,225*mlt,Math.PI,-Math.PI,false);
  ctx.stroke();
  //tabellone
  ctx.beginPath();
  ctx.moveTo(1175*mlt,6625*mlt);
  ctx.lineTo(1175*mlt,8375*mlt);
  ctx.moveTo(26825*mlt,6625*mlt);
  ctx.lineTo(26825*mlt,8375*mlt);
  ctx.stroke();
  //settori tiri liberi
  ctx.beginPath();
  ctx.moveTo(1775*mlt,5075*mlt);
  ctx.lineTo(1775*mlt,4975*mlt);
  ctx.moveTo(3925*mlt,5075*mlt);
  ctx.lineTo(3925*mlt,4975*mlt);
  ctx.moveTo(4825*mlt,5075*mlt);
  ctx.lineTo(4825*mlt,4975*mlt);
  ctx.moveTo(1775*mlt,9925*mlt);
  ctx.lineTo(1775*mlt,10025*mlt);
  ctx.moveTo(3925*mlt,9925*mlt);
  ctx.lineTo(3925*mlt,10025*mlt);
  ctx.moveTo(4825*mlt,9925*mlt);
  ctx.lineTo(4825*mlt,10025*mlt);
  ctx.moveTo(26225*mlt,5075*mlt);
  ctx.lineTo(26225*mlt,4975*mlt);
  ctx.moveTo(24075*mlt,5075*mlt);
  ctx.lineTo(24075*mlt,4975*mlt);
  ctx.moveTo(23175*mlt,5075*mlt);
  ctx.lineTo(23175*mlt,4975*mlt);
  ctx.moveTo(26225*mlt,9925*mlt);
  ctx.lineTo(26225*mlt,10025*mlt);
  ctx.moveTo(24075*mlt,9925*mlt);
  ctx.lineTo(24075*mlt,10025*mlt);
  ctx.moveTo(23175*mlt,9925*mlt);
  ctx.lineTo(23175*mlt,10025*mlt);
  ctx.stroke();
  //sfondamento
  ctx.beginPath();
  ctx.moveTo(1225*mlt,6225*mlt);
  ctx.lineTo(1575*mlt,6225*mlt);
  ctx.moveTo(1225*mlt,8775*mlt);
  ctx.lineTo(1575*mlt,8775*mlt);
  ctx.moveTo(26775*mlt,6225*mlt);
  ctx.lineTo(26425*mlt,6225*mlt);
  ctx.moveTo(26775*mlt,8775*mlt);
  ctx.lineTo(26425*mlt,8775*mlt);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1575*mlt,7500*mlt,1275*mlt,Math.PI/2,-Math.PI/2,true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(26425*mlt,7500*mlt,1275*mlt,Math.PI/2,-Math.PI/2,false);
  ctx.stroke();
  //meta' campo
  ctx.beginPath();
  ctx.moveTo(14000*mlt,0);
  ctx.lineTo(14000*mlt,15000*mlt);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(14000*mlt,7500*mlt,1775*mlt,Math.PI,-Math.PI,true);
  ctx.stroke();
 }
}

function disvert(canvas,lungo,largo,sfondo){
 canvas.width=1;
 canvas.width=largo;
 canvas.height=lungo;
 if (canvas.getContext){
  var mlt=largo/15000;
  var dx=560*largo/300;
  var ctx=canvas.getContext("2d");
  var colore=(sfondo)?'white':'black';
  ctx.lineWidth=1;
  ctx.strokeStyle=colore;
  ctx.fillStyle=colore;
  //zone neutre tiri liberi
  ctx.fillRect(4975*mlt,2675*mlt,100*mlt,350*mlt);
  ctx.fillRect(9925*mlt,2675*mlt,100*mlt,350*mlt);
  ctx.fillRect(4975*mlt,24975*mlt,100*mlt,350*mlt);
  ctx.fillRect(9925*mlt,24975*mlt,100*mlt,350*mlt);
  //area
  ctx.beginPath();
  ctx.moveTo(5075*mlt,0);
  ctx.lineTo(5075*mlt,5775*mlt);
  ctx.lineTo(9925*mlt,5775*mlt);
  ctx.moveTo(9925*mlt,0);
  ctx.lineTo(9925*mlt,5775*mlt);
  ctx.moveTo(5075*mlt,dx);
  ctx.lineTo(5075*mlt,22225*mlt);
  ctx.lineTo(9925*mlt,22225*mlt);
  ctx.moveTo(9925*mlt,dx);
  ctx.lineTo(9925*mlt,22225*mlt);
  ctx.stroke();
  //lunetta
  ctx.beginPath();
  ctx.arc(7500*mlt,5775*mlt,1775*mlt,0,Math.PI,false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(7500*mlt,22225*mlt,1775*mlt,0,Math.PI,true);
  ctx.stroke();
  //tre punti
  ctx.beginPath();
  ctx.moveTo(925*mlt,0);
  ctx.lineTo(925*mlt,2990*mlt);
  ctx.moveTo(14075*mlt,0);
  ctx.lineTo(14075*mlt,2990*mlt);
  ctx.moveTo(925*mlt,dx);
  ctx.lineTo(925*mlt,25010*mlt);
  ctx.moveTo(14075*mlt,dx);
  ctx.lineTo(14075*mlt,25010*mlt);
  ctx.stroke();
  var ang=Math.asin((2990-1575)/(7500-925));
  ctx.beginPath();
  ctx.arc(7500*mlt,1575*mlt,6725*mlt,0+ang,Math.PI-ang,false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(7500*mlt,26425*mlt,6725*mlt,0-ang,Math.PI+ang,true);
  ctx.stroke();
  //canestri
  ctx.beginPath();
  ctx.arc(7500*mlt,1575*mlt,225*mlt,Math.PI,-Math.PI,false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(7500*mlt,26425*mlt,225*mlt,Math.PI,-Math.PI,false);
  ctx.stroke();
  //tabellone
  ctx.beginPath();
  ctx.moveTo(6625*mlt,1175*mlt);
  ctx.lineTo(8375*mlt,1175*mlt);
  ctx.moveTo(6625*mlt,26825*mlt);
  ctx.lineTo(8375*mlt,26825*mlt);
  ctx.stroke();
  //settori tiri liberi
  ctx.beginPath();
  ctx.moveTo(5075*mlt,1775*mlt);
  ctx.lineTo(4975*mlt,1775*mlt);
  ctx.moveTo(5075*mlt,3925*mlt);
  ctx.lineTo(4975*mlt,3925*mlt);
  ctx.moveTo(5075*mlt,4825*mlt);
  ctx.lineTo(4975*mlt,4825*mlt);
  ctx.moveTo(9925*mlt,1775*mlt);
  ctx.lineTo(10025*mlt,1775*mlt);
  ctx.moveTo(9925*mlt,3925*mlt);
  ctx.lineTo(10025*mlt,3925*mlt);
  ctx.moveTo(9925*mlt,4825*mlt);
  ctx.lineTo(10025*mlt,4825*mlt);
  ctx.moveTo(5075*mlt,26225*mlt);
  ctx.lineTo(4975*mlt,26225*mlt);
  ctx.moveTo(5075*mlt,24075*mlt);
  ctx.lineTo(4975*mlt,24075*mlt);
  ctx.moveTo(5075*mlt,23175*mlt);
  ctx.lineTo(4975*mlt,23175*mlt);
  ctx.moveTo(9925*mlt,26225*mlt);
  ctx.lineTo(10025*mlt,26225*mlt);
  ctx.moveTo(9925*mlt,24075*mlt);
  ctx.lineTo(10025*mlt,24075*mlt);
  ctx.moveTo(9925*mlt,23175*mlt);
  ctx.lineTo(10025*mlt,23175*mlt);
  ctx.stroke();
  //sfondamento
  ctx.beginPath();
  ctx.moveTo(6225*mlt,1225*mlt);
  ctx.lineTo(6225*mlt,1575*mlt);
  ctx.moveTo(8775*mlt,1225*mlt);
  ctx.lineTo(8775*mlt,1575*mlt);
  ctx.moveTo(6225*mlt,26775*mlt);
  ctx.lineTo(6225*mlt,26425*mlt);
  ctx.moveTo(8775*mlt,26775*mlt);
  ctx.lineTo(8775*mlt,26425*mlt);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(7500*mlt,1575*mlt,1275*mlt,0,Math.PI,false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(7500*mlt,26425*mlt,1275*mlt,0,Math.PI,true);
  ctx.stroke();
  //meta' campo
  ctx.beginPath();
  ctx.moveTo(0,14000*mlt);
  ctx.lineTo(15000*mlt,14000*mlt);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(7500*mlt,14000*mlt,1775*mlt,Math.PI,-Math.PI,true);
  ctx.stroke();
 }
}

function distiri(canvas,tiri,squ){
 var col0,col1,ctx,fatto,mlt,posx,posy,pv,v,x,y;
 col1='lime';
 col0='red';
 if (typeof squ=='undefined') squ=0;
 if (canvas.getContext){
  mlt=canvas.width/15000;
  ctx=canvas.getContext("2d");
  ctx.lineWidth=1;
  while (tiri.length>0){
   v=tiri.indexOf(',');
   pv=tiri.indexOf(';');
   if ((pv>=0)&&(pv<v)) v=pv;
   if (v>0){
    posx=tiri.indexOf('X');
    posy=tiri.indexOf('Y');
    x=parseInt(tiri.substring(posx+1,posy),10)||0;
    y=parseInt(tiri.substring(posy+1,v),10)||0;
    if (squ==1){
     x=24850-x;
     y=-y;
    }
    fatto=(tiri.charAt(posx-1)=='1');
    if (fatto){
     ctx.strokeStyle=col1;
     ctx.fillStyle=col1;
    } else {
     ctx.strokeStyle=col0;
     ctx.fillStyle=col0;
    }
    ctx.beginPath();
    ctx.arc((7500+y)*mlt,(1575+x)*mlt,225*mlt,Math.PI,-Math.PI,true);
    if (fatto) ctx.fill();
    else ctx.stroke();
   }
   tiri=tiri.substr(v+1);
  }
 }
}

function aspettaDB(callback,param){
 if (!dbready){
  setTimeout(function(){aspettaDB(callback,param);},100);
  return;
 }
 eseguiCB(callback,param);
}

function eseguiCB(callback,param){
 if (callback){
  if (param) callback(param);
  else callback();
 }
}

function vai(pagina){
 if ((bpStatus&28)==0){
  alert('Impossibile navigare senza archivio installato!');
  return;
 }
 if (!dbready){
  setTimeout(function(){vai(pagina);},100);
  return;
 }
 location.href=pagina;
}