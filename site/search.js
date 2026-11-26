const filter = document.querySelector('#experience-filter')
const search = document.querySelector('#search')
const entries = document.querySelectorAll('#experience article')
const message = document.querySelector('#no-matches')

filter.hidden = false
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase()
  let matches = 0
  for (const entry of entries) {
    entry.hidden = !entry.textContent.toLowerCase().includes(query)
    if (!entry.hidden) matches++
  }
  message.hidden = matches > 0
})
