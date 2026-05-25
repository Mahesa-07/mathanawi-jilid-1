export async function buildKitabIndex(pages) {

  const index = {};

  for (const page of pages) {

    const res = await fetch(page);
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, "text/html");

    const baits = doc.querySelectorAll("[data-id]");

    baits.forEach(el => {
      const id = el.getAttribute("data-id");
      index[id] = page;
    });
  }

  return index;
}