const
 classmappa='style="margin: 0; padding: 0; border: 1px solid #F0AD4E; float: left;"',
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

var adrec,attaccoidx,attaccorec,camprec,daticmp,datirec,difesaidx,difesarec,ent,numeri,periodi,prtrec,prt2rec,quintidx,quintrec,reflegg;
var cambioris,contropiede,contropiedecmb,diff,dq,incmp,info,possiniz,rimbalzooff,selgioc,selgiocidx,selsq,tempodigioco;

var sharing=false;
var oldtmp=0;
var oldtmpf=false;;

var paginastat=false;
var diretta=false;
var filestat=trovafile();
var intervallo,ta;

if (filestat){
 if (diretta){
  $('ul.pager').remove();
  intervallo=setInterval(function(){
   direttaget();
  },30000);
  direttaget();
 } else {
  resetdati(false);
  $.get(filestat,function(data){
   prt2rec.referto=data;
   caricaprtdaref();
   //rilegge il referto
   interprete(getrigheref(),64);
   //se qualcuno legge questo codice e scopre il trucchetto,complimenti a lui
   if ((prt2rec.referto.indexOf("'[NASCOSTA]")<0)||(String(window.location).indexOf('aiutofello')>0)){
    tabprep(true);
   } else {
    tabprep(false);
   }
  });
 }
}

function direttaget(){
 console.log('cerco');
 $.ajax({
  method:'POST',
  url:'/stat/diretta.php',
  data:{
   codprt:paginastat
  },
  success:function(data){
   resetdati(false);
   prt2rec.referto=data;
   caricaprtdaref();
   //rilegge il referto
   interprete(getrigheref(),64);
   tabprep(true);
  },
  error:function(){
   console.log('errore');
   clearInterval(intervallo);
   document.getElementById('stampa').innerHTML='<div class="alert alert-warning"><strong>Attenzione!</strong> Dati al momento non disponibili... riprovare in seguito.</div>';
  }
 });
}

function trovafile(){
 var p,s;
 s=new String(window.location);
 p=s.indexOf('diretta=');
 if (p>=0)
  diretta=true;
 else
  p=s.indexOf("pagina=");
 if (p>=0){
  paginastat=s.substr(p+7+(diretta?1:0));
  return '/stat/ref'+paginastat+'.txt';
 } else
  return false;
}

function stampabile(){
 window.open('/stat/stat.htm?pagina='+paginastat,'_self');
}

function tabprep(flag){
 var attiva,d,mapflag,u;
 if (String(window.location).indexOf('stat.htm')>=0){
  if (flag)
   document.getElementById('stampa').innerHTML=stpstatistiche();
  else
   document.getElementById('stampa').innerHTML=stptabtxt();
  return;
 }
 attiva=$('#stattabs li.active a').attr('href');
 mapflag=false;
 u='<ul id="stattabs" class="nav nav-tabs">\n';
 u+=' <li><a href="#tabtab" data-toggle="tab">Tabellino</a></li>\n';
 d='<div class="tab-content">\n';
 d+=' <div class="tab-pane" id="tabtab">\n';
 d+=stptabtxt();
 d+=' </div>\n';
 if (flag){
  u+=' <li><a href="#tabstat" data-toggle="tab">Statistiche</a></li>\n';
  d+=' <div class="tab-pane" id="tabstat">\n';
  d+=stpstatistiche();
  d+=' </div>\n';
  if ((datirec[0][tot].tiri.length>tempodigioco)||(datirec[1][tot].tiri.length>tempodigioco)){
   mapflag=true;
   u+=' <li><a href="#tabmap" data-toggle="tab">Mappa tiro</a></li>\n';
   d+=' <div class="tab-pane" id="tabmap">\n';
   d+=stpmappaint();
   d+=' </div>\n';
  }
  u+=' <li><a href="#tabref" data-toggle="tab">Referto</a></li>\n';
  d+=' <div class="tab-pane" id="tabref">\n';
  d+=stpreflegg(diretta);
  d+=' </div>\n';
 }
 u+='</ul>\n';
 d+='</div>\n';
 document.getElementById('stampa').innerHTML=u+d;
 if (attiva)
  $('#stattabs li a[href="'+attiva+'"]').tab('show');
 else if (diretta)
  $('#stattabs li a:last').tab('show');
 else
  $('#stattabs li a:first').tab('show');
 if (mapflag){
  var c,e,i;
  ridisegna();
  ridisegnaref();
  e=(document.mappa.elements['sq[]'])||new Array();
  for(i=0;i<e.length;i++) e[i].onclick=Function('setsqclick('+i+',this.checked);');
  e=(document.mappa.elements['tempo[]'])||new Array();
  for(i=0;i<e.length;i++) e[i].onclick=ridisegna;
  for(c=0;c<=1;c++){
   e=(document.mappa.elements['gioc'+(('ab').charAt(c))+'[]'])||new Array();
   for(i=0;i<e.length;i++) e[i].onclick=ridisegna;
  }
 }
}

function setsqclick(s,c){
 var g,gioc;
 gioc=(document.mappa.elements['gioc'+(('ab').charAt(s))+'[]'])||new Array();
 for(g=0;g<gioc.length;g++) gioc[g].checked=c;
 ridisegna();
}

function ridisegna(){
 var cvs,g,gioc,s,t,tmp;
 cvs=document.getElementById("disegno");
 tmp=(document.mappa.elements['tempo[]'])||new Array();
 disvert(cvs,560,300,true);
 for(s=0;s<=1;s++){
  gioc=(document.mappa.elements['gioc'+(('ab').charAt(s))+'[]'])||new Array();
  for(t=0;t<tmp.length;t++){
   if (tmp[t].checked){
    for(g=0;g<gioc.length;g++){
     if (gioc[g].checked){
      distiri(cvs,ta[s][g][t]+',',s);
     }
    }
   }
  }
 }
}

function ridisegnaref(){
 var cvs,g;
 cvs=document.getElementsByTagName('canvas');
 for(g=0;g<cvs.length;g++){
  if (cvs[g].dataset.tiro){
   disvert(cvs[g],cvs[g].height,cvs[g].width);
   distiri(cvs[g],cvs[g].dataset.tiro+",");
  }
 }
}

function caricanummag(){
 var altezza,anno,codgioc,cognome,i,nmaglia,nome,num,p,r,ruolo,s,x;
 p=prt2rec.referto.indexOf('<num>\n');
 r=prt2rec.referto.indexOf('</num>\n');
 if (p<0) return;
 x=[0,0];
 numeri=['',''];
 num=prt2rec.referto.substring(p,r).split('\n');
 for(i=1;i<num.length;i++){
  if (num[i].length==0) continue;
  p=num[i].indexOf(',');
  nmaglia=num[i].substring(0,p);
  s=nmaglia.charCodeAt(0)-65;
  x[s]++;
  r=num[i].indexOf(',',p+1);
  codgioc=parseInt(num[i].substring(p+1,r),10);
  p=num[i].indexOf(',',r+1);
  cognome=num[i].substring(r+1,p);
  r=num[i].indexOf(',',p+1);
  nome=num[i].substring(p+1,r);
  p=num[i].indexOf(',',r+1);
  anno=num[i].substring(r+1,p);
  r=num[i].indexOf(',',p+1);
  altezza=num[i].substring(p+1,r);
  ruolo=num[i].substring(r+1);
  datirec[s][x[s]].nmaglia=nmaglia.substr(1);
  numeri[s]+=(nmaglia+'  ').substr(0,4);
  datirec[s][x[s]].codgioc=codgioc;
  datirec[s][x[s]].cognome=cognome;
  datirec[s][x[s]].nome=nome;
  datirec[s][x[s]].anno=anno;
  datirec[s][x[s]].altezza=altezza;
  datirec[s][x[s]].ruolo=ruolo;
  datirec[s][x[s]].dati[vcprt]=1;
 }
 for(s=0;s<=1;s++){
  datirec[s][tot].dati[vcprt]=x[s];
  datirec[s][tot].codgioc=-1;
  datirec[s][tot].cognome='TOTALI';
  datirec[s][sq].dati[vcprt]=1;
  datirec[s][sq].codgioc=0;
  datirec[s][sq].cognome='Squadra';
  numeri[s]+=('AB'.charAt(s))+'SQ ';
  datirec[s][sq].nmaglia='SQ';
 }
}

function caricaprtdaref(){
 prtrec.codprt=cercarefdb('codprt');
 prtrec.codcamp=cercarefdb('codcamp');
 prtrec.codsq[0]=cercarefdb('codsqa');
 prtrec.codsq[1]=cercarefdb('codsqb');
 prtrec.dataora=cercarefdb('dataora');
 prtrec.luogo=cercarefdb('luogo');
 prtrec.giornata=cercarefdb('giornata');
 prtrec.ngara=cercarefdb('ngara');
 prtrec.sesso[0]=cercarefdb('sessoa');
 prtrec.sesso[1]=cercarefdb('sessob');
 camprec.annosport=cercarefdb('annosport');
 camprec.nomecamp=cercarefdb('nomecamp');
 camprec.girone=cercarefdb('girone');
 camprec.fase=cercarefdb('fase');
 camprec.tempi=cercarefdb('tempi');
 camprec.durata=cercarefdb('durata');
 camprec.suppl=cercarefdb('suppl');
 camprec.maxfalli=cercarefdb('maxfalli');
 prt2rec.nomesq[0]=cercarefdb('nomesqa');
 prt2rec.nomesq[1]=cercarefdb('nomesqb');
 prt2rec.nomecortosq[0]=cercarefdb('nomecortosqa');
 prt2rec.nomecortosq[1]=cercarefdb('nomecortosqb');
 prt2rec.coach[0]=cercarefdb('coacha');
 prt2rec.coach[1]=cercarefdb('coachb');
 prt2rec.arbitri=cercarefdb('arbitri');
 prt2rec.rilevatori=cercarefdb('rilevatori');
 prt2rec.note=cercarefdb('note');
 prt2rec.ris=cercarefdb('ris');
 prt2rec.parz=cercarefdb('parz');
 caricanummag();
}

