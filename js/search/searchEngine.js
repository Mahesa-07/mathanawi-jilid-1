export function filterSearch(
searchIndex,
query
){

  return searchIndex.filter(

    item =>

    (
      item.text || ""
    )

    .toLowerCase()

    .includes(query)

  );

}