const URI = "http://localhost:3000/users"
const catchesURI = "http://localhost:3000/data/catches/"
const endPoint = {
    logout: "logout"
}

const logInBtnRef = document.getElementById('login')
const registerBtnRef = document.getElementById('register')
const logoutBtnRef = document.getElementById('logout');
const userNameRef = document.querySelector('.email span');
logoutBtnRef.addEventListener('click', onLogout);
const catchesRef = document.getElementById('catches');
catchesRef.innerHTML = '';
const loadBtnRef = document.querySelector('button.load');
loadBtnRef.addEventListener('click', onLoadAllCatches)
const addCatchesBtn = document.querySelector("#addForm button");
document.querySelector('form').addEventListener('submit', onCreateCatches);



if (sessionStorage.getItem('userId')) {
    logInBtnRef.style.display = 'none';
    registerBtnRef.style.display = 'none';
    userNameRef.textContent = sessionStorage.getItem('email');
    addCatchesBtn.disabled = false;
    console.log(userNameRef)


} else {
    logInBtnRef.style.display = 'none';
    userNameRef.textContent = "guest"
    logoutBtnRef.style.display = "none";

};

async function onLogout(e) {
    const response = await fetch(URI + endPoint.logout, {
        method: "GET",
        headers: {
            "X-authorization": sessionStorage.getItem("accessToken")
        }

    })
    sessionStorage.clear();
    window.location.href = "./index.html"
}

async function onLoadAllCatches(e) {

    const allCatches = await getAllCatches();
    catchesRef.innerHTML = '';
    allCatches.forEach((e) => {
        const catches = generateCatches(e);
        catchesRef.appendChild(catches);

    });
}

async function onCreateCatches(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        throw new Error('missing fields')
    }
    const data = {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "X-Authorization": sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        })
    }
    try {
        const response = await fetch(catchesURI, data)
        if (response.status !== 200) {
            throw new Error('error');
        }
    } catch (err) {
        throw new Error(err)
    }
    e.target.reset()
    onLoadAllCatches();
}

function generateCatches(e) {
    const div = document.createElement("div");
    div.classList.add("catch");
    const isOwner = sessionStorage.getItem('userId')
    div.innerHTML = `
    <label>Angler</label>
    <input type="text" class="angler" value="${e.angler}" ${!isOwner ? "disabled" : ""} >
    <label>Weight</label>
    <input type="text" class="weight" value="${e.weight}" ${!isOwner ? "disabled" : ""}>
    <label>Species</label>
    <input type="text" class="species" value="${e.class}" ${!isOwner ? "disabled" : ""}>
    <label>Location</label>
    <input type="text" class="location" value="${e.location}" ${!isOwner ? "disabled" : ""}>
    <label>Bait</label>
    <input type="text" class="bait" value="${e.bait}" ${!isOwner ? "disabled" : ""}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${e.captureTime}" ${!isOwner ? "disabled" : ""}>
    <button class="update" data-id="${e._id}" disabled>Update</button>
    <button class="delete" data-id="${e._id}" disabled>Delete</button>`

    if (e._ownerId === sessionStorage.getItem('userId')) {
        const buttons = div.querySelectorAll("button");
        Array.from(buttons).forEach(x => {
            x.disabled = false;
            if (x.classList.contains("delete")) {
                x.addEventListener('click', onDelete)
            }
            return x.addEventListener('click', onEdit)
        })
    }
    return div;


}

async function onDelete(e) {
    const catchesId = e.target.dataset.id;
    const responses = await fetch("http://localhost:3000/data/catches/" + catchesId, {
        method: "DELETE",
        headers: {
            "X-Authorization": sessionStorage.getItem('accessToken')
        }
    });
    onLoadAllCatches();

}

async function onEdit(e) {
    e.preventDefault();
    const catchesId = e.target.dataset.id;

    const inputs = e.target.parentElement.querySelectorAll('input')

    const angler = inputs[1].value
    const weight = Number(inputs[2].value)
    const species = inputs[3].value
    const location = inputs[4].value
    const bait = inputs[5].value
    const captureTime = Number(inputs[5].value);
    const isOwner = sessionStorage.getItem('userId')
    
    const data = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    }
    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        throw new Error('missing fields')
    }
    const response = await fetch(catchesURI + catchesId, {
        method: "PUT",
        headers: {
            'Content-type': "application.json",
            "X-Authorization": sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
    })
    onLoadAllCatches()
}

async function getAllCatches() {

    const response = await fetch(catchesURI)
    const data = await response.json();
    return data;
}
