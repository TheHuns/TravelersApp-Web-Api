# Travelers App - Web and API

### Will make a seperate repo for mobile soon after we make some headway here and decide on tech for the native app

- Install docker(&& docker-compose) if you haven't already
- client will run on http://localhost:3000
- GraphQL API test page is at http://localhost:5000/graphql very cool tool, link in docker output to terminal also

To get started, run the following command in the root of the project:

```
docker-compose up
```

The first time you do this, Docker downloads the necessary images and builds containers, so it will take longer to start.  Once everything is in place, it will build much faster.

---

### Useful Docker Commands

Type | Command | Description
-|-|-
Start up | `docker-compose up` | Builds and starts the project
Tear Down | `docker-compose down` | Resets the project back the original state, wipes the database
Stop all containers | `docker-compose stop` | Stops all running containers.  Use this if you've killed your containers before starting up again
Restart a container | `docker-compose restart <containerName>` | Restarts a single container
Container bash | `docker-compose exec <containerName> bash` | Opens the bash terminal for that container where you can do things like run `npm install`
Help menu | `docker-compose --help` | Provides a short list of options. You can also use the shortcut command `docker-compose -h` for the same list.
