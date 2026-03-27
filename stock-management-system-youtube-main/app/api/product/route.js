import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { COLLECTION, DATABASE, URI } from "../database/db.js";

export async function GET(request) {
  const client = new MongoClient(URI);
  try {
    const database = client.db(DATABASE);
    const inventory = database.collection(COLLECTION);
    const query = {};
    const products = await inventory.find(query).toArray();
    return NextResponse.json({ success: true, products })
  } finally {
    await client.close();
  }

}

export async function POST(request) {
  let body = await request.json()
  const client = new MongoClient(URI);
  try {
    const database = client.db(DATABASE);
    const inventory = database.collection(COLLECTION);
    const product = await inventory.insertOne(body)
    return NextResponse.json({ product, ok: true })
  } finally {
    await client.close();
  }
}