function cercarefdb(voce){
 var p=prt2rec.referto.indexOf('</db>');
 var result='';
 if (p<0)
  return result;
 var d=prt2rec.referto.substr(0,p);
 voce='\n'+voce+'=';
 var v=voce.length;
 p=d.indexOf(voce);
 if (p>=0){
  var r=d.indexOf('\n',p+v);
  result=d.substr(p+v,r-p-v);
 }
 return result;
}

function getdiff(){
 var i,r,s,result;
 var u='f r s p ';
 if (incmp){
  incmp=false;
  return incampo();
 }
 if (cambioris){
  cambioris=false;
  result=daticmp[0][dcpunti]+'-'+daticmp[1][dcpunti];
 } else
  result='';
 i=dcff;
 while (i<dcpr){
  for(s=0;s<=1;s++){
   r=daticmp[s][i]-daticmp[1-s][i+1];
   if (r!=0){
    if (result.length>0)
     result+=' ';
    result+=r+u.charAt(i-dcff)+('ab'.charAt(s));
   }
  }
  i+=2;
 }
 r=Math.floor(Math.abs(daticmp[0][dcposs]-daticmp[1][dcposs])/2);
 if (r>=1){
  if (result.length>0)
   result+=' ';
  result+=r+'az';
 }
 if (contropiedecmb){
  contropiedecmb=false;
  if (result.length>0)
   result+=' ';
  if ((contropiede&1)!=0)
   result+='cp1';
  else
   result+='cp0';
 }
 return result;
}

function getgiocperref(s,g){
 if (g<sq)
  return '#'+datirec[s][g].nmaglia+' '+datirec[s][g].nome+' '+datirec[s][g].cognome;
 else
  return 'Squadra';
}

function getrigheref(){
 var r='</num>\n';
 r=prt2rec.referto.indexOf(r)+r.length;
 return prt2rec.referto.substring(r);
}

function gioccerca(s,t){
 var c,i;
 var result=0;
 if ((s==0)||(s==1)){
  c=numeri[s].indexOf((t+'   ').substr(0,3));
  if ((c%4)==1){
   result=Math.floor(c/4)+1;
  }
 } else {
  for(i=0;i<=1;i++){
   c=numeri[i].indexOf((t+'    ').substr(0,4));
   if ((c%4)==0){
    s=i;
    result=Math.floor(c/4)+1;
    break;
   }
  }
 }
 if ((result>0)&&(datirec[s][tot].dati[vcprt]<result)){
  result=sq;
 }
 return [s,result];
}

function incampo(){
 var result='In campo:',x,y;
 for(x=0;x<=1;x++)
  for(y=1;y<=maxgioc;y++)
   if (datirec[x][y].dati[vconc]==1)
    result+=' '+('AB'.charAt(x))+datirec[x][y].nmaglia;
 return result;
}

function incdato(s,g,d){
 datirec[s][g].dati[d]++;
 datirec[s][tot].dati[d]++;
}

