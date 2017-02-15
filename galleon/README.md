![Galleon Logo](logo.png)

A badass SMTP mail server built on Node to make your life simpler.
======

**\*Galleon** is a super fast & efficient mail server powered by **Node.JS** and our favorite Document Database **MongoDB** or your own choice of Database. It will feature all the awesome stuff the big providers have, yet provides you with a powerful API to expand it on your own.

Get ready to sail into a new world featuring:
- Web based user interface [SEASCAPE](https://github.com/schahriar/Seascape)
- Spam protection by default [(Follow the tutorial here!)](https://github.com/schahriar/Galleon/blob/master/tutorials/SPAMASSASIN.md)
- Simple Mail Transfer Protocol **SMTP** (Listen, Process, Send)
- ~~Connection control (ratelimiting, bandwith limiting and other terms that makes me sound professional)~~ *as a module*
- Did I mention super fast? (Blame it on Node)

[**\*Galleon**](http://en.wikipedia.org/wiki/Galleon) is named after multi-deck armed merchant ships dating back to 16th century.

[![Build Status](https://travis-ci.org/schahriar/Galleon.svg)](https://travis-ci.org/schahriar/Galleon)

# Installation
[Installation](tutorials/INSTALLATION.md) can be as simple as this (but follow the [directions](tutorials/INSTALLATION.md)):
```javascript
npm install -g galleon
```
`Note:` Galleon requires NodeJS v6.x.x and above.

[Visit the tutorial for more info.](tutorials/INSTALLATION.md)

# Why ditch your old Mail Servers?
---------
> Are you tired of paying insane amounts of money for uselss services that come bundled with your email service subscription?

> Are you tired of spending a ton of more money on a specialist to set up a mail server for you using ancient technology just because you can't get it up and running yourself?

> Are you tired of setting up 3-5 different applications on your server to get be able to receive email?

> Are you tired of seeing mediocre marketing questions?

> ###### Are you tired?

----------
Well, **Galleon** is your solution. All you need is a server a domain name and a basic setup to get a complete mail server up which can serve a ton of other domains and users but guess what? We'll cover all the steps in this same repository. The goal is to make it easy and secure for all developers to have their own private domain running.

# Launch An API Server
You can easily run a Galleon server by installing the package globally and using the following command:

`Note:` Use [Authbind](https://github.com/schahriar/Galleon/blob/master/tutorials/AUTHBIND.md) to run on port 25
```javascript
galleon start
```
**BUT**, to get a complete solution running you'll need to follow a few steps. The best part is that the following command does most of the work:
```
galleon setup
```
You can install [Seascape](https://github.com/schahriar/Seascape) as your Webmail front-end *module* ... like this:
```
galleon install seascape
galleon restart
```
And use it on your port 2095

## Features

- API (port 3080)
- Module support
- Database and Raw storage
- Database Adapter support for -> `MongoDB`, `Redis`, `MySQL`, `PostgreSQL`, `SQLServer`, etc.
- Outbound Support (Send Emails)
- Daemon Manager [PM2][https://github.com/Unitech/pm2]
- Spam detection/reporting/learning etc. with **SPAMASSASIN**
- XSS protection
- Encryption & SSL support
- CLI Automation
- Session based auth with bcrypt
- Built-in user management
- Full attachment support (multipart upload, checksums etc.)
- Automatic file/email/raw deletion based on email status on the database
- & many more ...
--------
VERSION: 0.3 [Golden Hind](https://en.wikipedia.org/wiki/Golden_Hind) -> Beta 2

## Upcoming
These features are currently being tested and will be released in October 2015:

- Tutorials and Documentation for creating modules and front-end interfaces

## What's next?
- DoS protection
- SPF & DKIM Support (broken in v0.3.x)
- Raw Import & Deletion
- Admin interface
- Multiple Association

## NOTICE
**GALLEON & SEASCAPE** are both in beta stages and may/will have critical bugs. These bugs will be fixed as we get closer to a release version. You can [report any issues with this repository here](https://github.com/schahriar/galleon/issues/new).

## License
Who doesn't love a [MIT license](https://raw.githubusercontent.com/schahriar/Galleon/master/LICENSE)?
Make sure you read the license and don't participate in any form of abuse (Spam, etc.) using any parts of this project.
