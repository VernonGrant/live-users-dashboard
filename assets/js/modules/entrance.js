import { apiURL } from '../settings.js';
import { applicationState } from '../main.js';
import { initUsers } from './users.js';

const entranceInterface = document.getElementById('app-entrance');
const form = document.getElementById('entrance-form');
const submitButton = form.querySelector('.btn');

function fadeOutEntanceInterface() {
    entranceInterface.style.opacity = 0;

    setTimeout(() => {
        entranceInterface.style.display = 'none';
    }, 1000);
}

async function onSubmit(event) {
    // Mute submit button.
    submitButton.disabled = true;
    submitButton.innerHTML = 'Loading...';
    submitButton.classList.add('floating');

    // Send enter request.
    const response = await fetch(apiURL + 'enter', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: new URLSearchParams(new FormData(form))
    });

    if (response.ok) {
        applicationState.currentUser = await response.json();

        // Call users module.
        await initUsers();
        fadeOutEntanceInterface();

    } else {
        console.error('Enter route responded with: ', response.status);
    }
}

function initEntrance () {
    console.info('Hello from entrance.');
    form.addEventListener('submit', onSubmit);
}

export { initEntrance };
