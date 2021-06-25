# Obfuscation Platframe

Website (platform, platframe, tool convergence, realm, etc...) for the 3rd Workshop on Obfuscation.

-> https://3rd.obfuscationworkshop.org/ <-

![](minimap.png)
## Introduction

This project brings together Strapi, VueJS, SocketIO, and some parts of Big Blue Button to leverage an obfuscated yet accessible platform for the 3rd Workshop on Obfuscation, which took place on May 4 & 7, 2021.

## Project Structure

```
# some files ommitted

├── LICENSE
├── README.md
├── dev
│   ├── package-lock.json
│   ├── package.json
│   ├── node_modules
│   ├── back
│   │   ├── README.md               │ << Strapi, Mongoose 
│   │   ├── api                     │ ( CMS & Database for static content )
│   │   ├── build                   │ 
│   │   ├── components              │
│   │   ├── config                  │
│   │   ├── extensions              │
│   │   ├── favicon.ico             │
│   │   ├── node_modules            │
│   │   ├── package-lock.json       │
│   │   ├── package.json            │
│   │   └── public                  │
│   ├── server
│   │   ├── index.js                │ << Express, SocketIO, Mongoose
│   │   └── models                  | ( Database for dynamic content )
│   ├── front                       
│   │   ├── README.md               │ << VueJS
│   │   ├── babel.config.js         │ ( Frontend framewwork )
│   │   ├── dist                    │
│   │   ├── logs                    │
│   │   ├── node_modules            │
│   │   ├── package-lock.json       │
│   │   ├── package.json            │
│   │   ├── public                  │
│   │   ├── src                     │
│   │   └── vue.config.js           │
│   └── tests
│       └── socketioload.yaml       │ << Artillery ( tests ) 
└── minimap.png
```
## Development

There needs to be several running processes.

### Backend

Using Strapi to create a framework-agnostic API with a draft/publish system for static content.

First, on your local device:
```
cd dev/back
npm install
```
Then, 
```
npm run develop
```

Here, you can make changes to the API, add and remove extensions, change user roles, etc... Please note, removing a property from an object could delete all the entries from the database for that object.

Then stage, commit and push your changes to your remote server.

On the remote server, the initial set up starts with the build command:
```
NODE_ENV=production npm run build
```
Then,
```
pm2 start "NODE_ENV=production npm run start" --name "API.OBFS" # name is optional
```

We are using `pm2` to manage the service. 

Strapi will run on http://localhost:1337.

If changes have been made and pushed to the server, re-build the admin interface if necessary, and then restart the process:
```
pm2 restart API.OBFS
```

Instructions on populating the CMS, specific to this project can be found at [dev/back](dev/back).

### Server

Note that Strapi only handles the static content, and not the chat. For this, we create a separate Mongo database and access it in our node server scripts.

#### MongoDB

On your remote machine create a directory for Mongo to use as a database:
```
mkdir /data/obfsdb
```
And then, with `mongod` installed, start the chat database server:
```
pm2 start "mongod --dbpath /data/obfsdb/ --port 27018" --name DB.OBFS
```

#### Express, SocketIO, Mongoose

With `mongod` running, start the node server:
```
cd dev
pm2 start server --name OBFS
```

This scripts will use:
- Express to serve the statically generated front-end files
- SocketIO to handle real-time networking ( for the chat functions )
- Mongoose to communicate with the Mongo database dedicated only to the chat

#### Apache

The above scripts as well as the front-end will have some load-balancing methods implemented to prevent the server from going down. However, if you are using apache, it is set to only handle 150 active connections by default. If you are expecting to host more visitors simultaneously and your hardware can handle it, consider changing this setting or enabling the `mpm_prefork` module.

```
sudo a2enmod mpm_prefork
```
And then edit the `mpm_prefork` configuration file:
```
sudo nano /etc/apache2/mods-available/mpm_prefork.conf

# my configuration

<IfModule mpm_prefork_module>
  MinSpareServers           75
  MaxSpareServers           250
  ServerLimit               250
  StartServers              10
  MaxRequestWorkers         1000
  MaxConnectionsPerChild    500
</IfModule>
```

### Frontend


### Testing


### Authors

[Karl](https://moubarak.eu), [Anja](https://anjagroten.info/)

### License 

[Creative Commons Attribution-ShareAlike 4.0](LICENSE)




