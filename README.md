## **Digirex assignment** : 
> develop an api where all the click events and the browser events will be dumped into a database

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
4. Start the server (localhost 4000)
    ```
    node app.js
    ```
5. Open postman (view demo to check working) or proceed to step 6
6. If postman is not accessible open a browser and visit : `http://localhost:4000/eventLog`

    ```
    Other Routes:

    1. Fetch all the events (GET) : localhost:4000/EventLog
    2. "Dump" new event (POST) : localhost:4000/EventLog
    3. Fetch location frequency (GET) : localhost:4000/locationFrequency  
    4. Fetch the events created by a particular user (GET) : localhost:4000/userDetails/ <id>
    3. Fetch user frequency (GET) : localhost:4000/userFrequency
    ```
