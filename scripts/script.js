const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let timeout;

function isDesktop() {
    return window.innerWidth >= 1024;
}

function startProgressAnimation(index) {
    if (!isDesktop()) return;

    clearTimeout(timeout);

    document.querySelectorAll('.progress-fill').forEach((fill) => {
        fill.style.transition = 'none';
        fill.style.width = '0%';
    });

    const activeSection = sections[index];
    const progressFill = activeSection.querySelector('.progress-fill');

    sections.forEach((sec) => sec.classList.remove('active'));
    activeSection.classList.add('active');

    setTimeout(() => {
        progressFill.style.transition = 'width 10s linear';
        progressFill.style.width = '100%';
    }, 10);

    timeout = setTimeout(() => {
        currentIndex = (index + 1) % sections.length;
        startProgressAnimation(currentIndex);
    }, 10000); // 10s duration
}

if (isDesktop()) {
    startProgressAnimation(currentIndex);
}

// Click event to manually switch sections
sections.forEach((section, index) => {
    section.addEventListener('click', () => {
        if (isDesktop()) {
            currentIndex = index;
            startProgressAnimation(index);
        }
    });
});

window.addEventListener('resize', () => {
    if (!isDesktop()) {
        sections.forEach((section) => {
            const progressBar = section.querySelector('.progress-fill');
            progressBar.style.width = '0%';
            progressBar.style.transition = 'none'; // Disable transition on mobile
        });
    } else {
        startProgressAnimation(currentIndex);
    }
});
