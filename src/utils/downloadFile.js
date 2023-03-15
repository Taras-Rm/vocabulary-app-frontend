
export function downloadAttachedFile(attachment) {
    const url = window.URL.createObjectURL(new Blob([attachment.data]))
    const link = document.createElement("a")
    link.href = url
    
    link.setAttribute('download', attachment.headers["content-disposition"].split("filename=")[1])

    document.body.appendChild(link)

    link.click()

    link.parentNode.removeChild(link)
}