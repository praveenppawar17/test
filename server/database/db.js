import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-4gqwmsj-shard-00-00.xppugc1.mongodb.net:27017,ac-4gqwmsj-shard-00-01.xppugc1.mongodb.net:27017,ac-4gqwmsj-shard-00-02.xppugc1.mongodb.net:27017/?ssl=true&replicaSet=atlas-437csj-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;