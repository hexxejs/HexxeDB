let hexql = [];
let savestat = "saved"; 
let tabed = $GET('tab');
if(tabed == undefined) {
    tabed = "users";
}

let tabe = $GET('row');
if(tabe == undefined) {
    tabe = "";
}

let deck = $GET('deck');
if(deck == undefined) {
    deck = 0;
}





$IMPORT('Nav: nav.hex?v=vio');

const xql = document.getElementById('xql');
function addRowQl() {
let adder = document.getElementById('addql');
key = adder.value;
key = key.trim()
if(key == "Key") {
alert(`"${key}" is a reserved XQL term`);
} else {
hexql[0][key] = "null";
newQL();
adder.value = "";

let quarp = "INSERT "+tabed+" FIELDS("+key+") VALUES(null)"; 
document.getElementById('squ').innerHTML = quarp; 
document.getElementById('squ').style.display = 'block';
setTimeout(function() {
 document.getElementById('squ').hide();  
},3000);
}

}

function addRabQL() {
hexql.push({});
newQL(); 
}



  

async function xqlFind() {
let cards = document.querySelectorAll('.xtabs')
let inval = searchQL.value;
let selval = document.getElementById('seltab').value; 
let search_query = inval;

let theClass = "tabql";
var eleid = search_query; 
let inele = document.getElementById(eleid);

let quarp = "SELECT "+tabed+" REGEX "+selval+" = '"+inval+"'"; 
document.getElementById('squ').innerHTML = quarp; 
document.getElementById('squ').style.display = 'block';
if(inele == null) {
const nonere = document.createElement("p");
nonere.id = "resultnullql"; 
nonere.innerText = "No row matches query"; 
nonere.style.fontFamily = 'Poppins'; 
xql.parentNode.appendChild(nonere); 
}

for (let i = 0; i < cards.length; i++) {

if(cards[i].innerText.toLowerCase().includes(search_query.toLowerCase())) {

cards[i].classList.remove("is-hidden")
 let norep = document.getElementById('resultnullql');
if(norep) {
norep.remove();
} 
    } else { 
if(inval == "") {
cards[i].classList.remove("is-hidden");
let norep = document.getElementById('resultnullql');
if(norep) {
norep.remove();
}
} else {
cards[i].classList.add("is-hidden");
} }
} 
for (let i = 0; i < cards.length; i++) {
    

await checkAll();
function checkAll() {
if(cards[i].innerText.toLowerCase().includes(search_query.toLowerCase())) {
    

let allClass = cards[i].classList;
allClass.forEach(function(tag) {
if(tag.includes("tabql")) {
theClass = tag;
let showTab = document.querySelectorAll('.'+theClass);

for(let j = 0; j < showTab.length; j++) {
let fullTab = showTab[j]; 
fullTab.classList.add("is-hidden"); 

fullTab.classList.remove("is-hidden"); 


}
}
}); 


} }
}

  

} 




