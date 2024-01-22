document.querySelector('form').addEventListener('submit', onLogin);

async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email')
    const password = formData.get('password');

    const data = {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }
    try {
        const response = await fetch("http://localhost:3000/users/login", data);
        if(response.status !== 200){
            throw new Error('Error');
        }
        const userData = await response.json();
        sessionStorage.setItem('email', userData.email)
        sessionStorage.setItem('userId', userData._id)
        sessionStorage.setItem('accessToken', userData.accessToken);
        
    } catch (error) {
        throw new Error("login -> " + error)
    }
    window.location.href = './index.html'
}