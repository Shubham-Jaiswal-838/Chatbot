# Chatbot App

## Stack used

- Next.js
- Tailwind CSS
- Redux Toolkit
- TypeScript
- React
- Redux Persist
- Lucide React
- IndexedDB


## Data storage

- Chat state is managed with Redux Toolkit.
- Data is persisted using Redux Persist with local storage.
- Example: `redux-persist` + `@reduxjs/toolkit` for storing chat threads and messages.
- Images are stored in IndexedDB, and the attachment metadata is stored in Redux state.
- The app saves the actual image blob in IndexedDB, while Redux stores attachment info such as id, name, mimeType, and size.
- Preview URLs are stripped before persisting Redux data to keep the local storage payload smaller and avoid saving temporary browser object URLs.

## Optimization/Performance
-  CSR/SSR/SSG
-  Virtualization
-  Memo/Memoization 
-  Dynamic imports 

## Styling

- UI styling is done with Tailwind CSS.
- Custom styles are added in `app/globals.css`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000
