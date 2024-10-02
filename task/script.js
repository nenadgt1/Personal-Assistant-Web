document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('date-picker');
    const taskDesc = document.getElementById('task-desc');
    const taskHour = document.getElementById('task-hour');
    const addTaskBtn = document.getElementById('add-task-btn');
    const dailyView = document.getElementById('daily-view');

    // Populate hour options for the task-hour dropdown
    for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0') + ":00";
        const option = document.createElement('option');
        option.value = hour;
        option.textContent = hour;
        taskHour.appendChild(option);
    }

    // Function to create daily view with hour slots
    function createDailyView() {
        dailyView.innerHTML = ''; // Clear the view
        for (let i = 0; i < 24; i++) {
            const hourBlock = document.createElement('div');
            hourBlock.classList.add('hour-block');
            
            const hourLabel = document.createElement('div');
            hourLabel.classList.add('hour-label');
            hourLabel.textContent = i.toString().padStart(2, '0') + ":00";
            
            const taskList = document.createElement('ul');
            taskList.classList.add('task-list');
            taskList.id = `tasks-${i}`;
            
            hourBlock.appendChild(hourLabel);
            hourBlock.appendChild(taskList);
            dailyView.appendChild(hourBlock);
        }
    }

    // Load daily view when the page is loaded
    createDailyView();

    // Add task event
    addTaskBtn.addEventListener('click', () => {
        const task = taskDesc.value.trim();
        const hour = taskHour.value;

        if (task && hour) {
            // Add the task to the selected hour block
            const hourIndex = parseInt(hour.split(":")[0]);
            const taskList = document.getElementById(`tasks-${hourIndex}`);
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            
            taskItem.innerHTML = `
                ${task} 
                <span class="delete-task">x</span>
            `;

            // Append the task to the task list
            taskList.appendChild(taskItem);

            // Clear task description input after adding
            taskDesc.value = '';

            // Add delete functionality for the task
            taskItem.querySelector('.delete-task').addEventListener('click', () => {
                taskList.removeChild(taskItem);
            });
        }
    });

    // Update view when date changes (in the future: store tasks by date)
    datePicker.addEventListener('change', () => {
        createDailyView(); // Clear the previous tasks when the date changes
    });
});
