import { async } from "@firebase/util";
import { graphQLrequest } from "./request";

export const folderLoader =async ()=>{
    const query=`query QueryFolder {
        folders {
          name
          id
          createdAt
          
        }
      }`;
   const data=await graphQLrequest({query})

   return data; };

export const addFolder =async (newFolder)=>
{
    const query=`mutation AddFolder($name: String!){
        addFolder(name: $name)
        {name
            author{
                name
            }
        }
    }`
    const data=await graphQLrequest({query, variables:{name: newFolder.name}});
    return data;
};