// Blog Application JavaScript

class SimpleBlog {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentView = 'home';
        this.currentPage = 1;
        this.postsPerPage = 5;
        this.selectedTags = new Set();
        this.searchQuery = '';

        this.init();
    }

    async init() {
        try {
            await this.loadPosts();
            this.setupEventListeners();
            this.renderPosts();
            this.renderTagFilters();
        } catch (error) {
            console.error('Failed to initialize blog:', error);
            this.showError('Failed to load blog posts');
        }
    }

    async loadPosts() {
        try {
            // Try to load from JSON file first
            const response = await fetch('data/posts.json');
            if (response.ok) {
                const data = await response.json();
                this.posts = data.posts || [];
            } else {
                // Fallback to sample data
                this.posts = this.getSamplePosts();
            }
        } catch (error) {
            // Fallback to sample data if JSON file doesn't exist
            this.posts = this.getSamplePosts();
        }

        // Sort posts by date (newest first)
        this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.filteredPosts = [...this.posts];
    }

    getSamplePosts() {
        return [
            {
                "id": 1,
                "title": "Welcome to My Blog",
                "slug": "welcome-to-my-blog",
                "date": "2024-01-15",
                "excerpt": "This is my first blog post. Welcome to my simple, static blog built with HTML, CSS, and JavaScript.",
                "content": "# Welcome to My Blog\n\nThis is my first blog post on this simple, static blog. This blog is built using only HTML, CSS, and JavaScript, making it perfect for hosting on GitHub Pages.\n\n## Features\n\n- **Simple Management**: Add new posts by editing a JSON file\n- **GitHub Integration**: Easy to update using GitHub Desktop\n- **Responsive Design**: Works great on all devices\n- **Fast Loading**: Static files mean quick page loads\n\nI'm excited to share more content with you soon!",
                "tags": ["welcome", "blog", "introduction"]
            },
            {
                "id": 2,
                "title": "How to Build a Static Blog",
                "slug": "how-to-build-static-blog",
                "date": "2024-01-20",
                "excerpt": "Learn how to create your own static blog using HTML, CSS, and JavaScript that you can easily host on GitHub Pages.",
                "content": "# How to Build a Static Blog\n\nBuilding a static blog has many advantages over traditional dynamic blogs. Here's why you should consider it:\n\n## Benefits of Static Blogs\n\n1. **Fast Performance**: No database queries or server processing\n2. **Better Security**: No server-side vulnerabilities\n3. **Free Hosting**: GitHub Pages hosts static sites for free\n4. **Version Control**: Your entire blog is version controlled\n\n## Technologies Used\n\n- **HTML**: Structure and content\n- **CSS**: Styling and responsive design\n- **JavaScript**: Dynamic functionality and post loading\n- **JSON**: Data storage for blog posts\n\nThis approach gives you full control over your blog while keeping it simple and maintainable.",
                "tags": ["tutorial", "web development", "static sites"]
            },
            {
                "id": 3,
                "title": "Getting Started with GitHub Pages",
                "slug": "getting-started-github-pages",
                "date": "2024-01-25",
                "excerpt": "A beginner's guide to hosting your static website on GitHub Pages for free.",
                "content": "# Getting Started with GitHub Pages\n\nGitHub Pages is an excellent way to host static websites for free. Here's how to get started:\n\n## Step 1: Create a Repository\n\n1. Go to GitHub and create a new repository\n2. Name it `your-username.github.io` for a personal site\n3. Make sure it's public\n\n## Step 2: Add Your Files\n\n1. Upload your HTML, CSS, and JavaScript files\n2. Make sure you have an `index.html` file in the root\n3. Commit your changes\n\n## Step 3: Enable GitHub Pages\n\n1. Go to your repository settings\n2. Scroll down to GitHub Pages section\n3. Select your source branch (usually `main`)\n\nThat's it! Your site will be available at `https://your-username.github.io`",
                "tags": ["github", "hosting", "tutorial"]
            }
        ];
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('home-btn').addEventListener('click', () => this.showView('home'));
        document.getElementById('admin-btn').addEventListener('click', () => this.showView('admin'));
        document.getElementById('back-btn').addEventListener('click', () => this.showView('home'));

        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterPosts();
        });

        // Admin form
        const adminForm = document.getElementById('admin-form');
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generatePostJSON();
        });
    }

    showView(view) {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

        // Show selected view
        document.getElementById(`${view}-view`).classList.add('active');

        this.currentView = view;
    }

    showPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const postDetail = document.getElementById('post-detail');
        postDetail.innerHTML = `
            <h1>${post.title}</h1>
            <div class="post-meta">
                <span>📅 ${this.formatDate(post.date)}</span>
                <span>🏷️ ${post.tags.join(', ')}</span>
            </div>
            <div class="post-content">
                ${this.renderMarkdown(post.content)}
            </div>
        `;

        this.showView('post');
    }

    renderPosts() {
        const postsGrid = document.getElementById('posts-grid');

        if (this.filteredPosts.length === 0) {
            postsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        // Render posts
        postsGrid.innerHTML = postsToShow.map(post => `
            <article class="post-card" onclick="blog.showPost(${post.id})">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span>📅 ${this.formatDate(post.date)}</span>
                </div>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
            </article>
        `).join('');

        this.renderPagination();
    }

    renderTagFilters() {
        const allTags = [...new Set(this.posts.flatMap(post => post.tags))];
        const filterTags = document.getElementById('filter-tags');

        filterTags.innerHTML = allTags.map(tag => `
            <span class="tag" onclick="blog.toggleTag('${tag}')">${tag}</span>
        `).join('');
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
        const pagination = document.getElementById('pagination');

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="blog.goToPage(${this.currentPage - 1})">
                Previous
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="${i === this.currentPage ? 'active' : ''}" onclick="blog.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        // Next button
        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="blog.goToPage(${this.currentPage + 1})">
                Next
            </button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    toggleTag(tag) {
        if (this.selectedTags.has(tag)) {
            this.selectedTags.delete(tag);
        } else {
            this.selectedTags.add(tag);
        }

        // Update tag visual state
        document.querySelectorAll('.tag').forEach(tagEl => {
            if (tagEl.textContent === tag) {
                tagEl.classList.toggle('active', this.selectedTags.has(tag));
            }
        });

        this.filterPosts();
    }

    filterPosts() {
        this.filteredPosts = this.posts.filter(post => {
            // Search filter
            const matchesSearch = this.searchQuery === '' || 
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.excerpt.toLowerCase().includes(this.searchQuery) ||
                post.content.toLowerCase().includes(this.searchQuery);

            // Tag filter
            const matchesTags = this.selectedTags.size === 0 ||
                [...this.selectedTags].some(tag => post.tags.includes(tag));

            return matchesSearch && matchesTags;
        });

        this.currentPage = 1;
        this.renderPosts();
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
        if (page < 1 || page > totalPages) return;

        this.currentPage = page;
        this.renderPosts();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    generatePostJSON() {
        const form = document.getElementById('admin-form');
        const formData = new FormData(form);

        const title = document.getElementById('post-title').value;
        const excerpt = document.getElementById('post-excerpt').value;
        const content = document.getElementById('post-content').value;
        const tagsInput = document.getElementById('post-tags').value;

        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
        const slug = this.generateSlug(title);
        const date = new Date().toISOString().split('T')[0];
        const id = Math.max(...this.posts.map(p => p.id), 0) + 1;

        const postData = {
            id,
            title,
            slug,
            date,
            excerpt,
            content: content.replace(/\n/g, '\n'),
            tags
        };

        const jsonOutput = document.getElementById('json-output');
        jsonOutput.textContent = JSON.stringify(postData, null, 2);

        document.getElementById('generated-json').style.display = 'block';

        // Scroll to generated JSON
        document.getElementById('generated-json').scrollIntoView({ behavior: 'smooth' });
    }

    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    renderMarkdown(content) {
        // Simple markdown to HTML conversion
        return content
            .replace(/\n/g, '
')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
            .replace(/

/g, '</p><p>')
            .replace(/^(.*)$/gm, '<p>$1</p>')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
            .replace(/<p><ul>/g, '<ul>')
            .replace(/<\/ul><\/p>/g, '</ul>')
            .replace(/<p><\/p>/g, '');
    }

    showError(message) {
        const postsGrid = document.getElementById('posts-grid');
        postsGrid.innerHTML = `
            <div class="empty-state">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize the blog when the page loads
let blog;
document.addEventListener('DOMContentLoaded', () => {
    blog = new SimpleBlog();
});