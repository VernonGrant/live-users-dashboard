import { initEntrance } from './modules/entrance.js';

const applicationState = {
    currentUser: {}
};

document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize entrance module.
    initEntrance();
})

export { applicationState };
