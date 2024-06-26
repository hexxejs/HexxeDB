function XQL(base, param, target, cup) {
let call;
if(cup !== undefined) {
call = cup;
} else {
    call = "";
}
let startTime = performance.now();
let query;
query = document.querySelector(target);
query.hide(); 
let db = base;
let string = param;
const newq = document.createElement("query");
let newid = makeid(5);
newq.id = newid; 
newq.setAttribute("data", db);
newq.setAttribute("call", call);


const newd = document.createElement("data");
newd.innerText = param.trim();
newq.appendChild(newd);
const newr = document.createElement("result");

if (query.tagName.toLowerCase() === "input" || query.tagName.toLowerCase() === "textarea" || query.tagName.toLowerCase() === "select") {
newr.innerHTML = query.value;  
} else {
newr.innerHTML = query.innerHTML; 
}
newq.appendChild(newr);
document.body.appendChild(newq);
newq.hide();

$XQL(newid, cup, target);
return {
then: function(callback) {
    callback();
}
};
}


function $REQUEST(data) {
let elem = document.querySelector('[recall = "'+data+'"]');
if(elem) {
let iden = elem.id; 
let quo = sessionStorage.getItem(iden);
if(quo !== null) {
elem.innerHTML = quo;
$XQL(iden);
}
}
}

function $ASSOC(target) {
alert(target);
let elem = document.querySelector(target); 
if(elem) {
alert('tes');
let div = document.createElement("query");
let mid = makeid(10);
div.id = mid; 
let ins = elem.innerHTML; 
elem.innerHTML = ""; 
let call = elem.getAttribute("call");
if(call !== null) {
div.setAttribute("call", call);
}
let data = elem.getAttribute("data"); 
div.setAttribute("data", data);
div.innerHTML = ins;    
let parent = elem.parentNode;
parent.replaceChild(div, elem); 
alert(parent.innerHTML); 
$XQL(mid); 
}
}



