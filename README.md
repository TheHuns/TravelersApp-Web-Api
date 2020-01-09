# Travelers App - Web and API

## Locations

- client will run on http://localhost:3000
- GraphQL API test page is at http://localhost:5000/graphql , link in output to terminal also

---

### Set-up

We will be using yarn as our package manager for this project, if not already installed on your machine run

```
npm i -g yarn
```

To get started, run the following command in the root of the project:

```
yarn install-all
```

---

#### Connecting to MongoDB

In the root of the project you need a directory named config which contains a file named default.json (create these if they do not come in with repo)

Inside the default.json there should be the following json object with the link to your mongoDB replacing the placeholder here.

```json
{
  "mongoURI": "mongodb+srv://<username>:<password>@cluster0-cho1k.mongodb.net/test?retryWrites=true"
}
```

- To find this URI log in at mongodb.com the under "Clusters" click "CONNECT" > "Connect Your Application" and copy the "Connection String Only"
- You will need to fill in your password here of course

---

### Connecting to Open Cage GeoLocator API

In the root of the project you need a file named .env

Inside the .env there should be the following:

REACT_APP_GEO_CODER_API_KEY= "API Key Here"

You will need to create an account on www.opencagedata.com/api
It's very easy and free, this will provide you with the API Key needed

### Running the project

Then the single command will get client and api running simultaneously

```
yarn dev
```
