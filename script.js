// let data = [	{
//     "long":123,
//     "lat":432,
//     "id":1,
//     "timestamp":12-01-19 12:30,
//     "address":"xyz"
// },
// {
//     "long":123,
//     "lat":432,
//     "id":1,
//     "timestamp":12-01-19 12:30,
//     "address":"xyz"
// }
// ]
const server = "http://192.168.43.204:5000"
console.log('yoo')
let table = document.querySelector(".reports");

function insert_data(region) {
  generateTable(table,region)
}
function generateTable(table, data) {
  
  for (let element of data) {

    let row = `<tr class="data"><td>${element.Id}</td><td>${element.Longitude}</td><td>${element.Latitude}</td><td>${element.Count}</td><td>${element.Timestamp}</td><td>${element.Address}</td><td>${element.Description}</td><td><button onClick="edit(${element.Id},'${element.Description}')">Edit</button></td><td><button onClick="delete_id(${element.Id})">Delete</button></td></tr>`

    table.innerHTML += row

  }
}

//let data = Object.keys(region[0]);
//generateTableHead(table, data);
//generateTable(table, region);

let currentId = undefined
let currentDescription = undefined

function delete_id(id)
{
   x = new XMLHttpRequest()
   x.onreadystatechange = function(){}
   x.open("GET", server+"/dashboard/"+id)
   x.send()
   console.log("Deleted")
   refreshTable()
}

function refreshTable(){
  setTimeout(()=>{
    let oldRows = document.querySelectorAll('.data')

    oldRows.forEach(element => {
      element.parentElement.removeChild(element)
    });
    
    GETdATA()
  }, 500)
}


function edit(id,description){
  currentId =id;
  currentDescription = description
  document.querySelector('#edit-popup').style.display="block";
  //editSend(currentId,description)
  edit = document.querySelector("#text-edit")
  edit.value = description
}

function editSend(){
  id = currentId
  description = currentDescription
  edit = document.querySelector("#text-edit")
  x = new XMLHttpRequest()
  x.onreadystatechange=function(){}
  x.open("POST",server+"/dashboard/update/"+id)
  x.send(JSON.stringify({Description:edit.value}))
  console.log("edit hua")

  document.querySelector('#edit-popup').style.display="none";
  refreshTable()
}


function GETdATA()
{

let data = ''
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function (e) {
  console.log(this.status)
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText)
    console.log(this.responseText)
    insert_data(data)
  }
}
xhttp.open("GET", server+"/dashboard")
xhttp.send()
console.log('yoo')
}
GETdATA();