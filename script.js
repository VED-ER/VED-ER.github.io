const quantity = document.querySelector("#quantity")
const cartBtn = document.querySelector(".cart-btn")
const cart = document.querySelector(".cart")
const cartBottom = document.querySelector(".cart-bottom")
const minusBtn = document.querySelector(".minus")
const plusBtn = document.querySelector(".plus")
const addToCartBtn = document.querySelector(".add-to-cart-btn")
const cartItemTemplate = document.querySelector("#cart-item-template")
const cartQuantityIndicator = document.querySelector(".cart-btn-indicator")
const mainImg = document.querySelector(".main-img")
const thumbImages = [...document.querySelectorAll(".thumb-img")]
const modalThumbImages = [...document.querySelectorAll(".modal-thumb-img")]
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const prevModalBtn = document.querySelector(".prev-modal")
const nextModalBtn = document.querySelector(".next-modal")
const mainModalImg = document.querySelector(".modal-main-img")
const modal = document.querySelector(".img-modal")
const modalCloseBtn = document.querySelector(".modal-close-btn")
const KEY_PREFIX = "ECOM_PROD_MAIN_FIRST"
const key = `${KEY_PREFIX}-key`
quantity.value = 1
let activeId = 1
let activeModalId = 1
let quan = parseInt(sessionStorage.getItem(key)) || 0

mainImg.addEventListener("click", () => {
	if (window.innerWidth > 768) {
		modal.classList.toggle("d-none")
	}
})

modalCloseBtn.addEventListener("click", () => {
	modal.classList.toggle("d-none")
})

cartBtn.addEventListener("click", () => {
	cart.classList.toggle("show")
})

minusBtn.addEventListener("click", () => {
	if (quantity.value > 1) {
		quantity.value--
	}
})

plusBtn.addEventListener("click", () => {
	quantity.value++
})

addToCartBtn.addEventListener("click", () => {
	quan = quan + parseInt(quantity.value)
	renderCart(quan)
})

nextBtn.addEventListener("click", () => {
	activeId++
	if (activeId === 5) {
		activeId = 1
	}
	mainImg.src = `images/image-product-${activeId}.jpg`
})

prevBtn.addEventListener("click", () => {
	activeId--
	if (activeId === 0) {
		activeId = 4
	}
	mainImg.src = `images/image-product-${activeId}.jpg`
})

nextModalBtn.addEventListener("click", () => {
	activeModalId++
	if (activeModalId === 5) {
		activeModalId = 1
	}
	mainModalImg.src = `images/image-product-${activeModalId}.jpg`
	setModalImgOverlay()
})

prevModalBtn.addEventListener("click", () => {
	activeModalId--
	if (activeModalId === 0) {
		activeModalId = 4
	}
	mainModalImg.src = `images/image-product-${activeModalId}.jpg`
	setModalImgOverlay()
})

function setModalImgOverlay() {
	modalThumbImages.forEach((img) => {
		img.classList.remove("active-modal-thumb")
	})
	modalThumbImages
		.find((img) => parseInt(img.dataset.modalImg) === activeModalId)
		.classList.add("active-modal-thumb")
}

document.addEventListener("click", (e) => {
	if (e.target.matches(".delete-btn")) {
		cartQuantityIndicator.innerHTML = 0
		cartBottom.innerHTML = ""
		cartBottom.innerHTML = `<div class="lead text-center empty-cart"  >Your cart is empty.</div>`
		sessionStorage.clear()
		quan = 0
	}
	if (e.target.matches(".thumb-img")) {
		const id = e.target.dataset.imgId
		thumbImages.forEach((img) => {
			img.classList.remove("active-thumb")
		})
		e.target.classList.add("active-thumb")
		mainImg.src = `images/image-product-${id}.jpg`
	}
	if (e.target.matches(".modal-thumb-img")) {
		modalThumbImages.forEach((img) => {
			img.classList.remove("active-modal-thumb")
		})
		e.target.classList.add("active-modal-thumb")
		activeModalId = parseInt(e.target.dataset.modalImg)
		mainModalImg.src = `images/image-product-${activeModalId}.jpg`
	}
})

function renderCart(quantity) {
	cartBottom.innerHTML = ""
	const cartItem = cartItemTemplate.content.cloneNode(true)
	cartItem.querySelector(".cart-quantity").innerText = quantity

	cartItem.querySelector(".total-price").innerText = `$${quantity * 125}.00`

	cartQuantityIndicator.innerText = quantity

	quantity.value = 1
	cartBottom.appendChild(cartItem)
	cart.classList.add("show")
	sessionStorage.setItem(key, quan)
}

function loadCart() {
	if (sessionStorage.getItem(key)) {
		renderCart(sessionStorage.getItem(key))
	}
}

loadCart()
