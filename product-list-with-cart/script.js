
const allProducts = JSON.parse(localStorage.getItem("productCart")) || [
    {
        "image": {
            "thumbnail": "images/image-waffle-thumbnail.jpg",
            "mobile": "images/image-waffle-mobile.jpg",
            "tablet": "images/image-waffle-tablet.jpg",
            "desktop": "images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-creme-brulee-thumbnail.jpg",
            "mobile": "images/image-creme-brulee-mobile.jpg",
            "tablet": "images/image-creme-brulee-tablet.jpg",
            "desktop": "images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-macaron-thumbnail.jpg",
            "mobile": "images/image-macaron-mobile.jpg",
            "tablet": "images/image-macaron-tablet.jpg",
            "desktop": "images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-tiramisu-thumbnail.jpg",
            "mobile": "images/image-tiramisu-mobile.jpg",
            "tablet": "images/image-tiramisu-tablet.jpg",
            "desktop": "images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-baklava-thumbnail.jpg",
            "mobile": "images/image-baklava-mobile.jpg",
            "tablet": "images/image-baklava-tablet.jpg",
            "desktop": "images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-meringue-thumbnail.jpg",
            "mobile": "images/image-meringue-mobile.jpg",
            "tablet": "images/image-meringue-tablet.jpg",
            "desktop": "images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-cake-thumbnail.jpg",
            "mobile": "images/image-cake-mobile.jpg",
            "tablet": "images/image-cake-tablet.jpg",
            "desktop": "images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-brownie-thumbnail.jpg",
            "mobile": "images/image-brownie-mobile.jpg",
            "tablet": "images/image-brownie-tablet.jpg",
            "desktop": "images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "images/image-panna-cotta-thumbnail.jpg",
            "mobile": "images/image-panna-cotta-mobile.jpg",
            "tablet": "images/image-panna-cotta-tablet.jpg",
            "desktop": "images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50,
        "quantity": 0
    }
];

const firstContent = document.querySelector(".first-content");

renderCart(allProducts);

function renderCart(allProducts) {
    firstContent.innerHTML = "";
    let imageSrc;
    allProducts.forEach(product => {
        if(window.innerWidth <= 600){
            
            imageSrc = product.image.mobile;
            
        } else{
            
            imageSrc = product.image.desktop;
            
        }
        firstContent.innerHTML += `
            <div class="card">
                <div class="image-btn">
                    <img src="${imageSrc}">
                    <button><img src="images/icon-add-to-cart.svg">Add to Cart</button>
                </div>
                <p class="category">${product.category}</p>
                <p class="name">${product.name}</p>
                <p class="price">$${(product.price).toFixed(2)}</p>
            </div>
            `;
        
    });
    addTocart();
    cartTextUpdate();
    orderRemoveBtn();
}
function addTocart() {
    const addToCartBtns = document.querySelectorAll(".image-btn button");
    addToCartBtns.forEach(addToCartBtn => {
        addToCartBtn.addEventListener("click", () => {

            const card = addToCartBtn.closest(".card");
            const name = card.querySelector(".name").textContent.trim();
            const box = card.querySelector(".image-btn");
            
            allProducts.forEach(product => {
                if (product.name === name) {
                    if (product.quantity === 0) {
                        product.quantity = 1;
                    }
                    let imageSrc;
                    if(window.innerWidth <= 600){
            
                        imageSrc = product.image.mobile;
                        
                    } else{
                        
                        imageSrc = product.image.desktop;
                        
                    }
                    box.innerHTML = `
                        <img src="${imageSrc}">
                        <div class="quantity-div">
                            <button class="decrease">&#8722;</button>
                            <span>${product.quantity}</span>
                            <button class="increase">+</button>
                        </div>
                    `;
                    const image = box.querySelector("img");
                    image.classList.add("active");
                    const increasebtn = box.querySelector(".increase");
                    const decreasebtn = box.querySelector(".decrease");
                    const span = box.querySelector("span");
                    increasebtn.addEventListener("click", () => {
                        product.quantity++;
                        span.textContent = product.quantity;
                        cartTextUpdate();
                        localStorage.setItem("productCart", JSON.stringify(allProducts));
                    });
                    decreasebtn.addEventListener("click", () => {
                        product.quantity--;
                        if (product.quantity === 0) {
                            product.quantity = 0;
                            
                            if(window.innerWidth <= 600){
            
                                imageSrc = product.image.mobile;
                                
                            } else{
                                
                                imageSrc = product.image.desktop;
                                
                            }
                            box.innerHTML = `
                                <img src="${imageSrc}">
                                <button><img src="images/icon-add-to-cart.svg">Add to Cart</button>
                            `;
                            addTocart();
                            cartTextUpdate();
                        } else {
                            span.textContent = product.quantity;
                            localStorage.setItem("productCart", JSON.stringify(allProducts));
                        }

                    });
                }
            });
            cartTextUpdate();
            orderRemoveBtn();
        });
    });


}
function cartTextUpdate() {
    const cartSpan = document.querySelector(".cart-top-quantity");
    const totalCart = allProducts.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartSpan.textContent = totalCart;

    const cartDiv = document.querySelector(".cart-image-p");
    const cartFull = document.querySelector(".cartFull");
    if (totalCart === 0) {
        cartDiv.style.display = "flex";
        cartFull.style.display = "none";
    } else {
        cartDiv.style.display = "none";
        cartFull.style.display = "flex";
        const hasItems = document.querySelector(".hasItems");
        hasItems.innerHTML ="";
        allProducts.forEach((item,index) => {
            if(item.quantity >=1){
                hasItems.innerHTML += `
                        <div class="cart-card-items" data-index="${index}">
                            <div class="cart-card-row">
                                <div class="cart-first-item">
                                    <h3>${item.name}</h3>
                                    <div class="price-calculate">
                                        <p class="numberofquantity">
                                            <span class="totalQuantity">${item.quantity}</span>X
                                        </p>
                                        <p class="cart-price">@ $<span class="priceofitem">${(item.price).toFixed(2)}</span></p>
                                        <p class="cart-total-price">$<span class="totalPrice">${(item.quantity * item.price).toFixed(2)
                                        }</span></p>
                                    </div>
                                </div>
                                <div class="cart-first-item-remove">
                                    <button class="remove-btn"><span>&#120;</span></button>
                                </div>
                            </div>
                            
                            <div class="underline"></div>
                        </div>
                `;
            }
            totalOrderPrice();
        });
        localStorage.setItem("productCart", JSON.stringify(allProducts));
        
    }
}

function totalOrderPrice(){
    let orderTotal = allProducts.reduce((total,item) =>{
        return total + (item.quantity * item.price); 
    },0);
    const orderTotalText = document.querySelector(".order-total");
    orderTotalText.textContent = `$${(orderTotal).toFixed(2)}`;
}

function orderRemoveBtn(){
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(removeBtn =>{
        removeBtn.addEventListener("click",()=>{
            const card = removeBtn.closest(".cart-card-items");
            const index = card.dataset.index;
            const name = card.querySelector("h3").textContent;
            allProducts.forEach((item)=>{
                if(item.name === name){
                    item.quantity = 0;
                    localStorage.setItem("productCart", JSON.stringify(allProducts));
                    renderCart(allProducts);
                }
            });
        });
    });
}

const confirmBtn = document.querySelector(".confirm-btn");
confirmBtn.addEventListener("click",()=>{
    const confirmContainer = document.querySelector(".confirm-order-showcase");
    confirmContainer.style.display = "flex";
    const orderCard = document.querySelector(".order-card-wrap");
    orderCard.innerHTML ="";
    allProducts.forEach((item)=>{
        let imageSrc;
        if(window.innerWidth <= 600){
            
            imageSrc = item.image.mobile;
            
        } else{
            
            imageSrc = item.image.desktop;
            
        }
        if(item.quantity >= 1){
            orderCard.innerHTML +=`
            <div class="order-card">
                    <div class="img-name">
                        <img src="${imageSrc}">
                        <div class="name-price">
                            <h4>${item.name}</h4>
                            <div class="price-cont">
                                <p class="quantity-confirm"><span >${item.quantity}</span>x</p>
                                <p class="price-confirm">@ <span>$${(item.price).toFixed(2)}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="confirm-total">
                        $<span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
            </div>
            <div class="order-underline"></div>
            `;
            
        }
        
    });
    let orderConfTotal = allProducts.reduce((sum,item)=>{
        return sum + (item.quantity * item.price);
    },0);
    const orderTotalConf = document.querySelector(".order-total-confirm");
    orderTotalConf.textContent = `$${orderConfTotal}`;
});
const startNewOrderBtn = document.querySelector(".new-order");
startNewOrderBtn.addEventListener("click",()=>{
    const confirmContainer = document.querySelector(".confirm-order-showcase");
    confirmContainer.style.display = "none";
    allProducts.forEach(item =>{
        item.quantity = 0;
    });
    localStorage.setItem("productCart",JSON.stringify(allProducts));
    renderCart(allProducts);
});



