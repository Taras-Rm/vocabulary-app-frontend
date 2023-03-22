
export function formatDate(date) {
    return date.toLocaleString("en-us", {
        hour12: false,
        dateStyle: "medium",
        timeStyle: "short"
    })
}