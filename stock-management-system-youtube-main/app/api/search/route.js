import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { COLLECTION, DATABASE, URI } from "../database/db.js";

export async function GET(request) {
const query = request.nextUrl.searchParams.get("query");
const client = new MongoClient(URI);
  try {
    const database = client.db(DATABASE);
    const inventory = database.collection(COLLECTION); 
 
    const products = await inventory.aggregate([{
        $match: {
          $or: [
            { slug: { $regex: query, $options: "i" } },
           ]
        }
      }
    ]).toArray()
    return NextResponse.json({ success: true, products})
  } finally {
    await client.close();
  } 

}

 
    
    
