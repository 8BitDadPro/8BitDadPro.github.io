// Simple Markdown renderer (basic support for headers, bold, italics, line breaks)
function renderMarkdown(mdText) {
    let html = mdText
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*?)\*/gim, "<i>$1</i>")
        .replace(/\n\n+/g, "</p><p>")
        .replace(/\n/g, "<br/>");
    return "<p>" + html + "</p>";
}

// Render post list on homepage with links to post.html pages
function renderPostList(posts) {
    const container = document.getElementById("posts");
    container.innerHTML = "";
    posts.forEach((post) => {
        const item = document.createElement("div");
        item.className = "post-preview";
        item.innerHTML = `
      <h2 class="post-title"><a href="post.html?slug=${post.slug}">${post.title}</a></h2>
      <p class="post-meta"><em>${post.date}</em> &mdash; Tags: ${post.tags.join(", ")}</p>
      <p>${post.excerpt}</p>
      <hr>
    `;
        container.appendChild(item);
    });
}

function loadPosts() {
    fetch("posts/index.json")
        .then((res) => res.json())
        .then((fileList) =>
            Promise.all(
                fileList.map((filename) =>
                    fetch("posts/" + filename).then((r) => r.json()),
                ),
            ),
        )
        .then((posts) => {
            posts.sort((a, b) => b.date.localeCompare(a.date));
            renderPostList(posts);
        })
        .catch((err) => {
            const container = document.getElementById("posts");
            if (container) {
                container.innerHTML =
                    "Failed to load posts. Double-check the posts folder and index.json.<br>" +
                    err;
            } else {
                console.error("Posts container not found in DOM.");
            }
        });
}

window.addEventListener("DOMContentLoaded", loadPosts);
