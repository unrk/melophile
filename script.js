document.addEventListener('DOMContentLoaded', function() {
    const taskbarIcons = document.querySelectorAll('.taskbar-icon');
    const contentDiv = document.querySelector('.content');
    let activeContentId = null;

    // Function to detect if the user is on a phone or tablet
    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // If the user is on a phone or tablet, display the black screen with "Skill Issue"
    if (isMobileDevice()) {
        document.body.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100vh; background-color: black; color: white; font-size: 2em;">Skill Issue</div>';
        return;
    }

    taskbarIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            const contentId = this.getAttribute('data-content');
            if (activeContentId === contentId) {
                // If the same icon is clicked again, hide the content
                contentDiv.innerHTML = '';
                activeContentId = null;
                showEyes();
            } else {
                // Load new content
                loadContent(contentId);
                activeContentId = contentId;
                hideEyes();
            }
        });
    });

    function loadContent(contentId) {
        // Clear the current content
        contentDiv.innerHTML = '';

        // Load new content based on the contentId
        switch(contentId) {
            case 'content1':
                contentDiv.innerHTML = '<p>Content will be uploaded Soon...</p>';
                break;
            case 'content2':
                contentDiv.innerHTML = `<p>Content will be uploaded Soon...</p>`;
                break;  
            case 'content3':
                contentDiv.innerHTML = '<p>Patience you should learn..</p>';
                break;
            default:
                contentDiv.innerHTML = '<p>Default content</p>';
        }
    }

    function showEyes() {
        contentDiv.innerHTML = `
            <div class="eyes">
                <div class="eye">
                    <div class="pupil"></div>
                </div>
                <div class="eye">
                    <div class="pupil"></div>
                </div>
            </div>
        `;
        document.addEventListener('mousemove', movePupils);
    }

    function hideEyes() {
        document.removeEventListener('mousemove', movePupils);
    }

    function movePupils(event) {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const pupil = eye.querySelector('.pupil');
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
            const distance = Math.min(rect.width / 4, Math.hypot(event.clientX - eyeX, event.clientY - eyeY));
            pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        });
    }

    // Initially show eyes
    showEyes();
});