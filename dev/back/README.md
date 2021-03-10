# Backend

For the content management system (CMS), we are using [Strapi](https://strapi.io/) .    
The CMS is accessible at http://api.obfuscation.karls.computer.  

## Using the CMS
### 🌍 Context 

The CMS is hosted on this server which is provided by [Greenhost](https://greenhost.net/). For now, I have dedicated **5GB** of storage for this. If you would like more storage, please let me know.

There are three users on Strapi: Anja, me, and you. As admin, Anja and I can create content types, update the infrastructure, change the API, and create and delete users. As author and editor, you can create content, edit it, publish it, unpublish it and delete it.

You will recieve a link from me that will direct you to a page where you can authenticate your user. Please store your credentials.

### 🖥️ Environment 

Once authenticated, you will be presented with the content management environment. On the top right, there are the buttons to log out and change the interface language. On the left side, there is a navigation menu with all the collections and single types. The rest of the interface is the editing area. It changes based on the part of the navigation that you are in.


### 📄 Single Types 

Single types are only one entry.

The **ticker** entry has one field, a 'phrase', the one-liner that shows up in the website on the bottom. If you want the ticker to link to a part of the website, include one relative link in the phrase.


### 🗄️ Collections 

Collections contain many entries. When choosing a collection, you can view, filter, sort, search, create, edit, publish, unpublish or delete an entry.


The collections are: 
  - — **Statics**: The static information (about, contact, etc...) of the Reception area.
  - — **Videos**: The videos for the Exhibition Space.
  - — **Sessions**: The entries of the Timetable of the workshop.
  - — **Resources**: The links, files, or texts that are displayed in the Resource Library.
  - — **Glossaries**: The terms and their definitions that are displayed in the Glossary region.
  - — **People**: The people conducting the sessions.
  - — **Regions**: The only "meta" collection. The entries in this collection describe the different areas on the canvas, their positions, colors, and meta-texts.

#### URL Dictionary

Some entries in the regions have their URLs mapped to collections based on their slugs:
  - — the **Reception** region maps to the **Statics** collection (e.g. **/reception/about**).
  - — the **Exhibition Space** region maps to the **Video** collection (e.g. **/exhibition/hearbeat-to-print**).
  - — the **Timetable** region maps to the **Sessions** collection (e.g. **/timetable/obfuscating-software**).
  - — the **Resource Library** region maps to the **Resources** collection (e.g. **/library/getting-real**).
  - — the **Glossary** region maps to the **Glossaries** collection (e.g. **/glossary/1-1-scale**).

The importance of this will be addressed in the following section.

### ✏️ Editing 

All entries have different fields. Most of them are self-explanatory.

Some fields support **rich text** and are edited in Markdown. There is a built-in editor for rich text fields that will provide all the formatting options as buttons. When you select text and click the 'Bold' button, it will create the syntax that will make that text bold. To see how a rich text is going to be formatted on the website, you can click the **Switch to Preview** button on the upper right corner of the rich text editors.

When you want to **include an image in a rich text**, you can click the image icon on the editor and either choose a previously uploaded image, or upload a new one. This will paste a URL to the image in the text. You can see this in action on the entries that are already there.

Markdown cheat sheet: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet/.

Please note the following about links: all aboslute links (starting with "http...") will open in a new tab when clicked in the website. All relative links (starting with "/...") will use the website's custom router to scroll to the different part of the canvas.

So if you want to link from one part of the website to another, and you are using the rich text editor, please use relative links based on the **URL Dictionary**, and format them as follows:

```js
[text](/relative/path)                // template
[Go to the Study Room!](/study-room)  // example of region access
[Obfuscation](/glossary/obfuscation)  // example of region + overlay access
```

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
