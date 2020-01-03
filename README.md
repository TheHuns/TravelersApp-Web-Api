# Travelers App - Web and API

## Locations

- client will run on http://localhost:3000
- GraphQL API test page is at http://localhost:5000/graphql very cool tool, link in docker output to terminal also

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

### Running the project

Then the single command will get client and api running simultaneously

```
yarn dev
```
