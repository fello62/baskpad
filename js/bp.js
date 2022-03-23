const
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

var adb={
 camp:[],
 soc:[],
 sq:[],
 gioc:[],
 sqgioc:[],
 campsq:[],
 prt:[],
 prt2:[],
 dati:[]
};
var adf={
 camp:{codcamp:0, annosport:1, nomecamp:2, girone:3, fase:4, tempi:5, durata:6, suppl:7, maxfalli:8,
  tipo:['n','s','s','s','s','n','n','n','n']},
 soc:{codsoc:0, societa:1,
  tipo:['n','s']},
 sq:{codsq:0, codsoc:1, annosport:2, nomesq:3, cat:4, sesso:5,
  tipo:['n','n','s','s','s','s']},
 gioc:{codgioc:0, cognome:1, nome:2, anno:3, altezza:4, ruolo:5,
  tipo:['n','s','s','s','s','s']},
 sqgioc:{codsqgioc:0, codsq:1, codgioc:2, nmaglia:3,
  tipo:['n','n','n','s']},
 campsq:{codcampsq:0, codcamp:1, codsq:2,
  tipo:['n','n','n']},
 prt:{codprt:0, codcamp:1, codsqa:2, codsqb:3, dataora:4, luogo:5, giornata:6, ngara:7,
  tipo:['n','n','n','n','s','s','n','n']},
 prt2:{codprt:0, referto:1, nomesqa:2, nomesqb:3, coacha:4, coachb:5, ris:6, parz:7, arbitri:8, rilevatori:9, note:10,
  tipo:['n','s','s','s','s','s','s','s','s','s','s']},
 dati:{coddati:0, codprt:1, codgioc:2, codsq:3, nmaglia:4, prt:5, dq:6, st:7, min:8, sec:9, ff:10, fs:11, ts1:12, ts0:13, tf1:14, tf0:15, t31:16, t30:17, tl1:18, tl0:19, ro:20, rd:21, sd:22, ss:23, pp:24, pr:25, ass:26, sc:27, pm:28, stl1:29, stl6:30, seqtl:31, tiri:32,
  tipo:['n','n','n','n','s','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','s','s']}
}

var scrivendo=false,leggendo=false;
loaddb();

function loaddb(){
 leggendo=true;
 localforage.getItem('adb').then(function(v){
  leggendo=false;
  if (v===null){
   savedb();
   return;
  }
  adb=v;
 });
}

function savedb(){
 scrivendo=true;
 localforage.setItem('adb',adb).then(function(){
  scrivendo=false;
 });
}

function newrec(tabella){
 var id,i;
 var lung=adb[tabella].length;
 if (lung==0)
  id=0;
 else
  id=adb[tabella][lung-1][0];
 id++;
 adb[tabella][lung]=new Array(adf[tabella].tipo.length);
 adb[tabella][lung][0]=id;
 for(i=1;i<adb[tabella][lung].length;i++)
  adb[tabella][lung][i]=((adf[tabella].tipo[i]=='s')?'':0);
 if (tabella=='prt'){
  adb.prt2[lung]=new Array(adf.prt2.tipo.length);
  adb.prt2[lung][0]=id;
  for(i=1;i<adb.prt2[lung].length;i++)
   adb.prt2[lung][i]=((adf.prt2.tipo[i]=='s')?'':0);
 }
 return id;
}

function deleterec(tabella,funzione,parametro){
 var i,id;
 for(i=adb[tabella].length-1;i>=0;i--)
  if (funzione(i,parametro)){
   switch(tabella){
    case 'camp':
     id=adb.camp[i][0];
     deleterec('campsq',function(x,y){
      return (adb.campsq[x][adf.campsq.codcamp]==y);
     },id);
     deleterec('prt',function(x,y){
      return (adb.prt[x][adf.prt.codcamp]==y);
     },id);
     break;
    case 'gioc':
     id=adb.gioc[i][0];
     deleterec('sqgioc',function(x,y){
      return (adb.sqgioc[x][adf.sqgioc.codgioc]==y);
     },id);
     deleterec('dati',function(x,y){
      return (adb.dati[x][adf.dati.codgioc]==y);
     },id);
     break;
    case 'prt':
     id=adb.prt[i][0];
     deleterec('prt2',function(x,y){
      return (adb.prt2[x][adf.prt2.codprt]==y);
     },id);
     deleterec('dati',function(x,y){
      return (adb.dati[x][adf.dati.codprt]==y);
     },id);
     break;
    case 'soc':
     id=adb.soc[i][0];
     deleterec('sq',function(x,y){
      return (adb.sq[x][adf.sq.codsoc]==y);
     },id);
     break;
    case 'sq':
     id=adb.sq[i][0];
     deleterec('campsq',function(x,y){
      return (adb.campsq[x][adf.campsq.codsq]==y);
     },id);
     deleterec('sqgioc',function(x,y){
      return (adb.sqgioc[x][adf.sqgioc.codsq]==y);
     },id);
     deleterec('prt',function(x,y){
      return ((adb.prt[x][adf.prt.codsqa]==y)||(adb.prt[x][adf.prt.codsqb]==y));
     },id);
     break;
    default:
   }
   adb[tabella].splice(i,1);
  }
}

function updaterec(tabella,codice,record){
 var i,j,k,t,v,indice;
 indice=findrec(tabella,codice);
 k=Object.keys(record);
 for(i=0;i<k.length;i++){
  j=adf[tabella][k[i]];
  v=record[k[i]];
  if (v!==null){
   t=adf[tabella].tipo[j];
   switch(t){
    case 'n':
     v=Number(v);
     break;
    case 's':
     v=String(v);
     break;
    default:
   }
  }
  adb[tabella][indice][j]=v;
 }
}

function findrec(tabella,cod){
 var primo,ultimo,medio,v;
 ultimo=adb[tabella].length-1;
 primo=0;
 while(primo<=ultimo){
  medio=Math.floor((primo+ultimo)/2);
  v=adb[tabella][medio][0];
  if (v>cod)
   ultimo=medio-1;
  else if (v<cod)
   primo=medio+1;
  else
   return medio;
 }
 return -1
}

function htmlentities(str){
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function quotedstr(str){
 return "'"+String(str).replace(/'/g, "''")+"'";
}

function trim(stringToTrim){
 return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function ltrim(stringToTrim){
 return stringToTrim.replace(/^\s+/,"");
}

function rtrim(stringToTrim){
 return stringToTrim.replace(/\s+$/,"");
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

function vai(pagina){
 if (scrivendo){
  setTimeout(function(){vai(pagina);},100);
  return;
 }
 location.href=pagina;
}