function interprete(testo,intflag){
/*
stati intflag:
1 aggiorna diff e info
2 warning non in campo
4 aggiorna dati visuali
8 aggiorna il referto
16 gestione dq
32 gestione quintetti
64 referto leggibile
128 analisi difese
256 analisi attacchi
stati contropiede:
1 contropiede attivato
2 contropiede squadra A
4 contropiede squadra B
8 contropiede sospeso tl-
stati rimbalzooff:
1 rimbalzooff attivato
8 rimbalzooff sospeso tl-
stati mostra:
1 mostra dati comparativi
2 mostra gioc in campo
*/
 var mostra=0;
 var addreftab='';
 var result=[];
 var dif=[];
 var inf=[];
 var rl=[];
 var d,m,n,r,s,t,u,v,dato,giocidx,giocsel,qua,quc,riga,rinfo,sep,sint,sp,sqsel,tdc,tmp;
 var righe=testo.split('\n');
 if ((intflag&4)!=0){
  var righereftab=document.getElementById("reftab").rows.length;
 }
 if ((intflag&64)!=0){
  tmp='';
  for(n=0;n<=2;n++){
   rl[n]='';
  }
 }
 r=0;
 while (r<righe.length){
  riga=righe[r]+' ';
  if (trim(riga).length==0){
   r++;
   continue;
  }
  rinfo='';
  while (riga.length>0){
   sp=riga.indexOf(' ');
   qua=riga.indexOf('[');
   if ((qua>=0)&&(qua<sp)){
    quc=riga.indexOf(']',qua);
    sp=riga.indexOf(' ',quc);
    sep=qua;
   } else {
    sep=sp;
    qua=-1;
    quc=-1;
   }
   //imposta il testo da cercare
   tdc=trim(riga.substr(0,sep));
   //cerca un giocatore di entrambe le squadre
   sint=-1;
   s=-1;
   dato=gioccerca(s,tdc);
   s=dato[0];
   dato=dato[1];
   //se trova un giocatore
   if (dato>0){
    sint=0;
    //modifica giocsel sqsel giocidx
    sqsel=s;
    giocsel=dato;
    if (giocsel==sq){
     giocidx=datirec[sqsel][tot].dati[vcprt]+1;
    } else {
     giocidx=giocsel;
    }
    //aggiunge un warning se non era in campo
    if (((intflag&2)!=0)&&(giocsel<sq)&&(datirec[sqsel][giocsel].dati[vconc]==0)){
     t='ATT['+trim(numeri[sqsel].substr(giocidx*4-4,4))+': non in campo]';
     righe.splice(r+1,0,t);
    }
   }
   //dati stat
   if (sint==-1){
    v=('FF FS TS1TS0TF1TF0T31T30TL1TL0RO RD SD SS PP PR AS SC1PRIAP RFTFFPFSPFFAFSATL-').indexOf((tdc+'   ').substr(0,3));
    dato=Math.floor(v/3)+vcff;
    if ((v%3)==0){
     sint=0;
     switch (dato){

      case vcffp:
      case vcffa:
       if (giocsel<sq)
        daticmp[sqsel][dcbonus]++;
       incdato(sqsel,giocsel,vcff);
       rinfo=datirec[sqsel][giocsel].dati[vcff]+'ff';
       setdatocmp(sqsel,dcff);
       if (dato==vcffp){
        incdato(sqsel,giocsel,vcpp);
        rinfo+=' '+datirec[sqsel][giocsel].dati[vcpp]+'pp';
       } else adrec[sqsel].azp++;
       setdatocmp(sqsel,dcpp);
       setposs(sqsel,-1);
       if (((intflag&16)!=0)&&(giocsel<sq)&&(datirec[sqsel][giocsel].dati[vcff]>=camprec.maxfalli))
        dq=String.fromCharCode(65+sqsel)+datirec[sqsel][giocsel].nmaglia;
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[vcff]++;
        quintrec[quintidx[1-sqsel]].datiavv[vcff]++;
        if (dato==vcffp){
         quintrec[quintidx[sqsel]].datipro[vcpp]++;
         quintrec[quintidx[1-sqsel]].datiavv[vcpp]++;
        }
       }
       if ((intflag&128)!=0){
        difesarec[difesaidx[1-sqsel]].dati[vcff]++;
        if (dato==vcffp) difesarec[difesaidx[1-sqsel]].dati[vcpp]++;
       }
       if ((intflag&256)!=0){
        attaccorec[attaccoidx[sqsel]].dati[vcff]++;
        if (dato==vcffp) attaccorec[attaccoidx[sqsel]].dati[vcpp]++;
       }
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': fallo fatto ('+datirec[sqsel][giocsel].dati[vcff]+')';
        if (dato==vcffp){
         rl[sqsel]+=' con palla persa';
         if ((contropiede&1)!=0) rl[sqsel]+=' in contropiede';
        } else rl[sqsel]+=' con azione persa';
        refleggadd(rl);
       }
       if (((contropiede&1)!=0)&&(dato==vcffp)){//solo lo sfondamento ffp ferma il contropiede
        contropiede=0;
        contropiedecmb=true;
        adrec[sqsel].cpnum++;
        adrec[sqsel].cppp++;
       }
       if ((rimbalzooff&1)!=0) rimbalzooff=0;
       break;

      case vcff:
       if (giocsel<sq)
        daticmp[sqsel][dcbonus]++;
       incdato(sqsel,giocsel,vcff);
       rinfo=datirec[sqsel][giocsel].dati[vcff]+'ff';
       setdatocmp(sqsel,dcff);
       if (((intflag&16)!=0)&&(giocsel<sq)&&(datirec[sqsel][giocsel].dati[vcff]>=camprec.maxfalli))
        dq=String.fromCharCode(65+sqsel)+datirec[sqsel][giocsel].nmaglia;
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[vcff]++;
        quintrec[quintidx[1-sqsel]].datiavv[vcff]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[vcff]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[vcff]++;
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': fallo fatto ('+datirec[sqsel][giocsel].dati[vcff]+')';
        refleggadd(rl);
       }
       break;

      case vcfsp:
      case vcfsa:
       if (giocsel<sq){
        incdato(sqsel,giocsel,vcfs);
        rinfo=datirec[sqsel][giocsel].dati[vcfs]+'fs';
       } else adrec[sqsel].fssq++;
       setdatocmp(sqsel,dcfs);
       adrec[sqsel].azr++;
       setdatocmp(sqsel,dcpr);
       setposs(sqsel,1);
       if (giocsel<sq){
        if ((intflag&32)!=0){
         quintrec[quintidx[sqsel]].datipro[vcfs]++;
         quintrec[quintidx[1-sqsel]].datiavv[vcfs]++;
        }
        if ((intflag&128)!=0){
         difesarec[difesaidx[1-sqsel]].dati[vcfs]++;
        }
        if ((intflag&256)!=0){
         attaccorec[attaccoidx[sqsel]].dati[vcfs]++;
        }
        if ((intflag&64)!=0){
         rl[sqsel]=getgiocperref(sqsel,giocsel);
         rl[sqsel]+=': fallo subito';
         refleggadd(rl);
        }
       }
       break;

      case vcfs:
       if (giocsel<sq){
        incdato(sqsel,giocsel,vcfs);
        rinfo=datirec[sqsel][giocsel].dati[vcfs]+'fs';
       } else adrec[sqsel].fssq++;
       setdatocmp(sqsel,dcfs);
       if (giocsel<sq){
        if ((intflag&32)!=0){
         quintrec[quintidx[sqsel]].datipro[vcfs]++;
         quintrec[quintidx[1 - sqsel]].datiavv[vcfs]++;
        }
        if ((intflag&128)!=0)
         difesarec[difesaidx[1-sqsel]].dati[vcfs]++;
        if ((intflag&256)!=0)
         attaccorec[attaccoidx[sqsel]].dati[vcfs]++;
        if ((intflag&64)!=0){
         rl[sqsel]=getgiocperref(sqsel,giocsel);
         rl[sqsel]+=': fallo subito';
         refleggadd(rl);
        }
       }
       break;

      case vcro:
       rimbalzooff=1;
       //se il tiro sbagliato era in contropiede, lo riabilita
       m=(contropiede&6);
       if (m!=0){
        if (Math.floor((m-2)/2)==sqsel){
         contropiede=1;
         contropiedecmb=true;
         adrec[sqsel].cpnum--;
        } else
         contropiede=0;
       }
       incdato(sqsel,giocsel,dato);
       rinfo=datirec[sqsel][giocsel].dati[vcro]+'ro';
       setdatocmp(sqsel,dcrdavv);
       setposs(sqsel,1);
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[vcro]++;
        quintrec[quintidx[1-sqsel]].datiavv[vcro]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[vcro]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[vcro]++;
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': rimbalzo offensivo';
        refleggadd(rl);
       }
       break;

      case vcrd:
       incdato(sqsel,giocsel,dato);
       rinfo=datirec[sqsel][giocsel].dati[vcrd]+'rd';
       setdatocmp(sqsel,dcrd);
       setposs(sqsel,1);
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[vcrd]++;
        quintrec[quintidx[1-sqsel]].datiavv[vcrd]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[vcrd]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[vcrd]++;
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': rimbalzo difensivo';
        refleggadd(rl);
       }
       if ((contropiede&6)!=0) contropiede=0;
       break;

      case vcsd:
       incdato(sqsel,giocsel,dato);
       rinfo=datirec[sqsel][giocsel].dati[vcsd]+'sd';
       setdatocmp(sqsel,dcsd);
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[dato]++;
        quintrec[quintidx[1-sqsel]].datiavv[dato]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[dato]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[dato]++;
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': stoppata data';
        refleggadd(rl);
       }
       break;

      case vcss:
       incdato(sqsel,giocsel,dato);
       rinfo=datirec[sqsel][giocsel].dati[vcss]+'ss';
       setdatocmp(sqsel,dcss);
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[dato]++;
        quintrec[quintidx[1-sqsel]].datiavv[dato]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[dato]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[dato]++;
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': stoppata subita';
        refleggadd(rl);
       }
       break;

      case vcpp:
       incdato(sqsel,giocsel,dato);
       rinfo=datirec[sqsel][giocsel].dati[vcpp]+'pp';
       setdatocmp(sqsel,dcpp);
       setposs(sqsel,-1);
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[vcpp]++;
        quintrec[quintidx[1-sqsel]].datiavv[vcpp]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[vcpp]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[vcpp]++;
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': palla persa';
        if ((contropiede&1)!=0) rl[sqsel]+=' in contropiede';
        refleggadd(rl);
       }
       if ((contropiede&1)!=0){
        contropiede=0;
        contropiedecmb=true;
        adrec[sqsel].cpnum++;
        adrec[sqsel].cppp++;
       }
       if ((rimbalzooff&1)!=0) rimbalzooff=0;
       break;

      case vcpr:
       if (giocsel<sq){
        incdato(sqsel,giocsel,dato);
        rinfo=datirec[sqsel][giocsel].dati[vcpr]+'pr';
       } else adrec[sqsel].azr++;
       setdatocmp(sqsel,dcpr);
       setposs(sqsel,1);
       if (giocsel<sq){
        if ((intflag&32)!=0){
         quintrec[quintidx[sqsel]].datipro[vcpr]++;
         quintrec[quintidx[1-sqsel]].datiavv[vcpr]++;
        }
        if ((intflag&128)!=0)
         difesarec[difesaidx[1-sqsel]].dati[vcpr]++;
        if ((intflag&256)!=0)
         attaccorec[attaccoidx[sqsel]].dati[vcpr]++;
        if ((intflag&64)!=0){
         rl[sqsel]=getgiocperref(sqsel,giocsel);
         rl[sqsel]+=': palla recuperata';
         refleggadd(rl);
        }
       }
       break;

      case vcas:
       incdato(sqsel,giocsel,dato);
       rinfo=datirec[sqsel][giocsel].dati[vcas]+'as';
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[vcas]++;
        quintrec[quintidx[1-sqsel]].datiavv[vcas]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[vcas]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[vcas]++;
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': assist';
        refleggadd(rl);
       }
       break;

      case vcpri:
       if (adrec[0].pri+adrec[1].pri==0){
        m=true;
        adrec[sqsel].pri++;
        rinfo=adrec[sqsel].pri+'pri';
       } else {
        m=false;
        adrec[sqsel].pra++;
       }
       possiniz=false;
       //si forzano i valori del possesso nell'eventualità
       //di fallo tecnico prima del salto iniziale
       daticmp[sqsel][dcposs]=1;
       daticmp[1-sqsel][dcposs]=0;
       if ((m)&&((intflag&64)!=0)){
        rl[sqsel]=getgiocperref(sqsel,giocsel);
        rl[sqsel]+=': palla recuperata iniziale';
        refleggadd(rl);
       }
       break;

      case vcap:
       adrec[sqsel].azp++;
       setdatocmp(sqsel,dcpp);
       setposs(sqsel,-1);
       break;

      case vcrft:
       adrec[sqsel].rft++;
       setdatocmp(sqsel,dcrd);
       setposs(sqsel,1);
       break;

      case vcts1:
      case vcts0:
      case vctf1:
      case vctf0:
      case vct31:
      case vct30:
      case vcsc1:
       if (dato==vcsc1){ //se è una schiacciata, aggiorna i ts
        m=vcts1;
        incdato(sqsel,giocsel,vcts1);
        rinfo=(1+datirec[sqsel][giocsel].dati[vcsc1])+'sc ';
        if ((intflag&32)!=0){
         quintrec[quintidx[sqsel]].datipro[vcts1]++;
         quintrec[quintidx[1 - sqsel]].datiavv[vcts1]++;
        }
        if ((intflag&128)!=0)
         difesarec[difesaidx[1-sqsel]].dati[vcts1]++;
        if ((intflag&256)!=0)
         attaccorec[attaccoidx[sqsel]].dati[vcts1]++;
       } else {
        m=dato;
       }
       if ((giocsel==sq)&&([vcts1,vctf1,vct31,vcsc1].indexOf(dato)>=0)){
        if (dato==vct31) dato=vctf1;
        rinfo+='autocanestro';
       }
       incdato(sqsel,giocsel,dato);
       if (giocsel<sq) rinfo+=datirec[sqsel][giocsel].dati[m-((m-vcts1)%2)]+'/'+(datirec[sqsel][giocsel].dati[m-((m-vcts1)%2)]+datirec[sqsel][giocsel].dati[m-((m-vcts1)%2)+1])+('tstft3'.substr(Math.floor((m-vcts1)/2)*2,2));
       if ((intflag&32)!=0){
        quintrec[quintidx[sqsel]].datipro[dato]++;
        quintrec[quintidx[1-sqsel]].datiavv[dato]++;
       }
       if ((intflag&128)!=0)
        difesarec[difesaidx[1-sqsel]].dati[dato]++;
       if ((intflag&256)!=0)
        attaccorec[attaccoidx[sqsel]].dati[dato]++;
       //trova i dati dentro le parentesi quadre
       //per aggiungere i tiri alle sequenze di tiro
       if (qua>0){
        t=riga.substr(qua-1,1)+riga.substring(qua+1,quc);
        if (datirec[sqsel][giocsel].tiri.length>0)
         if (datirec[sqsel][giocsel].tiri.substr(datirec[sqsel][giocsel].tiri.length-1)!=';')
          datirec[sqsel][giocsel].tiri+=',';
        datirec[sqsel][giocsel].tiri+=t;
        if (datirec[sqsel][tot].tiri.length>0)
         if (datirec[sqsel][tot].tiri.substr(datirec[sqsel][tot].tiri.length-1)!=';')
          datirec[sqsel][tot].tiri+=',';
        datirec[sqsel][tot].tiri+=t;
       }
       //aggiorna il risultato
       //e prepara la variabile m per l'aggiornamento tabelloni
       setposs(sqsel,-1);
       if ([vcts1,vctf1,vct31,vcsc1].indexOf(dato)>=0){
       //canestro realizzato
        rinfo+=' '+punti(sqsel,giocsel)+'p';
        //rileva la differenza punti per il plus/minus
        m=punti(sqsel,tot)-daticmp[sqsel][dcpunti];
        if (m>0)
         cambioris=true;
        if ((contropiede&1)!=0){
         adrec[sqsel].cpnum++;
         adrec[sqsel].cppun+=m;
        }
        if ((rimbalzooff&1)!=0) adrec[sqsel].ropun+=m;
        if (datirec[1-sqsel][tot].dati[vcprt]>0){
         for(i=1;i<=datirec[sqsel][tot].dati[vcprt];i++)
          if (datirec[sqsel][i].dati[vconc]==1){
           datirec[sqsel][i].dati[vcpm]+=m;
           datirec[sqsel][tot].dati[vcpm]+=m;
          }
         for(i=1;i<=datirec[1-sqsel][tot].dati[vcprt];i++)
          if (datirec[1-sqsel][i].dati[vconc]==1){
           datirec[1-sqsel][i].dati[vcpm]-=m;
           datirec[1 - sqsel][tot].dati[vcpm]-=m;
          }
         if ((intflag&32)!=0){
          quintrec[quintidx[sqsel]].datipro[vcpm]+=m;
          quintrec[quintidx[1-sqsel]].datiavv[vcpm]+=m;
          quintrec[quintidx[sqsel]].datiavv[vcpm]-=m;
          quintrec[quintidx[1-sqsel]].datipro[vcpm]-=m;
         }
         if ((intflag&128)!=0){
          difesarec[difesaidx[1-sqsel]].dati[vcpm]+=m;
          difesarec[difesaidx[sqsel]].dati[vcpm]-=m;
         }
         if ((intflag&256)!=0){
          attaccorec[attaccoidx[sqsel]].dati[vcpm]+=m;
          attaccorec[attaccoidx[1-sqsel]].dati[vcpm]-=m;
         }
        }
        //aggiorna risultato
        daticmp[sqsel][dcpunti]+=m;
        setposs(1-sqsel,1);
        if ((tempodigioco>=1)&&(ent[0]==ent[1]))
         prt2rec.ris=daticmp[0][dcpunti]+'-'+daticmp[1][dcpunti];
        m=(dato==vcsc1)?vcts1:dato;
       } else {
       //canestro sbagliato
        if ((contropiede&1)!=0) adrec[sqsel].cpnum++;
        m=dato-1;
        setdatocmp(sqsel,dcrdavv);
       }
       if ((intflag&64)!=0){
        rl[sqsel]=getgiocperref(sqsel,giocsel)+': ';
        if (giocsel==sq){
         rl[sqsel]+='autocanestro avversari';
        } else {
         switch (dato){
          case vcts1: rl[sqsel]+='tiro da sotto realizzato'; break;
          case vcts0: rl[sqsel]+='tiro da sotto sbagliato'; break;
          case vctf1: rl[sqsel]+='tiro da fuori realizzato'; break;
          case vctf0: rl[sqsel]+='tiro da fuori sbagliato'; break;
          case vct31: rl[sqsel]+='tiro da tre realizzato'; break;
          case vct30: rl[sqsel]+='tiro da tre sbagliato'; break;
          case vcsc1: rl[sqsel]+='schiacciata'; break;
         }
        }
        if ((contropiede&1)!=0) rl[sqsel]+=' in contropiede';
        if ([vcts1,vctf1,vct31,vcsc1].indexOf(dato)>=0){
         rl[2]=daticmp[0][dcpunti]+'-'+daticmp[1][dcpunti];
         i=punti(sqsel,giocsel);
         rl[sqsel]+=' ('+i+' punti)';
        }
        if (qua>0)
         rl[sqsel]+='<div '+classmappa+'><canvas width="150" height="100" data-tiro="'+t+'"></canvas></div>';
        refleggadd(rl);
       }
       if ((contropiede&1)!=0){
        contropiedecmb=true;
        if ([vcts1,vctf1,vct31,vcsc1].indexOf(dato)>=0) contropiede=0;
        else contropiede=(sqsel==0)?2:4;
       }
       if ((rimbalzooff&1)!=0) rimbalzooff=0;
       break;

      case vctl1:
      case vctl0:
      case vctlm:
       //inizia nuova serie di tl
       d=new Array();
       if (dato==vctlm){
        if ((contropiede&8)!=0) contropiede=1;
        if ((rimbalzooff&8)!=0) rimbalzooff=1;
        //cerca l'ultima serie che finisce con -
        u=d[0]=(datirec[sqsel][tot].seqtl+'/').lastIndexOf('-/');
        if (u<0){
         if ((intflag&2)!=0){
          t='ATT['+tdc+': non accettabile per assenza serie tl con - precedenti]';
          righe.splice(r+1,0,t);
         }
         break;
        }
        //esamina la serie cercata
        t=datirec[sqsel][tot].seqtl.lastIndexOf('/',u);
        u=datirec[sqsel][tot].seqtl.substring(t,u+1);
        if (u.length!=tdc.length-1){
         if ((intflag&2)!=0){
          t='ATT['+tdc+': non accettabile per lunghezza serie precedente diversa]';
          righe.splice(r+1,0,t);
         }
         break
        }
        //incrocia le due serie per vedere se - e 01 coincidono
        m=new Array();
        m[0]=0;
        for(i=1;i<tdc.length-1;i++){
         m[i]=(u.charAt(i)=='-')?0:1;
         m[i]+=(tdc.charAt(i+1)=='-')?0:1;
         if (m[0]<m[i])
          m[0]=m[i];
         if ((i>1)&&(m[i]>m[i-1]))
          m[0]=2;//setta un errore
        }
        if (m[0]>1){
         if ((intflag&2)!=0){
          t='ATT['+tdc+': non compatibile con serie precedente]';
          righe.splice(r+1,0,t);
         }
         break
        }
        // cerco la serie nel giocatore
        m=1;
        t=d[1]=(datirec[sqsel][giocsel].seqtl+'/').lastIndexOf('-/');
        if (t>=0)
         if (u==datirec[sqsel][giocsel].seqtl.substring(datirec[sqsel][giocsel].seqtl.lastIndexOf('/',t),t+1))
          m=3;
        u=m;
       } else u=0;
       //se u==0 crea nuove serie
       if ((u&1)==0)
        datirec[sqsel][tot].seqtl+='/';
       if ((u&2)==0)
        datirec[sqsel][giocsel].seqtl+='/';
       //trova l'incremento per stl6
       s=Math.floor(6/(tdc.length-2));
       if ((intflag&64)!=0)
        rl[sqsel]=getgiocperref(sqsel,giocsel);
       //per ogni tl...
       m=0;
       for(i=2;i<tdc.length;i++){
        t=tdc.charAt(i);
        //sostituisce 0 o 1 nella seqtl di squadra
        if ((u&1)!=0){
         if (t!='-')
          datirec[sqsel][tot].seqtl=datirec[sqsel][tot].seqtl.substring(0,d[0]-tdc.length+1+i)+t+datirec[sqsel][tot].seqtl.substr(d[0]-tdc.length+2+i);
        } else {
         //allunga la seqtl di squadra
         datirec[sqsel][tot].seqtl+=t;
        }
        if ((u&2)!=0){
         if (t!='-')
          datirec[sqsel][giocsel].seqtl=datirec[sqsel][giocsel].seqtl.substring(0,d[1]-tdc.length+1+i)+t+datirec[sqsel][giocsel].seqtl.substr(d[1]-tdc.length+2+i);
        } else {
         //allunga la seqtl del giocatore
         datirec[sqsel][giocsel].seqtl+=t;
        }
        //incrementa rtl
        if (tdc.charAt(i-1)=='0')
         adrec[sqsel].rtl++;
        //incrementa dato e stl6, e poi conta i punti
        if ('01'.indexOf(t)>=0){
         incdato(sqsel,giocsel,vctl1+1-parseInt(t,10));
         datirec[sqsel][tot].dati[vcstl6]+=s;
         datirec[sqsel][giocsel].dati[vcstl6]+=s;
         if ((intflag&32)!=0){
          quintrec[quintidx[sqsel]].datipro[vctl1+1-parseInt(t,10)]++;
          quintrec[quintidx[1-sqsel]].datiavv[vctl1+1-parseInt(t,10)]++;
          quintrec[quintidx[sqsel]].datipro[vcstl6]+=s;
          quintrec[quintidx[1-sqsel]].datiavv[vcstl6]+=s;
         }
         if ((intflag&128)!=0){
          difesarec[difesaidx[1-sqsel]].dati[vctl1+1-parseInt(t,10)]++;
          difesarec[difesaidx[1 - sqsel]].dati[vcstl6]+=s;
         }
         if ((intflag&256)!=0){
          attaccorec[attaccoidx[sqsel]].dati[vctl1+1-parseInt(t,10)]++;
          attaccorec[attaccoidx[sqsel]].dati[vcstl6]+=s;
         }
         if (t=='1')
          m++;
        }
        if ((intflag&64)!=0){
         if (tdc.length==3){
          if (t=='1')
           rl[sqsel]+=': tiro libero realizzato';
          else
           rl[sqsel]+=': tiro libero sbagliato';
          if ((contropiede&1)!=0) rl[sqsel]+=' dopo contropiede';
         } else {
          if (i==2){
           rl[sqsel]+=': tiri liberi';
           if ((contropiede&1)!=0) rl[sqsel]+=' dopo contropiede';
          }
          if (t!='-'){
           switch (i){
            case 2: rl[sqsel]+=', primo'; break;
            case 3: rl[sqsel]+=', secondo'; break;
            case 4: rl[sqsel]+=', terzo'; break;
           }
           if (t=='1')
            rl[sqsel]+=' realizzato';
           else
            rl[sqsel]+=' sbagliato';
          }
         }
        }
       }
       //incrementa stl1
       if (tdc.charAt(tdc.length-1)=='1'){
        datirec[sqsel][tot].dati[vcstl1]++;
        datirec[sqsel][giocsel].dati[vcstl1]++;
        setposs(1-sqsel,1);
        if ((intflag&32)!=0){
         quintrec[quintidx[sqsel]].datipro[vcstl1]++;
         quintrec[quintidx[1-sqsel]].datiavv[vcstl1]++;
        }
        if ((intflag&128)!=0)
         difesarec[difesaidx[1-sqsel]].dati[vcstl1]++;
        if ((intflag&256)!=0)
         attaccorec[attaccoidx[sqsel]].dati[vcstl1]++;
       }
       rinfo=datirec[sqsel][giocsel].dati[vctl1]+'/'+(datirec[sqsel][giocsel].dati[vctl1]+datirec[sqsel][giocsel].dati[vctl0])+'tl';
       if (m>0){
        if ((contropiede&1)!=0) adrec[sqsel].cppun+=m;
        if ((rimbalzooff&1)!=0) adrec[sqsel].ropun+=m;
        rinfo+=' '+punti(sqsel,giocsel)+'p';
        //rileva la differenza punti per il plus/minus
        cambioris=true;
        if (datirec[1-sqsel][tot].dati[vcprt]>0){
         for(i=1;i<=datirec[sqsel][tot].dati[vcprt];i++)
          if (datirec[sqsel][i].dati[vconc]==1){
           datirec[sqsel][i].dati[vcpm]+=m;
           datirec[sqsel][tot].dati[vcpm]+=m;
          }
         for(i=1;i<=datirec[1-sqsel][tot].dati[vcprt];i++)
          if (datirec[1-sqsel][i].dati[vconc]==1){
           datirec[1-sqsel][i].dati[vcpm]-=m;
           datirec[1-sqsel][tot].dati[vcpm]-=m;
          }
         if ((intflag&32)!=0){
          quintrec[quintidx[sqsel]].datipro[vcpm]+=m;
          quintrec[quintidx[1-sqsel]].datiavv[vcpm]+=m;
          quintrec[quintidx[sqsel]].datiavv[vcpm]-=m;
          quintrec[quintidx[1-sqsel]].datipro[vcpm]-=m;
         }
         if ((intflag&128)!=0){
          difesarec[difesaidx[1-sqsel]].dati[vcpm]+=m;
          difesarec[difesaidx[sqsel]].dati[vcpm]-=m;
         }
         if ((intflag&256)!=0){
          attaccorec[attaccoidx[sqsel]].dati[vcpm]+=m;
          attaccorec[attaccoidx[1-sqsel]].dati[vcpm]-=m;
         }
        }
       }
       //aggiorna risultato
       daticmp[sqsel][dcpunti]+=m;
       if ((tempodigioco>=1)&&(ent[0]==ent[1]))
        prt2rec.ris=daticmp[0][dcpunti]+'-'+daticmp[1][dcpunti];
       if ((intflag&64)!=0){
        if (m>0){
         rl[2]=daticmp[0][dcpunti]+'-'+daticmp[1][dcpunti];
         i=punti(sqsel,giocsel);
         rl[sqsel]+=' ('+i+' punt'+((i==1)?'o)':'i)');
        }
        refleggadd(rl);
       }
       if (tdc.charAt(tdc.length-1)!='-'){
        if ((contropiede&1)!=0){
         contropiede=0;
         contropiedecmb=true;
         adrec[sqsel].cpnum++;
        }
        if ((rimbalzooff&1)!=0) rimbalzooff=0;
        setdatocmp(sqsel,dcrdavv);
        setposs(sqsel,-1);
       } else {
        if ((contropiede&1)!=0) contropiede=8;
        if ((rimbalzooff&1)!=0) rimbalzooff=8;
       }
       break;

     } //fine switch (dato)
     //visualizza dati comparativi
     mostra|=1;
    }
   }

   //altri dati
   if (sint==-1){
    v=("NOTE'   ERR ATT ENT S   TMP CP  DA  DB  AA  AB  ").indexOf((tdc+'    ').substr(0,4));
    dato=Math.floor(v/4)+1;
    if ((v%4)==0){
     sint=0;
     switch (dato){
      case 1: //NOTE
       if ((intflag&64)!=0){
        rl[2]=trim(riga.substring(qua+1,quc));
        refleggadd(rl);
       }
       break;
      case 2:
      case 3:
      case 4: //', ERR, ATT
       break;
      case 5: //ENT
       d=[0,0];
       t=trim(riga.substring(qua+1,quc))+' ';
       oldtmp=parseInt(t,10)||0;
       oldtmpf=true;
       //trova il primo spazio
       i=t.indexOf(' ');
       u=('0000'+t.substring(0,i)).slice(-4);
       //trova minuti e secondi
       m=parseInt('0'+u.substr(0,2),10);
       s=parseInt('0'+u.substr(2,2),10);
       //ciclo lungo gli spazi
       while (i>=0){
        t=t.substr(i+1);
        i=t.indexOf(' ');
        u=t.substring(0,i);
        if (u.length>0){
         if (u.charAt(0)=='+'){
          //cerco il giocatore
          p=-1;
          g=gioccerca(p,u.substr(1));
          p=g[0];
          g=g[1];
          //se non ci sono entrate in quintetto
          //setta la variabile per gestirle
          if (datirec[p][tot].dati[vcst]==0)
           d[p]=1;
          //se è la prima di queste entrate per una squadra,
          //azzero vconc e sistemo bonus e sequenze tiri e
          //registro i parziali dei periodi
          if (ent[p]<1){
           ent[p]=Math.abs(ent[p])+1;
           tempodigioco=maxent();
           while (ent[p]>=periodi.length){
            periodi.push({dati:[]});
            periodi[periodi.length-1].dati[0]=new Array(voci+1);
            periodi[periodi.length-1].dati[1]=new Array(voci+1);
            periodoazzera(periodi.length-1);
           }
           if (ent[p]>1)
            periodocopiatot(ent[p]-1,p);
           if (tempodigioco<=camprec.tempi)
            daticmp[p][dcbonus]=0;
           for(n=1;n<=tot;n++){
            //sequenze tiri
            if (((n<=datirec[p][tot].dati[vcprt])||(n>sq))&&(d[p]==0)){
             datirec[p][n].seqtl+=';';
             datirec[p][n].tiri+=';';
            }
            //rimuove in campo
            if ((n<=datirec[p][tot].dati[vcprt])&&(datirec[p][n].dati[vconc]==1)){
             datirec[p][n].dati[vconc]=0;
             //gestione minuscolo
             mostra|=2;
            }
           }
          }
          //aggiorna i dati
          datirec[p][g].dati[vcst]+=d[p];
          datirec[p][tot].dati[vcst]+=d[p];
          datirec[p][g].dati[vcmin]+=m;
          datirec[p][tot].dati[vcmin]+=m;
          datirec[p][g].dati[vcsec]+=s;
          datirec[p][tot].dati[vcsec]+=s;
          datirec[p][g].dati[vconc]=1;
          //gestione maiuscolo
          mostra|=2;
         }
        }
       }
       if ((intflag&32)!=0)
        for(p=0;p<=1;p++)
         if (ent[p]>0){
          //cerca il quintetto
          quintidx[p]=quintcerca(p);
          //incrementa minuti e secondi
          quintrec[quintidx[p]].datipro[vcmin]+=m;
          quintrec[quintidx[p]].datipro[vcsec]+=s;
         }
       if ((intflag&64)!=0){
        if (tempodigioco<=camprec.tempi)
         rl[2]=tempodigioco+'º tempo ';
        else
         rl[2]=(tempodigioco-parseInt(camprec.tempi,10))+'º suppl. ';
        tmp=m+':'+('0'+s).slice(-2);
        rl[2]+=tmp;
        for(p=0;p<=1;p++){
         for(n=1;n<=datirec[p][tot].dati[vcprt];n++)
          if (datirec[p][n].dati[vconc]==1){
           if (rl[p].length==0)
            rl[p]='Entrate: ';
           else
            rl[p]+=', ';
           rl[p]+=getgiocperref(p,n);
          }
        }
        refleggadd(rl);
       }
       //sistema risultati parziali
       ent[0]=-Math.abs(ent[0]);
       ent[1]=-Math.abs(ent[1]);
       if (ent[0]==ent[1]){
        if (tempodigioco==1)
         prt2rec.parz='';
        else if ((tempodigioco>1)&&(tempodigioco>prt2rec.parz.split(';').length)){
         if (tempodigioco>2)
          prt2rec.parz+=';';
         prt2rec.parz+=daticmp[0][dcpunti]+'-'+daticmp[1][dcpunti];
        }
        daticmp[0][dcposs]=0;
        daticmp[1][dcposs]=0;
        possiniz=true;
        //visualizza i dati comparativi
        mostra|=1;
       }
       break;
      case 6: //S
       d=[0,0];
       incmp=true;
       t=trim(riga.substring(qua+1,quc))+' ';
       oldtmp=parseInt(t,10)||0;
       oldtmpf=true;
       //trova il primo spazio
       i=t.indexOf(' ');
       u=('0000'+t.substring(0,i)).slice(-4);
       //trova minuti e secondi
       m=parseInt('0'+u.substr(0,2),10);
       s=parseInt('0'+u.substr(2,2),10);
       if ((intflag&64)!=0){
        tmp=m+':'+('0'+s).slice(-2);
        rl[2]+=tmp;
       }
       //ciclo lungo gli spazi
       while (i>=0){
        t=t.substr(i+1);
        i=t.indexOf(' ');
        u=t.substring(0,i);
        if (u.length>0){
         if ('+-'.indexOf(u.charAt(0))>=0){
          //cerco il giocatore
          p=-1;
          g=gioccerca(p,u.substr(1));
          p=g[0];
          g=g[1];
          if (u.charAt(0)=='+'){
           if (datirec[p][g].dati[vconc]==0){
            d[p]=1;
            datirec[p][g].dati[vcmin]+=m;
            datirec[p][tot].dati[vcmin]+=m;
            datirec[p][g].dati[vcsec]+=s;
            datirec[p][tot].dati[vcsec]+=s;
            datirec[p][g].dati[vconc]=1;
            if ((intflag&64)!=0){
             if (rl[p].length==0)
              rl[p]='Entra ';
             else
              rl[p]+=', entra ';
             rl[p]+=getgiocperref(p,g);
            }
           } else {//errore già in campo
            if ((intflag&2)!=0){
             u='ATT['+u+': in campo, niente sostituzione]';
             righe.splice(r+1,0,u);
            }
           }
          } else {
           if (datirec[p][g].dati[vconc]!=0){
            d[p]=1;
            datirec[p][g].dati[vcmin]-=m;
            datirec[p][tot].dati[vcmin]-=m;
            datirec[p][g].dati[vcsec]-=s;
            datirec[p][tot].dati[vcsec]-=s;
            datirec[p][g].dati[vconc]=0;
            if ((intflag&64)!=0){
             if (rl[p].length==0)
              rl[p]='Esce ';
             else
              rl[p]+=', esce ';
             rl[p]+=getgiocperref(p,g);
            }
           } else {//errore non in campo
            if ((intflag&2)!=0){
             u='ATT['+u+': fuori campo, niente sostituzione]';
             righe.splice(r+1,0,u);
            }
           }
          }
          //gestione maiuscolo
          mostra|=2;
         }
        }
       }
       if ((intflag&32)!=0)
        for(p=0;p<=1;p++)
         if (d[p]==1){
          //decrementa minuti e secondi al precedente quintetto
          quintrec[quintidx[p]].datipro[vcmin]-=m;
          quintrec[quintidx[p]].datipro[vcsec]-=s;
          //cerca il quintetto
          quintidx[p]=quintcerca(p);
          //incrementa minuti e secondi
          quintrec[quintidx[p]].datipro[vcmin]+=m;
          quintrec[quintidx[p]].datipro[vcsec]+=s;
         }
       if ((intflag&64)!=0)
        refleggadd(rl);
       break;
      case 7: //TMP
       t=trim(riga.substring(qua+1,quc));
       oldtmp=parseInt(t,10)||0;
       oldtmpf=true;
       if ((intflag&64)!=0){
        u=('0000'+t).slice(-4);
        //trova minuti e secondi
        m=parseInt('0'+u.substr(0,2),10);
        s=parseInt('0'+u.substr(2,2),10);
        tmp=m+':'+('0'+s).slice(-2);
        rl[2]=tmp;
        refleggadd(rl);
       }
       break;
      case 8: //CP
       contropiedecmb=true;
       if ((contropiede&1)!=0) contropiede=0;
       else contropiede=1;
       break;
      case 9:
      case 10: //DA e DB
       //trova la squadra
       s=dato-9;
       //trova la difesa
       t=trim(riga.substring(qua+1,quc));
       if ((intflag&64)!=0){
        rl[s]='Difesa: '+t;
        refleggadd(rl);
       }
       if ((intflag&128)!=0){
        //cerca la difesa
        difesaidx[s]=difesacerca(s,t);
       }
       break;
      case 11:
      case 12: //AA e AB
       //trova la squadra
       s=dato-11;
       //trova l'attacco
       t=trim(riga.substring(qua+1,quc));
       if ((intflag&64)!=0){
        rl[s]='Attacco: '+t;
        refleggadd(rl);
       }
       if ((intflag&256)!=0){
        //cerca l'attacco
        attaccoidx[s]=attaccocerca(s,t);
       }
       break;
     }
    }
   }
   //taglia la parte della riga già elaborata
   riga=ltrim(riga.substr(sp+1));
  }
  if ((intflag&1)!=0){
   //registra le differenze comparative
   dif.push(getdiff());
   //registra le informazioni del referto
   inf.push(rinfo);
  }
  //registra la riga
  result.push(righe[r]);
  //aggiorna il referto visuale
  if ((intflag&4)!=0){
   m=result.length-1;
   addreftab+='<tr>';
   addreftab+='<td><a href="javascript:modrigaref('+righereftab+');">'+result[m]+'</a></td>';
   addreftab+='<td>'+dif[m]+'</td>';
   addreftab+='<td>'+inf[m]+'</td>';
   addreftab+='</tr>';
   righereftab++;
  }
  //incrementa il contatore di righe
  r++;
 }
 if ((intflag&4)!=0){
  if (mostra&1)
   mostradaticmp();
  if (mostra&2)
   mostragioc();
  $('#reftab').append(addreftab);
  $('#refdiv').scrollTop($('#reftab').height());
 }
 tmp=result.join('\n')+((result.length)>0?'\n':'');
 if ((intflag&1)!=0){
  diff+=dif.join('\n')+((result.length)>0?'\n':'');
  info+=inf.join('\n')+((result.length)>0?'\n':'');
 }
 if ((intflag&8)!=0){
  //aggiorna il referto in memoria
  prt2rec.referto+=tmp;
  //aggiorna il referto su disco
  localStorage.refertotxt+=tmp;
  if (sharing){
   if (oldtmpf) t='add';
   else t='adt';
   inviodati(t,tmp);
  }
 }
 oldtmpf=false;
 return tmp;
}

