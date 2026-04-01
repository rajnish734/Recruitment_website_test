# Recruitment Website

Static recruitment website for the focus tracking study.

## Structure

```
humanx-website-2/
├── index.html
├── people.html
├── projects.html
├── contact.html
├── recruitment.html
├── assets/
│   ├── images/
│   └── css/
│       └── style.css
├── scripts/
│   ├── main.js
│   └── comment-analytics.js
└── README.md
```

## Setup

1. Customize the HTML files with your content and links
2. Update styles in `assets/css/style.css` as needed
3. (Optional) Add your own logo(s) and update the header markup

## Comments + Analytics

The recruitment page includes a Giscus embed and a lightweight analytics panel.

1. Configure Giscus in `recruitment.html`:
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`
2. Optional comment analytics API:
   - Set `COMMENTS_API_URL` in `scripts/comment-analytics.js`.
   - The endpoint should return JSON: `{ "comments": [{ "id": "...", "author": "...", "body": "...", "createdAt": "...", "replyCount": 0 }] }`
   - If not set, the page renders sample comments.

## Notes

- The website uses #004a37 as the primary color (update as desired)
- All pages share a common header and footer structure
- JavaScript functionality can be added to `scripts/main.js`

