function assignTodoColor(status) {
    const statusClass = {
        "Completed": "#38A169",
        "To-do": "#EF4444",
        "In-Progress": "#F59E0B"
    };

    return statusClass[status]
}

function dateToTimestamp(dateString) {
    // Parse the date string into a Date object
    const dateObject = new Date(dateString);

    // Get the timestamp in milliseconds
    const timestamp = dateObject.getTime();

    return timestamp;
}

function reverseTimer(endTimestamp) {
    // Get the current timestamp
    const currentTimestamp = Date.now();

    const convertedStamp = dateToTimestamp(endTimestamp);
    
    // Calculate the time difference in milliseconds
    const timeDifference = convertedStamp - currentTimestamp;

    // Check if the endTimestamp is in the future
    if (timeDifference <= 0) {
        return "Timer expired";
    }

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Format the time components into a string
    let timerString = "";
    if (days > 0) {
        timerString += `${days} day${days !== 1 ? "s" : ""}, `;
    }
    if (hours > 0) {
        timerString += `${hours} hour${hours !== 1 ? "s" : ""}, `;
    }
    if (minutes > 0) {
        timerString += `${minutes} minute${minutes !== 1 ? "s" : ""}, `;
    }
    timerString += `${seconds} second${seconds !== 1 ? "s" : ""}`;

    return timerString;
}


export { assignTodoColor, reverseTimer }