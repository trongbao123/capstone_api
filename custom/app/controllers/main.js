
// Random id
function randomId() {
    return Math.floor(Math.random() * 100000);
}

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// === KHAI BÁO BIẾN ===
// Danh sách sản phẩm
let products = [
    {
        id: randomId(),
        name:"Samsung Galaxy M51 ",
        price: "350",
        img: "https://cdn.tgdd.vn/Products/Images/42/217536/samsung-galaxy-m51-trang-new-600x600-600x600.jpg",
        count:1,
    },
    {
        id: randomId(),
        name:"Iphone 11",
        price: "1000",
        img: "https://didongviet.vn/pub/media/catalog/product//i/p/iphone-11-pro-max-256gb-didongviet_23.jpg",
        count:2,
    },
];



// === TRUY CẬP VÀO CÁC THÀNH PHẦN ===
let productsEle = document.querySelector('.products');

let subTotalEl = document.querySelector('.subtotal span');
let vatEl = document.querySelector('.vat span');
let discount = document.querySelector('.discount');
let discountEle = document.querySelector('.discount span');
let totalEle = document.querySelector('.total span');

let btnPromotion = document.querySelector('.promotion button');
let inputPromotion = document.querySelector('#promo-code');

// === MAIN FUNCTION ===
// Render và hiển thị dữ liệu
function renderUI(arr) {
    productsEle.innerHTML = '';

    // Cập nhật số lượng sản phẩm trong cart
    let countEle = document.querySelector('.count');
    countEle.innerText = `${updateTotalItem(arr)} items in the bag`;

    // Cập nhật tổng tiền
    updateTotalMoney(arr);

    if (arr.length == 0) {
        productsEle.insertAdjacentHTML(
            'afterbegin',
            '<li>Không có sản phẩm nào trong giỏ hàng</li>'
        );
        document.querySelector('.option-container').style.display = 'none';
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        productsEle.innerHTML += `
            <li class="row">
                <div class="col left">
                    <div class="thumbnail">
                        <a href="#">
                            <img src="${p.image}" alt="${p.name}">
                        </a>
                    </div>
                    <div class="detail">
                        <div class="name"><a href="#">${p.name}</a></div>
                        <div class="description">
                            ${p.description}
                        </div>
                        <div class="price">${convertMoney(p.price)}</div>
                    </div>
                </div>
                <div class="col right">
                    <div class="quantity">
                        <input 
                            type="number" 
                            class="quantity" 
                            step="1" 
                            value="${p.count}" 
                            onchange="changeTotalProduct(${p.id}, event)"
                        >
                    </div>
                    <div class="remove">
                        <span class="close" onclick="removeItem(${p.id})">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </li>
        `;
    }
}

// Cập nhật số lượng sản phẩm
function updateTotalItem(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        total += p.count;
    }
    return total;
}

// Remove item trong cart
function removeItem(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products.splice(i, 1);
        }
    }
    renderUI(products);
}

// Thay đổi số lượng sản phẩm
function changeTotalProduct(id, e) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].count = Number(e.target.value);
        }
    }
    renderUI(products);
}

// Cập nhật tổng tiền
function updateTotalMoney(arr) {
    // Tính tổng tiền cart
    let totalMoney = 0;


    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        totalMoney += p.count * p.price;
    }

 
    // Cập nhật tiền lên trên giao diện
    subTotalEl.innerText = convertMoney(totalMoney);
    totalEle.innerText = convertMoney(totalMoney);
}



btnPromotion.addEventListener('click', function () {
    updateTotalMoney(products);
});

window.onload = renderUI(products);