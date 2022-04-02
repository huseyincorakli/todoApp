const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll=document.querySelector('#btnDeleteAll');
const ulTaskList=document.querySelector('#task-list');
let items;

eventListeners();
loadItems(); 


function eventListeners(){
form.addEventListener('submit',addNewItem);
ulTaskList.addEventListener('click',deleteItem)
btnDeleteAll.addEventListener('click',deleteAllItems)
}
function createLiItem(text){
    //li oluşturma
    const li=document.createElement('li');
    li.classList='list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text)) // txtTaskName adlı  input girişine girilen değeri li'e ekledik
    //a oluşturma
    const a= document.createElement('a');
    a.className='btn btn-outline-primary float-end mt-1';
    a.setAttribute('href','#');
    document.createTextNode('Delete');
    a.innerHTML='Delete';

    li.appendChild(a);

    ulTaskList.appendChild(li);
}
function loadItems(){
    items=getItemFromLS();
    items.forEach(function(item){
        createLiItem(item);
    })
}
function addNewItem(e){ 
    if(input.value.trim()==''){
        alert('Blank data cannot be entered!')
    }
    else{
    
    createLiItem(input.value);
    setItemToLS(input.value) //LS
    input.value='';
    e.preventDefault();
}
}
function deleteItem(e){

        if (e.target.className==='btn btn-outline-primary float-end mt-1') {
            if (confirm('Are you sure the item will be deleted?'))
            e.target.parentElement.remove();
            
            deleteFromLS(e.target.parentElement.firstChild.textContent);

        }
    e.preventDefault();
}
function deleteAllItems(){
    if (confirm('All items will be deleted. Are you sure?')) {
        //ulTaskList.innerHTML='';
        while (ulTaskList.firstChild) {
                ulTaskList.removeChild(ulTaskList.firstChild);
                localStorage.clear();
        }
        
     
        
    }
}
function setItemToLS(text){
    items=getItemFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}
function getItemFromLS(){
    if (localStorage.getItem('items')==null) {
        items=[];
    } else {
        items=JSON.parse(localStorage.getItem('items'))

    }
    return items;
}
function deleteFromLS(text){
   items= getItemFromLS();
   items.forEach(function(item,index){
       console.log('b')
       if(item===text){
           items.splice(index,1)
           console.log("a")
       }
   });
   localStorage.setItem('items',JSON.stringify(items));
}
