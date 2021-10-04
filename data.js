const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
// read .env file
require('dotenv').config();
const moment = require('moment');

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_COLLECTION_NAME = process.env.DATABASE_COLLECTION_NAME;

const connect = async (url) => {
    
    // check params
    if (!url) throw Error('connect::missing required params');

    return MongoClient.connect(url, { useUnifiedTopology: true });
};

const connectToDatabase = async () => {
    try {
        if (!DATABASE_URL || !DATABASE_NAME) {
            console.log('DB required params are missing');
            console.log(`DB required params DATABASE_URL = ${DATABASE_URL}`);
            console.log(`DB required params DATABASE_NAME = ${DATABASE_NAME}`);
        }

        mongoConnection = await connect(DATABASE_URL);
        db = mongoConnection.db(DATABASE_NAME);

        console.log(`DB connected = ${!!db}`);
        
        return !!db;

    } catch (err) {
        console.log('DB not connected - err');
        console.log(err);
    }
};

const insertCafeMachines = async (
    cafemachines //= [
    //     {
    //         cafeMachineName: 'The around the corner kitchen',
    //         id: 0,
    //         state: 0,
    //         stateDateTime: '2021-10-03 22:00'
    //     },
    //     {
    //         cafeMachineName: 'That other kitchen',
    //         id: 1,
    //         state: 1,
    //         stateDateTime: '2021-10-03 22:00'
    //     },
    //     {
    //         cafeMachineName: 'The far far away kitchen',
    //         id: 2,
    //         state: 1,
    //         stateDateTime: '2021-10-03 22:00'
    //     }
    // ]
) => {
    if (!db || !cafemachines)
        throw Error('insertCafeMachines::missing required params');

    const collection = await db.collection(DATABASE_COLLECTION_NAME);

    return await collection.insertMany(cafemachines);
};

const findCafeMachines = async (cafemachineId) => {

    if (!db)
        throw Error('findCafeMachines::missing required params');

    const collection = await db.collection(DATABASE_COLLECTION_NAME);

    return cafemachineId !== undefined ? await collection.find({id: parseInt(cafemachineId)}).toArray() : await collection.find().toArray();
};

const findAndUpdateCafeMachine = async (cafemachineId, state) => {

    if (!db)
        throw Error('findCafeMachines::missing required params');

    const collection = await db.collection(DATABASE_COLLECTION_NAME);

    await collection.findOneAndUpdate(
        {id: parseInt(cafemachineId)},
        { "$set": 
            {"state": state, 
            "stateDateTime": moment().format('yyyy-mm-dd:hh:mm:ss')}
        } 
    )
};

module.exports = {
    connectToDatabase,
    insertCafeMachines,
    findCafeMachines,
    findAndUpdateCafeMachine
};