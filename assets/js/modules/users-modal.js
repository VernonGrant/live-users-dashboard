import { applicationState } from '../main.js';
import { convertEpocTime } from './users.js';

const modal = document.getElementById('app-user-modal');
const modalContainer = document.getElementById('user-modal-container');
const modalCloseButton = document.getElementById('user-modal-close');

function showUserModal(userItem) {
    // Set modal data.
    for (const value of Object.values(applicationState.onlineUsers)) {
        if (value.email === userItem.dataset.identifier) {
            const containerInner = `
                <ul>
                    <li class="list-label">Name</li>
                    <li>${value.name}</li>
                    <li class="list-label">Email</li>
                    <li>${value.email}</li>
                    <li class="list-label">User Agent</li>
                    <li>${value.agent}</li>
                    <li class="list-label">Entrance Time</li>
                    <li>${convertEpocTime(value.entranceTime)}</li>
                    <li class="list-label">Visit Count</li>
                    <li>${value.visitCount}</li>
                </ul>`;

            modalContainer.innerHTML = containerInner;
        }
    }

    // Show the modal.
    modal.style.display = 'flex';

    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
}

function hideUserModal() {
    modal.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000);
}

function initUserModal() {
    modalCloseButton.addEventListener('click', hideUserModal);
}

export { initUserModal, showUserModal};
