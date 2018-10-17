rocess.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let server = 'http://localhost:8090';

chai.use(chaiHttp);

describe('Products', () => {
    describe('/GET recomendations', () => {
        it('it should GET a recomendations list', (done) => {
          chai.request(server)
              .get('/v1/recomendations')
              .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                    expect(res.body.success).to.be.eq(true);
                    expect(res.body.data).to.be.an('array');
                done();
              });
        });
    });

    describe('/POST playlist/new', () => {
        it('it should POST a new playlist', (done) => {
          chai.request(server)
              .post('/v1/playlist/new')
              .type('form')
              .send({
                    name: 'test',
                    items: [],
               })
              .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                    expect(res.body.success).to.be.eq(true);
                    expect(res.body.data).to.be.an('array');
                done();
              });
        });
    });
});