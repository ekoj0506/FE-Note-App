import { graphQLrequest } from "./request";

export const notesLoader =async({params:{folderId}})=>{

    
    const query=`query Folder($folderId: String)
    { folder(folderId: $folderId) {
      id
      name
      notes{
        id
        content
      }
    }
    }`;
     console.log(' dasdasdasd');
    const data=await graphQLrequest({query, variables:{folderId}});
    return data;

};

