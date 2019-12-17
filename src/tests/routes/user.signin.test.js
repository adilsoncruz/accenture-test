const userMocked = require("../mocked/user.json");
const errorMessage = require("../schemas/errorMessage");
const user = require("../schemas/user");

describe("POST /user/signin", async () => {
  before(async () => {
    const { User } = service.models;
    await User.deleteMany({});
    await User.create(userMocked);
  });

  it("should get an error trying to SignIn without params", async () => {
    const response = await request.post("/user/signin").send({});
    expect(response.statusCode).equals(422);
    expect(errorMessage.validate(response.body).error).equals(undefined);
    expect(response.body.mensagem).equals("parametros invalidos");
  });

  it("should get an error trying to SignIn with invalid email", async () => {
    const response = await request.post("/user/signin").send({
      email: "emailmocked.com",
      senha: "123"
    });
    expect(response.statusCode).equals(422);
    expect(errorMessage.validate(response.body).error).equals(undefined);
    expect(response.body.mensagem).equals("parametros invalidos");
  });

  it("should get an error trying to SignIn without password", async () => {
    const response = await request.post("/user/signin").send({
      email: "email@mocked.com"
    });
    expect(response.statusCode).equals(422);
    expect(errorMessage.validate(response.body).error).equals(undefined);
    expect(response.body.mensagem).equals("parametros invalidos");
  });

  it("should get an error trying to SignIn with invalid password", async () => {
    const response = await request.post("/user/signin").send({
      email: "email@mocked.com",
      senha: "12345"
    });
    expect(response.statusCode).equals(401);
    expect(errorMessage.validate(response.body).error).equals(undefined);
    expect(response.body.mensagem).equals("Usuário e/ou senha inválidos");
  });

  it("should return an Object when user SignIn", async () => {
    const response = await request.post("/user/signin").send({
      email: userMocked.email,
      senha: userMocked.senha
    });
    expect(response.statusCode).equals(200);
    expect(user.validate(response.body).error).equals(undefined);
  });
});
