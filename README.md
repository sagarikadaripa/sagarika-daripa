# Sagarika Daripa — Portfolio

A modern, premium personal portfolio website for a Senior Ruby on Rails Software Engineer.

## Deploy on GitHub Pages

### Step 1 — Create the GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repo: `sagarika-portfolio` (or any name you prefer)
3. Set it to **Public**
4. Do **not** initialize with a README
5. Click **Create repository**

### Step 2 — Push from your local machine

```bash
cd ~/Projects/sagarika-portfolio
git remote add origin https://github.com/sagarikadaripa/sagarika-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

Your site will be live at:
```
https://sagarikadaripa.github.io/sagarika-portfolio/
```

(It may take 1–2 minutes for the first deployment.)

---

## Add Your Resume PDF

Place your resume file in the project root and update `index.html`:

```html
<!-- Change this line in index.html -->
<a href="Sagarika_Daripa_Resume_Updated.html" ...>Download Resume</a>

<!-- To point to a PDF instead -->
<a href="Sagarika_Daripa_Resume.pdf" ...>Download Resume</a>
```

## Customize

- **Colors** — edit CSS variables at the top of `styles.css`
- **Projects** — update the project cards in `index.html` with real GitHub links
- **Profile photo** — replace the `.avatar-placeholder` div with an `<img>` tag

## File Structure

```
sagarika-portfolio/
├── index.html    # Main HTML — all sections
├── styles.css    # Premium pink glassmorphism theme
├── script.js     # Particles, typing animation, scroll effects
└── README.md
```
