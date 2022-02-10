import { apiURL } from '../settings.js';

const form = document.getElementById('entrance-form');
const submitButton = form.querySelector('.btn');

async function onSubmit(event) {

    // Mute submit button.
    submitButton.disabled = true;
    submitButton.innerHTML = 'Loading...';
    submitButton.classList.add('floating');


    // TODO: replace with real data.
    const data = {
        username: 'Vernon',
        email: 'vernon@ruppell.io'
    };

    // Send enter request.
    const response = await fetch(apiURL + 'enter', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    //
    console.log(response);
}

function initEntrance () {
    console.info('Hello from entrance.');
    form.addEventListener('submit', onSubmit);
}

export { initEntrance };
