const mongoose = require('mongoose');

const connectDB = async (connectionString) => {
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully');

        const fetched_data = await mongoose.connection.db.collection("food_items").find().toArray();
        const foodCategory = await mongoose.connection.db.collection("food_categories").find().toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;
