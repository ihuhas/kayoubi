const defaultData = {
nameKanji:"",
nameKana:"",
class:"IT11A",
subjects:["","","","",""],
links:["","","","",""]
};

let data = JSON.parse(localStorage.getItem("toolData")) || defaultData;

const classes=[
"IT11A","IT11B","IT11C","IT11D","DE11E","DE11F"
];

const periodKanji=["一","二","三","四","五"];

const copyIcon=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const checkIcon=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
const zoomIcon=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4V8Z"/></svg>`;

// ================= 初期化 =================

function init(){

document.getElementById("classSelect").innerHTML =
classes.map(c=>`<option>${c}</option>`).join("");

document.getElementById("classSelect").value = data.class;

renderMain();

}

document.getElementById("settingBtn").onclick=()=>{

document.getElementById("mainPage").classList.add("hidden");
document.getElementById("settingPage").classList.remove("hidden");

loadSettings();

};

document.getElementById("backBtn").onclick=()=>{

document.getElementById("settingPage").classList.add("hidden");
document.getElementById("mainPage").classList.remove("hidden");

renderMain();

};

// ================= メイン画面 =================

function renderMain(){

const cls=document.getElementById("classSelect").value;

const msg=[
`${cls},${data.nameKanji},よろしくお願いします`,
`${cls},${data.nameKana},よろしくお願いします`,
`${cls},${data.nameKanji},ありがとうございました`,
`${cls},${data.nameKana},ありがとうございました`
];

document.getElementById("messages").innerHTML =
msg.map((m,i)=>`
<div class="message">
<span>${m}</span>
<button class="copyBtn iconBtn" onclick="copyText(this,'${m}')">${copyIcon}<span class="label">コピー</span></button>
</div>
`).join("");

const rows = data.subjects.map((s,i)=>{

    if(s.trim()=="") return "";

    return `
    <div class="zoomItem">
        <div class="info">
            <div class="period">${periodKanji[i]}</div>
            <div class="subjectName">${s}</div>
        </div>
        <button class="zoomBtn iconBtn" onclick="openZoom(${i})">${zoomIcon}<span class="label">Zoom</span></button>
    </div>
    `;

}).join("");

document.getElementById("zoomList").innerHTML =
rows.trim() ? rows : `<div class="empty">授業が設定されていません。「設定」から追加してください。</div>`;

}

// ================= コピー =================

function copyText(btn,text){

navigator.clipboard.writeText(text);

btn.classList.add("copied");
btn.innerHTML = `${checkIcon}<span class="label">コピーしました</span>`;

setTimeout(()=>{
btn.classList.remove("copied");
btn.innerHTML = `${copyIcon}<span class="label">コピー</span>`;
},2000);

}

// ================= Zoom =================

function openZoom(i){
if(data.links[i]) window.open(data.links[i]);
}

// ================= 設定 =================

function loadSettings(){

document.getElementById("nameKanji").value=data.nameKanji;
document.getElementById("nameKana").value=data.nameKana;

document.getElementById("classSelect").value=data.class;

const box=document.getElementById("settings");

box.innerHTML="";

for(let i=0;i<5;i++){

box.innerHTML+=`
<div class="settingRow">
<div class="rowHead">
<div class="period">${periodKanji[i]}</div>
<strong>${i+1}限</strong>
</div>
<label>科目名</label>
<input placeholder="例：数学" id="sub${i}" value="${data.subjects[i]}">
<label>Zoomリンク</label>
<input placeholder="https://zoom.us/..." id="link${i}" value="${data.links[i]}">
</div>
`;

}

}

// ================= 保存 =================

document.getElementById("saveBtn").onclick=()=>{

data.nameKanji=document.getElementById("nameKanji").value;
data.nameKana=document.getElementById("nameKana").value;
data.class=document.getElementById("classSelect").value;

for(let i=0;i<5;i++){
data.subjects[i]=document.getElementById("sub"+i).value;
data.links[i]=document.getElementById("link"+i).value;
}

localStorage.setItem("toolData",JSON.stringify(data));

document.getElementById("settingPage").classList.add("hidden");
document.getElementById("mainPage").classList.remove("hidden");

renderMain();

};

// ================= 起動 =================

init();
