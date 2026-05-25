export function renderNav0(data){

  const nav =
    document.getElementById("nav0List");

  if(!nav) return;

  nav.innerHTML = data.map(
    (item, index)=>`

      <li>

        <a href="${item.link}">
          📖 ${index}. ${item.title}
        </a>

      </li>

    `
  ).join("");

}