import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { COLLECTION, DATABASE, URI } from "../database/db.js";

export async function GET(request) {
const client = new MongoClient(URI); 
  try {
    const database = client.db(DATABASE);
    const stocks = database.collection(COLLECTION);
    const query = {  };
    const movie = await stocks.find(query).toArray();
    console.log(movie);
    return NextResponse.json({ movie})
  } finally {
    await client.close();
  } 

}