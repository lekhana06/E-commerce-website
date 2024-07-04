const productImage = document.getElementById("product-image")
const vendorName = document.getElementById("vendor-name")
const title = document.getElementById("title")
const price = document.getElementById("price")
const compareAtPrice = document.getElementById("compare-at-price")
const discount = document.getElementById("discount")
const decrement = document.getElementById("minus")
const increment = document.getElementById("plus")
const countValue = document.getElementById("count-value")
const successMessage = document.getElementById("add-to-cart-message")
const addToCartButton = document.getElementById("add-to-cart")

let count = 0;




//making a API call

async function getData()
{
    
    try{

    
    const res = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json")
    const data = await res.json();
    const product = data.product;
    console.log(product.compare_at_price);

    vendorName.textContent = product.vendor
    title.textContent = product.title
    price.textContent = product.price
    compareAtPrice.textContent = product.compare_at_price
    //Calculating discount %

    let p = parseFloat(product.price.replace(/[^\d.-]/g, ''));
    let c = parseFloat(product.compare_at_price.replace(/[^\d.-]/g, ''));
    console.log(p)
    if (!isNaN(p) && !isNaN(c)) {
        let percentageDiscount = ((c - p) / c) * 100;

       
        discount.textContent = percentageDiscount.toFixed(0) + "%" +" Off";
    } else {
        console.error("Failed to convert prices to numbers.");
    }

    //Choose color component
    const colors = data.product.options.find(option => option.name === 'Color').values;
    const colorOptionsContainer = document.getElementById('color-options');
    let colorSelected ="";
    colors.forEach(color => {
        const colorName = Object.keys(color)[0];
        
        const colorValue = color[colorName];
  
       
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');

        const colorInner = document.createElement('div');
      colorInner.classList.add('color-option-inner');
      colorInner.style.backgroundColor = colorValue;

      
      colorOption.appendChild(colorInner);
      const checkmark = document.createElement('div');
      checkmark.classList.add('checkmark');
      
      colorOption.appendChild(checkmark);
  
        
        colorOption.addEventListener('click', function() {
         
          const allColorOptions = document.querySelectorAll('.color-option');
          allColorOptions.forEach(option => option.classList.remove('selected'));
  
         
          this.classList.add('selected');
  
         
          console.log(`Selected color: ${colorName} (${colorValue})`);
          colorSelected = colorName;
        });
  
        
        colorOptionsContainer.appendChild(colorOption);
    });

    //Choose a size component
    const sizes = data.product.options.find(option => option.name === 'Size').values;

    
    const sizeOptionsContainer = document.getElementById('size-options');
    let sizeValue = "";

    sizes.forEach(size => {
      
      const label = document.createElement('label');
      label.classList.add('size-option');
      
      
      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'size'; 
      radioButton.value = size;
      
      
      const labelText = document.createTextNode(size);

      
      label.appendChild(radioButton);
      label.appendChild(labelText);

      
      radioButton.addEventListener('change', function() {
        if (this.checked) {
          console.log(`Selected size: ${this.value}`);
          sizeValue = this.value;
          
        }
      });

      
      sizeOptionsContainer.appendChild(label);
  

    });
    //Counter decreement function
   decrement.addEventListener("click",function()
{
    count -= 1;
    console.log(count);
    countValue.textContent = count;
})
//Counter increement function
increment.addEventListener("click",function()
{
    count += 1;
    console.log(count);
    countValue.textContent = count;
})
//Add to cart function
addToCartButton.addEventListener("click",function()
{
    if(colorSelected !== "" && sizeValue !== "")
    {
    successMessage.style.display = "block";
    successMessage.textContent = `Embrace Sideboard with Color ${colorSelected} and Size ${sizeValue} added to cart`
    }
    else{
        successMessage.style.display = "block";
        successMessage.textContent = "Please select all the options";
    }
})

   







}catch (error) {
    console.error("Error in  fetching data :", error);
}


    

    

    
    

}

getData();
