import mongoose from 'mongoose';
const db = mongoose.connection;

export default function setMongooseConfig() {
    const MONGO_URI = process.env.MONGO_URI as string;

    db.on('error', (err) => {
        console.error("mongoose.config.ts", "onError", err);
    });

    db.on('connected', () => {
        db.on('disconnected', (err) => {
            console.error("mongoose.config.ts", "onDisconnected", err);
        });
    });

    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.error("mongoose.config.ts", "onConnect", err);
        }
        else {
            console.log("mongoose.config.ts", "onConnect", `connected successfully at ${MONGO_URI}`);
        }
    });
}
