# Simple HTML/CSS/JavaScript Blog

A lightweight, static blog built with vanilla HTML, CSS, and JavaScript that's perfect for hosting on GitHub Pages and managing with GitHub Desktop.

## 🚀 Quick Start

### 1. Set Up Your Repository
1. Create a new repository on GitHub
2. Name it `your-username.github.io` for automatic GitHub Pages hosting
3. Download these files and upload them to your repository

### 2. File Structure
Create this folder structure in your repository:

```
your-blog/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── (your blog images)
├── data/
│   └── posts.json
├── README.md
└── .gitignore
```

### 3. Files Included
- **index.html** - Main blog homepage
- **styles.css** - Complete CSS styling (put in `assets/css/`)
- **main.js** - Blog functionality (put in `assets/js/`)
- **posts.json** - Blog posts data (put in `data/`)

### 4. GitHub Pages Setup
1. Go to your repository Settings
2. Scroll to "Pages" section
3. Select source: "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your blog will be live at `https://your-username.github.io`

## ✍️ Adding New Posts

### Easy Method (GitHub Desktop):
1. Open your local repository folder
2. Edit `data/posts.json`
3. Add a new post object to the "posts" array
4. Save the file
5. In GitHub Desktop: commit and push changes
6. Your new post appears automatically!

### Using the Admin Interface:
1. Open your blog in a browser
2. Click "Admin" in the navigation
3. Fill out the form
4. Copy the generated JSON
5. Add it to your `posts.json` file

## 🎨 Customization

### Change Site Title
Edit the `<title>` and `<h1 class="nav-title">` in `index.html`

### Modify Colors  
Edit the CSS custom properties in `styles.css`

### Add Your Content
- Replace sample posts in `posts.json`
- Add your images to `assets/images/`
- Update the footer with your information

## 📱 Features

- **Responsive Design** - Works on all devices
- **Search & Filter** - Find posts by title, content, or tags
- **Pagination** - Handles large numbers of posts
- **Admin Interface** - Easy post creation form
- **Markdown Support** - Basic markdown formatting
- **Fast Loading** - Pure static files
- **SEO Friendly** - Semantic HTML structure

## 🔧 Local Development

To test locally:
1. Open `index.html` in your browser, or
2. Use a simple HTTP server

## 📝 Content Guidelines

### Post Structure
Each post needs:
- **id**: Unique number
- **title**: Post title
- **slug**: URL-friendly version of title
- **date**: YYYY-MM-DD format
- **excerpt**: Brief description
- **content**: Full post with \n for line breaks
- **tags**: Array of tag strings

## 🚀 GitHub Desktop Workflow

### Daily Blogging:
1. **Write**: Edit `data/posts.json` to add new posts
2. **Preview**: Open `index.html` to check your changes
3. **Publish**: Use GitHub Desktop to commit and push
4. **Live**: Your changes appear on GitHub Pages in minutes!

## 🆘 Troubleshooting

### Posts Not Showing
- Check JSON syntax is valid
- Ensure file is saved and committed
- Verify date format is YYYY-MM-DD

### GitHub Pages Not Updating
- Wait 5-10 minutes for changes to propagate
- Check repository is public
- Verify Pages settings are correct

## 📄 License

Free to use and modify for personal and commercial projects.

---

Happy blogging! 🎉
