//crud
import Note from'../models/node.js';
export const noteOperations={
    notes:[],
    add (noteObject){
       const note =new Note(noteObject);
       this.notes.push(note);
    },
    searchById(id){
      return  this.notes.find(note=>note.id==id);
    },
    toggleMark(id){
        this.searchById(id).toggleMark();
      //const noteObject  this.searchById(id);
      //noteObject.isMarked =!noteObject.isMarked;
    },

    total(){
       return this.notes.length;
    },
    MarkTotal(){
        return this.notes.filter(note=>note.isMarked).length;
    },
    unMarkTotal(){
        return this.total() - this.MarkTotal();
    },
    getNotes(){
        return this.notes;
    },
    remove(){
        this.notes=this.notes.filter(note=>!note.isMarked);
    },
    create(){

    },
    update(){

    },
    delete(){

    },
}