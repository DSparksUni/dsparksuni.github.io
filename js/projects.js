import markdownit from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.1/+esm'

const projects = [
    {
        id: "project-rust_gol",
        root: "https://raw.githubusercontent.com/DSparksUni/RustLife/refs/heads/master",
        url: "https://github.com/DSparksUni/RustLife",
    },
];

function update_projects() {
    const markdown = markdownit();

    const default_render = markdown.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const href_idx = tokens[idx].attrIndex('href');

        if (href_idx >= 0) {
            tokens[idx].attrPush(['target', '_blank']);
            tokens[idx].attrPush(['rel', 'noopener norefferer']);
        }

        return default_render(tokens, idx, options, env, self);
    };

    projects.forEach(project => {
        fetch(`${project.root}/README.md`).then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.text();
        }).then(md => {
            const image_patch = md.replace(
                /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
                (_, alt, path) => `![${alt}](${project.root}/${path})`
            );
            const container = document.getElementById(project.id);
            container.innerHTML += markdown.render(image_patch);
        }).catch(err => {
            const container = document.getElementById(project.id);
            container.innerHTML =
                `<p style="color:red;">Failed to load README: ${err.message}</p>`;
        });
    });
}
update_projects();
