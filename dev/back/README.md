# Backend

For the content management system (CMS), we are using [Strapi](https://strapi.io/) .    
The CMS is accessible at http://api.obfuscation.karls.computer.  

## Using the CMS
### 🌍 Context 

The CMS is hosted on this server which is provided by [Greenhost](https://greenhost.net/). For now, I have dedicated **5GB** of storage for this. If you would like more storage, please let me know.

There are two users on Strapi: you and I. As admin, I can create content types, update the infrastructure, change the API, and create and delete users. As author and editor, you can create content, edit it, publish it, unpublish it and delete it.

You will recieve a link from me that will direct you to a page where you can authenticate your user. Please store your credentials.

### 🖥️ Environment 

Once authenticated, you will be presented with the content management environment. On the top right, there are the buttons to log out and change the interface language. On the left side, there is a navigation menu with all your content types. 

Collections: 
  - — Projects
  - — Collaborators
  - — Journal Entries

Single Types:
  - — Tagline
  - — About
  - — Contact
  - — Book
  - — Movie
  - — Computer

The rest of the interface is the editing area. It changes based on the part of the navigation that you are in.

### 🗄️ Collections 

Collections contain many entries. When choosing a collection, you can:
  - — view all your entries
  - — filter, sort, or search them
  - — create, edit, delete an entry
  - — publish or unpublish an entry

Please note the following about collections:
  - — The order you see them in the CMS is not necessarily the order they are visible on the website.
  - — Projects are ordered on the website based on their EndDates.
  - — Collaborators are ordered randomly.
  - — Journal entries are ordered reverse-chronologically.
  - — If there no published journal entries, that column will be hidden on the website.

### 📄 Single Types 

Single types contain only one entry.

The **tagline** is the first sentence on the upper left corner of the website. Please make sure that this entry is not too long or too short.

The **about** entry is for you to play with as you like. Formatting is in rich text / markdown (more on this in a bit). Including images inline is optional.

The **contact** entry includes a body, which is the text dispalyed on the top of that section in the website, a separate profile photo that appears when a visitor clicks on the appropiate link, and the impressum, which is linked at the bottom of the website.

**The above three entries need to have something in them for the website to work. If you want some of them to be optional, let me know.**

**Book**, **Movie**, **Computer**: These are the entries that link to the furniture on the website. The main field that is important is the "ExternalLink". Which will send the visitor to your most recent read, watch or upcoming event. They also have a few other fields (title, summary). These are not important for now, but in case we choose to work more with this feature, we can look at them. For the movie entry, please upload the appropriate poster for the given movie you are linking to.

Please note the following about external links: you can choose to directly link to the pdf of a book or the full version of the movie, but this puts both of us at risk of re-distributing pirated content, so please be aware of this when pasting an external link.

### ✏️ Editing 

All entries have different fields. Most of these are self explanatory: The title is a project title, the start and end dates are when the project started and ended, etc...

Some things to note: 
- — Some entries have a **'slug' field**. This is the part that is appended to the end of the URL. This is auto-generated based on the title. **Please do not edit this field**.
- — Projects have a **start and end date**. On the website, these are trimmed to the year and displayed as "YYYY - YYYY" in the order of the most recent EndDate first. **If you'd like to show a project as "Ongoing", please leave the EndDate field empty**.
- — Projects have a **'summary' field**. This is for what we have been working on before so as not to display the full body on first click. It won't show on the website for now since we are parking that feature, so do with this field what you like.
- — Projects have a **'Role' field**. This is a short text that describes what your role is in the project and is appended to the end of the project body in the website, with a thin grey border. This field is optional.
- — On the right side, projects have a **'Collaborators' field**. This is a bi-directional link with the Collaborators collection. For each project, choose from your list of collaborators which ones were involved in the project. You will need to create the collaborator entry first.
- — Collaborators have a **'summary' field**. It is up to you how you populate this field, but I personally think it's nice to include an external link to their work if applicable.
- — Collaborators have a **'Projects' field** that is the inverse of the 'Collaborators' field in the project entries.
- — Journal entries have a title and body, supporting rich text and images. There is no date field here. **The date that appears on the website is the date that you publish journal entries**. Note that you can draft and save as many as you like before publishing them.

### ⌨️ Markdown 

Fields that support **rich text**, such as the 'Body', 'Summary' and 'Impressum' fields are all written in Markdown. Markdown is a syntax that allows for formatting of raw text in order for it to render that way on a website.

There is a built-in editor for rich text fields that will provide all the formatting options as buttons. When you select text and click the 'Bold' button, it will create the syntax that will make that text bold. 

To see how a rich text is going to be formatted on the website, you can click the **"Switch to Preview"** button on the upper right corner of the rich text editor.

When you want to **include an image in a rich text**, for a project or journal entry for example, you can click the image icon on the editor and either choose a previously uploaded image, or upload a new one. This will paste a URL to the image in the text. You can see this in action on the entries that are already there.

Markdown cheat sheet: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet/.


### 🪰Known Bugs 

- — Project EndDates: For some reason, if you've already entered an end date for a project, and choose later that you want to mark it as Ongoing, **you can not delete the EndDate you put in**. So for now, if you want to mark a previously finished project as ongoing, you'd need to recreate that project page.
- — **Including video and audio links** (for example Youtube / soundcloud): These will just look like normal links for now. I would like them to be embedded video / audio players in the future, but I haven't worked on this yet. (please let me know if this gets priority).

## Development

(for karl)

### Local

First,
```
npm install
```
Then, 
```
npm run develop
```

Here, you can make changes to the API, add and remove extensions, change user roles, etc... Please note, removing a property from an object could delete all the entries from the database for that object.

Then stage, commit and push your changes to the remote server.

### Remote

Strapi is running on http://localhost:1337 and proxied to http://piacw.karls.computer.

The initial set up starts with the build command:
```
NODE_ENV=production npm run build
```

Then,
```
pm2 start "NODE_ENV=production npm run start"
```

We are using `pm2` to manage the service. 

If changes have been made and pushed to the server, re-build the admin interface if necessary, and then restart the process:
```
pm2 restart piacw.api
```
