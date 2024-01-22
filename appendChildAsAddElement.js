function solve(){

    const sectionElement = document.getElementsByTagName('section')[0];
    const pElement = document.getElementsByTagName("p")[0];
    pElement.innerHTML = '<strong> Hello, World! </strong>';

    const newParagraphEl = document.createElement('p');
    newParagraphEl.textContent = '2';
    sectionElement.appendChild(newParagraphEl);

}
solve();