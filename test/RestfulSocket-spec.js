const { expect } = require('chai');
const { spy } = require('sinon');
const { Server } = require('mock-socket');
const RestfulSocket = require('restfulsocket');


describe('RestfulSocket', () =>{

  let mockServer, params, RS, mySpy;
  beforeEach((done) =>{
    mySpy = spy();
    mockServer = new Server('ws://localhost:8080');

    mockServer.on('connection', (data) =>{
      mySpy();
      done();
    });

    params = [
      spy(),
      spy(),
      spy()
    ];

    RS = new RestfulSocket('ws://localhost:8080', ...params);

    RS.findSocketMessage((event) =>{
      return event.message;
    });

    RS._generatePromiseAll = spy();
  });

  afterEach(() =>{
    mockServer.close();
    mockServer = null;
    RS = null;
    params = null;
    mySpy = null;
  });

  it('should open connection with mock server', (done) =>{
    expect(mySpy.calledOnce).to.equal(true);
    done();
  });

  it('should not create a fetch object', (done) =>{
    expect(RS._generatePromiseAll.calledOnce).to.equal(false);
    done();
  });

  it('should make get request on socket onmessage', (done) =>{
    expect(RS._generatePromiseAll.calledOnce).to.equal(false);

    RS.get('localhost:3000/api/test', {method: "GET"})
      .on('testMessage')
      .then((data) =>{
        expect(RS._generatePromiseAll.calledOnce).to.equal(true);
        done();
      })
      .catch(done);
    
    mockServer.send(JSON.stringify({"message": "testMessage"}));
  });

  it('should make post request on socket onmessage', (done) =>{
    expect(RS._generatePromiseAll.calledOnce).to.equal(false);

    RS.post('localhost:3000/api/test', {method: "POST"})
      .on('testMessage')
      .then((data) =>{
        expect(RS._generatePromiseAll.calledOnce).to.equal(true);
        done();
      })
      .catch(done);
    
    mockServer.send(JSON.stringify({"message": "testMessage"}));
  });

  it('should call onclose when socket connection closed', () =>{
    expect(RS._onclose.calledOnce).to.equal(false);
    mockServer.close();
    expect(RS._onclose.calledOnce).to.equal(true);
  });
});
