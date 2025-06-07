// Update the active class on click
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav a').forEach(el => el.classList.remove('active'));
    this.classList.add('active');
  });
});


// Update the active class on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current_section = '';
    const scroll_y = window.pageYOffset;

    sections.forEach(section => {
        const top = section.offsetTop - 60;
        const height = section.offsetHeight;

        if(scroll_y >= top && scroll_y < top + height)
            current_section = section.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if(link.getAttribute('href') === `#${current_section}`)
            link.classList.add('active');
    });
});