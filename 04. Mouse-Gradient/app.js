function attachGradientEvents() {
    let gradient = document.getElementById('gradient');
    gradient.addEventListener('mousemove', gradientMove);
    gradient.addEventListener('mouseout', gradientOut);


    function gradientMove(event){
        const gradientBoxWidth = event.target.clientWidth;
        const positionOfMouse = event.offsetX / (gradientBoxWidth - 1);
        const percentage = Math.trunc(positionOfMouse * 100);
        document.getElementById('result').textContent = percentage + '%';
    }

    function gradientOut(){
        document.getElementById('result').textContent = '';
    }
}