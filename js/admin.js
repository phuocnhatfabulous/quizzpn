// admin.js - wire up CRUD UI

const listEl = document.getElementById('list')
const form = document.getElementById('word-form')
const idEl = document.getElementById('id')
const imgEl = document.getElementById('img')
const wordEl = document.getElementById('word')
const clearBtn = document.getElementById('clear')
const importBtn = document.getElementById('import')
const exportBtn = document.getElementById('export')
const fileInput = document.getElementById('file-input')
const paginationEl = document.getElementById('pagination')

const ITEMS_PER_PAGE = 10
let currentPage = 1

function renderList() {
  const words = dataAPI.loadWords()

  const totalPages = Math.max(
    1,
    Math.ceil(words.length / ITEMS_PER_PAGE)
  )

  if (currentPage > totalPages) {
    currentPage = totalPages
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  const pageWords = words.slice(start, end)

  listEl.innerHTML = ''

  pageWords.forEach(w => {
    const li = document.createElement('li')

    const left = document.createElement('div')
    left.innerHTML = `
      <strong>${w.word}</strong>
      — <span>${w.img}</span>
    `

    const actions = document.createElement('div')
    actions.className = 'row'

    const edit = document.createElement('button')
    edit.textContent = 'Edit'

    edit.addEventListener('click', () => {
      idEl.value = w.id
      imgEl.value = w.img
      wordEl.value = w.word
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })

    const del = document.createElement('button')
    del.textContent = 'Delete'

    del.addEventListener('click', () => {
      if (confirm('Delete this word?')) {
        dataAPI.deleteWord(w.id)
        renderList()
      }
    })

    actions.appendChild(edit)
    actions.appendChild(del)

    li.appendChild(left)
    li.appendChild(actions)

    listEl.appendChild(li)
  })

  renderPagination(totalPages)
}

function renderPagination(totalPages) {
  paginationEl.innerHTML = ''

  // Previous button
  const prevBtn = document.createElement('button')
  prevBtn.textContent = '<'
  prevBtn.disabled = currentPage === 1

  prevBtn.addEventListener('click', () => {
    currentPage--
    renderList()
  })

  paginationEl.appendChild(prevBtn)

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button')

    btn.textContent = i

    if (i === currentPage) {
      btn.classList.add('active')
    }

    btn.addEventListener('click', () => {
      currentPage = i
      renderList()
    })

    paginationEl.appendChild(btn)
  }

  // Next button
  const nextBtn = document.createElement('button')
  nextBtn.textContent = '>'
  nextBtn.disabled = currentPage === totalPages

  nextBtn.addEventListener('click', () => {
    currentPage++
    renderList()
  })

  paginationEl.appendChild(nextBtn)
}

form.addEventListener('submit', e => {
  e.preventDefault()

  const id = idEl.value

  const obj = {
    img: imgEl.value.trim(),
    word: wordEl.value.trim()
  }

  if (!obj.img || !obj.word) {
    return alert('Please fill both fields')
  }

  if (id) {
    dataAPI.updateWord(Number(id), obj)
  } else {
    dataAPI.addWord(obj)
  }

  form.reset()
  idEl.value = ''

  renderList()
})

clearBtn.addEventListener('click', () => {
  form.reset()
  idEl.value = ''
})

exportBtn.addEventListener('click', () => {
  dataAPI.exportWords()
})

importBtn.addEventListener('click', () => {
  fileInput.click()
})

fileInput.addEventListener('change', async e => {
  const file = e.target.files[0]

  if (!file) return

  try {
    await dataAPI.importWordsFile(file)

    alert('Imported successfully')

    currentPage = 1
    renderList()
  } catch (err) {
    alert('Import failed: ' + err.message)
  }
})

renderList()