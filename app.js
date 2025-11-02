// Wait for the DOM to be fully loaded before running the app
document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. INJECT STYLES
     * This function creates a <style> tag and adds all the CSS
     * rules for our application, then appends it to the <head>.
     */
    function injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
                --primary-color: #007bff;
                --primary-hover: #0056b3;
                --danger-color: #dc3545;
                --danger-hover: #c82333;
                --bg-color: #f0f2f5;
                --container-bg: #ffffff;
                --text-color: #333;
                --border-color: #ddd;
                --item-bg: #f9f9f9;
                --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--bg-color);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
            }

            .app-container {
                background: var(--container-bg);
                padding: 2rem;
                border-radius: 10px;
                box-shadow: var(--shadow);
                width: 400px;
                max-width: 90%;
                text-align: center;
            }

            h1 {
                color: var(--text-color);
                margin-top: 0;
            }

            .input-area {
                display: flex;
                gap: 10px;
                margin-bottom: 1.5rem;
            }

            #task-input {
                flex-grow: 1;
                padding: 10px;
                border: 1px solid var(--border-color);
                border-radius: 5px;
                font-size: 1rem;
            }

            #add-task-btn {
                padding: 10px 15px;
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                transition: background-color 0.3s;
            }

            #add-task-btn:hover {
                background-color: var(--primary-hover);
            }

            #task-list {
                list-style-type: none;
                padding: 0;
                margin: 0;
                text-align: left;
            }

            .task-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px;
                background: var(--item-bg);
                border: 1px solid #eee;
                border-radius: 5px;
                margin-bottom: 8px;
                word-break: break-all;
                transition: background-color 0.3s;
            }

            .task-item.completed {
                text-decoration: line-through;
                opacity: 0.7;
                background-color: #e9ecef;
            }
            
            .task-item span {
                cursor: pointer;
                flex-grow: 1;
                margin-right: 10px;
            }

            .task-item .delete-btn {
                background: var(--danger-color);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 5px 8px;
                cursor: pointer;
                font-size: 0.8rem;
                margin-left: 10px;
                transition: background-color 0.3s;
            }

            .task-item .delete-btn:hover {
                background: var(--danger-hover);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 2. CREATE UI
     * This function creates the basic HTML structure (DOM elements)
     * for our application and appends them to the <body>.
     */
    function createUI() {
        const appContainer = document.createElement('div');
        appContainer.className = 'app-container';

        const title = document.createElement('h1');
        title.textContent = 'My To-Do List';

        const inputArea = document.createElement('div');
        inputArea.className = 'input-area';

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.id = 'task-input';
        taskInput.placeholder = 'Add a new task...';

        const addTaskBtn = document.createElement('button');
        addTaskBtn.id = 'add-task-btn';
        addTaskBtn.textContent = 'Add';

        inputArea.append(taskInput, addTaskBtn);

        const taskList = document.createElement('ul');
        taskList.id = 'task-list';

        appContainer.append(title, inputArea, taskList);
        document.body.appendChild(appContainer);
    }

    /**
     * 3. ADD APP LOGIC
     * This function selects the DOM elements created above and
     * attaches all the necessary event listeners.
     */
    function addAppLogic() {
        const taskInput = document.getElementById('task-input');
        const addTaskBtn = document.getElementById('add-task-btn');
        const taskList = document.getElementById('task-list');

        // Function to add a new task
        const addTask = () => {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }

            const listItem = document.createElement('li');
            listItem.className = 'task-item';

            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';

            listItem.append(taskSpan, deleteBtn);
            taskList.appendChild(listItem);

            taskInput.value = '';
            taskInput.focus();
        };

        // Add task on button click
        addTaskBtn.addEventListener('click', addTask);

        // Add task on "Enter" key press
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Handle clicks on the task list (for completing or deleting)
        taskList.addEventListener('click', (e) => {
            // Check if the delete button was clicked
            if (e.target.classList.contains('delete-btn')) {
                const listItem = e.target.closest('.task-item');
                listItem.remove();
            }
            
            // Check if the task text (span) was clicked
            if (e.target.tagName === 'SPAN') {
                 const listItem = e.target.closest('.task-item');
                 listItem.classList.toggle('completed');
            }
        });
    }

    // --- Run the application ---
    injectStyles();
    createUI();
    addAppLogic();
});