function deleteA(){

    let redElements = document.querySelector('#items li.red');
    redElements.forEach(li => {
        li.parentNode.removeChild(li);
    });

}
deleteA()