function $XQL(data, caller, origin) {
let call = "";
let startTime = performance.now();
let query;
query = document.getElementById(data);
if(query) {
let db = query.getAttribute('data');
let tobr = query.getAttribute('nl2br');
if(tobr !== "true"){
tobr = "false"; 
}
let called = query.getAttribute('call');
let terror = null; 
let qerr = query.getAttribute('error'); 
if(qerr == null) {} else {
terror = qerr; 
}
if(called == null) {
call = "";
} else {
call = called;    
}

sessionStorage.setItem(data, query.innerHTML); 
let xwait = query.getAttribute("wait");
if(xwait !== null) {

eval(xwait);
    
} 
let qparam = query.getElementsByTagName('data')[0];
let string = qparam.textContent;
let empty = query.getElementsByTagName('empty')[0];
let emptyval = ""; 
let onewrap = ""; 
let twowrap = ""; 
let owrap = query.querySelectorAll('fold')[0]; 
if(owrap){
onewrap = owrap.innerHTML; 
} 
let twrap = query.querySelectorAll('fold')[1]; 
if(twrap){
twowrap = twrap.innerHTML; 
} 


if(empty) { 
emptyval = empty.innerHTML;
empty.remove(); 
}
qparam.remove(); 

let outdata = query.getElementsByTagName('result')[0]; 

let packer = outdata.querySelectorAll('query'); 

if(packer){
packer.forEach(function(elel){ 
let elem = elel.getElementsByTagName('result')[0];
let rom = elem.innerHTML; 
elem.innerHTML = rom.replace(/\{\{/g, "-lcom-"); 
elem.innerHTML = rom.replace(/\}\}/g, "-rcom-"); 
rom = elem.innerHTML;    
elem.innerHTML = rom.replace(/\{/g, "-lcbr-"); 
elem.innerHTML = rom.replace(/\}/g, "-rcbr-"); 
rom = elem.innerHTML;
elem.innerHTML = rom.replace(/-lcom-/g, "\{"); 
elem.innerHTML = rom.replace(/-rcom-/g, "\}"); 
    
}); 
} 
let ogput = outdata.innerHTML;
ogput = ogput.replace(/\$xqlfile\$/g, xqlfile); 
outdata.innerHTML = '';

const forPat = new RegExp(`{\\s*(.*?)\\s*}`, 'g');
const match = string.match(/SELECT (\w+)/);
if (match) {
  const dataSelector = match[1];
  let conditionSelector = ""; 
  let conditionValue = "";
  let mtype = "null";
if(string.includes("WHERE")) {
const wmatch = string.match(/WHERE (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "where";
}
}  
  
if(string.includes("REGEX")) {
const wmatch = string.match(/REGEX (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "regex";
}
}  






let hexql = [];

let path = xqlget+"?key="+xqlacc+"&tab="+dataSelector+"&row="+db+"&sess="+makeid(5); 



fetch(path).then(function(response) { 
if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();    
}).then(function(text) {

let data = text;
if(data == "") {
query.remove();
console.log(`No result for query, "${string}"`);
} else {

data = JSON.parse(data);
hexql.length = 0;
hexql.push(...data);
    
  
  
const dataVal = hexql; 

let getData;  
if(mtype == "null") {
getData = dataVal;
}

if(mtype == "where") {
getData = dataVal.filter(item => item[conditionSelector] === conditionValue);
}




if(mtype == "regex") {
getData = dataVal.filter(item => item[conditionSelector].includes(conditionValue));
}



 let selectedData = "";   
if(conditionSelector == "Key") {
let fLen = dataVal.length - 1; 

if(conditionValue == "first") {
    selectedData = dataVal.filter(function(obj, index){
return index === 0;
});    
} else if(conditionValue == "last") {
 selectedData = dataVal.filter(function(obj, index){
return index === fLen;
});       
} else {
let cVal = parseInt(conditionValue) - 1;
selectedData = dataVal.filter(function(obj, index){
return index === cVal;
});
}

 
 
} else {
  

selectedData = getData;
}


let result;


let output;

output = ogput;

let thedex = "0";


function upsQ() {
thedex = "0";
addVal = output.replace(forPat, function (match, captureKey) {
if(captureKey == "Key") {
if(selectedData && selectedData[0]) {
result = dataVal.findIndex(item => item === selectedData[0]);
result = result + 1;
}         
} else {
if(selectedData && selectedData[0] && selectedData[0].hasOwnProperty(captureKey)) {
result = selectedData[0][captureKey];


if(string.includes("AND")) {
let andf = string.match(/AND (\w+) = '([^']+)'/); 
if(andf) {
let andkey = andf[1]; 
andkey = andkey.trim();
let andval = andf[2];
andval = andval.trim();
thislove = selectedData[0][andkey];
if(thislove == andval) {
} else {
    result = "";
}
}
}
    







}
else { result = ""; }}

if(result == "null"  || result === null || result === undefined || result == "") {
result = "";
}

if(tobr ==  "true"){
result = $nl2br(result); 
}

return result;
});

}


if(string.includes("ORDER")) {
const orpA = string.match(/ORDER (\w+)/); 
if(orpA)  {
orpVal = orpA[1]; 
if(orpVal){
if(orpVal == "DESC") {
let oneDex = selectedData.length - 1;
thedex = oneDex;
addVal = output.replace(forPat, function (match, captureKey) {
if(captureKey == "Key") {
if(selectedData && selectedData[oneDex]) {
result = dataVal.findIndex(item => item === selectedData[oneDex]);
result = result + 1;
}         
} else {
if(selectedData && selectedData[oneDex] && selectedData[oneDex].hasOwnProperty(captureKey)) {
result = selectedData[oneDex][captureKey];

if(string.includes("AND")) {
let andf = string.match(/AND (\w+) = '([^']+)'/); 
if(andf) {
let andkey = andf[1]; 
andkey = andkey.trim();
let andval = andf[2];
andval = andval.trim();
thislove = selectedData[oneDex][andkey];
if(thislove == andval) {
} else {
    result = "";
}
}
}
    





}
else { result = ""; }}
if(result == "null"  || result === null || result === undefined || result == "") {

result = "";
}
if(tobr ==  "true"){
result = $nl2br(result); 
}
return result;
});

    
}

if(orpVal.includes("RAND")) {

if(typeof $shuffle === 'function'){
selectedData = $shuffle(selectedData); 
}
ascQ(); 
}
    
} else { upsQ(); }
} else {
 upsQ();   
}
} else {
    upsQ();
}

let thisVal = addVal;

let qregex = /!!\s*if\s*\[\[([^\]]*)\]\]\s*\[\[([^\]]*)\]\]\s*(.*?)\s*!!/g;


let resultString = "";
let lastIndex = 0;

let qmatch;
while ((qmatch = qregex.exec(thisVal)) !== null) {
  let ask = qmatch[1];
  let content = qmatch[2];
  let elsecon = qmatch[3];
  let elsem = elsecon.match(/else\s*\[\[([^\]]*)\]\]\s*/);
  let elsec = "";
  if(elsem) {
    elsec = elsem[1];  
  } else {
    elsec = "";
  }
  
  let pkey; let pval; let ptype = "eq";
  if(ask.includes("&gt;")) {
  ptype = "more"; 
  pkey = ask.split("&gt;")[0].trim();
  pval = ask.split("&gt;").pop().trim();
  pval = parseInt(pval);
  
  } else if(ask.includes("&lt;")) {
  ptype = "less"; 
  pkey = ask.split("&lt;")[0].trim();
  pval = ask.split("&lt;").pop().trim();
  pval = parseInt(pval);
  
  }
  else {
  pkey = ask.split("==")[0].trim();
  pval = ask.split("==").pop().trim();
  if(pval.includes("$$")) {
  pval = pval.split("$$").pop().trim(); 
  pval = eval(pval);
  if(pval == undefined || pval == null) {
   pval = "";
  }
  }
  }
  let rval;
  if (pkey == "Key") {
    rval = result + 1;
  } else {
    rval = selectedData[thedex][pkey];
  }

if(ptype == "less") {
 rval = parseInt(rval); 
   if (rval < pval) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index) + elsec;
  }
} else if(ptype == "more") {
rval = parseInt(rval); 
  if (rval > pval) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index);
  }
} else {
  if (rval == pval) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index);
  }
} 
  
  
  

  lastIndex = qmatch.index + qmatch[0].length;
}

