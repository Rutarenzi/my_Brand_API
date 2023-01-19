import request from "supertest";
import app from "../../app.js"
import Blog from "../models/blogs";
import mongoose from 'mongoose';
import token from "./tokenStore";
console.log(token);
 afterAll(()=>{ mongoose.connection.close();});


// Crud testing
describe(" Crud testing so far",()=>{

  test("view blog with 200 status", async ()=>{
     const response = await request(app)
     .get("/api/blogs")
     .send();
     expect(response.statusCode).toBe(200);
  });
  


  test("All blog should return json", async ()=>{
   const response = await request(app)
   .get("/api/blogs")
   .send();
   expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
   );
  });
   test("single blog should return 200", async () => {
      const blog = await Blog.findOne();
     
      const Id = blog._id;
      const response = await request(app)
        .get("/api/blogs/" + Id)
        .send();
        expect(response.statusCode).toBe(200);
        
   });
 test("single blog return the json", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/blogs/" + id)
    .send();
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});




test("delete a blog should return with no token 401", async () => {
   const blog = await Blog.findOne();
   const id = blog._id;
   const response = await request(app)
     .delete("/api/blogs/" + id)
     .send();
   expect(response.statusCode).toBe(401);
 });

 
test("updating blog should provide unauthorized 401 as no token is provided", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app).patch("/api/blogs/" + id).send({
    title: "The first blog title",
    content: "Blog content 1",
  });
  expect(response.statusCode).toBe(401);
});




// check error1
test("send like should return 200 ", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .patch("/api/blogs/"+ id + "/likes")
    .send();
  expect(response.statusCode).toBe(200);
});

})