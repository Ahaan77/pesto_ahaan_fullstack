function assignTodoColor(status) {
    const statusClass = {
        "Completed": "#38A169",
        "To-do": "#EF4444",
        "In-Progress": "#F59E0B"
    };

    return statusClass[status]
}


export { assignTodoColor }