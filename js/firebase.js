import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getDatabase, ref, push, onValue, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

const app = initializeApp(CONFIG.FIREBASE);
const db = getDatabase(app);

const Firebase = {
    // Post a new comment
    postComment(path, name, text, parentId = null) {
        const commentsRef = ref(db, path);
        return push(commentsRef, {
            name,
            text,
            parentId,
            timestamp: serverTimestamp()
        });
    },

    // Listen to comments in real time
    listenToComments(path, callback) {
        const commentsRef = ref(db, path);
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            const comments = data ? Object.entries(data).map(([id, val]) => ({
                id,
                ...val
            })) : [];
            // Sort newest first
            comments.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            callback(comments);
        });
    }
};