function maxent(){
 if (Math.abs(ent[0])>=Math.abs(ent[1]))
  return Math.abs(ent[0]);
 else
  return Math.abs(ent[1]);
}

function minent(){
 if (Math.abs(ent[1])>=Math.abs(ent[0]))
  return Math.abs(ent[0]);
 else
  return Math.abs(ent[1]);
}

function periodoazzera(p){
 var i,j;
 for(i=0;i<=1;i++)
  for(j=0;j<=voci;j++)
   periodi[p].dati[i][j]=0;
}

function periodocopiatot(p,s){
 var j;
 for(j=0;j<=voci;j++) periodi[p].dati[s][j]=datirec[s][tot].dati[j];
}

function periododiff(p,s,v){
 return periodi[p].dati[s][v]-periodi[p-1].dati[s][v];
}

function punti(s,g){
 return (2*datirec[s][g].dati[vcts1]+2*datirec[s][g].dati[vctf1]+3*datirec[s][g].dati[vct31]+datirec[s][g].dati[vctl1]);
}

function refleggadd(rl){
 var l,i;
 l=reflegg.length;
 reflegg[l]={riga:['','','']};
 for(i=0;i<=2;i++){
  reflegg[l].riga[i]=rl[i];
  rl[i]='';
 }
}

function resetdati(soloprt){
 var x,y,z;
 if (! soloprt){
  prtrec={
   codprt:'',
   codcamp:'',
   codsq:['',''],
   dataora:'',
   luogo:'',
   giornata:'',
   ngara:'',
   sesso:['','']
  };
  camprec={
   annosport:'',
   nomecamp:'',
   girone:'',
   fase:'',
   tempi:4,
   durata:10,
   suppl:5,
   maxfalli:5
  };
  prt2rec={
   referto:'',
   nomesq:['',''],
   nomecortosq:['',''],
   coach:['',''],
   ris:'',
   parz:'',
   arbitri:'',
   rilevatori:'',
   note:''
  };
 }
 tempodigioco=0;
 contropiede=0;
 contropiedecmb=false;
 rimbalzooff=0;
 possiniz=true;
 selsq=0;
 selgioc=sq;
 diff='';
 info='';
 incmp=false;
 cambioris=false;
 ent=[0,0];
 dq='';
 daticmp=new Array(2);
 daticmp[0]=new Array(dcmp+1);
 daticmp[1]=new Array(dcmp+1);
 datirec=new Array(2);
 datirec[0]=new Array(tot+1);
 datirec[1]=new Array(tot+1);
 for(x=0;x<=1;x++){
  for(y=dcpunti;y<=dcmp;y++){
   daticmp[x][y]=0;
  }
  for(y=0;y<=tot;y++){
   datirec[x][y]={
    codgioc:0,
    cognome:'',
    nome:'',
    anno:'',
    altezza:'',
    ruolo:'',
    nmaglia:'',
    dati:[],
    seqtl:'',
    tiri:''
   };
   datirec[x][y].dati=new Array(voci+1);
   for(z=0;z<=voci;z++){
    datirec[x][y].dati[z]=0
   }
  }
 }
 adrec=new Array(2);
 for(x=0;x<=1;x++){
  adrec[x]={
   cpnum:0,
   cppp:0,
   cppun:0,
   ropun:0,
   pri:0,
   pra:0,
   rtl:0,
   rft:0,
   azp:0,
   azr:0,
   fssq:0
  };
 }
 //quintetti e difese devono avere un record nell'eventualità di falli tecnici prima della partita
 quintrec=[];
 quintrec[0]={
  nmaglia:'0',
  datipro:[],
  datiavv:[]
 };
 quintrec[0].datipro=new Array(voci+1);
 quintrec[0].datiavv=new Array(voci+1);
 quintidx=[0,0];
 difesarec=[];
 difesarec[0]={
  nome:'',
  dati:[]
 };
 difesarec[0].dati=new Array(voci+1);
 difesaidx=[0,0];
 attaccorec=[];
 attaccorec[0]={
  nome:'',
  dati:[]
 };
 attaccorec[0].dati=new Array(voci+1);
 attaccoidx=[0,0];
 for(z=0;z<=voci;z++){
  quintrec[0].datipro[z]=0;
  quintrec[0].datiavv[z]=0;
  difesarec[0].dati[z]=0;
  attaccorec[0].dati[z]=0;
 }
 difesarec[0].dati[vcprt]=-1;
 attaccorec[0].dati[vcprt]=-1;
 reflegg=[];
 periodi=[];
 periodi[0]={dati:[]};
 periodi[0].dati[0]=new Array(voci+1);
 periodi[0].dati[1]=new Array(voci+1);
 periodoazzera(0);
}

