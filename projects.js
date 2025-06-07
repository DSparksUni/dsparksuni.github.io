const projects = [
    {
        id: "project-rust_gol",
        root: "https://raw.githubusercontent.com/DSparksUni/RustLife/refs/heads/master",
        url: "https://github.com/DSparksUni/RustLife",
    },
];

projects.forEach(project => {
    fetch(`${project.root}/README.md`).then(res => {
        if(!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        return res.text();
    }).then(md => {
        const image_patch = md.replace(
            /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, 
            (match, alt, path) => `![${alt}](${project.root}/${path})`
        );

        const container = document.getElementById(project.id);
        container.innerHTML = marked.parse(image_patch);
    }).catch(err => {
        const container = document.getElementById(project.id);
        container.innerHTML =
            `<p style="color:red;">Failed to load README: ${err.message}</p>`;
    });
});