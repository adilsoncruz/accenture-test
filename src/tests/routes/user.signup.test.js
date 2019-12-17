const userMocked = require("../mocked/user.json");
const errorMessage = require("../schemas/errorMessage");
const user = require("../schemas/user");
const mongoose = require("mongoose");

describe("POST /user/signup", async () => {
  before(async () => {
    const { User } = service.models;
    await User.deleteMany({});
  });

  it("should return User Object when created success", async () => {
    const response = await request.post("/user/signup").send(userMocked);
    expect(response.statusCode).equals(200);
    expect(user.validate(response.body).error).equals(undefined);
  });

  it("should get an error when trying to create a user with an email already registered", async () => {
    const response = await request.post("/user/signup").send(userMocked);
    expect(response.statusCode).equals(401);
    expect(errorMessage.validate(response.body).error).equals(undefined);
    expect(response.body.mensagem).equals("E-mail já existente");
  });

  after(async () => {
    const { User } = service.models;
    await User.deleteMany({});
    await mongoose.disconnect();
  });
});
