import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { COLLECTION, DATABASE, URI} from "../database/db.js";

export async function POST(request) {
  let { action, slug, initialQuantity } = await request.json()
  const client = new MongoClient(URI);
  try {
    const database = client.db(DATABASE);
    const inventory = database.collection(COLLECTION);
    const filter = { slug: slug };

    let newQuantity = action == "plus" ? (parseInt(initialQuantity) + 1) : (parseInt(initialQuantity) - 1)
    const updateDoc = {
      $set: {
        quantity: newQuantity
      },
    };
    const result = await inventory.updateOne(filter, updateDoc, {});

    return NextResponse.json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` })
  }
  catch {
    return NextResponse.json({ success: false, message: `Some error occurred` })
  }
  finally {
    await client.close();
  }
}