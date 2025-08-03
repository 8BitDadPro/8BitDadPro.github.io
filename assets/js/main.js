// Helper: simple Markdown-to-HTML for headers, paragraphs, bold, and italics
function renderMarkdown(mdText) {
    let html = mdText
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*?)\*/gim, "<i>$1</i>")
        .replace(/\n$/gim, "<br/>")
        .replace(/\n\n+/g, "</p><p>")
        .replace(/^(?!<h\d>|<ul>|<ol>)/gim, "<p>"); // naive paragraph
    return html;
}

function renderPostList(posts) {
    const container = document.getElementById("posts");
    container.innerHTML = "";
    posts.forEach((post, idx) => {
        // Post preview container
        const item = document.createElement("div");
        item.className = "post-preview";
        // Main preview
        item.innerHTML = `
      <h2 class="post-title" style="cursor:pointer;" data-idx="${idx}">${post.title}</h2>
      <p><em>${post.date}</em> &mdash; Tags: ${post.tags.join(", ")}</p>
      <p>${post.excerpt}</p>
      <div class="full-post" style="display:none; margin-top:1em;">${renderMarkdown(post.content)}</div>
      <hr>
    `;
        container.appendChild(item);
    });

    // Add click handler to toggle full post view
    container.querySelectorAll(".post-title").forEach((titleEl) => {
        titleEl.addEventListener("click", function () {
            const idx = +this.dataset.idx;
            const fullPost = this.parentNode.querySelector(".full-post");
            fullPost.style.display =
                fullPost.style.display === "none" ? "block" : "none";
        });
    });
}

function loadPosts() {
    fetch("posts/index.json")
        .then((res) => res.json())
        .then((fileList) =>
            Promise.all(
                fileList.map((filename) =>
                    fetch("posts/" + filename).then((f) => f.json()),
                ),
            ),
        )
        .then((posts) => {
            // Order by date descending
            posts.sort((a, b) => b.date.localeCompare(a.date));
            renderPostList(posts);
        })
        .catch((err) => {
            document.getElementById("posts").innerHTML =
                "Failed to load posts. Double-check the posts folder and index.json.<br>" +
                err;
        });
}

// Initialize when page loads
window.addEventListener("DOMContentLoaded", loadPosts);
