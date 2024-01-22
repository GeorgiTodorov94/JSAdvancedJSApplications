function focused() {
    const sectionElements = document.querySelectorAll('div div');
    const inputField = document.getElementsByTagName('input');


    for (const input of inputField) {
        input.addEventListener('focus', inputFocus);
        input.addEventListener('focus', inputBlur);
    }



    function inputFocus() {
        const sectionElement = e.target.parentNode;
        sectionElement.className = 'focused';

        console.log(e.target.parentNode)
    }
    function inputBlur() {
        const sectionElement = e.target.parentNode;
        sectionElement.className = '';

    }
}