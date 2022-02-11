import { initEntrance } from './modules/entrance.js';
import { apiURL } from './settings.js';

const applicationState = {
    currentUser: null,
    onlineUsers: {}
};

document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize entrance module.
    initEntrance();
});

window.addEventListener('beforeunload', async (event) => {
    // if (currentUser === null) {
        // return;
    // }

    const response = await fetch(apiURL + 'exit', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: new URLSearchParams(applicationState.currentUser)
    });

    if (response.ok) {
        applicationState.currentUser = null;
        applicationState.onlineUsers = {};
    } else {
        console.error('Exit route responded with: ', response.status);
    }
});

export { applicationState };
