function assignTodoColor(status) {
    const statusClass = {
        "Completed": "green-500",
        "To-do": "red-500",
        "In-Progress": "yellow-500"
    };

    return statusClass[status]
}


export { assignTodoColor }