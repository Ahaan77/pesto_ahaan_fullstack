function assignTodoColor(status) {
    const statusClass = {
        "Completed": "text-green-600",
        "To-do": "text-red-400",
        "In Progress": "text-orange-500"
    };

    const className = `font-bold ${statusClass[status] || ""}`;
    return <p className={className}>{status}</p>;
}


export { assignTodoColor }