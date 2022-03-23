const
 pronto='OFFLINE pronta',
 nonpronto='OFFLINE non disponibile';

var acOK,cacheProgress,cacheProperties,firstrun,nomeCache,offlineState,swOK,tipoCache,version,versionBP;

cacheProgress=$('#cacheProgress');
cacheProperties={
 filesDownloaded:0,
 totalFiles:0,
 fileNames:[]
};
version=$('#versione');
offlineState=$('#offlinestate');
firstrun=true;
swOK=('serviceWorker' in navigator);
acOK=('applicationCache' in window);
tipoCache=swOK?' SW':(acOK?' AC':'');

$('#manualUpdate').click(function(event){
 event.preventDefault();
 getTotalFiles();
});

getTotalFiles();

function displayProgress(str){
 if (str) {
  cacheProgress.text(str);
  console.log(str);
  return;
 }
 cacheProperties.filesDownloaded++;
 if (cacheProperties.totalFiles){//conosco i files totali
  str='Progresso: '+cacheProperties.filesDownloaded+' di '+cacheProperties.totalFiles+' files caricati';
  cacheProgress.text(str);
  console.log(str);
 } else {//non conosco i files totali
  str=cacheProperties.filesDownloaded+' files caricati';
  cacheProgress.text(str);
  console.log(str);
 }
}

function getTotalFiles(){
 if (swOK){
  displayProgress('Caricamento file cache');
  offlineReady(false);
 }
 cacheProperties.filesDownloaded=0;
 cacheProperties.totalFiles=0;
 $.ajax({
  type:"get",
  url:"./baskpad2.manifest",
  dataType:"text",
  success:function(content){
   //cerco la versione
   var p,r;
   p=content.indexOf('#Versione');
   r=content.indexOf('\n',p);
   versionBP=content.substring(p+10,r);
   nomeCache='baskpad.pwa_v'+versionBP;
   version.text('Versione '+versionBP+tipoCache);
   getTotalFilesCB();
  }
 });

 function getTotalFilesCB(){
  if (swOK){
   displayProgress('Esecuzione in corso');
   offlineReady(false);
  }
  $.ajax({
   type:"get",
   url:"./baskpad.manifest",
   dataType:"text",
   cache:false,
   success:function(content){
    //cerco la versione
    var p,r;
    p=content.indexOf('#Versione');
    r=content.indexOf('\n',p);
    versionBP=content.substring(p+10,r);
    nomeCache='baskpad.pwa_v'+versionBP;
    //elimina le righe non di cache
    content=content.replace(new RegExp('(NETWORK|FALLBACK):'+'((?!(NETWORK|FALLBACK|CACHE):)[\\w\\W]*)','gi'),'');
    //elimina i commenti
    content=content.replace(new RegExp('#[^\\r\\n]*(\\r\\n?|\\n)','g'),'');
    //elimina la testata e le righe che finiscono con /
    content=content.replace(new RegExp('CACHE MANIFEST\\s*|\\s*$','g'),'');
    //sostituisce i ritorni a capo con #
    content=content.replace(new RegExp('[\\r\\n]+','g'),'#');
    //trova il numero di files
    cacheProperties.fileNames=content.split("#");
    cacheProperties.totalFiles=cacheProperties.fileNames.length+1;
    //lancio swInstall
    if (firstrun){
     firstrun=false;
     swInstall();
    } else if (swOK) swInizia();
   },
   error:function(){
    displayProgress('Errore nel controllo');
    offlineReady((swOK)||(acOK));
   }
  });
 }
}

function offlineReady(state){
 console.log('offlineReady',state);
 offlineState.text(state?pronto:nonpronto);
}

function swInizia(){
 var aggiornati,eliminati;
 aggiornati=eliminati=false;
 caches.keys()
 .then(function(keyList){
  return Promise.all(keyList.map(function(key){
   if (nomeCache!=key){
    eliminati=true;
    displayProgress('Elimino i vecchi files');
    console.log('Cancello',key);
    return caches.delete(key)
    .then(function(bool){
     if (bool) console.log('Cancellata',key);
     else console.log('Non cancellata',key);
     return Promise.resolve();
    });
   } else return Promise.resolve();
  }));
 })
 .then(function(){
  return caches.has(nomeCache)
  .then(function(bool){
   console.log('Check se',nomeCache,'esiste',bool);
   if (!bool){
    aggiornati=true;
    return caches.open(nomeCache)
    .then(function(cache){
     cacheProperties.totalFiles=cacheProperties.fileNames.length;
     return Promise.all(cacheProperties.fileNames.map(function(fileName){
      return fetch(fileName)
      .then(function(response){
       console.log('Aggiungo',response.url);
       return cache.put(response.url,response)
       .then(function(){
        displayProgress();
        console.log('Aggiunto',response.url);
        return Promise.resolve();
       });
      });
     }));
    });
   } else return Promise.resolve();
  });
 })
 .then(function(){
  if (aggiornati){
   offlineReady(true);
   if (eliminati){
    displayProgress('Nuovi files disponibili');
    setTimeout(function(){
     window.location.reload();
    },3000);
   } else displayProgress('Caricati tutti i files');
  } else if (!eliminati){
   displayProgress('Nessun aggiornamento');
   offlineReady(true);
  }
 });
}

function swInstall(){
 console.log('Test Service Worker');
 if (swOK){
  navigator.serviceWorker.register('sw.js')
  .then(function(registration){
   console.log('Registration successful, scope is:', registration.scope);
   navigator.serviceWorker.ready.then(function(reg){
    console.log('navigator.serviceWorker.ready concluso, e navigator.serviceWorker.controller è',navigator.serviceWorker.controller);
    if (navigator.serviceWorker.controller){
     swInizia();
    } else {
     navigator.serviceWorker.addEventListener('controllerchange',function(event){
      console.log('OK, ora navigator.serviceWorker.controller è',navigator.serviceWorker.controller);
      swInizia();
     });
    }
   });
  })
  .catch(function(error){
   alert('Registrazione service worker fallita, errore: '+error);
  });
 } else {
  console.log('Test ApplicationCache');
  if (acOK){
   console.log('Uso ApplicationCache');
   $('#manualUpdate').off('click');
   var iframe=document.createElement('iframe');
   iframe.setAttribute('style','width:0px;height:0px;visibility:hidden;display:none;position:absolute;border:none;');
   iframe.src='manifest.htm';
   iframe.id='appcacheloader';
   document.body.appendChild(iframe);
  }
 }
}