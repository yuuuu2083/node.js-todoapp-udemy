taskIDDOM = document.querySelector(".task-edit-id");
taskNameDOM = document.querySelector(".task-edit-name");
editFormDOM = document.querySelector(".single-task-form");
formAlertDOM = document.querySelector(".form-alert");
taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

//一つの特定のタスクを取得する

const showTask = async () => {
    try {
        const {data: task} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id, completed, name} = task;
        taskIDDOM.innerHTML = _id;
        taskNameDOM.value = name;
        if(completed) {
            taskCompletedDOM.checked = true;
        }
    } catch (err) {
        console.log(err);
    }
}

showTask();

//タスクの編集

editFormDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        taskCompleted = taskCompletedDOM.checked;
        console.log(taskCompleted)
        const {data: task} = await axios.patch(`/api/v1/tasks/${id}`, {
        name: taskName,
        completed:  taskCompleted,
        });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "編集に成功しました";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});