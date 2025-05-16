const strapiToken = 'bearer ' + process.env.STRAPI_TOKEN;
const baseUrl = 'http://localhost:1337/api/notes'

export async function getAllNotes () {
  const response = await fetch(baseUrl)
  const res = await response.json();
  if (res?.error) {
    console.log(res.error.message || 'Error occured');
    return [];
  }
  return res.data.map(note => {
    return {
      ...note,
      id: note.slug
    }
  })
}

export async function addNote (data) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: strapiToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json();
  return res.data.slug
}

export async function updateNote (slug, data) {
  const { documentId } = await getNote(slug);
  const response = await fetch(`${baseUrl}/${documentId}`, {
    method: 'PUT',
    headers: {
      Authorization: strapiToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json()
  return res.data
}

export async function getNote (slug) {
  const response = await fetch(`${baseUrl}?filters[slug][$eq]=${slug}`)
  const res = await response.json();
  return res.data[0] || {}
}

export async function delNote (slug) {
  const { documentId } = await getNote(slug);
  const response = await fetch(`${baseUrl}/${documentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: strapiToken,
      "Content-Type": "application/json"
    }
  })
  const res = await response.json()
}
