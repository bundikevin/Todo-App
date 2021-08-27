//Getting all required elements
const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllButton = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;   //getting user entered value
    if(userData.trim() != 0){       //if user values aren't only spaces
        addButton.classList.add("active");//make add button active
    }
    else{
        addButton.classList.remove("active");//make add button inactive
    }
}

listTasks(); //calling showTasks function

// if user click on the add button
addButton.onclick = ()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage ==null){ //if localStorage is empty
           listArr = []; //creating blank array                    
    }
    else{ 
         listArr = JSON.parse(getLocalStorage)//transforming js object into a json string
         }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    addButton.classList.remove("active");//make add button inactives
    listTasks(); //calling showTasks function
}

//add task list in ul
function listTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage ==null){ //if localStorage is empty
           listArr = []; //creating blank array                    
    }
    else{ 
         listArr = JSON.parse(getLocalStorage)//transforming js object into a json string
         }
    const itemsNumber = document.querySelector(".itemsNumber")
    itemsNumber.textContent = listArr.length;
    if(listArr.length > 0){
        clearAllButton.classList.add("active");
    }
    else{
        clearAllButton.classList.remove("active");
    }
    
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onClick="removeTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = " "; //clear the field once the task is added
}

//remove task
function removeTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //remove the particular indexed li
    
    //After removing the li again update
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    listTasks(); //calling showTasks function
}

//Remove all tasks function
clearAllButton.onclick = ()=>{
    listArr = []; //empty the array
    //After removing all the tasks
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    listTasks(); //calling showTasks function
}