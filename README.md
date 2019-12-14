# Travelers App - Web and API

### Will make a seperate repo for mobile soon after we make some headway here and decide on tech for the native app

- Install docker(&& docker-compose) if you haven't already
- client will run on http://localhost:3000
- GraphQL API test page is at http://localhost:5000/graphql very cool tool, link in docker output to terminal also

To get started for the first time run the following command in root of the project

```
docker-compose up --build
```

After the first build, image data will be cached and the following will get you up and running quickly

```
docker-compose up
```

---

To tear down after working

```
docker-compose down
```

Other options exist to add to the above command to remove images, volumes, etc,

```
#This will give short list of options
docker-compose down --help
```
