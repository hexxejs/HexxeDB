const playhex = document.getElementsByTagName('player')[0];
const parentHexOr = playhex.parentElement; 
parentHexOr.style.position = "relative";
const parentHex = document.createElement("player");
parentHex.id = "parent-hex"; 
parentHexOr.appendChild(parentHex);
function newAud() {
if(playhex) {
const ifalbum = playhex.getAttribute("page");
const albumpage = document.createElement("div");
const abtrack = document.createElement("div"); 
abtrack.classList.add("abtrack");
abtrack.id = "abtrack";

playhex.classList.add("hex-player");
playhex.id = "hex-player";
const playherex = document.createElement("div"); 
playherex.classList.add("playherex");
playherex.id = "playherex";
playhex.appendChild(playherex);
const taudio = document.createElement("audio");
taudio.id = "taudio";
const tstatus = document.createElement("p");
tstatus.id = "tstatus";
tstatus.innerHTML = "pause";
tstatus.style.display = 'none';
const hexcontrol = document.createElement("div");
hexcontrol.classList.add("hexcontrol");
const trackslit = document.createElement("div");
trackslit.classList.add("trackslit");
trackslit.id = "trackslit";
const playslit = document.createElement("div");
playslit.classList.add("playslit");
playslit.id = "playslit";
const newprog = document.createElement("p");
newprog.id = "hexnewprog";
const totprog = document.createElement("p");
totprog.id = "hextotprog";
const trackslide = document.createElement("input");
trackslide.id = "trackslide"; 
trackslide.setAttribute("max", "1");
trackslide.setAttribute("min", "0"); 
trackslide.setAttribute("step", ".001");
trackslide.setAttribute("type", "range");
trackslide.setAttribute("value", "0");
const trackplay = document.createElement("button");
trackplay.setAttribute("onclick", "hexPlayer('none')");
trackplay.classList.add("trackplay");
trackplay.innerHTML = '<img id="trackplay" src="https://hexjs.vercel.app/Sum/files/play.png">';
const tracklist = document.createElement("div");
tracklist.classList.add("tracklist");
tracklist.id = "tracklist";
const tracknav = document.createElement("img");
tracknav.id = "tracknav";
tracknav.src = "https://hexjs.vercel.app/Sum/files/wnavlist.png";
tracknav.setAttribute("onclick", "togTrack()");
const trackrep = document.createElement("div");
trackrep.classList.add("trackrep");
if(ifalbum == "album") {
var arrowback = `<img src="https://hexjs.vercel.app/Sum/files/arrow-left.png" style="margin-right: 5px" onclick="document.getElementById('hex-player').style.visibility='hidden'">`;  
} else {
var arrowback = "";
}
trackrep.innerHTML = arrowback + '<img style="margin-left: 5px;" src="https://hexjs.vercel.app/Sum/files/wrepeat.png" id="trackrep" onclick="togTrackRep()"><img style="margin-left: 10px;" src="https://hexjs.vercel.app/Sum/files/wmute.png" id="mutehex" onclick="toghexMute()">';
const alltracks = document.createElement("div");
alltracks.classList.add("alltracks"); 
playherex.appendChild(trackrep);
playherex.appendChild(tracknav);
playherex.appendChild(tracklist);
tracklist.appendChild(alltracks);
playherex.appendChild(hexcontrol);
hexcontrol.appendChild(playslit);
playslit.appendChild(trackplay);
hexcontrol.appendChild(trackslit);
trackslit.appendChild(trackslide);
trackslit.appendChild(newprog);
trackslit.appendChild(totprog);
playherex.appendChild(taudio);
playherex.appendChild(tstatus);
const wavsrc = playhex.getElementsByTagName('track');
for (var i = 0; i < wavsrc.length; i++) { 
const hexsrc = wavsrc[i];
var hexnext = i+1;
if(hexnext == wavsrc.length) {
var hexnext = 0; 
}
var hexprev = i-1;
if(hexprev < 0) {
   var hexprev = 0; 
}
const trackrname = hexsrc.getAttribute("name");
const trackname = trackrname.replace(/\'/g, "’");
const trackrartist = hexsrc.getAttribute("artist");
const trackartist = trackrartist.replace(/\'/g, "’");
const trackcanvas = hexsrc.getAttribute("canvas");
const tracksource = wavsrc[0].getAttribute("src");
const alltracksource = hexsrc.getAttribute("src");
const tracklyrics = hexsrc.getAttribute("lyrics");
var trackshare = hexsrc.getAttribute("share");
if(trackshare == null) {
  var trackshare = window.location; 
}
const trackbody = document.createElement("div");
trackbody.classList.add("trackbody");
trackbody.id = "track"+i;
playherex.appendChild(trackbody); 
const trackimg = document.createElement("img");
trackimg.classList.add("trackcanvas");
trackimg.src = trackcanvas;
trackbody.appendChild(trackimg);
const titleframe = document.createElement("div");
titleframe.classList.add("t-frame"); 
trackbody.appendChild(titleframe);   
const tracktitle = document.createElement("p");
tracktitle.classList.add("trackname");
tracktitle.innerHTML = '<p id="trackname">'+trackname+'</p>';
titleframe.appendChild(tracktitle);
const trackart = document.createElement("p");
trackart.classList.add("trackartist");
trackart.innerText = trackartist;
trackbody.appendChild(trackart);
const tracksend = document.createElement("div");
tracksend.id = "tracksend";
tracksend.innerHTML = `<img onclick="shareTrack('`+trackshare+`', '`+trackname+`', '`+alltracksource+`', '`+trackcanvas+`', '`+trackartist+`')" src="https://hexjs.vercel.app/Sum/files/wshare.png">`;
trackbody.appendChild(tracksend);
const tcontrol = document.createElement("div");
tcontrol.classList.add("tcontrol");  
const playback = document.createElement("img"); 
playback.classList.add("playback");
playback.src = "https://hexjs.vercel.app/Sum/files/playback.png"; 
playback.id = "playback";
const playnext = document.createElement("img"); 
playnext.classList.add("playback");
playnext.src = "https://hexjs.vercel.app/Sum/files/playnext.png";
playnext.id = "playnext";
if(wavsrc.length == "1") {
playback.style.opacity = '0.5';
playnext.style.opacity = '0.5';
}
else {
playnext.setAttribute("onclick", "hexPlayer('"+hexnext+"')");
playback.setAttribute("onclick", "hexPlayer('"+hexprev+"')");
}
const trackspace = document.createElement("div");
trackspace.innerText = "-";
trackspace.id = "trackspace";
trackbody.appendChild(trackspace);
trackbody.appendChild(tcontrol);
tcontrol.appendChild(playback);
tcontrol.appendChild(playnext);
taudio.src = tracksource;
const onetrack = document.createElement("p");
onetrack.setAttribute("onclick", "hexPlayer('"+i+"'); togTrack()");
onetrack.classList.add("onetrack"); 
onetrack.innerHTML = '<p id="onename">'+trackname+'</p><in id="oneartist">'+trackartist+'</in>';
alltracks.appendChild(onetrack);
const tracktext = document.createElement("div"); 
tracktext.setAttribute("class", "tracktext longtext"); 
tracktext.id = "tracktext"+i;
trackbody.appendChild(tracktext);
const innerlyric = document.createElement("div"); 
innerlyric.classList.add("innerlyric");
innerid = makeid(7);
if(tracklyrics !== null) {
const thelyric = load(tracklyrics, '#'+innerid); } else {
innerlyric.innerHTML = '<in style="opacity: 0.5">No caption available</in>';   
}
innerlyric.id = innerid;
tracktext.appendChild(innerlyric);
if(ifalbum == "album") {
const eachtrack = document.createElement("div");
eachtrack.classList.add("eachtrack");
eachtrack.id = "eachtrack";
abtrack.appendChild(eachtrack);
const abname = document.createElement("div");
abname.classList.add("abname");
abname.id = "abname"; 
abname.setAttribute("onclick", "hexPlayer('"+i+"'); document.getElementById('hex-player').style.visibility='visible'");
abname.style.display='block';
abname.innerHTML = '<p id="abtitle">'+trackname+'</p><p id="abartist">'+trackartist+'</p>';
const absend = document.createElement("div");
absend.id = "absend";
absend.innerHTML = `<img onclick="shareTrack('`+trackshare+`', '`+trackname+`', '`+alltracksource+`', '`+trackcanvas+`', '`+trackartist+`')" src="https://hexjs.vercel.app/Sum/files/wshare.png">`;
eachtrack.appendChild(absend);
eachtrack.appendChild(abname);

}

}
if(ifalbum == "album") {
document.getElementById('hex-player').style.visibility = 'hidden';
albumpage.classList.add("albumpage");
albumpage.id = "albumpage";
parentHex.appendChild(albumpage);
const trackimg = document.createElement("img");
trackimg.classList.add("alcanvas");
trackimg.src = playhex.getAttribute("canvas");
albumpage.appendChild(trackimg);
const tracktitle = document.createElement("p");
tracktitle.classList.add("albumname");
tracktitle.innerText = playhex.getAttribute("name");
albumpage.appendChild(tracktitle);
const trackart = document.createElement("p");
trackart.classList.add("albumartist");
const albumartist = playhex.getAttribute("artist");
const albumart = albumartist.split(',');
trackart.innerText = albumart[0];
trackart.setAttribute("onclick", "location.href='"+albumart[1]+"'");
albumpage.appendChild(trackart);
albumpage.appendChild(abtrack);

}



const currtrace = document.createElement('p');
currtrace.id = "thecurr";
currtrace.style.display = 'none';
document.body.appendChild(currtrace);


 var audiot = document.getElementById('taudio');
 var slidet = document.getElementById('trackslide');

 
document.getElementById('trackslide').addEventListener("input",function(e){
    audiot.currentTime = this.value * audiot.duration;
});
setInterval(function() {
const thelis = document.getElementById('trackrep');
slidet.value = audiot.currentTime / audiot.duration;
if(audiot.currentTime == audiot.duration) {
if(thelis.style.filter == 'invert(0%)') {
    setTimeout(function() {
    
hexPlayer(anyRange('0', wavsrc.length));
    }, 100);
    
} else {

if(thelis.style.filter == 'invert(0.4) sepia(1) hue-rotate(20deg) saturate(1000%)') {
var thecurr = document.getElementById('thecurr').innerText; 
var thecurr = parseInt(thecurr);
var newcurr = thecurr + 1;
if(newcurr > wavsrc.length) {
var newcurr = 0;
}
 hexPlayer(newcurr);   
    
} else {
    
document.getElementById('trackplay').src = "https://hexjs.vercel.app/Sum/files/play.png"; 
document.getElementById('tstatus').innerHTML = "pause";}
}
}

}, 100);

setInterval(function() {
    const scrolyric = document.querySelectorAll('.tracktex'); 
for(var i = 0; i < scrolyric.length; i++) {
var currscroll = scrolyric[i];
const scrolltime = audiot.duration / audiot.currentTime; 
const longlyric = currscroll.scrollHeight; 
currscroll.scrollTop = longlyric / scrolltime; 

}
}, 3000);


setInterval(function() {
 const newprogt = audiot.currentTime;
let progmin = Math.floor(newprogt / 60);
let progsec = newprogt % 60;
progmin = progmin < 10 ? "0" + progmin : progmin;
progsec = progsec < 10 ? "0" + progsec : progsec;
progsec = Math.round(progsec).toFixed(0);       
 document.getElementById('hexnewprog').innerHTML = progmin + ":" + progsec;
 
 const rnewprogt = audiot.duration;
let rprogmin = Math.floor(rnewprogt / 60);
let rprogsec = rnewprogt % 60;
rprogmin = rprogmin < 10 ? "0" + rprogmin : rprogmin;
rprogsec = rprogsec < 10 ? "0" + rprogsec : rprogsec;
rprogsec = Math.round(rprogsec).toFixed(0);       
 
 document.getElementById('hextotprog').innerHTML = rprogmin + ":" + rprogsec;
}, 1000);



if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) { } else {
          

tlywidth = screen.width - 460;
const lyrtr = playhex.getElementsByTagName('track');
for (var i = 0; i < lyrtr.length; i++) {

const hextex = "tracktext"+i;
const hextext = document.getElementById(hextex);
hextext.style.position = 'absolute'; 
hextext.style.bottom = '0';
hextext.style.right = '0';
hextext.style.float = 'right';
hextext.style.height = '100%';
hextext.style.width = 'calc(100vw - 460px)';
hextext.zIndex = '4';
hextext.style.marginLeft = '460px !important';
document.getElementById('trackslit').style.marginBottom = '80px';
document.getElementById('playslit').style.marginBottom = '20px';
}




}



}

 
}function hexPlayer(currenth) {
var inicurr = currenth;
document.getElementById('thecurr').innerText = inicurr;
var thead = document.getElementsByTagName('head')[0];
const ticon = document.createElement("link"); 
ticon.setAttribute("rel", "icon");
var pstatus = document.getElementById('tstatus');
var pstat = pstatus.innerHTML
var playp = document.getElementById('trackplay');
var tracked = document.getElementById('taudio');
const tracsend = tracked.src;
const showtr = playhex.getElementsByTagName('track');
for (var i = 0; i < showtr.length; i++) { 
var currshow = showtr[i]; 
const currsend = currshow.getAttribute("src");
if(tracsend.includes(currsend)) {
const currname = currshow.getAttribute("name");
const curricon = currshow.getAttribute("canvas"); 
document.title = currname;
ticon.href = curricon; 
thead.appendChild(ticon);
}    
}
if(inicurr == "none") {
    if(pstat == "pause") { 
    tracked.play();
    pstatus.innerHTML = "play";
    playp.src = "https://hexjs.vercel.app/Sum/files/pause.png";
} else {
tracked.pause();   
pstatus.innerHTML = "pause";
playp.src = "https://hexjs.vercel.app/Sum/files/play.png";
    
}

} else {
    
const showtr = playhex.getElementsByTagName('track');
for (var i = 0; i < showtr.length; i++) { 
currshow = "track"+i; 
var currhex = document.getElementById(currshow);
currhex.style.display='none';
}
var current = "track"+inicurr;
var trackdex = document.getElementById(current);
trackdex.style.display='block';
var trackele = playhex.getElementsByTagName('track')[inicurr];
var audiosrc = trackele.getAttribute("src");
var audioname = trackele.getAttribute("name");
const curricon = trackele.getAttribute("canvas"); 
var currsrc = tracked.src; 

if(currsrc.includes(audiosrc)) {
if(tracked.currentTime == tracked.duration) { 
tracked.currentTime = "0";
tracked.play();
pstatus.innerHTML = "play";
playp.src = "https://hexjs.vercel.app/Sum/files/pause.png";
} else {
    if(pstat == "pause") { 
    tracked.play();
    pstatus.innerHTML = "play";
    playp.src = "https://hexjs.vercel.app/Sum/files/pause.png";
} }
   
} else {
    


tracked.src = audiosrc; 
tracked.play();
pstatus.innerHTML = "play";
playp.src = "https://hexjs.vercel.app/Sum/files/pause.png";
}


document.title = audioname;
ticon.href = curricon; 
thead.appendChild(ticon);

}
}

function togTrack() {
const thelist = document.getElementById('tracklist');
if(thelist.style.height == 'auto') {
 thelist.style.height = '0'; 
} else {
 thelist.style.height = 'auto';
}
}


function togTrackRep() {
const thelis = document.getElementById('trackrep');
if(thelis.style.filter == 'invert(0%)') {
 thelis.style.filter = 'invert(0.4) sepia(1) hue-rotate(20deg) saturate(1000%)';  
} else { 

if(thelis.style.filter == 'invert(0.4) sepia(1) hue-rotate(20deg) saturate(1000%)') {
 thelis.style.filter = 'invert(50%)';  
} else {

 thelis.style.filter = 'invert(0%)';  
} 
}

}

function toghexMute() {
var mutehex = document.getElementById('mutehex'); 
if(mutehex.src == "https://hexjs.vercel.app/Sum/files/wnomute.png") {
mutehex.src = "https://hexjs.vercel.app/Sum/files/wmute.png"; 
document.getElementById('taudio').muted = false;
    
} else {
    
mutehex.src = "https://hexjs.vercel.app/Sum/files/wnomute.png"; 
document.getElementById('taudio').muted = true;

    
}}



function anyRange(min, max) {
   var ranrange = Math.random() * (max - min) + min;
   return Math.round(ranrange);
}


function shareTrack(shareh, nameh, sourceh, canvash, artisth) {
if(shareh == null) { var hextshare = window.location; } else {
if(shareh == "") {var hextshare = window.location;} else {
var hextshare = shareh;
}}
var hextname = nameh; 
var hextsource = sourceh; 
var hextartist = artisth;
var hextcanvas = canvash; 
var hextbed = '<strack name="'+hextname+'" src="'+hextsource+'" artist="'+hextartist+'" canvas="'+hextcanvas+'" share="'+hextshare+'"> <script src="https://hexjs.vercel.app/Sum/strack.hex.js"><\/script>';
var ifhextrackshare = playhex.getAttribute("shared");
if(ifhextrackshare == null) {
const allhextrack = document.querySelector('body');
const trackgo = document.createElement("div"); 
trackgo.setAttribute("pop", "track CLOSE"); 
trackgo.innerHTML = '<p font="Poppins" bold id="trackgoname"></p>';
allhextrack.appendChild(trackgo);
const trackbedlabel = document.createElement("drop"); 
trackbedlabel.id = "trackbedlabel"; 
trackbedlabel.setAttribute("name", "Embed Track"); 
trackgo.appendChild(trackbedlabel);
const trackbed = document.createElement("div");
trackbed.id = "trackbed";
trackbedlabel.appendChild(trackbed);
const trackmove = document.createElement("div"); 
trackmove.id = "trackmove"; 
trackmove.innerHTML = '<p>Share Track&nbsp;<img src="https://hexjs.vercel.app/Sum/files/share.png" width="16"></p>'; 
trackgo.appendChild(trackmove);
rootHex();
}
hexPop("track");
document.getElementById('trackgoname').innerText = hextname;
trackmove.setAttribute("onclick", "inshareTrack('"+hextshare+"', '"+hextname+"')"); 

playhex.setAttribute("shared", "yes");
var hextrackbed = document.getElementById('trackbed');
hextrackbed.innerText = hextbed;

}

 function inshareTrack(shareh, nameh) {
 var hexsharer = shareh;
 var hexnamer = nameh;
if (navigator.share) {
navigator.share({
 
title: hexnamer,
url: hexsharer
});
} else {
    alert("Unsupported Browser");
} 
}

const hexhead = document.createElement("meta");
hexhead.name = "theme-color";
hexhead.content = "#3e3c4a"; 
document.getElementsByTagName('head')[0].appendChild(hexhead);







