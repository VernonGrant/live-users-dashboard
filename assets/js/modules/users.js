import { apiURL } from '../settings.js';
import { applicationState } from '../main.js';

const usersList = document.getElementById('users-list');

function convertEpocTime(seconds) {
    const date = new Date(0);
    date.setUTCSeconds(seconds);
    return date.getHours() + ':' + date.getMinutes();
}

function updateWelcomeMessage() {
    const userWelcomeMessage = document.getElementById('user-welcome-message');
    userWelcomeMessage.innerHTML = 'Welcome, ' + applicationState.currentUser.name;
}

function updateUsersList() {
    updateWelcomeMessage();

    if (Object.keys(applicationState.onlineUsers).length === 0) {
        usersList.innerHTML = '<div class="no-results">No online users</div>';
        return;
    }

    let usersListEntries = [];
    for (const [key, value] of Object.entries(applicationState.onlineUsers)) {
        let name = value.name;
        let address = value.ipAddress;
        let entrance = convertEpocTime(value.entranceTime);
        let updated = convertEpocTime(value.updatedTime);

        usersListEntries.push(`
        <div class="user-entry">
            <div><small>Name:</small>${name}</div>
            <div><small>IP:</small>${address}</div>
            <div><small>Entrance Time:</small>${entrance}</div>
            <div><small>Updated Time:</small>${updated}</div>
       </div>
       `);
    }

    usersList.innerHTML = usersListEntries.join('');
}

async function setOnlineUsers() {
    const response = await fetch(apiURL + 'users', {
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
        applicationState.onlineUsers = await response.json();
        updateUsersList();
    } else {
        console.error('Users route responded with: ', response.status);
    }
}

async function initUsers() {
    await setOnlineUsers();

    usersList.addEventListener('click', (event) => {
        // TODO: Show additional user details.
        // console.log(event.srcElement);
    });
}

export { initUsers };
