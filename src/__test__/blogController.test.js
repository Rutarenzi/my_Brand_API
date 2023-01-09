import request from "supertest";
import app from "../../app.js"
import Blog from "../models/blogs";
import mongoose from 'mongoose';
import { BlogController } from "../controllers/blogController";
import {token} from "./tokenStore";
afterAll(()=>{ mongoose.connection.close();});


// Crud testing
describe(" Crud testing so far",()=>{
  test("view blog with 200 status", async ()=>{
    
     const response = await request(app)
     .get("/api/v1/Blogs")
     .send();
     expect(response.statusCode).toBe(200);
  });
  afterAll(() => mongoose.disconnect());
})