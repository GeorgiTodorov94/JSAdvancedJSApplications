function attachEvents() {
    const textAreaRef = document.getElementById('messages')
    const baseURL = 'http://localhost:3000/jsonstore/messenger'
    document.getElementById('refresh').addEventListener('click', onLoadComments)
    document.getElementById('submit').addEventListener('click', onSubmitComment);


    async function onLoadComments(e) {
        const response = await fetch(`${baseURL}`);
        const data = await response.json()
        Object.values(data).forEach(row => {
            textAreaRef.textContent += `${row.author} :  ${row.content}\n`
        })
        textAreaRef.textContent = textAreaRef.textContent.trim()
    }
    async function onSubmitComment(e) {
        textAreaRef.textContent = '';
        const dataRef = document.querySelectorAll("#controls input[type='text']");
        console.log(dataRef)
        debugger
        const author = dataRef[0].value;
        const content = dataRef[1].value;
        const data = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            })

        }
        fetch(`${baseURL}`, data);
        dataRef[0].value = ''
        dataRef[1].value = ''
    }
}

attachEvents();