resultString += thisVal.substring(lastIndex);

thisVal = resultString;

    
    


if(selectedData.length < 1) {
thisVal = emptyval;
}



if(origin !== undefined) { 
let oridata = document.querySelector(origin);
oridata.innerHTML = onewrap + thisVal + twowrap; 
oridata.value = onewrap + thisVal + twowrap; 
oridata.show();
query.remove();
    
    
} else {
query.innerHTML = onewrap + thisVal + twowrap; 
query.show(); 
}

let under = query.querySelectorAll('query'); 
if(under){
under.forEach(function(elem){ 
let call = elem.getAttribute("call"); 
if(call == null) {
    call = "";
}
elem.id = makeid(7); 
let rom = elem.innerHTML; 
elem.innerHTML = rom.replace(/-lcbr-/g, "\{"); 
elem.innerHTML = rom.replace(/-rcbr-/g, "\}"); 
    
elem.style.display = 'none';
$XQL(elem.id, call)
}); 
}   
if(call !== undefined) {
    eval(call);
}          
let endTime = performance.now();
const executionTime = endTime - startTime;
const roundExTime = executionTime.toFixed(2);
console.log(`XQL QUERIED: ${roundExTime} milliseconds`);

}


}).catch(function(error) {
console.error(error); 
if(terror == null) {} else {
eval(terror); 
}
});

}
else {

const match2 = string.match(/ALL (\w+)/);
if (match2) {
  const dataSelector = match2[1];
  let conditionSelector = ""; 
  let conditionValue = "";
  let mtype = "null";
if(string.includes("WHERE")) {
const wmatch = string.match(/WHERE (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "where";
}
}  
  
if(string.includes("REGEX")) {
const wmatch = string.match(/REGEX (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "regex";
}
}  

  
  
let hexql = [];

let path = xqlget+"?key="+xqlacc+"&tab="+dataSelector+"&row="+db+"&sess="+makeid(5); 



fetch(path).then(function(response) { 
if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();    
}).then(function(text) {
let data = text;

if(data == "") {
query.remove();
console.log(`No result for query, "${string}"`);

} else {

data = JSON.parse(data);
hexql.length = 0
hexql.push(...data);

let getData;  
const dataVal = hexql; 
if(mtype == "null") {
getData = dataVal;
}

if(mtype == "where") {
getData = dataVal.filter(item => item[conditionSelector] === conditionValue);
}




if(mtype == "regex") {
getData = dataVal.filter(item => item[conditionSelector].includes(conditionValue));
}





let selectedData = "";
if(conditionSelector == "Key") {
let fLen = dataVal.length - 1; 

if(conditionValue == "first") {
selectedData = dataVal.filter(function(obj, index){
return index === 0;
});    
} else if(conditionValue == "last") {
 selectedData = dataVal.filter(function(obj, index){
return index === fLen;
});       
} else {
let cVal = parseInt(conditionValue) - 1;
selectedData = dataVal.filter(function(obj, index){
return index === cVal;
});
}

 
 
} else {
  

selectedData = getData;
   
}


let result;


let output;
output = ogput;
  
let addVal = ""; 
let reDex = selectedData.length;
if(string.includes("LIMIT")) {
const limA = string.match(/LIMIT (\d+)/); 
if(limA)  {
let limVa = limA[1];
if(limVa > reDex) {
reDex = reDex;    
} else {
reDex = limVa;   
}
}  
}


if(string.includes("ORDER")) {
const orA = string.match(/ORDER (\S+)/); 
if(orA)  {
orVal = orA[1]; 
if(orVal){
if(orVal.includes("DESC")) {
selectedData = selectedData.slice().reverse();
const order = orVal.split("-").pop();
if(order !== "DESC") {
selectedData.sort((a, b) => b[order] - a[order]);
ascQ(order)
} else {
ascQ()
}
} 
if(orVal.includes("ASC")){ 
  
const order = orVal.split("-").pop();
if(order !== "ASC") {
selectedData.sort((a, b) => a[order] - b[order]);

ascQ(order)
} else {
ascQ()
}

    
}


if(orVal.includes("RAND")) {
if(typeof $shuffle === 'function'){
selectedData = $shuffle(selectedData); 
}
ascQ(); 
}
} else { ascQ(); }
} else { 

ascQ(); 
} } else {

    ascQ();
}



function ascQ(order) {
let thisindex = 0;
for(let i = 0; i < reDex;  i++){
        thisindex++;
        
thisVal = output.replace(forPat, function (match, captureKey) {
if(captureKey == "Key") {
if(selectedData && selectedData[i]) {
result = dataVal.findIndex(item => item === selectedData[i]);
result = result + 1;
}         
} else if(captureKey == "this.index"){
if(selectedData && selectedData[i]) {
result = thisindex;
}
} else {
if(selectedData && selectedData[i] && selectedData[i].hasOwnProperty(captureKey)) {
result = selectedData[i][captureKey]; 


if(string.includes("AND")) {
let andf = string.match(/AND (\w+) = '([^']+)'/); 
if(andf) {
let andkey = andf[1]; 
andkey = andkey.trim();
let andval = andf[2];
andval = andval.trim();
thislove = selectedData[i][andkey];
if(thislove == andval) {
} else {
    result = "";
}
}
}
    


}
else { result = ""; }}
if(result == "null"  || result === null || result === undefined || result == "") {
    
result = "";
}
if(tobr ==  "true"){
result = $nl2br(result); 
}
return result;
    
});




let qregex = /!!\s*if\s*\[\[([^\]]*)\]\]\s*\[\[([^\]]*)\]\]\s*(.*?)\s*!!/g;

let resultString = "";
let lastIndex = 0;

let qmatch;
while ((qmatch = qregex.exec(thisVal)) !== null) {
  let ask = qmatch[1];
  let content = qmatch[2];
  let elsecon = qmatch[3];
  let elsem = elsecon.match(/else\s*\[\[([^\]]*)\]\]\s*/);
  let elsec = "";
  if(elsem) {
    elsec = elsem[1];  
  } else {
    elsec = "";
  }
  let key; let val; let type = "eq";
  if(ask.includes("&gt;")) {
  type = "more"; 
  key = ask.split("&gt;")[0].trim();
  val = ask.split("&gt;").pop().trim();
  val = parseInt(val);
  
  } else if(ask.includes("&lt;")) {
  type = "less"; 
  key = ask.split("&lt;")[0].trim();
  val = ask.split("&lt;").pop().trim();
  val = parseInt(val);
  
  }
  
   else {
  key = ask.split("==")[0].trim();
  val = ask.split("==").pop().trim();
  if(val.includes("$$")) {
  val = val.split("$$").pop().trim(); 
  val = eval(val);
  if(val == undefined || val == null) {
   val = "";
  }
  }
  }
  let rval;
  if (key == "Key") {
    rval = result + 1;
  } else if (key == "this.index") {
    rval = thisindex;
  } else {
    rval = selectedData[i][key];
  }

if(type == "less") {
 rval = parseInt(rval); 
   if (rval < val) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index);
  }
} else if(type == "more") {
rval = parseInt(rval); 
  if (rval > val) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index) + elsec;
  }
} else {
  if (rval == val) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index);
  }
} 
  
  
  

  lastIndex = qmatch.index + qmatch[0].length;
}

