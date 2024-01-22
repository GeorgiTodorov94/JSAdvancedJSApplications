async function getInfo() {
    const baseURI = "http://localhost:3030/jsonstore/bus/businfo/"
    const stopIdRef = document.getElementById('stopId');
    const busId = stopIdRef.value;
    const stopNameRef = document.getElementById('stopName');
    const ulRef = document.getElementById('buses');
    try {
        const response = await fetch(baseURI + busId);
        const data = await response.json();

        stopNameRef.textContent = data.name;
        clear();

        for (let [busId, time] of Object.entries(data.buses)) {
            let li = document.createElement("li");
            li.textContent = `Bus ${busId} arrives in ${time} minutes`
            ulRef.appendChild(li)
        }
    } catch (e) {
        appendNewMessage()
    }

    function appendNewMessage() {
        clear()
        stopNameRef.textContent = "Error";

    }
    function clear() {
        stopIdRef.value = '';
        ulRef.innerHTML = "";
    }

}