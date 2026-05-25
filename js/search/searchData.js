import { babMap }
from "../../data/databab.js";



function createIndex(
bab,
source
){

  return (
    bab?.bait || []
  ).map(item => ({

    ...item,
    source

  }));

}



export const searchIndex =

Object.entries(babMap)

.flatMap(

([source, bab]) =>

createIndex(
  bab,
  source
)

);