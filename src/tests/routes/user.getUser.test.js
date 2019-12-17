const userMocked = require("../mocked/user.json");
const errorMessage = require("../schemas/errorMessage");
const user = require("../schemas/user");

describe("GET /user/:user_id", async () => {
  before(async () => {
    const { User } = service.models;
    await User.deleteMany({});
    await User.create(userMocked);
  });

  it("should return error when request without token", async () => {
    const response = await request.get(`/user/12345`);
    expect(response.statusCode).equals(401);
    expect(errorMessage.validate(response.body).error).equals(undefined);
    expect(response.body.mensagem).equals("Não autorizado");
  });

  it("should return user object", async () => {
    const response = await request.post("/user/signin").send({
      email: userMocked.email,
      senha: userMocked.senha
    });

    expect(response.statusCode).equals(200);
    expect(user.validate(response.body).error).equals(undefined);

    const newResponse = await request
      .get(`/user/${response.body._id}`)
      .set("Authorization", `Bearer ${response.body.token}`);

    expect(newResponse.statusCode).equals(200);
    expect(user.validate(response.body).error).equals(undefined);
  });

  it("should return error when expirated Token", async () => {
    const response = await request.post("/user/signin").send({
      email: userMocked.email,
      senha: userMocked.senha
    });

    expect(response.statusCode).equals(200);
    expect(user.validate(response.body).error).equals(undefined);

    await new Promise(resolve =>
      setTimeout(resolve, service.config.expiresIn * 1.5)
    );

    const newResponse = await request
      .get(`/user/${response.body._id}`)
      .set("Authorization", `Bearer ${response.body.token}`);

    expect(newResponse.statusCode).equals(401);
    expect(errorMessage.validate(newResponse.body).error).equals(undefined);
    expect(newResponse.body.mensagem).equals("Sessão inválida");
  });
});
