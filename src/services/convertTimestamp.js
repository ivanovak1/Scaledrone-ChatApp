function convertTimestamp(timestamp) {
    const miliseconds = timestamp * 1000;
    const dateObject = new Date(miliseconds);
    return dateObject.toLocaleTimeString("hr-HR", {hour: "2-digit", minute: "2-digit"});
}

export default convertTimestamp;