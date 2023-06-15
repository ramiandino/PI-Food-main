const request = require("supertest");
const app = require("../app");
const { getAllRecipes } = require("../controllers");

describe("GET /recipes/:id", () => {
  //en los it decimos que queremos testear,ademas tienen una callback
  it("responds with 200 when given a valid id", async () => {
    const recipesTotal = await getAllRecipes();
    const id = recipesTotal[0].id;
    const response = await request(app).get(`/recipes/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("responds with 404 when given an invalid id", async () => {
    const response = await request(app).get("/recipes/999");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("That recipe was not found");
  });
});
