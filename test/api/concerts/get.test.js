const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const server = require('../../../server.js');

const Concert = require('../../../models/concert.model');


describe('GET/api/concerts', function () {

  before(async () => {
    const testConOne = new Concert({ _id: '62ac983ca36f5366970ef80c',perfomer: 'Performer1', genre: 'Genre1', price: '25', day: '1', image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConOne.save();

    const testConTwo = new Concert({ _id: '5d9f1140f10a81216cfd4409',perfomer: 'Performer2', genre: 'Genre2', price: '30', day: '2', image: '/img/uploads/2f342s4fsdg.jpg' });
    await testConTwo.save();

    const testConThree = new Concert({ _id: '5d9f1140f10a81216cfd4400',perfomer: 'Performer3', genre: 'Genre3', price: '40', day: '1', image: '/img/uploads/hdfh42sd213.jpg' });
    await testConThree.save();

  });



  it('Test_1__ / should return all concerts', async () => {

    const res = await request(server).get('/api/concerts');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);
  });



  it('Test_2__ /:id should return one concerts by :id', async () => {

    const res = await request(server).get('/api/concerts/62ac983ca36f5366970ef80c');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null
  });

  it('Test_3__ /performer/:performer should return an array with concerts filtered by performer', async () => {

    const res = await request(server).get('/api/concerts/performer/Performer1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1)
  });

  it('Test_4__ /genre/:genre should return an array with concerts filtered by genre', async () => {

    const res = await request(server).get('/api/concerts/genre/Genre2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('Test_4__ /price/:price_min/:price_max should return an array with concerts filtered by price', async () => {

    const res = await request(server).get('/api/concerts/price/20/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('Test_5__ /day/:day should return an array with concerts filtered by day', async () => {

    const res = await request(server).get('/api/concerts/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1)
  });

  after(async () => {
    await Concert.deleteMany();
  });

});