# My Weekend Rocks - B2C
This is the business to consumer site of an event booking startup.
The idea is for admins to be able to add and modify posted events at will as well as to have a general overview on them.  
While the user interface and the admin interface are both running on the same frontend, the admin pages require authentication to be accessed.

For the frontend the view engine [Pug](https://pugjs.org/api/getting-started.html) is being used in conjunction with [jquery](https://jquery.com/) and [Material Design Bootstrap](https://mdbootstrap.com/).

The [express](https://expressjs.com/) backend fetches data via the [mongoose](https://mongoosejs.com/) ORM from a MongoDB and provides data in a fast and efficient way via CRUD requests.

---

**Index**
- [Installation](#quick-start)
  - [Local](#installation)
  <!-- -[In a Docker Container](#compose-with-docker)-->
- [Components](#components)
- [Structure](#structure)
- [Functions](#functions)
  


## Quick Start
### Local Installation
#### Requirements
- [node js](https://nodejs.org/en/)

#### Installation
##### Download the repository
 
```bash
$ git clone https://github.com/Mavial/mwr-b2c.git
$ cd mwr-b2c
``` 
##### Install required modules
```bash
$ npm install
```
##### Set the required environment variables

*Use ```set``` instead of ```export``` on Windows.*
```bash
$ export MONGO_DB=mongo_db
$ export MONGO_USER=mongouser
$ export MONGO_PASSWORD=mongopassword
```
##### Run the server
```bash
npm start
```
It will be available at http://localhost:3000

<!-- ### Build with Docker

Build the container:
```bash
$ docker build -t <container-name> .
``` 

(Currently not working.) Finally you can test the api in your browser via [localhost:8000/api-debug](http://localhost:8000/articles-debug)  
or access it with a GraphQL query under [localhost:8000/api](http://locahost:8000/articles)
-->
---
## Components


**Main Components**

- [node](https://www.djangoproject.com/), an easy to build on javascript framework that allows for rapid expansion.
- [express js](https://expressjs.com/), a node web app framework that manages all backend processes. 
- [mongoose](https://mongoosejs.com/) ORM library for MongoDB. 
- [pug](https://pugjs.org/api/getting-started.html) a view engine to make frontent markup more enjoyable and less cluttered.
- [Material Design Bootstrap](https://mdbootstrap.com/) an HTML and Js framework with many building blocks for fast and uniform design.

**Other Components**
- TBA

## Structure
Express works from ```app.js``` by passing all requests to individual routers that handle the dynamic data in ```routes/```.

The main page at ```/``` displays all the offers to the consumer. Here he can access them by clicking on the cards to get a detailed view of the event and a way to sign up for it. 

The event sites are generated dynamically with ```views/event.pug``` by fetching the variable data from the accessed event through schema in ```schemas/events.js```, passing it to ```event-page.pug``` and composing a page with pug. (Currently the event data is pretty much static for easier initial development.)

```/admin``` is locked behind a Google Oauth authentication system (not implemented yet) and is where all events are able do be edited, removed or added as well as users.

The following describes the app architecture.
- ```app.py```
  - ```routes/```
    - ```<routename>.js```
        - ```<pugfile>.pug```
- ```schema.js```


<!--## Functions
Send a GraphQL query to [api.globn.de/api](https://api.globn.de/articles) and the response will be filled with the requested data, which has been scraped from thousands of news article pages.

Here is an example for such a request:
```js
{
    allArticles(name: "Reuters") {
        edges {
            node {
                name
                title
                titleDetail
                url
                section
            }
        }
    }
```
-->