function formXQL() {
 try{
let total = hexql.length;
deck = parseInt(deck);
let base = deck * 50; 
let neck = deck + 1;
neck = neck * 50; 
if(neck > total){
    neck = total; 
}

let tabql; 
if(total > 50) {
tabql = hexql.slice(base,neck); 
}
else {
tabql = hexql;
}





const params = tabql[0];
 xql.innerHTML = "";
document.getElementById('seltab').innerHTML = '';
const sntab = document.createElement("table");
sntab.id = "xqlsnumkey"; 
const snrow = document.createElement("tr");
sntab.appendChild(snrow);
snrow.innerHTML += "<th>Key</th>";
xql.appendChild(sntab);    

const selntab = document.createElement("option");
selntab.value = "Key"; 
selntab.innerText = "Key"; 
document.getElementById('seltab').appendChild(selntab);


for (const key in params) {
if (params.hasOwnProperty(key)) {
const value = params[key];
const paramtab = document.createElement("table");
paramtab.id = "xql"+key;
const paramrow = document.createElement("tr");
paramtab.appendChild(paramrow); 
paramrow.innerHTML += "<th head='"+key+"' onclick='newXQL(this);'>"+key+"</th> <i class='fa fa-trash' style='font-size: 15px; padding: 0 5px;' id='"+key+"' onclick='remQL(this)'></i>";
xql.appendChild(paramtab); 
const seltab = document.createElement("option");
seltab.value = key; 
seltab.innerText = key; 
document.getElementById('seltab').appendChild(seltab);
}}

let eachTab = 0;
let rowTab = 0; 
tabql.forEach(function(row) {
eachTab++;

const rows = xql.querySelectorAll('table');
for(let x = 0; x < rows.length; x++){
let head = rows[x];
let rowname = head.id;
rowname = rowname.split("xql").pop();
const ogrow = document.createElement("tr"); 
const ogin = document.createElement("p");
ogin.setAttribute("field", rowname); 
ogin.setAttribute("row", rowTab); 
ogin.setAttribute("ondblclick", "newXQL(this)"); 
ogin.classList.add("xtabs", "pat", "tabql"+eachTab);

if(rowname == "snumkey") {
ogrow.innerHTML = "<p class='tabql"+eachTab+" xtabs' id='Key"+eachTab+"'> <i class='fa fa-trash' style='font-size: 15px; padding: 0px 10px 0 0;' id='"+eachTab+"' onclick='remRow(this)'></i> "+eachTab+"</p>";
        
} else if (row.hasOwnProperty(rowname)) { 
let cypher = row[rowname]; 
 let cyid = cypher;    
if (typeof cypher === 'number' && !isNaN(cypher)) {  } else {
try {
 cyid = cypher.replace(/\s/g, '');
} catch(error) {
    cyid = cypher; 
}
}
if(cypher == "") {
cypher = 'null'; 
ogrow.style.opacity = '0.5';  
}
if(cypher == "null") {
ogrow.style.opacity = '0.5';
}
if (typeof cypher === 'number' && !isNaN(cypher)) {
ogin.innerText = cypher;
} else {    
 try{   
ogin.innerText = cypher.replace(/\\n/g, "\n"); 
 } catch(error) {
ogin.innerText = cypher; 
 }
}
ogrow.appendChild(ogin);
} else {
ogin.innerText = "null"; 
ogrow.appendChild(ogin);

row[rowname] = "";
} 
 
head.appendChild(ogrow); 
} 

for (const key in row) {
if (row.hasOwnProperty(key)) {  
const ogtab = "xql"+key;
let value = row[key];
    let vyid = value; 
if (typeof value === 'number' && !isNaN(value)) {  } else {
  try {  
vyid = value.replace(/\s/g, '');
  } catch(error) {
      vyid = value; 
  }
}
const paramrow = document.createElement("tr");
   
let getab = document.getElementById(ogtab); 
if(getab) { 

} 

else {

const paramin = document.createElement("p");
paramin.setAttribute("field", key); 
paramin.setAttribute("row", rowTab); 
paramin.setAttribute("ondblclick", "newXQL(this)"); 
paramin.classList.add("xtabs", "pat", "tabql"+eachTab);
if (typeof value === 'number' && !isNaN(value)) {
paramin.innerText = value;
} else {  
    try{
paramin.innerText = value.replace(/\\n/g, "\n"); 
    } catch(error) {
paramin.innerText = value; 
    }
    }
paramrow.appendChild(paramin);


getabo = document.createElement("table");
getabo.id = "xql"+key;
const toper = eachTab-1; 
let i;
getab = document.createElement("tr");
getab.innerHTML += "<th head='"+key+"' onclick='newXQL(this);'>"+key+"</th>";
getabo.appendChild(getab);
xql.appendChild(getabo); 

const seltabo = document.createElement("option");
seltabo.value = key; 
seltabo.innerText = key; 
document.getElementById('seltab').appendChild(seltabo);



for(i = 0; i < toper; i++) {
let grouptab = i+1;
getabup = document.createElement("tr");
const tabin = document.createElement("p");
tabin.setAttribute("field", key); 
tabin.setAttribute("row", rowTab); 
tabin.setAttribute("ondblclick", "newXQL(this)"); 
tabin.classList.add("xtabs", "pat", "tabql"+eachTab);
tabin.innerText = "null"; 
getabup.appendChild(tabin);
getabup.style.opacity = "0.5"; 
hexql[i][key] = "";
getabo.appendChild(getabup);   
}
getabo.appendChild(paramrow) 
}

}}   
rowTab++;
    
})

    
} catch(error) {
    alert(error); 
}
}


function delQL() {
hexql[0] = "xqldel";
hexql = hexql.filter(item => item !== "xqldel"); 
}


function pushQL()  {
let enter = '{"name": "Essence"}';
hexql.push({name: 'Lover'})

// hexql.push(JSON.parse(enter))
}
    
function upXQL(field, row, val, head) {
    if(head == "bill") {
hexql[row][field] = val; 
} else {

hexql.forEach(function(oval) {
oval[val] = oval[head];
delete oval[head];
});

}

savestat = "unsaved";  
}

