const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let timeout;

function isDesktop() {
    return window.matchMedia('(min-width: 1024px)').matches;
}

function startProgressAnimation(index) {
    if (!isDesktop()) return;

    clearTimeout(timeout);

    sections.forEach((sec) => {
        sec.classList.remove('active');
        const fill = sec.querySelector('.progress-fill');
        if (fill) {
            fill.style.transition = 'none';
            fill.style.width = '0%';
        }
    });

    const activeSection = sections[index];
    const progressFill = activeSection.querySelector('.progress-fill');

    activeSection.classList.add('active');

    // Start progress animation
    setTimeout(() => {
        if (progressFill && isDesktop()) {
            progressFill.style.transition = 'width 10s linear';
            progressFill.style.width = '100%';
        }
    }, 10);

    timeout = setTimeout(() => {
        if (isDesktop()) {
            currentIndex = (index + 1) % sections.length;
            startProgressAnimation(currentIndex);
        }
    }, 10000);
}

function handleResize() {
    if (!isDesktop()) {
        clearTimeout(timeout);
        sections.forEach((section) => {
            section.classList.remove('active');
            const progressBar = section.querySelector('.progress-fill');
            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
            }
        });
    } else {
        startProgressAnimation(currentIndex);
    }
}

if (isDesktop()) {
    startProgressAnimation(currentIndex);
}

sections.forEach((section, index) => {
    section.addEventListener('click', () => {
        if (isDesktop()) {
            currentIndex = index;
            startProgressAnimation(index);
        }
    });
});

const debouncedResize = debounce(handleResize, 100);
window.addEventListener('resize', debouncedResize);

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}