# How Node.js Developers Can Start Building With the Salesforce Ecosystem

This repository is a companion to the published article entitled **"How Node.js Developers Can Start Building With the Salesforce Ecosystem."**

The article references a [Salesforce Trailhead CodeLive Event](https://www.youtube.com/watch?v=HqcQBF5VhvM), in which the developers there build an external Salesforce dashboard made up of an LWC client and an Express server. The repository here uses the concepts from that event, along with some of the code in that even'ts [repository](https://github.com/sfcodelive/ExternalDashWithLWCOSS), to build a nearly similar dashboard.

There are 2 separate pieces to this project - a **client** and a **server** - and both pieces are included in this Github repository. This project - both the client and the server - is meant to be run _locally_ on your machine.

# The LWC Client

The **client** was built using [Lightning Web Components](https://lwc.dev/) (in particular, [lwc-create-app](https://github.com/muenzpraeger/lwc-create-app)).

The client is configured to run on `localhost:3001`. This configuratoin is set in `scripts/server.js`. Don't be confused by how this file is called `server.js` - in this context, that means "this is the server that serves up the _client_."`So, this is related to our _client_.

# The Server

The **server** was built using [Express](https://www.expressjs.com), while also using [JSforce](https://jsforce.github.io/) and [Socket.IO](https://socket.io/).

Before the server can be fully functional, a few configurations need to be made.

## Server Configurations

The project root folder has a file called `.env.template`. Copy this file, rename it as `.env`, and then replace the values in `.env` with the appropriate values (see the article for instructions on how to obtain each of the necessary values).

Currently, the server is configured to listen on port `3002`, based on the settings in `src/server/index.js`.

Notice also, in `src/server/index.js` (at lines 3-7), that we need to configure the server with CORS policies to _allow_ requests from a browser client located at `http://localhost:3001` (which is our _client_). If you ever plan to deploy your client to the cloud (for example, to Heroku), you will need to add that client's Heroku app URL to this list of allowed CORS origins.

# Starting up the Server and Client

To start up the server and the client:
```
~/project_root$ yarn watch
```
