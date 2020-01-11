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

### Running the project

Then the single command will get client and api running simultaneously

```
yarn dev
```

---

### Example queries to API

#### These can also be seen in the schema and docs tab for the GraphiQL Playground

- Went with the naming convention of "Location" to mean a city, town, county etc. and "Venue" to refer to a coffee shop, restaurant, bar, etc.

Get all Locations

```
{
  getLocations{
    name
    state
  }
}
```

Get all Venues

```
{
  getVenues{
    businessName
    category
    parking
  }
}
```

Add a location

```
mutation {
  addLocation(locationInfo:{name: "<City>", state: "<State>"}) {
    name
    state
    id
  }
}
```

Add a Venue

```
mutation {
  addVenue(
    venueInfo: {
      businessName: "<business name>"
      category: "<category>>"
      website: "<website>"
      phone: "<phone number>"
      address: "<street address>"
      state: "<state>",
      locationId:"5e188cfd59b1201ba412fd7b"  //<--example: will come from selecting state/city on the form -- for development addLocation first then use the _id of that document here
    },
    hoursInfo: {
       monday: [1800, 2200]
       tuesday: [1800, 2200]
       wednesday: [1800, 2200]
       thursday: [1800, 2200]
       friday: [1800, 2200]
       saturday: [100, 2200]
       sunday: [1800, 2200]
    }
  ) {
    businessName  // values returned after business saved to db
    id
  }
}
```
