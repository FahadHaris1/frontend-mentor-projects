
const allExtensions =JSON.parse(localStorage.getItem("cart")) ||[
    {
        "logo": "images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": false
    },
    {
        "logo": "images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
];


const extensionsContainer = document.querySelector(".extensions-container");

const statusBtn = document.querySelectorAll(".status button");
statusBtn.forEach(button =>{
    button.addEventListener("click", ()=>{
        statusBtn.forEach(but =>{
            but.classList.remove("active");
        });
        button.classList.add("active");
    });
});
renderCart(allExtensions);
function renderCart(extensions){
    extensionsContainer.innerHTML="";
    extensions.forEach((extension,index) =>{
        extensionsContainer.innerHTML += `
        <div class="card" data-index="${index}">
            <div class="extension-image-p-container">
                <img src="${extension.logo}" alt="${extension.name}-image">
                <div class="para">
                    <p class="tool-name">
                        ${extension.name}
                    </p>
                    <p class="tool-desc">${extension.description}</p>
                </div>
            </div>
            <div class="extension-butt-container">
                <button class="remove-btn">Remove</button>
                <label class="toggle">
                    <input type="checkbox" ${extension.isActive ? "checked" : ""}>
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        `;
        
    });
    listeners();
}
function listeners(){
    const toggles = document.querySelectorAll(".toggle input");
    toggles.forEach(toggle =>{
        toggle.addEventListener("change",()=>{
            const card = toggle.closest(".card");
            const name = card.querySelector(".tool-name").textContent.trim();
            allExtensions.forEach(extension =>{
                if(extension.name === name){
                    extension.isActive = toggle.checked;
                }
            });

            localStorage.setItem("cart",JSON.stringify(allExtensions));
            
        });
    });
    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach(button =>{
        button.addEventListener("click",()=>{
            const card = button.closest(".card");
            const name = card.querySelector(".tool-name").textContent.trim();
            const index = allExtensions.findIndex(item => {
                return item.name === name;
            });
            allExtensions.splice(index,1);
            localStorage.setItem("cart",JSON.stringify(allExtensions));
            renderCart(allExtensions);

        });
    });
}

const allBtn = document.querySelector(".all-btn");
const activeBtn = document.querySelector(".active-btn");
const inactiveBtn = document.querySelector(".inactive-btn");

activeBtn.addEventListener("click",()=>{
    const activeExtension = allExtensions.filter(item =>{
        return item.isActive;
    });
    renderCart(activeExtension);
});
allBtn.addEventListener("click",()=>{
    const allextension = allExtensions;
    renderCart(allextension);
});
inactiveBtn.addEventListener("click",()=>{
    const inactiveExtension = allExtensions.filter(item =>{
        return item.isActive === false;
    });
    renderCart(inactiveExtension);
});

const modeButton = document.querySelector(".head-sec button");

modeButton.addEventListener("click",()=>{
    const image = document.querySelector(".head-sec button img");
    const logoText = document.getElementById("logo-text");
    if(image.src.includes("moon")){
        image.src = `images/icon-sun.svg`;
        document.body.classList.add("dark-mode");
        logoText.setAttribute("fill", "white");
    }else{
        image.src = "images/icon-moon.svg";
        document.body.classList.remove("dark-mode");
        logoText.setAttribute("fill", "#091540");
    }
});