function setdatocmp(s,d){
 switch (d){
  case dcff:
   daticmp[s][d]=datirec[s][tot].dati[vcff];
   break;
  case dcfs:
   daticmp[s][d]=datirec[s][tot].dati[vcfs]+adrec[s].fssq;
   break;
  case dcrd:
   daticmp[s][d]=datirec[s][tot].dati[vcrd]+adrec[s].rft;
   break;
  case dcrdavv:
   daticmp[s][d]=datirec[s][tot].dati[vcts0]+datirec[s][tot].dati[vctf0]+datirec[s][tot].dati[vct30]+datirec[s][tot].dati[vctl0]-datirec[s][tot].dati[vcro]-adrec[s].rtl;
   break;
  case dcsd:
   daticmp[s][d]=datirec[s][tot].dati[vcsd];
   break;
  case dcss:
   daticmp[s][d]=datirec[s][tot].dati[vcss];
   break;
  case dcpp:
   daticmp[s][d]=datirec[s][tot].dati[vcpp]+adrec[s].azp;
   break;
  case dcpr:
   daticmp[s][d]=datirec[s][tot].dati[vcpr]+adrec[s].azr;
   break;
 }
}

function setposs(s,v){
 if ((possiniz)&&(v==-1)){
  possiniz=false;
  daticmp[s][dcposs]++;
  adrec[s].pra++;
 }
 daticmp[s][dcposs]+=v;
}

