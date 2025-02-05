document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.flex');
    const sections = Array.from(document.querySelectorAll('.section-1'));
    let currentIndex = 0;
    let autoplayInterval;
    const intervalTime = 2500;

    const gsapDefaults = { duration: 2, ease: 'power4.out' };

    function changeActiveSection(index, isClick = false) {
        if (sections[index].classList.contains('active')) return;

        sections.forEach((section) => {
            section.classList.remove('active');
            const textWrapper = section.querySelector('.text-wrapper');
            if (textWrapper) gsap.set(textWrapper, { display: 'none', opacity: 0 });

            const textH6 = section.querySelector('.font-mono h6');
            if (textH6) gsap.set(textH6, { display: 'block', opacity: 1 });

            gsap.to(section.querySelector('.image-small'), { height: '280px', duration: 2, ease: 'power4.out' });
            gsap.set(section, { opacity: 1, display: 'block' });

            const cardTitle = section.querySelector('.card-title');
            if (cardTitle) {
                gsap.set(cardTitle, { display: 'block', opacity: 1 });
            }
        });

        const activeSection = sections[index];
        activeSection.classList.add('active');
        gsap.set(activeSection, { opacity: 0, display: 'block' });
        container.prepend(activeSection);

        gsap.to(activeSection, { opacity: 1, ...gsapDefaults });

        const textWrapper = activeSection.querySelector('.text-wrapper');
        if (textWrapper) {
            gsap.set(textWrapper, { display: 'block', opacity: 0 });
            gsap.to(textWrapper, { opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 });
        }

        gsap.to(activeSection.querySelector('.text_xl'), { opacity: 1, y: 0, ...gsapDefaults, delay: 0.1 });
        gsap.to(activeSection.querySelector('.text_small'), {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power4.out',
            delay: 0.4,
        });
        gsap.to(activeSection.querySelector('.image-small'), {
            height: '450px',
            width: '350px',
            duration: 2,
            ease: 'power2.out',
        });

        // Hide card-title for the active section
        const activeCardTitle = activeSection.querySelector('.card-title');
        if (activeCardTitle) {
            gsap.set(activeCardTitle, { display: 'none', opacity: 0 });
        }

        currentIndex = (index + 1) % sections.length;

        if (isClick) {
            stopAutoplay();
            setTimeout(startAutoplay, 3000);
        }
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => changeActiveSection(currentIndex), intervalTime);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    sections.forEach((section, index) => {
        section.addEventListener('click', () => changeActiveSection(index, true));
    });

    changeActiveSection(0); // Initialize the first section
    startAutoplay(); // Start autoplay
});
