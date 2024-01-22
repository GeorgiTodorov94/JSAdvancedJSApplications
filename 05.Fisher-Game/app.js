function fisherGame() {


    document.querySelector('form').addEventListener('submit', onSubmit);
    const URI = "http://localhost:3030/users/register"

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('rePass');

        if (!email || !password || !repass || password !== repass) {
            return window.alert("Error");
            // throw new Error('Error');
        }
        const data = {
            method: "POST",
            headers: {
                "Content-type": "application-json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        try {
            const response = await fetch(URI, data);
            const userData = await response.json();
            sessionStorage.setItem('email', userData.email)
            sessionStorage.setItem('usedId', userData._id)
            sessionStorage.setItem('accessToken', userData.accessToken);
            window.location.href = "./index.html";
        } catch (error) {
            throw new Error(error);
        }
    }

}