function addItem() {
    let inputElementText = document.getElementById('newItemText').value;
    let newListItemElement = document.createElement('li');
    newListItemElement.appendChild(document.createTextNode(inputElementText));
    document.getElementById('items').appendChild(newListItemElement);
    document.getElementById('newItemText').value = '';

}