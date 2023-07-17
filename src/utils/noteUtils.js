
import { async } from "@firebase/util";
import { graphQLrequest } from "./request";

export const noteLoader = async ({ params }) => {
    const query = `query Note($noteId: String)
      { note(noteId: $noteId) {
        id
        content
      }
      }`;

    const data=graphQLrequest({query, variables:{noteId:params.noteId},});
    return data;

};
export const addNewNote=async ({params, request})=>
{
   const newNote= await request.formData();
   console.log('newnote', newNote);
   const formDataObj={};
   newNote.forEach((value,key)=>{formDataObj[key]=value});
   console.log('formdata', formDataObj);
const query =`mutation AddNote($content: String, $folderId: String){
    addNote(content: $content, folderId: $folderId){
        content
        folderId
    }

}`;
const data=graphQLrequest({query, variables:formDataObj});
   return data;
};


export const saveNote=async({params, request})=>
{
    const note= await request.formData();
    const formDataObj={};
    note.forEach((value,key)=>{formDataObj[key]=value});
    console.log('form dataa notetttttttttttttt', formDataObj);
const query=`mutation UpdateNote($id: String, $content: String){
    updateNote(id: $id, content: $content){
        id
        content
    }
}`
const data=graphQLrequest({query, variables:formDataObj})
return data;

}