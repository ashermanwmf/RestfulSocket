# Welcome to RestfulSocket

RestfulSocket is a RESTful Socket that combines the native Fetch, Websocket and Promise API to create a 
restful response to a websocket event listener.


# Getting Started

1. Install RestfulSocket: (COMING SOON)

```
npm install -save restfulsocket
```

2. Import RestfulSocket: 

```
import RestfulSocket from 'restfulsocket'
```

3. Use RestfulSocket:

```
const onopen = () =>{ /* Function for socket on open */ };
const onclose = () =>{ /* Function for socket on close */ };
const onerror = () =>{ /* Function for socket on error* /};

const restSocket = new RestfulSocket('ws://localhost/', onopen, onclose, onerror);

restSocket.findSocketMessage((socketMessageData) =>{
  /* define a filter to find and return socket message from socketMessageData object */
});

restSocket.get('localhost/api/initialData', requestObject)
  .on('sampleMessage')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);
```

4. Complex use case:

```
const restSocket = new RestfulSocket('ws://localhost/', onopen, onclose, onerror);

restSocket.findSocketMessage((socketMessageData) =>{
  /* define a filter to find and return socket message from socketMessageData object */
});

restSocket.get('localhost/api/initialData', requestObject)
  .post('localhost/api/initialPost', requestObject)
  .on('init')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);

restSocket.get('localhost/api/updateData', requestObject)
  .get('localhost/api/secondaryData', requestObject)
  .on('update')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);
```
