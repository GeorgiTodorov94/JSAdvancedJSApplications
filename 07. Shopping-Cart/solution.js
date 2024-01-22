function solve() {
   const addProductButtonsElement = document.querySelectorAll('add product');
   const checkOutButtonElement = document.querySelector('.checkout');
   let products = [];
   let totalPrice = 0;

   addProductButtonsElement.forEach(btn => {
      btn.addEventListener('click', addProductInCart);

   })

   function addProductInCart() {

      const productElement = e.target.parentNode.parentNode;
      const productTitle = productElement.querySelector('.product-title');
      const productPrice = productElement.querySelector('.product-line-price');


      printMessage(productTitle, productPrice)

      if (!products.includes(productTitle)) {
         products.push(productTitle.textContent);
      }

      console.log(e.target.parentNode.parentNode);

      totalPrice += Number(productPrice.textContent);

   }
   function printMessage(productTitle, productPrice) {
      const textareaElement = document.querySelector('textarea');
      return `Added ${productTitle} for ${productPrice} to the cart.\n.`
   }

   function checkout(e) {
      textareaElement.textContent += `You bought ${products.join(', ')} for ${totalPrice.toFixed(2)}`
   }

}