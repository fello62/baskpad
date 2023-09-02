# Baskpad
Web App per la rilevazione statistica nella pallacanestro.

BaskPad è una "web app", cioè un'applicazione in grado di girare con il supporto di un navigatore web; grazie alle caratteristiche dei browser moderni, è in grado di lavorare anche offline, senza avere il bisogno di essere connessi ad Internet. Tutti i dati memorizzati dall'applicazione risiedono e vengono mantenuti all'interno del dispositivo che la utilizza, e quindi non vengono inviati ad un server esterno, con l'esclusione di apposite procedure per l'esportazione dei dati che ne permettono il backup.
Può essere utilizzato qualsiasi browser moderno. Il codice Javascript usato è stato volutamente mantenuto compatibile il più possibile con le vecchie specifiche ECMA5, anche con librerie esterne non aggiornate all'ultima versione; questo per fare in modo che anche vecchi dispositivi possano utilizzare l'app. L'unica eccezione al riguardo è l'installazione offline con service worker, dove, per forza di cose, si devono usare le _Promise_ di ECMA6.

È possibile usare l'applicazione su PC (Windows, Linux o Mac) o su tablet (iPad oppure Android): si potrebbe usarla anche su smartphone, ma le dimensioni limitate degli schermi ne ostacolerebbero il corretto utilizzo.

Termini legali: l'app è liberamente utilizzabile da chiunque. Al suo interno vengono usate librerie di terzi (Bootstrap, FastClick, JQuery) per le cui licenze si rimanda ai rispettivi produttori. Non vengono usati cookies, ma tecnologie di memorizzazione dati nel browser, che quindi non implicano l'invio dei dati ad un server esterno.

## Installazione offline

Esistono due tecnologie per l'installazione offline dell'app; la prima è basata sull'_application cache_, la seconda sul _service worker_. Si consiglia di usare l'application cache su browsers obsoleti, mentre il service worker va usato su quelli più recenti. Tenere anche in conto che l'Application Cache viene considerata deprecata, per cui, andando avanti col tempo, i browsers tenderanno a rimuoverne il supporto.

In caso di mancato funzionamento di queste due tecnologie, questo può dipendere dal tipo di connessione col server: i browsers più recenti esigono per sicurezza solo connessioni https, cioè criptate, cosa questa poi assolutamente obbligatoria per l'uso di un service worker. In caso di malfunzionamento, modificare l'URL di questa pagina da _http_ a _https_.

## Installazione database

Sono disponibili tre diverse tecnologie per la memorizzazione sul proprio dispositivo dei dati necessari al funzionamento dell'app:
#### Array di dati su localStorage
Tutto l'archivio viene completamente contenuto in memoria, e salvato in modo permanente usando la tecnologia localStorage; si consiglia l'uso per archivi di piccole dimensioni, visto che i browsers limitano la capienza di localStorage a 5/10 Mb. Può funzionare su praticamente qualsiasi navigatore, vecchio o nuovo che sia.
#### WebSql
Tecnologia consigliata su vecchi browsers, consente la memorizzazione di ampie moli di dati. I problemi sono che non viene più aggiornata, alcuni navigatori non l'hanno mai adottata, ed altri l'hanno rimossa o lo faranno in futuro. È basata sulla libreria SQLite, che veniva usata anche quando questa app era un programma in Pascal per PC sotto Linux o Windows, per cui l'esportazione dei dati è stata comunque mantenuta con un linguaggio SQL compatibile con questa libreria.
#### IndexedDb
Tecnologia consigliata su browsers recenti, consente anche lei la memorizzazione di ampie moli di dati. Il problema è che sui dispositivi più vecchi non funziona oppure è buggata.

## Database

