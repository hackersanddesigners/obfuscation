# Backend

For the content management system (CMS), we are using [Strapi](https://strapi.io/) .    
The CMS is accessible at http://api.obfuscation.karls.computer.  

## Using the CMS
### 🌍 Context 

The CMS is hosted on this server which is provided by [Greenhost](https://greenhost.net/). For now, I have dedicated **5GB** of storage for this. If you would like more storage, please let me know.

There are three users on Strapi: Anja, me, and you. As admin, Anja and I can create content types, update the infrastructure, change the API, and create and delete users. As author and editor, you can create content, edit it, publish it, unpublish it and delete it.

You will recieve a link from me that will direct you to a page where you can authenticate your user. Please store your credentials.

### 🖥️ Environment 

Once authenticated, you will be presented with the content management environment. On the top right, there are the buttons to log out and change the interface language. 

On the left side, there is a navigation menu with all the collections and single types. 

The rest of the interface is the editing area. It changes based on the part of the navigation that you are in.

### 🗄️ Collections 

Collections contain many entries. When choosing a collection, you can:
  - — view all your entries
  - — filter, sort, or search them
  - — create, edit, delete an entry
  - — publish or unpublish an entry


The collections are: 
  - — **Statics**: The static information (about, contact, etc...) of the Reception area.
  - — **Videos**: The videos for the Exhibition Space.
  - — **Sessions**: The entries of the Timetable of the event.
  - — **Resources**: The links, files, or texts that are displayed in the Resource Library.
  - — **Glossaries**: The terms and their definitions that are displayed in the Glossary region.
  - — **People**: The people conducting the sessions.
  - — **Regions**: The only "meta" collection. The entries in this collection describe the different areas on the canvas, their positions, colors, and meta-texts.

Some entries in the regions have their URLs mapped to collections based on their slugs:
  - — the "Reception" region maps to the "Statics" collection (e.g. /reception/about).
  - — the "Exhibition Space" region maps to the "Videos" collection (e.g. /exhibition/hearbeat-to-print).
  - — the "Timetable" region maps to the "Sessions" collection (e.g. /timetable/obfuscating-software).
  - — the "Resource Library" region maps to the "Resources" collection (e.g. /library/karen-barad-getting-real).
  - — the "Glossary" region maps to the "Glossaries" collection (e.g. /glossary/1-1-scale).

  
 
### 📄 Single Types 

Single types are only one entry.

The **ticker** entry has one field, a 'phrase', the one-liner that shows up in the website on the bottom. If you want the ticker to link to a part of the website, include one relative link in the phrase.

### ✏️ Editing 

All entries have different fields. Most of them are self explanatory.

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
