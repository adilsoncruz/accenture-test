const Promise = require("bluebird");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.Promise = Promise;

const { Schema } = mongoose;

const saltRounds = 10;

const UserSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, index: { unique: true } },
    senha: { type: String, required: true },
    telefones: [
      {
        numero: { type: String, required: true },
        ddd: { type: String, required: true }
      }
    ],
    data_criacao: { type: Date, default: new Date() },
    data_atualizacao: { type: Date, default: new Date() },
    ultimo_login: { type: Date, default: new Date() },
    token: { type: String }
  },
  {
    versionKey: false
  }
);

UserSchema.on("error", err => err.message);

UserSchema.path("senha").validate({
  validator(senha) {
    if (!senha && this.provider) {
      return false;
    }
    return true;
  },
  message: "Necessario uma senha"
});

UserSchema.path("email").validate({
  validator(email) {
    if (!email && !this.provider) {
      return false;
    }
    return true;
  },
  message: "necessario email"
});

UserSchema.pre("save", function(next) {
  if (this.isModified("senha") || this.senha === undefined) {
    this.senha = bcrypt.hashSync(this.senha, saltRounds);
  }
  this.data_atualizacao = new Date();
  next();
});

function validPassword(senha) {
  return bcrypt.compareSync(senha, this.senha);
}

UserSchema.methods.validPassword = validPassword;

module.exports = () => mongoose.model("User", UserSchema);
