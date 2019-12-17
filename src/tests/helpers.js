const supertest = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../server");

chai.use(chaiHttp);
global.service = app;
global.request = supertest(app);
global.expect = chai.expect;
global.assert = chai.assert;
