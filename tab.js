let hexql = [];
let tabed = $GET('tab');
if(tabed == undefined) {
    tabed = "users";
}

function denUp() {
document.getElementById('addql').addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("plusql").click();
  }
});
}

function addRowQl() {
let adder = document.getElementById('addql');
let key = adder.value;
key = key.trim();
hexql.push(key); 
console.log(hexql);
adder.value = "";
newQL(key); 
}



function newQL(tname) {
const loader = document.createElement("img");
loader.src = "https://hexjs.vercel.app/Sum/files/loader.gif";
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

  let xhr = new XMLHttpRequest();
let url = xqlurl+'/addtab.php';
let params = "sess=880&key="+key+"&name="+tname+"&tab="+tabed;

xhr.open("POST", url, true);

xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let data = xhr.response;
if (data.includes("success")) {

alert("Table Updated Successfully");
refQL();
loader.remove();

            } else {              
         
alert(data);
}



                
            }
        }    
};

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);
  
}

function chQL() {
    
   
    
}


function formQL() {
const xql = document.getElementById('xql');
xql.innerHTML = "";
if(hexql.length > 0)  {
let nobase = document.getElementById('nobase');
if(nobase) {
nobase.remove();
}
const num = document.createElement("table");
num.id = "basenumql"; 
const name = document.createElement("table");
name.id = "basenameql"; 
const numh = document.createElement("tr");
numh.innerHTML = "<th>No.</th>";
num.appendChild(numh);
const nameh = document.createElement("tr");
nameh.innerHTML = "<th>Tables</th>";
name.appendChild(nameh); 
xql.appendChild(num);
xql.appendChild(name);
} 
eachBase = 0; 


for(let i = 0; i < hexql.length; i++) {
let base = hexql[i];
eachBase++;
let num = document.getElementById('basenumql');
let name = document.getElementById('basenameql');
const sn = document.createElement("tr");
sn.innerHTML = "<td> <i class='fa fa-trash' style='font-size: 15px; padding: 0px 10px 0 0;' id='"+eachBase+"' onclick='remRow(this)'></i> "+eachBase+"</td>"; 
num.appendChild(sn);

const sno = document.createElement("tr");
sno.innerHTML = "<td onclick='newXQL(this);'>"+base+"</td> <i class='fa fa-arrow-right' margin='10px left' size='20px' link='table.html?tab="+base+"&row="+tabed+"'></i>"; 
name.appendChild(sno);
rootHex('#xql');   
}; 

 console.log(`Final: ${hexql}`)  
}


function upXQL(old, newd) {
const loader = document.createElement("img");
loader.src = "https://hexjs.vercel.app/Sum/files/loader.gif";
loader.style.display = "block";
loader.style.position  = "absolute"; 
loader.style.zIndex = "99"; 
loader.style.top = "50%"; 
loader.style.left = "50%";
loader.style.transform = "translate(-50%, -50%)";
loader.style.width = "100px";
loader.style.height = "100px"; 

document.getElementById('xql').appendChild(loader);

let path = xqlurl+"/edittab.php?key="+passkey+"&tab="+tabed+"&old="+old+"&new="+newd+"&sess="+makeid(5); 


    
    
fetch(path).then(function(response) { response.text().then(function(text) {

let data = text; 
if (data.includes("success")) {
if(newd == "null") {
alert("Table Deleted Successfully");
 
} else {
alert("Table Name Updated Successfully");
}
refQL(); 
loader.remove();

            } else {              
         
alert(data);
}



    
}); }).catch(error => {
    // Handle fetch failure
    alert('Poor Network Connection. Refresh Page');
  });;

   
    
    
    
}


function newXQL(el) {
let elem = el;
let input = document.createElement("textarea");
let old = ""; 
if(elem.innerText == "null") {
input.value = "";  
old = "";
} else {
input.value = elem.innerText;
old = elem.innerText;
}
var ogen = input.value; 
elem.parentNode.replaceChild(input, elem); 
input.focus();
function saveIt() {
elem.innerText = input.value;
let newd = elem.innerText; 

input.parentNode.replaceChild(elem, input);
upXQL(old, newd);  
}
input.addEventListener("blur", saveIt)
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
warn.innerHTML = "Deleting the last row will delete all tables";
warn.style.fontSize = '15.5px';
warn.style.fontWeight = '500';
warn.style.fontFamily = "Outfit"; 
document.getElementById('delwarn').appendChild(warn);
}
}

function kickQL(code) {
let key = parseInt(code) - 1;

upXQL(hexql[key], "null");  

hexPop('delql'); 

}





