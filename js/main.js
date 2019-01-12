window.onload = () => {
    const compTasks = document.querySelector(".comp_tasks .tasks_container"),
        uncompTasks = document.querySelector(".uncomp_tasks .tasks_container"),
        taskInput = document.querySelector("input[type='text']"),
        addForm = document.querySelector(".add_form");
    /****************************************************************/
    (function loadTasks(){
        let tasks;
        if(localStorage.getItem("tasks") === null){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        tasks.forEach( t => {
            let task = document.createElement("li"),
                text = document.createElement("span"),
                remove = document.createElement("a"),
                check = document.createElement("a"),
                inputValue = document.createTextNode(t.name);
            task.classList.add("task");
            task.dataset.id = t.id;
            text.classList.add("task_text");
            text.append(inputValue);
            remove.classList.add("delete");
            remove.href = "#";
            check.href = "#";
            remove.innerHTML = `<i class="far fa-times-circle delete_icon"></i>`;
            if(t.comp){
                check.classList.add("uncheck");
                check.innerHTML = `<i class="fas fa-check-circle uncheck_icon"></i>`;
                task.append(text,remove,check);
                compTasks.append(task);
            } else{
                check.classList.add("check");
                check.innerHTML = `<i class="far fa-check-circle check_icon"></i>`;
                task.append(text,remove,check);
                uncompTasks.append(task);
            }
        })
    }());
    function addItem(e){
        e.preventDefault();
        if(taskInput.value.trim() !== ""){
            let tasks;
            if(localStorage.getItem("tasks") === null){
                tasks = [];
            } else{
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }
            let task = document.createElement("li"),
            text = document.createElement("span"),
            remove = document.createElement("a"),
            check = document.createElement("a"),
            inputValue = document.createTextNode(taskInput.value);
            task.classList.add("task");
            task.dataset.id = tasks.length;
            text.classList.add("task_text");
            text.append(inputValue);
            remove.classList.add("delete");
            check.classList.add("check");
            remove.href = "#";
            check.href = "#";
            remove.innerHTML = `<i class="far fa-times-circle delete_icon"></i>`;
            check.innerHTML = `<i class="far fa-check-circle check_icon"></i>`;
            task.append(text,remove,check);
            uncompTasks.append(task);
            tasks.push({id : tasks.length,name : taskInput.value, comp : false});
            localStorage.setItem("tasks", JSON.stringify(tasks));
            addForm.reset();
        }
    }
    function moveToComplete(event){
        if(event.target.matches(".check_icon")){
            let parent = event.target.parentElement.parentElement,
                tasks;
            if(localStorage.getItem("tasks") === null){
                tasks = [];
            } else{
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }
            tasks.forEach((task) => {
                if(parent.dataset.id == task.id){
                    task.comp = true;
                }
            });
            let checkIcon = parent.querySelector('.check_icon');
            let link = parent.querySelector('.check');
            checkIcon.classList = "fas fa-check-circle uncheck_icon";
            link.classList = "uncheck";
            compTasks.append(parent);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
    function moveToUncomplete(event){
        if(event.target.matches(".uncheck_icon")){
            let parent = event.target.parentElement.parentElement,
                tasks;
            if(localStorage.getItem("tasks") === null){
                tasks = [];
            } else{
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }
            tasks.forEach((task) => {
                if(parent.dataset.id == task.id){
                    task.comp = false;
                }
            });
            let checkIcon = parent.querySelector('.uncheck_icon');
            let link = parent.querySelector('.uncheck');
            checkIcon.classList = "far fa-check-circle check_icon";
            link.classList = "check";
            uncompTasks.append(parent);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
    function removeTask(event){
        if(event.target.matches(".delete_icon")){
            if(confirm("Are you sure, you wanna delete this task ?")){
                let parent = event.target.parentElement.parentElement,
                tasks, index;
                if(localStorage.getItem("tasks") === null){
                    tasks = [];
                } else{
                    tasks = JSON.parse(localStorage.getItem("tasks"));
                }
                tasks.forEach((task, i) => {
                    if(parent.dataset.id == task.id){
                        index = i;
                    }
                });
                tasks.splice(index,1);
                parent.remove();
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }
    }
    addForm.addEventListener("submit",addItem);
    uncompTasks.addEventListener("click", moveToComplete);
    compTasks.addEventListener("click", moveToUncomplete);
    uncompTasks.addEventListener("click", removeTask);
    compTasks.addEventListener("click", removeTask);
}