function stpmappaint(esporta){
 var g;
 var nl="\n";
 ta=new Array(new Array(),new Array());
 var w='';
 w+='<h3 class="tac">'+htmlentities(prt2rec.nomecortosq[0]+' - '+prt2rec.nomecortosq[1])+' '+prt2rec.ris+'</h3>';
 w+='<h2 class="tac">Mappa tiro interattiva</h2>';
 w+='<form name="mappa">';
 w+='<table class="table table-striped table-bordered" style="margin-left: auto; margin-right: auto;">';
 w+='<thead><tr><th class="tal"><div class="checkbox"><label><input name="sq[]" type="checkbox" checked>'+htmlentities(prt2rec.nomecortosq[0])+'</label></div></th>';
 for(g=1;g<=tempodigioco;g++){
  w+='<th><div class="checkbox"><label><input name="tempo[]" type="checkbox" checked>';
  if (g<=camprec.tempi)
   w+=g+'&ordm; tempo';
  else
   w+=(g-camprec.tempi)+'&ordm; suppl.';
  w+='</label></div></th>';
 }
 w+='<th class="tal"><div class="checkbox"><label><input name="sq[]" type="checkbox" checked>'+htmlentities(prt2rec.nomecortosq[1])+'</label></div></th>';
 w+='</tr></thead><tbody>';
 if (datirec[0][tot].dati[vcprt]>=datirec[1][tot].dati[vcprt]) m=datirec[0][tot].dati[vcprt];
 else m=datirec[1][tot].dati[vcprt];
 for(g=1;g<=m;g++){
  w+='<tr>';
  if (g<=datirec[0][tot].dati[vcprt]){
   w+='<td class="tal"><div class="checkbox"><label><input name="gioca[]" type="checkbox" checked>';
   w+=datirec[0][g].nmaglia+' '+htmlentities(datirec[0][g].cognome)+' ';
   w+=htmlentities(datirec[0][g].nome)+'</label></div></td>';
   ta[0][g-1]=datirec[0][g].tiri.split(';');
  } else {
   w+='<td></td>';
  }
  if (g==1){
   w+='<td rowspan="'+m+'" colspan="'+tempodigioco+'" style="background-color: white;">';
   w+='<div id="campodiv" style="margin: auto; width: 300px; height: 560px; padding: 0; border: 1px solid #F0AD4E;';
   if (!esporta)
    w+=' background-image: url(\'/img/campochiaro.jpg\');';
   w+='">';
   w+='<canvas id="disegno" width="300" height="560">';
   w+='</canvas></div>';
   w+='</td>';
  }
  if (g<=datirec[1][tot].dati[vcprt]){
   w+='<td class="tal"><div class="checkbox"><label><input name="giocb[]" type="checkbox" checked>';
   w+=datirec[1][g].nmaglia+' '+htmlentities(datirec[1][g].cognome)+' ';
   w+=htmlentities(datirec[1][g].nome)+'</label></div></td>';
   ta[1][g-1]=datirec[1][g].tiri.split(';');
  } else {
   w+='<td></td>';
  }
  w+='</tr>';
 }
 w+='</tbody></table>';
 w+='</form>';
 return w;
}

