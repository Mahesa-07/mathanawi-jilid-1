export function getSnippet(
text,
query
){

  const safe =
  text || "";

  const lower =
  safe.toLowerCase();

  const index =
  lower.indexOf(query);

  if(index === -1){

    return (
      safe.slice(0, 60)
      + "..."
    );

  }

  return (

    safe.slice(
      index,
      index + 80
    )

    + "..."

  );

}