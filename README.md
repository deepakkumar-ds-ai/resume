# Data Science Portfolio Website

A professional, modern resume website built with HTML, CSS, and JavaScript designed specifically for data scientists to showcase their work and projects.

## Features

✨ **Modern Design**
- Clean, professional layout with gradient accents
- Smooth animations and transitions
- Fully responsive for mobile, tablet, and desktop
- Interactive hover effects

🎨 **Professional Color Scheme**
- Primary Blue (#1e3a8a) - Professional and trustworthy
- Accent Teal (#06b6d4) - Modern and tech-forward
- Secondary Indigo (#4f46e5) - Complements the primary color
- Light backgrounds for readability

📱 **Responsive Layout**
- Mobile-first design approach
- Works perfectly on all screen sizes
- Hamburger menu for mobile navigation

⚙️ **Sections Included**
1. **Navigation Bar** - Sticky navigation with smooth scrolling
2. **Hero Section** - Impressive landing with call-to-action
3. **About** - Personal introduction with key statistics
4. **Skills** - Organized by categories (Programming, ML, Visualization, etc.)
5. **Projects** - Featured project showcase cards
6. **Experience** - Timeline of work history
7. **Contact** - Contact form and social links
8. **Footer** - Copyright information

## How to Customize

### 1. Update Personal Information

**In `index.html`:**
- Line 13: Replace "Your Name" with your actual name
- Line 14: Update the subtitle to match your professional tagline
- Lines 191-193: Update your email, phone, and location
- Lines 169-179: Update social media links

### 2. Modify About Section

**In `index.html` (Lines 79-95):**
- Replace the paragraphs with your background and experience
- Update the statistics (50+ projects, 3+ years, etc.) with your real numbers

### 3. Add Your Skills

**In `index.html` (Lines 108-135):**
- Replace the skill categories with your actual skills
- Add or remove programming languages, frameworks, and tools
- Customize the categories to match your expertise

### 4. Update Projects

**In `index.html` (Lines 145-213):**
- Replace project titles and descriptions
- Update project links to your actual GitHub or portfolio projects
- Change project tags to match your tech stack
- Update the project icons (change the `fas fa-*` classes)

### 5. Edit Work Experience

**In `index.html` (Lines 223-243):**
- Add your actual job titles and companies
- Update dates and responsibilities
- Add more or fewer timeline items as needed

### 6. Customize Colors

**In `styles.css` (Lines 10-22):**
If you want to change the color scheme, modify these variables:
```css
--primary: #1e3a8a;              /* Main blue */
--primary-dark: #1e40af;          /* Dark blue */
--accent: #06b6d4;                /* Teal accent */
--accent-light: #22d3ee;          /* Light teal */
--secondary: #4f46e5;             /* Indigo */
--bg-light: #f8fafc;              /* Light background */
--text-dark: #1e293b;             /* Dark text */
--text-gray: #64748b;             /* Gray text */
```

### 7. Add Contact Form Backend

Currently, the contact form shows a success message but doesn't actually send emails. To enable actual email sending, you have several options:

**Option A: Using a service like Formspree**
1. Go to https://formspree.io/
2. Create a new form and get your form ID
3. Update the form in index.html (around line 249):
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Using Netlify Forms**
If hosting on Netlify, add `netlify` attribute to the form:
```html
<form class="contact-form" name="contact" method="POST" netlify>
```

**Option C: Backend solution**
Create your own backend endpoint to handle form submissions.

## File Structure

```
resume2/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive features
└── README.md           # This file
```

## How to Use

1. **Open in Browser**: Simply double-click `index.html` to open in your default browser
2. **Local Development**: Use a local server (optional but recommended)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```
3. **View at**: `http://localhost:8000`

## Hosting Options

### Free Hosting Platforms:
1. **GitHub Pages** (Recommended)
   - Free, fast, and easy
   - Push code to a GitHub repository
   - Site: `yourusername.github.io`

2. **Netlify**
   - Drag and drop deployment
   - Free SSL certificate
   - Custom domain support

3. **Vercel**
   - Optimized for web projects
   - Serverless functions available
   - Great performance

4. **Firebase Hosting**
   - Google's hosting solution
   - Reliable and fast

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images**: If you add images, use compressed formats (WebP, optimized JPG/PNG)
2. **Lazy Loading**: The site uses Intersection Observer for efficient animations
3. **Cache**: Static files are lightweight and cache-friendly
4. **CDN**: Font Awesome icons are loaded from CDN

## Customization Examples

### Change the primary color from blue to purple:
1. In `styles.css`, change `--primary: #1e3a8a;` to `--primary: #6d28d9;`
2. All elements using this color will automatically update

### Add a new skill category:
In `index.html`, add this within the `.skills-grid`:
```html
<div class="skill-category">
    <h3><i class="fas fa-icon-name"></i> Your Category</h3>
    <div class="skill-tags">
        <span class="skill-tag">Skill 1</span>
        <span class="skill-tag">Skill 2</span>
    </div>
</div>
```

### Add a new project:
In `index.html`, add this within the `.projects-grid`:
```html
<div class="project-card">
    <div class="project-header">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Project Title</h3>
    <p>Project description...</p>
    <div class="project-tags">
        <span>Tag1</span>
        <span>Tag2</span>
    </div>
    <a href="#" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
</div>
```

## Icon References

Font Awesome icons are used throughout. Some useful ones:
- `fas fa-chart-line` - Charts
- `fas fa-brain` - AI/ML
- `fas fa-database` - Data
- `fas fa-laptop-code` - Code
- `fas fa-python` - Python
- `fas fa-github` - GitHub
- `fas fa-linkedin` - LinkedIn

Browse more at: https://fontawesome.com/icons

## SEO Optimization

Add these meta tags to `index.html` `<head>` section for better SEO:
```html
<meta name="description" content="Data Science Portfolio - Showcasing ML projects and data analysis work">
<meta name="keywords" content="data science, machine learning, portfolio">
<meta name="author" content="Your Name">
<meta property="og:title" content="Data Science Portfolio">
<meta property="og:description" content="My data science projects and experience">
```

## Troubleshooting

**Form not working?**
- Check browser console for errors (F12)
- Ensure all form inputs have correct names/attributes

**Animations not smooth?**
- Check browser performance settings
- Update to latest browser version
- Disable hardware acceleration if needed

**Layout breaking on mobile?**
- Clear browser cache (Ctrl+Shift+Delete)
- Test in incognito mode
- Check media query breakpoints in CSS

## Next Steps to Enhance

1. ✅ Add actual project images and descriptions
2. ✅ Set up email functionality for contact form
3. ✅ Add Google Analytics for tracking visits
4. ✅ Create individual project pages
5. ✅ Add blog section for data science insights
6. ✅ Implement dark mode toggle
7. ✅ Add PDF resume download

## License

Free to use and modify for personal use.

## Support

For Font Awesome icons and documentation: https://fontawesome.com/

## Tips for Data Scientists

1. **Show Results**: Include actual metrics and improvements from your projects
2. **Be Specific**: Don't just list tools, show what you built with them
3. **Update Regularly**: Keep your portfolio fresh with new projects
4. **Add Visualizations**: Include charts/graphs from your work
5. **Link Projects**: Connect to GitHub repos and live demos
6. **Tell Stories**: Explain the problem, solution, and impact of your work

---

Last Updated: 2026
#   R e s u m e  
 #   r e s u m e  
 #   r e s u m e  
 