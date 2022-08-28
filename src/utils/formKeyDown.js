const formKeyDown = (event) => {
    event.preventDefault()
    if (event.keyCode === 13) {
        const { form } = event.target
        const idx = Array.prototype.indexOf.call(form, event.target)
        form.elements[idx + 1].focus()
    }
}

export default formKeyDown