resultString += thisVal.substring(lastIndex);

thisVal = resultString;



    
    
addVal = addVal + thisVal;    
    }    
}
    
if(selectedData.length < 1) {
addVal = emptyval; 
}

    
    
if(origin !== undefined) { 
let oridata = document.querySelector(origin); 

oridata.innerHTML = onewrap + addVal + twowrap; 
oridata.value = onewrap + addVal + twowrap; 
oridata.show();
query.remove();
    
    
} else {
query.innerHTML = onewrap + addVal + twowrap; 
query.show();
}
rootHex();
let under = query.querySelectorAll('query'); 
if(under){
under.forEach(function(elem){ 
let call = elem.getAttribute("call"); 
if(call == null) {
    call = "";
}
elem.id = makeid(7); 
let rom = elem.innerHTML; 
elem.innerHTML = rom.replace(/-lcbr-/g, "\{"); 
elem.innerHTML = rom.replace(/-rcbr-/g, "\}"); 
    
elem.style.display = 'none';
$XQL(elem.id, call)
}); 
}   
eval(call);
let endTime = performance.now();
const executionTime = endTime - startTime;
const roundExTime = executionTime.toFixed(2);
console.log(`XQL COMPILED: ${roundExTime} milliseconds`);


}
}).catch(function(error) {
console.error(error); 
if(terror == null) {} else {
eval(terror); 
}
});

}
else { 
  console.log("Invalid string format");
}
}
}
}