function stpreflegg(inverso){
 if (typeof inverso=='undefined') inverso=false;
 var d,r,w;
 w='<h3 style="text-align: center;">'+htmlentities(prt2rec.nomecortosq[0]+' - '+prt2rec.nomecortosq[1])+' '+prt2rec.ris+'</h3>';
 w+='<h2 style="text-align: center;">Referto leggibile</h2>';
 w+='<table style="margin-left: auto; margin-right: auto; border-collapse: collapse; text-align: center !important;" class="table table-striped">';
 w+='<colgroup>';
 w+='<col style="width: 40%;">';
 w+='<col style="width: 20%;">';
 w+='<col style="width: 40%;">';
 w+='</colgroup>';
 if (inverso) r=reflegg.length-1;
 else r=0;
 while ((r>=0)&&(r<reflegg.length)){
  w+='<tr>';
  d=reflegg[r].riga[0].indexOf('<div');
  if (d>0)
   d=reflegg[r].riga[0].substr(d)+htmlentities(reflegg[r].riga[0].substr(0,d));
  else
   d=htmlentities(reflegg[r].riga[0]);
  w+='<td>'+d+'</td>';
  w+='<td>'+htmlentities(reflegg[r].riga[2])+'</td>';
  d=reflegg[r].riga[1].indexOf('<div');
  if (d>0)
   d=reflegg[r].riga[1].substr(d)+htmlentities(reflegg[r].riga[1].substr(0,d));
  else
   d=htmlentities(reflegg[r].riga[1]);
  w+='<td>'+d+'</td>';
  w+='</tr>';
  if (inverso) r--;
  else r++;
 }
 w+='</table>';
 return w;
}

