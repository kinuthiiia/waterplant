import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  // Get the database and collection on which to run the operation
  const db = client.db("waterplant");
  const logs = db.collection("logs");

  // Execute query
  const latestLogs = await logs
    .find()
    .sort({ timestamp: -1 })
    .limit(15)
    .toArray();

  // Respond with the queryed data
  res.status(200).json({ latestLogs });
}
