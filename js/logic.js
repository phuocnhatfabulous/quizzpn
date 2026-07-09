// logic.js - quiz behavior: show image, handle input, filtering, feedback

const quizImg = document.getElementById('quiz-img')
const answerInput = document.getElementById('answer')
const submitBtn = document.getElementById('submit')
const feedback = document.getElementById('feedback')
const progress = document.getElementById('progress')
const flipCard = document.getElementById('flip-card')
const flipCardInner = document.querySelector('.flip-card-inner')
const answerText = document.getElementById('answer-text')
const answerWord = document.getElementById('answer-word')
const answerKanji = document.getElementById('answer-kanji')

let allWords = []
let currentDeck = []
let index = 0
let isAnswered = false
let currentTopic = "all"

function shuffle(items) {
    const array = [...items]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function buildDeck() {
    const words = currentTopic === "all" ? allWords : allWords.filter(w => w.topic === currentTopic)
    currentDeck = shuffle(words)
    index = 0
}

// =======================
// LOAD DATA
// =======================
function load() {
    allWords = dataAPI.loadWords()

    if (!allWords.length) {
        feedback.textContent = 'No words. Add some in Manage words.'
        submitBtn.disabled = true
        return
    }

    buildDeck()
    show()
}

// =======================
// SHOW CURRENT CARD
// =======================
function getFilteredWords() {
    return currentDeck
}

function show() {
    const words = getFilteredWords()

    if (!words.length) {
        feedback.textContent = "No words in this topic"
        quizImg.src = "../imgs/placeholder.png"
        answerWord.textContent = ""
        answerKanji.textContent = ""
        progress.textContent = "0 / 0"
        return
    }

    if (index >= words.length) index = 0

    const item = words[index]

    quizImg.src = `../imgs/${item.img}`
    quizImg.alt = item.word
    answerWord.textContent = item.word || ''
    answerKanji.textContent = item.kanji || ''

    feedback.textContent = ''
    answerInput.value = ''
    flipCardInner.classList.remove('flipped')
    answerInput.focus()

    progress.textContent = `${index + 1} / ${words.length}`
    isAnswered = false
}

// =======================
// CHECK ANSWER
// =======================
function check() {
    if (isAnswered) return

    const words = getFilteredWords()
    const item = words[index]

    if (!item) return

    const val = answerInput.value.trim().toLowerCase()

    if (val === item.word.toLowerCase()) {
        isAnswered = true
        feedback.textContent = '✅ Correct'
        setTimeout(next, 800)
    } else {
        feedback.textContent = '❌ Wrong — try again'
        answerInput.value = ''
        answerInput.focus()
    }
}

// =======================
// NEXT CARD
// =======================
function next() {
    const words = getFilteredWords()

    if (!words.length) return

    index = (index + 1) % words.length
    show()
}

// =======================
// TOPIC FILTER BUTTONS
// =======================
function setupTopicButtons() {
    const buttons = document.querySelectorAll(".topic-btn")

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"))
            btn.classList.add("active")

            currentTopic = btn.dataset.topic
            buildDeck()
            show()
        })
    })
}

// =======================
// EVENTS
// =======================
flipCard.addEventListener('click', () => {
    flipCardInner.classList.toggle('flipped')
})

submitBtn.addEventListener('click', check)

answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        check()
    }
})

// =======================
// INIT SAFE LOAD
// =======================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        load()
        setupTopicButtons()
    })
} else {
    load()
    setupTopicButtons()
}