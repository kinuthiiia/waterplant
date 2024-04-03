// pages/api/data.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle POST request
    const { water_level } = req.body;

    // Connect to "waterplant" database and access "logs" collection
    const client = await clientPromise;
    const db = client.db("waterplant");
    const logs = db.collection("logs");

    // Create a document to insert
    const log = {
      timestamp: Date.now(),
      water_level: parseInt(water_level),
    };

    // Insert the defined document into the "logs" collection
    const result = await logs.insertOne(log);

    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(200).json({ message: `Log inserted : ${result.insertedId}` });
  } else if (req.method === "GET") {
    // Handle GET request
    res.status(200).send("This is a GET request");
  } else {
    // Handle other request methods
    res.status(405).end(); // Method Not Allowed
  }
}
