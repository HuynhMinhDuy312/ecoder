import mongoose from 'mongoose';

/**
 * Open connection to the database
 *
 * @returns
 */
function connectDb(
    connectionString: string
): Promise<typeof mongoose> {
    return mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
    });
}

/**
 * Configure the database
 */
function configDb() {
    mongoose.pluralize(null);
    mongoose.set('autoIndex', process.env.AUTO_INDEX === '1');
}

// Export default
export default {
    connectDb,
    configDb,
} as const;
