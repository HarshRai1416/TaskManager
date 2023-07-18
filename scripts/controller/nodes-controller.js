//controler (i/o) + Event + talk to service

import { noteOperations } from "../services/note-services.js";
window.addEventListener('load',init);
function init(){
    showCounts();
    bindEvents();
   // disabledbutton();
}
const enableButton=()=>document.querySelector(`#delete`).disabled=false;
const disabledbutton=()=>document.querySelector(`#delete`).disabled=true;

function bindEvents(){
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    
}
function deleteMarked(){
noteOperations.remove();
printNotes(noteOperations.getNotes());

}

function showCounts(){
    noteOperations.MarkTotal()>0? enableButton():disabledbutton;
    document.querySelector('#total').innerText=noteOperations.total();
    document.querySelector('#MarkTotal').innerText=noteOperations.MarkTotal();
    document.querySelector('#unMarkTotal').innerText =noteOperations.unMarkTotal();
}
function addNote(){
    // read id titles ,dcrep,date of completion,importence
    //dom
    const fields=['id','title','description','cdate','importence'];
    const noteObject={};//object literals
    for(let field of fields){
       noteObject[field]=document.querySelector(`#${field}`).value;

    }
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
    //const id =document.queerySelector('#id').value;
    //const title=document.queerySelector('#title').value;
}

// function disabledbutton(){
// document.querySelector(`#delete`).setAttribute("disabled",true);
// }

function printIcon(myClassName='trash',fn,id){
    const iTag =document.createElement('i');
    
    iTag.setAttribute('note-id' ,id);
   
    iTag.className =`fa-solid fa-${myClassName} me-5 hand` ;
    iTag.addEventListener('click',fn)
    return iTag;
}
function toggleMark(){
  //  console.log("toggle mark...",this);
  const icon =this;
  const id=this.getAttribute('note-id');
  noteOperations.toggleMark(id);
  const tr =icon.parentNode.parentNode;
 // tr.className='table-danger';
 tr.classList.toggle('table-danger');
 showCounts();

}
function edit(){
    console.log("edit..." );
}
function printNotes(notes){
const tbody=document.querySelector('#notes');
tbody.innerHTML='';
notes.forEach(note=>printNote(note));
showCounts();
}

function printNote(noteObject){
    const tbody=document.querySelector(`#notes`);
    const row=tbody.insertRow();//tr
    for(let key in noteObject){
        if(key=='isMarked'){
            continue;
        }
        const td=row.insertCell();
        td.innerText = noteObject[key];

    }
   const td=row.insertCell();
   td.appendChild(printIcon('trash',toggleMark,noteObject.id));
   td.appendChild(printIcon('user-pen'));
}