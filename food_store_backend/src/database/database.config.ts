import { connect, ConnectOptions } from "mongoose"

export const dbConnect = async () => {
    try {
        await connect( process.env.MONGO_URL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions ).then(
            () => console.log('Connect successfully'),
            ( error ) => console.log( `Error: ${ error }` )
        )  
    } catch (error) {
        console.log( error );
        throw new Error('Error starting the db');
    }
};