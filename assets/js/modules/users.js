import { apiURL } from '../settings.js';
import { applicationState } from '../main.js';
import { initUserModal, showUserModal } from './users-modal.js';

const usersList = document.getElementById('users-list');
const loadingIndicator  = document.getElementById('loading-indicator');

function disableLoadingIndicator() {
    loadingIndicator.style.transition = 'none';
    loadingIndicator.style.width = '0%';
}

function enableLoadingIndicator() {
    loadingIndicator.style.transition = 'width 3000ms linear';
    loadingIndicator.style.width = '100%';
}

function convertEpocTime(seconds) {
    const date = new Date(0);
    date.setUTCSeconds(seconds);
    return date.getHours() + ':' + date.getMinutes();
}

function updateUsersList() {
    // Update welcome message.
    const userWelcomeMessage = document.getElementById('user-welcome-message');
    userWelcomeMessage.innerHTML = 'Welcome, ' + applicationState.currentUser.name;

    if (Object.keys(applicationState.onlineUsers).length === 0) {
        usersList.innerHTML = '<div class="no-results">No online users</div>';
        return;
    }

    let usersListEntries = [];
    for (const [key, value] of Object.entries(applicationState.onlineUsers)) {
        usersListEntries.push(`
        <div class="user-entry" data-identifier="${value.email}">
            <div><small>Name:</small>${value.name}</div>
            <div><small>IP:</small>${value.ipAddress}</div>
            <div><small>Entrance Time:</small>${convertEpocTime(value.entranceTime)}</div>
            <div><small>Updated Time:</small>${convertEpocTime(value.updatedTime)}</div>
       </div>
       `);
    }

    enableLoadingIndicator();

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

    // Initialize user modal.
    initUserModal();

    // User list refresh.
    setInterval(async function() {
        disableLoadingIndicator();
        await setOnlineUsers();
    }, 3000);

    // User list item click events.
    usersList.addEventListener('click', (event) => {
        showUserModal(event.srcElement);
    });
}

export { initUsers, convertEpocTime };
