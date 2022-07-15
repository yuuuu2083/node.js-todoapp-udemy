
const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');
// /api/v1/tasksからタスクを読み込む

const showTasks = async () => {
    try {
        //自作のAPIを叩く
        const {data: tasks} = await axios.get("/api/v1/tasks");

        //タスクが１つもない時
        if(tasks.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">タスクがありません</h5>';
            return;
        }


        const allTasks = tasks.map((task) => {
            const {completed, _id, name} = task;

            return `<div class="single-task ${completed && "task-completed"}">
                        <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                        <div class="task-links">
                            <a href="edit.html?id=${_id}" class="edit-link">
                                <i class="fas fa-edit"></i>
                            </a>
                            <button type="button" class="delete-btn" data-id="${_id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>`
        }).join('');
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();


//タスクを追加
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDOM.value;
    try {
        await axios.post("/api/v1/tasks", {name: name});
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "タスクを追加しました";
        formAlertDOM.classList.add("text-success");
    } catch (err){
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "もう一度やり直してください";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

//タスクを消去

tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    if(element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`api/v1/tasks/${id}`);
            showTasks();
            formAlertDOM.innerHTML = "タスクを消去しました";
        } catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            formAlertDOM.style.display = "none";
        }, 3000);
    }
});