## **Digirex assignment** : 
> develop an api where all the click events and the browser events will be dumped into a database

***Please read the installation instructions located below the details section***

### What can the API do and how to check?

1. Fetch all the events (GET) : `localhost:4000/EventLog`
2. "Dump" new event (POST) : `localhost:4000/EventLog`
3. Fetch location frequency (GET) : `localhost:4000/locationFrequency`  
4. Fetch the events created by a particular user (GET) : `localhost:4000/userDetails/ <id>`
3. Fetch user frequency (GET) : `localhost:4000/userFrequency`

> Please view the demo section located at the end to check the functionality (examples provided) 

### Details
- The data model/ schema is as follows :
```js
const eventLogSchema = new Schema({

    browserName: String,
    // IP may contain special characters
    userIP: String,
    location: String,
    eventType: String,
    // A combination of alphabets and numbers
    userID: String,
    
    })
    
const EventLog = mongoose.model("EventLog", eventLogSchema)
```

- The location information is obtained using `geoip-lite`
```js
const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
const location = geoip.lookup(ip); // location of the user
```

- The details about `browserName`, `eventType` and `userID` must be provided by the client making the request and since this is a part of the front end these values **are not computed** by the API


### How to install and run 


1. Clone the repo
    ```bash
    git clone sameerad2001/Digirex__Assignment
    ```
2. Move to the project directory
    ```bash
    cd Digirex__Assignment/
    ```
3. Install the dependencies
    ```bash
    npm i
    ```
4. Run mongoDB locally (on a separate terminal) 
    ```bash
    mongod
    ```
5. Start the server (localhost 4000)
    ```
    node app.js
    ```
6. Open postman (view demo to check working) or proceed to step 6
7. If postman is not accessible open a browser and visit : `http://localhost:4000/eventLog`

> Test routes/URLs mentioned above

### Demo 

**Please note that the `location` and `ip` properties could not be computed due to the website running locally hence their values show up as `null` and `::1` respectively**

<img src = "https://github.com/sameerad2001/Digirex__Assignment/blob/master/Demo/Demo.gif" alt = "Website Demo"/>

<img src = "https://github.com/sameerad2001/Digirex__Assignment/blob/master/Demo/Demo1.jpg" alt = "Website Demo"/>
<img src = "https://github.com/sameerad2001/Digirex__Assignment/blob/master/Demo/Demo2.jpg" alt = "Website Demo"/>
<img src = "https://github.com/sameerad2001/Digirex__Assignment/blob/master/Demo/Demo3.jpg" alt = "Website Demo"/>


---

Sameer Ahmed <br/>
Email : <sameerad2001@gmail.com> <br/>
Linkdin : <https://www.linkedin.com/in/sameer-ahmed-0b7902176/>