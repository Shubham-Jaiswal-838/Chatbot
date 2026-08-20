(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/StoreProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StoreProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/integration/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function StoreProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PersistGate"], {
            loading: null,
            persistor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistor"],
            children: children
        }, void 0, false, {
            fileName: "[project]/app/StoreProvider.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/StoreProvider.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = StoreProvider;
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/features/chatSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addMessage",
    ()=>addMessage,
    "createNewThread",
    ()=>createNewThread,
    "default",
    ()=>__TURBOPACK__default__export__,
    "replaceMessages",
    ()=>replaceMessages,
    "setActiveThread",
    ()=>setActiveThread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const makeId = (prefix)=>{
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return `${prefix}-${crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
const getThreadTitle = (messages)=>{
    const firstUserMessage = messages.find((message)=>message.sender === 'user' && message.text.trim());
    const rawText = firstUserMessage?.text.trim() ?? 'New chat';
    const words = rawText.split(/\s+/).filter(Boolean);
    const title = words.slice(0, 3).join(' ');
    return title || 'New chat';
};
const createThread = (messages = [], id = makeId('thread'))=>({
        id,
        title: getThreadTitle(messages),
        messages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
// Start with no persisted threads by default; opening the app shows an empty new chat (draft)
const initialState = {
    threads: [],
    activeThreadId: null,
    activeDraft: null
};
const chatSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'chat',
    initialState,
    reducers: {
        createNewThread: (state)=>{
            // If a draft already exists, activate it instead of creating a duplicate
            if (state.activeDraft) {
                state.activeThreadId = state.activeDraft.id;
                return;
            }
            // create an in-memory draft (do not persist until a message is added)
            const draft = {
                ...createThread([], makeId('draft'))
            };
            state.activeDraft = draft;
            state.activeThreadId = draft.id;
        },
        finalizeDraft: (state)=>{
            // move draft into threads only when it has messages
            const draft = state.activeDraft;
            if (!draft) return;
            if (!Array.isArray(draft.messages) || draft.messages.length === 0) return;
            const thread = {
                ...draft,
                id: makeId('thread'),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            state.threads = [
                thread,
                ...state.threads
            ];
            state.activeThreadId = thread.id;
            state.activeDraft = null;
        },
        discardDraft: (state)=>{
            state.activeDraft = null;
            // set activeThreadId to first persisted thread if available
            state.activeThreadId = state.threads[0]?.id ?? null;
        },
        setActiveThread: (state, action)=>{
            state.activeThreadId = action.payload;
        },
        addMessage: (state, action)=>{
            // If there's a draft active (not persisted), add messages to the draft
            const draft = state.activeDraft;
            if (draft && state.activeThreadId === draft.id) {
                draft.messages.push(action.payload);
                draft.updatedAt = new Date().toISOString();
                // If the user has added a user message, finalize and persist the draft
                if (action.payload.sender === 'user') {
                    draft.title = getThreadTitle(draft.messages);
                    const thread = {
                        ...draft,
                        id: makeId('thread'),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    state.threads = [
                        thread,
                        ...state.threads
                    ];
                    state.activeThreadId = thread.id;
                    state.activeDraft = null;
                }
                return;
            }
            const activeId = state.activeThreadId ?? state.threads[0]?.id;
            if (!activeId) {
                const nextThread = createThread([
                    action.payload
                ], makeId('thread'));
                state.threads = [
                    nextThread
                ];
                state.activeThreadId = nextThread.id;
                return;
            }
            let thread = state.threads.find((item)=>item.id === activeId);
            if (!thread) {
                thread = createThread([
                    action.payload
                ], activeId);
                state.threads = [
                    thread,
                    ...state.threads
                ];
                state.activeThreadId = thread.id;
                return;
            }
            thread.messages.push(action.payload);
            thread.updatedAt = new Date().toISOString();
            if (action.payload.sender === 'user') {
                thread.title = getThreadTitle(thread.messages);
            }
        },
        replaceMessages: (state, action)=>{
            const activeId = state.activeThreadId ?? state.threads[0]?.id;
            if (!activeId) {
                const nextThread = createThread(action.payload, makeId('thread'));
                state.threads = [
                    nextThread
                ];
                state.activeThreadId = nextThread.id;
                return;
            }
            let thread = state.threads.find((item)=>item.id === activeId);
            if (!thread) {
                thread = createThread(action.payload, activeId);
                state.threads = [
                    thread,
                    ...state.threads
                ];
                state.activeThreadId = thread.id;
                return;
            }
            thread.messages = action.payload;
            thread.title = getThreadTitle(action.payload);
            thread.updatedAt = new Date().toISOString();
        }
    }
});
const { createNewThread, setActiveThread, addMessage, replaceMessages } = chatSlice.actions;
const __TURBOPACK__default__export__ = chatSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "persistor",
    ()=>persistor,
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistReducer.js [app-client] (ecmascript) <export default as persistReducer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistStore.js [app-client] (ecmascript) <export default as persistStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$createTransform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTransform$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/createTransform.js [app-client] (ecmascript) <export default as createTransform>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/lib/storage/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$features$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/features/chatSlice.ts [app-client] (ecmascript)");
;
;
;
;
;
const stripAttachmentPreviewUrls = (value)=>{
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) {
        return value.map(stripAttachmentPreviewUrls);
    }
    if ('attachments' in value) {
        return {
            ...value,
            attachments: (value.attachments ?? []).map((attachment)=>{
                const { previewUrl, ...rest } = attachment;
                return rest;
            })
        };
    }
    return Object.fromEntries(Object.entries(value).map(([key, nestedValue])=>[
            key,
            stripAttachmentPreviewUrls(nestedValue)
        ]));
};
const stripPreviewUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$createTransform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTransform$3e$__["createTransform"])((inboundState)=>{
    const state = stripAttachmentPreviewUrls(inboundState);
    // Remove threads that have no messages before persisting
    if (state && Array.isArray(state.threads)) {
        const threads = state.threads.filter((t)=>Array.isArray(t.messages) && t.messages.length > 0);
        // Do not persist activeDraft
        const { activeDraft, ...rest } = state;
        return {
            ...rest,
            threads
        };
    }
    // In case there are no threads ensure we don't persist an activeDraft
    if (state && state.activeDraft) {
        const { activeDraft, ...rest } = state;
        return rest;
    }
    return state;
}, (outboundState)=>outboundState, {
    whitelist: [
        'chat'
    ]
});
const migrateChatState = (state)=>{
    if (!state) {
        return {
            threads: [],
            activeThreadId: null
        };
    }
    const legacyMessages = Array.isArray(state.messages) ? state.messages : [];
    const threads = Array.isArray(state.threads) ? state.threads : [];
    if (threads.length > 0) {
        const normalized = threads.map((thread)=>({
                id: thread.id,
                title: thread.title || 'New chat',
                createdAt: thread.createdAt || new Date().toISOString(),
                updatedAt: thread.updatedAt || new Date().toISOString(),
                messages: Array.isArray(thread.messages) ? thread.messages : []
            }));
        // If persisted activeThreadId doesnt exist in normalized threads fall back to the first thread id or null
        const activeId = state.activeThreadId && normalized.some((t)=>t.id === state.activeThreadId) ? state.activeThreadId : normalized[0]?.id ?? null;
        return {
            ...state,
            threads: normalized,
            activeThreadId: activeId
        };
    }
    if (legacyMessages.length > 0) {
        return {
            threads: [
                {
                    id: 'thread-default',
                    title: 'New chat',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    messages: legacyMessages
                }
            ],
            activeThreadId: 'thread-default'
        };
    }
    return {
        threads: [],
        activeThreadId: null
    };
};
const migrate = (state)=>Promise.resolve(migrateChatState(state));
const persistConfig = {
    key: 'chatbot-store',
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    version: 2,
    migrate,
    transforms: [
        stripPreviewUrls
    ]
};
const persistedChatReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__["persistReducer"])(persistConfig, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$features$2f$chatSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        chat: persistedChatReducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        })
});
const persistor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__["persistStore"])(store);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_181lc-r._.js.map