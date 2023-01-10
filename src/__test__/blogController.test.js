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
     .get("/api/news/Blogs")
     .send();
     expect(response.statusCode).toBe(200);
  });
  test("All blog should return json", async ()=>{
   const response = await request(app)
   .get("/api/news/Blogs")
   .send();
   expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
   );
  });
   // test("single blog should return 200", async () => {
   //    const blog = await Blog.findOne();
   //    const id = blog._id;
   //    const response = await request(app)
   //      .get("/api/news/blogs/" + id)
   //      .send();
   //      expect(response.statusCode).toBe(200);
   // });
 test("single blog return the json", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/news/blogs/" + id)
    .send();
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});


// check error
test("delete a blog should return 200", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .delete("/api/news/blogs/" + id)
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});

test("delete a blog should return with no token 401", async () => {
   const blog = await Blog.findOne();
   const id = blog._id;
   const response = await request(app)
     .delete("/api/news/blogs/" + id)

     .send();
   expect(response.statusCode).toBe(401);
 });
 
 



//end of crud testing
test("Posting a blog should provide unauthorized 401 as no token is provided", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app).post("/api/news/blog/add").send({
    title: "The first blog title",
    content: "Blog content 1",
  });
  expect(response.statusCode).toBe(401);
});

// check the error1
test("This occurs", async () => {
     const blog = await Blog.findOne();
     const id = blog._id;
     const response = await request(app)
       .patch("/api/news/blogs/" + id)
       .set("Authorization", token)
       .send();
     expect(response.statusCode).toBe(400);
   });



// check error1
test("send like should return 200 ", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .patch("/api/news/blogs/"+ id + "/like")
    .send();
  expect(response.statusCode).toBe(200);
});

test("deleting blog without token 401 without", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .delete("/api/news/blogs/" + id)
    .send();
  expect(response.statusCode).toBe(401);
});









   afterAll(() => mongoose.disconnect());
})