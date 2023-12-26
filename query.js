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



function $XQL(data, caller, origin) {
let call = "";
let startTime = performance.now();
let query;
query = document.getElementById(data);
let db = query.getAttribute('data');
let called = query.getAttribute('call');

if(called == null) {
call = "";
} else {
call = called;    
}

sessionStorage.setItem(data, query.innerHTML); 

let qparam = query.getElementsByTagName('data')[0];
let string = qparam.textContent;
qparam.remove();
let outdata = query.getElementsByTagName('result')[0]; 
let ogput = outdata.innerHTML;
qparam.style.display = 'none';

const forPat = new RegExp(`{\\s*(.*?)\\s*}`, 'g');

let match = string.match(/SELECT (\w+)/);
if(!match) {
 match = string.match(/ALL (\w+)/);
}
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
if(conditionValue.includes("$js-")) {
let cond = conditionValue.split('$js-').pop();
conditionValue = eval(cond);
 }


mtype = "where";
}
}  
  
if(string.includes("REGEX")) {
const wmatch = string.match(/REGEX (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];

if(conditionValue.includes("$js-")) {
let cond = conditionValue.split('$js-').pop();
conditionValue = eval(cond);
 }
 


mtype = "regex";
}
}  

  
  
let hexql = [];

let path = xqlget+"?key="+xqlacc+"&tab="+dataSelector+"&row="+db+"&sess="+makeid(5); 



fetch(path).then(function(response) { response.text().then(function(text) {

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
output = outdata.innerHTML;
  
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

if(orVal.includes("DESC")) {
selectedData = selectedData.slice().reverse();
const order = orVal.split("-").pop();
if(order !== "DESC") {
selectedData.sort((a, b) => b[order] - a[order]);
ascQ(order)
} else {
ascQ()
}
} else if(orVal.includes("ASC")){ 
  
const order = orVal.split("-").pop();
if(order !== "ASC") {
selectedData.sort((a, b) => a[order] - b[order]);

ascQ(order)
} else {
ascQ()
}

    
}

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



if(origin !== undefined) { 
let oridata = document.querySelector(origin);
oridata.innerHTML = addVal; 
oridata.value = addVal; 
oridata.show();
query.remove();
    
    
} else {
query.innerHTML = addVal; 
query.show();
}

eval(call);
let endTime = performance.now();
const executionTime = endTime - startTime;
const roundExTime = executionTime.toFixed(2);
console.log(`XQL COMPILED: ${roundExTime} milliseconds`);


}
}); });

}
else { 
  console.log("Invalid string format");
}

}
