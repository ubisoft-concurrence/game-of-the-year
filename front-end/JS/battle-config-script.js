function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
function drop(even) {   
    even.preventDefault();
    var fetchData = even.dataTransfer.getData("text");
    even.currentTarget.appendChild(document.getElementById(fetchData));
  }

let gang1=[];
let gang2=[];