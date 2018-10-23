process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
//let server = '../index';
let server = 'http://localhost:8888';

chai.use(chaiHttp);

let refresh_token = ''

describe('Spotify Login', () => {
    describe('/GET spotify login', () => {
        it('it should GET a token and a refresh token', (done) => {
          chai.request(server)
              .get('/v1/login')
              .end((err, res) => {
                    expect(res).to.have.status(200);
                    //expect(res).to.be.html;
                    //expect(res.body).to.be.an('object');
                    //expect(res.body.access_token).to.be.en('string');
                    //expect(res.body.refresh_token).to.be.en('string');
                    //refresh_token = res.body.refresh_token;
                done();
              });
        });
    });

    describe('/POST spotify access token', () => {
        it('it should GET a new token', (done) => {
          chai.request(server)
              .get(`/v1/refresh_token?refresh_token=${refresh_token}`)
              .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                    expect(res.body.access_token).to.be.en('string');
                done();
              });
        });
    });
});