function stpstatistiche(){
 var d,flag,g,i,j,m,oerd,r,s,t,x,y;
 var w='';
 var numcol=((datirec[0][tot].dati[vcprt]==0)||(datirec[1][tot].dati[vcprt]==0))?26:27;
 w+='<table class="stat nobrd">';
 w+='<tr class="tac"><td colspan="'+numcol+'"><b>';
 w+=camprec.nomecamp+' Gir. '+camprec.girone+'<br>';
 s=prtrec.dataora;
 y=parseInt(s.substr(0,4),10);
 m=parseInt(s.substr(5,2),10);
 g=parseInt(s.substr(8,2),10);
 d=new Date(y,m-1,g);
 w+='DOMLUNMARMERGIOVENSAB'.substr(d.getDay()*3,3)+' '+g+'/'+m+'/'+y+s.substr(10);
 w+=' '+prtrec.giornata+'&ordf; giornata Gara '+prtrec.ngara+'<br>';
 w+='Rilevazioni di '+htmlentities(prt2rec.rilevatori)+'<br><br>';
 w+='<i>'+htmlentities(prt2rec.nomecortosq[0]+' - '+prt2rec.nomecortosq[1])+' '+prt2rec.ris;
 w+=' ('+prt2rec.parz+') &bull; Arbitri: '+htmlentities(prt2rec.arbitri);
 w+='</i></b></td></tr>';
 if (tempodigioco>1)
  for(s=0;s<=1;s++)
   periodocopiatot(tempodigioco,s);
 for(s=0;s<=1;s++){
  if (datirec[s][tot].dati[vcprt]==0)
   continue;
  j=datirec[s][tot].dati[vcts1]+datirec[s][tot].dati[vcts0]+datirec[s][tot].dati[vctf1]+datirec[s][tot].dati[vctf0]+datirec[s][tot].dati[vct31]+datirec[s][tot].dati[vct30]+datirec[s][tot].dati[vcpp];
  j=j*6+datirec[s][tot].dati[vcstl6];
  if (j>0)
   oerd=-(6*punti(s,tot)/j);
  else
   oerd=0;
  j-=6*datirec[s][tot].dati[vcro];
  if (j>0)
   oerd+=(6*punti(s,tot)/j);
  else
   oerd=0;
  w+='<tr class="tac"><td colspan="'+numcol+'"><br><b class="lrg">'+htmlentities(prt2rec.nomesq[s]);
  w+='</b><br>All.: '+htmlentities(prt2rec.coach[s])+'<br></td></tr>';
  w+='<tr class="tar">';
  w+='<td><i>#</i></td>';
  w+='<td></td>';
  if (prtrec.sesso[s]=='F')
   t='GIOCATRICE';
  else
   t='GIOCATORE';
  w+='<td class="tal"><i>'+t+'</i></td>';
  w+='<td><i>PUN</i></td>';
  w+='<td class="tac"><i>MIN</i></td>';
  w+='<td><i>FF</i></td>';
  w+='<td><i>FS</i></td>';
  w+='<td class="tac" colspan="3"><i>T2</i></td>';
  w+='<td class="tac" colspan="3"><i>T3</i></td>';
  w+='<td class="tac" colspan="4"><i>TL(stl)</i></td>';
  w+='<td><i>RO</i></td>';
  w+='<td><i>RD</i></td>';
  w+='<td><i>SD</i></td>';
  w+='<td><i>SS</i></td>';
  w+='<td><i>PP</i></td>';
  w+='<td><i>PR</i></td>';
  w+='<td><i>AS</i></td>';
  w+='<td><i>VAL</i></td>';
  w+='<td class="tac"><i>OERR</i></td>';
  if (numcol==27)
   w+='<td><i>&plusmn;</i></td>';
  w+='</tr>';
  for(g=1;g<=tot;g++){
   if ((g<=datirec[s][tot].dati[vcprt])||(g>=sq)){
    flag=(g!=sq);
    w+='<tr class="tar">';
    if (g<sq){
     w+='<td>'+datirec[s][g].nmaglia+'</td>';
     if (datirec[s][g].dati[vcst]==0)
      t='';
     else
      t='*';
     w+='<td>'+t+'</td>';
     w+='<td class="tal">'+htmlentities(datirec[s][g].cognome+' '+datirec[s][g].nome)+'</td>';
    } else {
     w+='<td></td>';
     w+='<td></td>';
     w+='<td class="tal">'+datirec[s][g].cognome+'</td>';
    }
    t=punti(s,g);
    if ((!flag)&&(t==0)) t='';
    w+='<td>'+t+'</td>';
    if (flag){
     j=datirec[s][g].dati[vcmin]*60+datirec[s][g].dati[vcsec];
     i=Math.floor(j/60);
     j=j%60;
     t=i+'&prime;'+(('0'+j).slice(-2))+'&Prime;';
    } else t='';
    w+='<td>'+t+'</td>';
    w+='<td>'+datirec[s][g].dati[vcff]+'</td><td>';
    if (flag) w+=datirec[s][g].dati[vcfs];
    w+='</td>';
    i=vcts1;
    while (i<vctl0){
     x=datirec[s][g].dati[i];
     if (i==vcts1)
      x+=datirec[s][g].dati[vctf1];
     if ((flag)||(x!=0)){
      t='<td>'+x+'/</td>';
      j=x+datirec[s][g].dati[i+1];
      if (i==vcts1) j+=datirec[s][g].dati[vctf0];
      t+='<td>'+j+'</td><td>';
      if (j>0){
       t+=(100*x/j).toFixed(1).replace('.',',')+'%';
      }
      t+='</td>';
     } else {
      t='<td colspan="3"></td>';
     }
     if (i==vcts1) i=vctf1;
     w+=t;
     i+=2;
    }
    if (flag){
     t=datirec[s][g].dati[vcstl6];
     if (t==0){
      t='';
     } else {
      x=(t%6)==0?0:1;
      t='('+(t/6).toFixed(x).replace('.',',')+')';
     }
    } else
     t='';
    w+='<td>'+t+'</td>';
    for(i=vcro;i<=vcas;i++){
     if ((flag)||([vcro, vcrd, vcpp].indexOf(i)>=0))
      t=datirec[s][g].dati[i];
     else
      t='';
     w+='<td>'+t+'</td>';
    }
    w+='<td>'+valut(s,g)+'</td>';
    j=datirec[s][g].dati[vcts1]+datirec[s][g].dati[vcts0]+datirec[s][g].dati[vctf1]+datirec[s][g].dati[vctf0]+datirec[s][g].dati[vct31]+datirec[s][g].dati[vct30]+datirec[s][g].dati[vcpp];
    j=j*6+datirec[s][g].dati[vcstl6];
    if (j>0){
     t=(6*punti(s,g)/j);
     if (datirec[s][g].dati[vcro]>0)
      t=t+(datirec[s][g].dati[vcro]/datirec[s][tot].dati[vcro])*oerd;
     t=t.toFixed(3).replace('.',',');
    } else if (datirec[s][g].dati[vcro]>0){
     t=((datirec[s][g].dati[vcro]/datirec[s][tot].dati[vcro])*oerd).toFixed(3).replace('.',',');
    } else
     t='';
    w+='<td>'+t+'</td>';
    if (numcol==27){
     if (flag) //else non serve perché t='', ma adesso riserve
      t=datirec[s][g].dati[vcpm];
     else
      t='';
     w+='<td>'+t+'</td>';
    }
    w+='</tr>';
   }
  }
  if (tempodigioco>1){
   for(g=1;g<=Math.abs(ent[s]);g++){
    w+='<tr class="tar">';
    if (g<=camprec.tempi)
     t=g+'&ordm; tempo';
    else
     t=(g-camprec.tempi)+'&ordm; suppl.';
    w+='<td></td>';
    w+='<td></td>';
    w+='<td class="tal"><i>'+t+'</i></td>';
    r=2*periododiff(g,s,vcts1)+2*periododiff(g,s,vctf1)+3*periododiff(g,s,vct31)+periododiff(g,s,vctl1);
    w+='<td>'+r+'</td>';
    j=periododiff(g,s,vcmin)*60+periododiff(g,s,vcsec);
    i=Math.floor(j/60);
    j=j%60;
    t=i+'&prime;'+(('0'+j).slice(-2))+'&Prime;';
    w+='<td>'+t+'</td>';
    for(i=vcff;i<=vcfs;i++)
     w+='<td>'+periododiff(g,s,i)+'</td>';
    i=vcts1;
    while (i<vctl0){
     j=periododiff(g,s,i);
     if (i==vcts1)
      j=j+periododiff(g,s,vctf1);
     t='<td>'+j+'/</td>';
     x=j;
     j=j+periododiff(g,s,i+1);
     if (i==vcts1){
      i=vctf1;
      j=j+periododiff(g,s,vctf0);
     }
     t+='<td>'+j+'</td><td>';
     if (j>0){
      t+=(100*x/j).toFixed(1).replace('.',',')+'%';
     }
     t+='</td>';
     w+=t;
     i+=2;
    }
    t=periododiff(g,s,vcstl6);
    if (t==0){
     t='';
    } else {
     x=(t%6)==0?0:1;
     t='('+(t/6).toFixed(x).replace('.',',')+')';
    }
    w+='<td>'+t+'</td>';
    for(i=vcro;i<=vcas;i++){
     t=periododiff(g,s,i);
     w+='<td>'+t+'</td>';
    }
    t=r+periododiff(g,s,vcfs)+periododiff(g,s,vcro)+periododiff(g,s,vcrd)+periododiff(g,s,vcsd)+periododiff(g,s,vcpr)+periododiff(g,s,vcas)-periododiff(g,s,vcff)-periododiff(g,s,vcts0)-periododiff(g,s,vctf0)-periododiff(g,s,vct30)-periododiff(g,s,vctl0)-periododiff(g,s,vcss)-periododiff(g,s,vcpp);
    w+='<td>'+t+'</td>';
    j=periododiff(g,s,vcts1)+periododiff(g,s,vcts0)+periododiff(g,s,vctf1)+periododiff(g,s,vctf0)+periododiff(g,s,vct31)+periododiff(g,s,vct30)+periododiff(g,s,vcpp)-periododiff(g,s,vcro);
    j=j*6+periododiff(g,s,vcstl6);
    if (j>0)
     t=(r*6/j).toFixed(3).replace('.',',');
    else
     t='';
    w+='<td>'+t+'</td>';
    if (numcol==27){
     t=periododiff(g,s,vcpm);
     w+='<td>'+t+'</td>';
    }
    w+='</tr>';
   }
  }
  w+='<tr><td colspan="'+numcol+'">SeqTL:'+datirec[s][tot].seqtl+'</td></tr>';
  w+='<tr><td colspan="'+numcol+'">Punti dopo RO: '+adrec[s].ropun+'. RFT: '+adrec[s].rft+'. AzP:'+adrec[s].azp+'. AzR:'+adrec[s].azr+'. FsSq:'+adrec[s].fssq+'.';
  if (datirec[1-s][tot].dati[vcprt]!=0)
   w+=' PRI: '+adrec[s].pri+'+'+adrec[s].pra+'.';
  if (adrec[s].cpnum>0)
   w+=' Contropiedi: '+adrec[s].cpnum+', '+adrec[s].cppun+'pun, '+adrec[s].cppp+'pp.';
  w+='</td></tr>';
 }
 w+='</table>';
 return w;
}

function stptabtxt(){
 var nl='\n';
 var w='';
 //w+='<pre style="white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;">';
 nl='<br>';
 w+='<div class="jumbotron">';
 w+=prt2rec.nomecortosq[0]+' - '+prt2rec.nomecortosq[1]+' '+prt2rec.ris+nl;
 w+='('+prt2rec.parz+')'+nl;
 for(var s=0;s<=1;s++){
  w+=nl;
  w+=prt2rec.nomesq[s]+': ';
  for(var i=1;i<=datirec[s][tot].dati[vcprt];i++){
   if (i>1)
    w+=', ';
   w+=datirec[s][i].cognome+' '+datirec[s][i].nome;
   var p=punti(s,i);
   if (p>0)
    w+=' '+p;
  }
  p=punti(s,sq);
  if (p!=0) w+='. Squadra '+p+' (autocanestro)';
  w+='. All.: '+prt2rec.coach[s]+'.'+nl;
 }
 w+=nl+'Arbitri: '+prt2rec.arbitri+nl;
 //w+='</pre>';
 w+='</div>';
 return w;
}

function valut(s,g){
 return datirec[s][g].dati[vcfs]+punti(s,g)+datirec[s][g].dati[vcro]+datirec[s][g].dati[vcrd]+datirec[s][g].dati[vcsd]+datirec[s][g].dati[vcpr]+datirec[s][g].dati[vcas]-datirec[s][g].dati[vcff]-datirec[s][g].dati[vcts0]-datirec[s][g].dati[vctf0]-datirec[s][g].dati[vct30]-datirec[s][g].dati[vctl0]-datirec[s][g].dati[vcss]-datirec[s][g].dati[vcpp];
}

function htmlentities(str){
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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