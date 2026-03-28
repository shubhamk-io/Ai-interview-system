import mogoose from "mogoose"

const connectDB = async () => {
    try {
        const connect = await mogoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected ✅  ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // ❌ app crash if DB fails
    }
}

export default connectDB