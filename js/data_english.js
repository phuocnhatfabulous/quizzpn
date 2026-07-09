// data_english.js - English quiz storage
const STORAGE_KEY_EN = 'image_quiz_words_en_v1'

function defaultWordsEn() {
    return [
        { id: 1, img: 'apple.jpg', word: 'apple', topic: 'fruit' },
        { id: 2, img: 'banana.jpeg', word: 'banana', topic: 'fruit' },
        { id: 3, img: 'orange.jpg', word: 'orange', topic: 'fruit' }
    ]
}

function loadWords() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_EN)
        if (!raw) return defaultWordsEn()
        return JSON.parse(raw)
    } catch (e) {
        console.error('loadWords en', e)
        return defaultWordsEn()
    }
}

function saveWords(list) {
    localStorage.setItem(STORAGE_KEY_EN, JSON.stringify(list))
}

function addWord(obj) {
    const list = loadWords()
    const id = list.length ? Math.max(...list.map(w => w.id)) + 1 : 1
    const item = { id, ...obj }
    list.push(item)
    saveWords(list)
    return item
}

function updateWord(id, obj) {
    const list = loadWords()
    const idx = list.findIndex(w => w.id == id)
    if (idx === -1) return null
    list[idx] = { id, ...obj }
    saveWords(list)
    return list[idx]
}

function deleteWord(id) {
    let list = loadWords()
    list = list.filter(w => w.id != id)
    saveWords(list)
}

function exportWords() {
    const data = JSON.stringify(loadWords(), null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'words_english.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

function importWordsFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result)
                if (!Array.isArray(parsed)) throw new Error('Invalid format')
                saveWords(parsed)
                resolve(parsed)
            } catch (e) { reject(e) }
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsText(file)
    })
}

if (typeof window !== 'undefined') window.dataAPI = {
    loadWords, saveWords, addWord, updateWord, deleteWord, exportWords, importWordsFile
}
