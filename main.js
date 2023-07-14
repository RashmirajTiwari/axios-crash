// GET REQUEST
function getTodos() {

  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/todos'
  }).then(res =>showOutput(res)).
    catch(err=>console.log(err));
}

// POST REQUEST
function addTodo() {
  
  axios.post('https://jsonplaceholder.typicode.com/todos',{
      title:'New todo',
      completed:false
  }
  ).then(res =>showOutput(res)).
    catch(err=>console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.put('https://jsonplaceholder.typicode.com/todos/1',{
    title:'update todo',
    completed:true
}
).then(res =>showOutput(res)).
  catch(err=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res =>showOutput(res)).
  catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
            axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
          ])
  .then(axios.spread((todos,posts)=>showOutput(posts))).
  catch(err=>console.log(err));
  
}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers:{
      'content-Type':'application/json',
      Authorization:'sometoken'
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos',{
      title:'New todo',
      completed:false
  },config
  ).then(res =>showOutput(res)).
    catch(err=>console.log(err));
  
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{title:'hello world'},
    transformResponse:axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })
  };
  axios(options).then(res=>showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/todoss'
  }).then(res =>showOutput(res)).
    catch(err=>{
      if(err.reponse){
        console.log(err.reponse.data);
        console.log(err.reponse.status);
        console.log(err.reponse.headers);
      }
    });
  
}

// CANCEL TOKEN
function cancelToken() {
  const source=axios.CancelToken.source();
  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/todos',cancelToken:source
  }).then(res =>showOutput(res)).
    catch(err=>{
      if(axios.isCancel(err)){
        console.log('Request Canceled',err.message);
        
      }
      if(true){
        source.cancel('Request Canceled')
      }
    });
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