Il database è suddiviso in tabelle che vanno impostate prima di poter rilevare una partita:
#### Società
Nomi delle società cui appartengono le squadre
#### Squadre
Squadre che disputano i vari campionati
#### Campionati
Nomi dei campionati o delle fasi di campionato che vengono disputati dalle squadre
#### Campionati-Squadre
Tabella di relazione per collegare le squadre ad uno o più campionati che disputano
#### Giocatori
Dati degli atleti
#### Squadre-Giocatori
Tabella di relazione per collegare un giocatore ad una o più squadre di appartenenza. Per poter assegnare un giocatore a più squadre contemporaneamente, occorre che le categorie delle squadre siano diverse (es.: Senior, Under 19). Se si vuole assegnare un giocatore ad un'altra squadra della stessa categoria di quella cui già appartiene, bisogna rimuoverlo dalla prima squadra
#### Partite
Elenco delle partite di un campionato. È sufficiente immettere solo gli incontri di cui si vogliono rilevare le statistiche

Tutte le assegnazioni di squadre e campionati sono relative ad un anno sportivo, questo per poter suddividere i dati tra le varie annate.

È possibile resettare, importare ed esportare il database. I files di importazione ed esportazione sono in formato di testo SQL compatibile con SQLite. Nel caso in cui si utilizzi l'app a tutto schermo sui dispositivi mobili, si potrebbero verificare problemi relativi alle procedure di importazione ed esportazione del database (così come nel caso di upload del referto della partita), dovuti al fatto che i sistemi operativi dei dispositivi possono bloccare le operazioni sui files: in tali situazioni è possibile bypassare i problemi applicando dei semplici "copia-incolla" sulle apposite aree di testo.

## Generali

I dati generali sono la somma dei valori ricavati da tutte le partite giocate da una squadra, in uno o più campionati disputati.


Partita

La procedura della partita inizia con la scelta della gara su cui si vuole lavorare.

Le impostazioni di rilevazione consentono di scegliere l'opzione "punto" (indispensabile quando si rilevano entrambe le squadre), l'opzione per rilevare i tiri indicando la posizione sul campo, e, in caso di scelta di questa, l'opzione per indicare i tiri da sotto come quelli entro i tre metri dal canestro oppure quelli dentro l'area dei tre secondi.

Se è la prima volta che si elabora la partita aperta, vengono richieste le intestazioni (utilizzate in seguito nelle varie stampe) ed i numeri di maglia da assegnare ai giocatori. Riguardo ai numeri di maglia, si può utilizzare qualsiasi numero formato da una o due cifre. Se non viene indicato un numero, vuol dire che il giocatore non è stato iscritto a referto, e che quindi non partecipa all'incontro.

Nelle intestazioni ci sono due campi per risultato e parziali dei tempi di gioco: questi vengono aggiornati automaticamente dall'app solo se la rilevazione viene fatta su entrambe le squadre, mentre vanno aggiornati manualmente se viene rilevata solo una squadra.

La pagina della partita presenta, nella barra del menù, due bottoni per zoomare la finestra: questi funzionano, modificando il "viewport", solo su dispositivi mobili e non su PC; usandoli danno la possibilità di far rientrare tutti gli elementi della pagina nello schermo anche su quei dispositivi Android che presentano lo schermo più stretto rispetto agli iPad.