function newQL(act) {
try {
const loader = document.createElement("img");
loader.src = "asset/loader.gif";
loader.style.display = "block";
loader.style.position  = "absolute"; 
loader.style.zIndex = "99"; 
loader.style.top = "50%"; 
loader.style.left = "50%";
loader.style.transform = "translate(-50%, -50%)";
loader.style.width = "100px";
loader.style.height = "100px";
document.getElementById('xql').appendChild(loader);
let key = passkey;
let inidata = encodeURIComponent(JSON.stringify(hexql));
let codetest = JSON.stringify(hexql); 
try {
JSON.parse(codetest);
  } catch (error) {
let kill = "Corrupt or empty data"; 

alert(kill); 
    return "error";




  }
  



let xhr = new XMLHttpRequest();
let url = xqlurl+'/newrow.php';
let params = "sess="+makeid(4)+"&key="+key+"&name="+inidata+"&tab="+tabed+"&row="+tabe;

xhr.open("POST", url, true);

xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let data = xhr.response;
if (data.includes("success")) {

 savestat = "saved";            
      if(act !== "no") {

toggle('#declare'); 
setTimeout(function() {
 toggle('#declare'); 
}, 2000); 

}
formXQL();
loader.remove();        

           
            } else {
              
alert(data)                
            }
        }
    }
};

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);


} catch(error) {
    alert(error); 
}
}


function newXQL(el) {
let elem = el;
let field = elem.getAttribute('field'); 
let row  = elem.getAttribute('row'); 
row = parseInt(row);
let onit = deck * 50; 
row = row + onit; 
let head = "bill"; 
let fh = elem.getAttribute('head'); 
if(fh !== null) {
head = fh; 
}
let input = document.createElement("textarea");
if(elem.innerText == "null") {
input.value = "";   
} else {
input.value = elem.innerText;
}
var ogen = input.value; 
elem.parentNode.replaceChild(input, elem); 
input.focus();
function saveIt() {
elem.innerText = input.value.replace(/\n/g, "\\n");;

elem.innerText = elem.innerText.replace(/\"/g, "”");

if(elem.innerText == "null") {

elem.innerText = ogen;
alert(`"null" is a reserved keyword`);

}
let val = elem.innerText;
input.parentNode.replaceChild(elem, input);
upXQL(field, row, val, head);  
}
input.addEventListener("blur", saveIt)
}


function remQL(el) {
let elem = el;
let key = elem.id;
document.getElementById('delbt').setAttribute('onclick', 'killQL("'+key+'")'); 
document.getElementById('delrow').innerText = key; 
hexPop('delql');
}

function killQL(key) {
hexql.forEach(function(oval) {
delete oval[key];
});
hexPop('delql');
savestat = "unsaved";  
formXQL(); 
    
}


function remRow(el) {
let elem = el;
let key = elem.id;
document.getElementById('delbt').setAttribute('onclick', 'kickQL("'+key+'")'); 
document.getElementById('delrow').innerText = key; 
hexPop('delql');
if(hexql.length == "1") {
const warn = document.createElement('p'); 
warn.style.color = "red";
warn.innerHTML = "Deleting the last row will delete all fields";
warn.style.fontSize = '15.5px';
warn.style.fontWeight = '500';
warn.style.fontFamily = "Outfit"; 
document.getElementById('delwarn').appendChild(warn);

document.getElementById('delbt').setAttribute('onclick', 'kickQL("'+key+'", "last")'); 

}
}

function kickQL(code, act) {
let key = parseInt(code) - 1;
hexql.splice(key, 1);
if(act == "last") {
data = `[{"Name":"null"}]`;    
data = JSON.parse(data);
hexql.length = 0
hexql.push(...data);       
}
hexPop('delql'); 
savestat = "unsaved";  
formXQL();
let quarp = "DELETE "+tabed+" WHERE Key = '"+code+"'"; 
document.getElementById('squ').innerHTML = quarp; 
document.getElementById('squ').style.display = 'block';
setTimeout(function() {
 document.getElementById('squ').hide();  
},3000);

 
}


function exPort() {
let inidata = JSON.stringify(hexql);   
let table = tabed; 
let data = "QUERY TABLE("+table+") DATA$ini"+inidata+"$ini"; 

const blob = new Blob([data], {type: 'application/jsq'});
const fileUrl = URL.createObjectURL(blob);
const link = document.createElement("a");
 link.href = fileUrl;
 link.id = 'jsq'; 
 link.download = table+'.jsq'; 
 link.click();
       
}
