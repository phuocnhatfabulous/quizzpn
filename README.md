# Quiz — Japanese & Tech Commands

Small client-side quiz app for learning Japanese vocabulary and technical commands (Docker, AWS, Linux, Argo, etc.). It's a static site that stores word lists in browser `localStorage` and provides a lightweight admin UI to import/export JSON data.

## Quick start

- Open the main quiz in your browser:

```bash
open html/index.html
```

- Open the admin UI to add/import/export quiz data:

```bash
open html/admin.html
```

- Open the tech command quiz page (topic navbar included):

```bash
open html/tech.html
```

## Project structure

- [html/index.html](html/index.html) — main Japanese image quiz UI
- [html/admin.html](html/admin.html) — manage words (add/edit/import/export)
- [html/tech.html](html/tech.html) — technical command quiz (topic navbar)
- [css/style.css](css/style.css) — styles
- [js/data.js](js/data.js) — storage and import/export helper (uses `localStorage`)
- [js/logic.js](js/logic.js) — main quiz behavior for `index.html`
- [js/admin.js](js/admin.js) — admin page wiring and CRUD UI
- [js/tech.js](js/tech.js) — tech quiz logic (topic decks)
- [js/tech-data.json](js/tech-data.json) — per-topic tech questions (JSON)
- [imgs/](imgs/) — images and `words.json` sample data

## How data is stored

- The app uses a `STORAGE_KEY` in `js/data.js` to persist the word list to `localStorage`.
- Use the Admin UI ([html/admin.html](html/admin.html)) to add, edit, delete, import or export the JSON word list.
- The JSON format is a simple array of objects. Example entry:

```json
{ "id": 1, "img": "apple.jpg", "kanji": "", "word": "りんご", "topic": "fruit" }
```

## Tech quiz topics

- The tech quiz loads `js/tech-data.json` and exposes a topic navbar (Japanese, Docker, AWS, Linux, Argo). Add or update topic arrays in that file to extend questions.

## Extending the app

- To add images, put them in the `imgs/` folder and reference the file name in the `img` field.
- To add or manage tech questions via UI, I can integrate `tech-data.json` into the admin UI (ask me to implement that).

## Notes

- This is a purely client-side app — no server required. Works by opening the HTML pages in a browser.
- Tested on macOS (use `open`), other OSes can open files via file manager or a local static server.

If you want, I can:
- Add editing for `js/tech-data.json` inside the existing admin UI, or
- Add more sample questions per topic.
