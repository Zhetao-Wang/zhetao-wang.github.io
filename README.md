# Avery Zhetao Wang

[Personal homepage](https://zhetao-wang.github.io/) · Statistics, projects, and experience.

## Edit the page

All visible content lives in [site/index.html](site/index.html). The sections appear in reading order. To add an entry, duplicate an existing one in the same section and edit the text.

| To update | Where to edit in the page |
| --- | --- |
| Name, bio, GitHub, or email | The opening profile header |
| Education | One list item inside the education timeline |
| Project | One article under “selected projects” |
| Job, research visit, or activity | One article under “work and activities”, newest first |
| Award | One paragraph under “awards” |

For example, add this inside the projects section and replace the link and text.

```html
<article>
  <h3><a href="https://github.com/your-account/your-project">Project name</a></h3>
  <p>One sentence on what you built.</p>
</article>
```

The experience search automatically includes new entries. Replace `site/assets/avatar.jpg` to change the portrait, or edit [site/style.css](site/style.css) to change the layout.

## Preview and publish

Open `site/index.html` in your browser. To test the old page redirects as well, run `python3 -m http.server 8000 --directory site` from the repository root and visit [localhost](http://localhost:8000/).

A push to `main` publishes [site/](site/) directly through GitHub Pages. No package installation or build step is required.

## Credits

The site code uses the [GPL-3.0-only license](LICENSE). The earlier template included work by Yaoyao (Freax) Qian. The GitHub and envelope icons are from [Font Awesome Free](https://fontawesome.com/) by Fonticons, Inc., licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