Il riquadro della partita presenta un campo per immissione di testo: qui verranno immessi, tramite i vari bottoni presenti oppure anche direttamente con la tastiera (metodo sconsigliato!), le sigle di giocatori ed azioni che avvengono durante la gara; le sigle immesse verranno poi elaborate quando verrà premuto il grande bottone blu a destra del campo di immissione. Il bottone con freccia destra, posto a sinistra del campo, consente di cancellare l'ultima sigla immessa, mentre il bottone SP consente di aggiungere uno spazio per separare l'ultima sigla immessa da quella che verrà (utile solo in caso di opzione "punto" selezionata per evitare di assegnare un'azione corrispondente).

Sigle

Le sigle utilizzate per l'immissione sono le seguenti:

PP
    palla persa
PR
    palla rubata (o azione recuperata se assegnata alla squadra)
SD
    stoppata data
SS
    stoppata subita
FF
    fallo fatto
FS
    fallo subito
FFP
    fallo fatto in attacco con palla persa (se è iniziato, conclude anche il contropiede): sfondamento o tecnico
FFA
    fallo fatto con azione persa: con libero aggiuntivo, tecnico in difesa, antisportivo, squalificante
FSP, FSA
    fallo subito con azione recuperata: in difesa, con libero aggiuntivo, tecnico, antisportivo, squalificante; sono identiche, ma cambia il loro dato corrispondente (FFP o FFA) in caso di immissione dati con l'opzione "punto"
AS
    assist
CP
    azione in contropiede (il contropiede viene concluso in automatico da un tiro o una palla persa, ma ricomincia se il tiro sbagliato è seguito da rimbalzo offensivo; reinserendo la sigla, lo stato di contropiede viene chiuso)
RO
    rimbalzo offensivo
RD
    rimbalzo difensivo
PRI
    palla recuperata iniziale (da usare per la palla a due di inizio partita o per impostare il possesso alternato in caso di falli negli intervalli)
RFT
    rimbalzo difensivo di fine tempo (da assegnare dopo un tiro sbagliato allo scadere, oppure dopo un tiro libero sbagliato seguito da rimessa laterale, causato da fallo tecnico, antisportivo o squalificante, in inglese dead ball rebound)
AP
    azione persa: il dato corrispondente è un'azione recuperata (SQ PR)
SC1
    schiacciata realizzata
TS1
    tiro da sotto realizzato
TS0
    tiro da sotto sbagliato
TF1
    tiro da fuori realizzato
TF0
    tiro da fuori sbagliato
T31
    tiro da tre realizzato
T30
    tiro da tre sbagliato
TX...
    tiro eseguito nella metà campo dove attacca la squadra A (viene poi trasformato in TS, TF o T3)
TY...
    tiro eseguito nella metà campo dove attacca la squadra B (viene poi trasformato in TS, TF o T3)
TL1,TL0,TL00,TL01,TL10,TL11,TL000,TL111,ecc.
    tiri liberi
'
    commento (da non visualizzare nel referto leggibile)
NOTE
    commento (da visualizzare nel referto leggibile)
TMP
    tempo rimasto da giocare (usato solo per compatibilità col programma per PC)
AA
    attacco squadra A
AB
    attacco squadra B
DA
    difesa squadra A
DB
    difesa squadra B
ENT
    entrate (all'inizio dei tempi di gioco)
S
    sostituzione
A4,A5,A12,A00,A33,ecc.
    giocatori della squadra A
B4,B5,B12,B00,B33,ecc.
    giocatori della squadra B
ASQ
    squadra A (per assegnarle falli, rimbalzi e palle)
BSQ
    squadra B (per assegnarle falli, rimbalzi e palle)

Immissione tiri

Se si è optato per la rilevazione dei tiri sul campo di gioco:

    l'orientamento del campo varia col variare di quello del tablet, verticale od orizzontale
    la scelta del canestro in cui tirano le due squadre si ottiene tramite i due piccoli bottoni A e B posti dietro i canestri
    il tiro viene registrato cliccando la posizione sul campo da gioco, indicata da un pallino rosso; continuando la pressione del click o del tap per più di mezzo secondo, il pallino cambia colore diventando verde. Al momento del rilascio, in caso di pallino rosso, il tiro verrà registrato come sbagliato, mentre se il pallino è verde il tiro verrà indicato come realizzato. In caso di schiacciata realizzata, premere il bottone SC1: se questo risulta essere l'ultima sigla nella riga d'immissione, a questo punto, cliccando la posizione sul campo (senza bisogno di pressione "lunga"), la posizione della schiacciata verrà inserita nella riga d'immissione.

Il tiro verrà poi elaborato dall'app in automatico come tiro da sotto, da fuori o da tre a seconda della posizione indicata e dell'opzione "3 metri/area" selezionata.

In caso di errore dovuto alla mancata sistemazione dei bottoni A e B, per cui, ad esempio, un tiro da sotto venisse trasformato in un tiro da 3 da oltre metà campo, basterà modificare il referto sostituendo il T3 con un TY se il tiro era della squadra A, altrimenti con un TX in caso di squadra B.

In caso di tiri liberi immessi tramite l'apposita finestra di dialogo, se nessun libero è realizzato, verrà cancellato l'eventuale assist presente nella riga d'immisione.

Opzione "punto"

Quando si rilevano due squadre contemporaneamente, l'uso del punto è praticamente indispensabile perché riduce il numero dei click necessari durante l'immissione dei dati. Il concetto da capire è questo: per ogni azione ne esiste una corrispondente, per cui, se dopo l'azione mettiamo un punto e la sigla di un giocatore, a questo verrà assegnata l'azione corrispondente. Qualche esempio:

A5 TS0.A7
    tiro sbagliato del 5 e rimbalzo offensivo del 7 della squadra A
A5 TS0.B7
    tiro sbagliato del 5 della squadra A e rimbalzo difensivo del 7 della squadra B
A5 TS1.A7
    assist del 7 e tiro da sotto realizzato dal 5 della squadra A
A5 FF.B7
    fallo fatto del 5 della squadra A e fallo subito del 7 della squadra B

Negli ultimi due casi, usando la tastiera per l'immissione, volendo si potrebbe omettere l'inserimento della lettera tra il punto ed il numero del giocatore perché è implicito che l'assist lo dia un giocatore della stessa squadra o che il fallo sia subito da uno dell'altra.
Parentesi []

Molti dati vengono racchiusi tra parentesi quadre poste dopo una sigla: posizioni dei tiri, tempo di gioco e numeri dei giocatori per entrate e sostituzioni, ecc. Se si vogliono rilevare attacchi e difese, dentro le parentesi va immesso il nome dell'attacco o della difesa.
Dati comparativi

Al di sotto dei bottoni con le sigle dei giocatori, c'è una tabella contenente i dati che servono per controllare e verificare il lavoro che si sta facendo comparandoli tra le due squadre: ci sono i punti (da verificare sul tabellone elettronico), la situazione del bonus, falli fatti e subiti, rimbalzi difensivi e difensivi degli avversari (trovati usando la formula tiri sbagliati - rimbalzi offensivi), stoppate date e subite, palle perse e recuperate, chi ha il possesso del pallone (indicato dal numero 1); ci sono inoltre i quozienti di tiro. Se qualche valore non combina col corrispondente della squadra avversaria, viene segnalato cambiandogli il colore di sfondo.
La tabella Referto

La tabella del referto, posta in basso a destra, presenta tre colonne:

    il referto vero e proprio, con le sigle normalizzate nella forma "giocatore azione[]" oppure "sigla[]", con le parentesi quadre che per molte sigle sono opzionali oppure non servono. Ogni riga di questa colonna è cliccabile per poterla modificare
    punteggio progressivo e differenze tra le squadre: le sigle qui utilizzate consentono di scovare eventuali errori di rilevazione:

    1fa
        c'è un fallo fatto in più per A
    1pa
        c'è una palla persa in più per A
    1sa
        c'è una stoppata data in più per A
    -1ra
        c'è un rimbalzo in meno, difensivo per A, offensivo per B
    1fb
        c'è un fallo fatto in più per B
    1pb
        c'è una palla persa in più per B
    1sb
        c'è una stoppata data in più per B
    -1rb
        c'è un rimbalzo in meno, difensivo per B, offensivo per A
    1az
        l'azione fa sì che la differenza tra possesso A e possesso B sia maggiore di 1, e quindi viene snaturata la normale alternanza dei possessi
    cp1
        inizio contropiede
    cp0
        fine contropiede

    Quando compaiono queste sigle, nelle righe successive di solito vengono annullate: se questo non avviene, ci deve essere un errore.
    informazioni: se l'azione è un fallo fatto, vengono riportati i falli del giocatore, se è un tiro realizzato, i punti individuali ed il quoziente di tiro, ecc.
