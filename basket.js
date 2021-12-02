//start if page is loaded
if (document.readyState == "loading")
{
    document.addEventListener('DOMContentLoaded', ready)
} else
{
    ready()
}

function ready()
{
let btnDeleteItem = document.querySelectorAll('.btnDelete')
for(let i=0; i<btnDeleteItem.length; i++)
    {
        let btn= btnDeleteItem[i]
        btn.addEventListener('click', deleteItem)
    }

let quantityInputs = document.querySelectorAll('.cartQuantityInput')
for(let i=0;i<quantityInputs.length; i++)
    {
        let input=quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


let addToCartBtns= document.querySelectorAll('.shopItemBtn')
for(let i=0;i<addToCartBtns.length; i++)
    {
        let button=addToCartBtns[i]
        button.addEventListener('click', addToCartClicked)
    }

document.querySelectorAll('.btn-purchase')[0].addEventListener('click', shoppingEnd)

}

function shoppingEnd()
{
    alert('Thanks for shopping whit us :D')
    let cartItems= document.querySelectorAll('.cartItems')[0]
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCart()
}

function addToCart(title, price, img)
{
let cartRow= document.createElement('div')
cartRow.classList.add('cartRow')
cartRow.innerText = title
let cartItems= document.querySelectorAll('.cartItems')[0]
let cartItemTitles=cartItems.querySelectorAll('.cartItemTitle')
for(let i=0; i<cartItemTitles.length; i++)
{
    if(cartItemTitles[i].innerText == title)
    {
        alert('This item is already in Your cart')
        return
    }

}
let cartRowContent=
`
<div class="cartItem cartColumn">
<img class="cartItemFoto" src="${img}" width="100" height="100">
<span class="cartItemTitle">${title}</span>
</div>
<span class="cartPrice cartColumn">${price}</span>
<div class="cartQuantity cartColumn">
    <input class="cartQuantityInput" type="number" value="1">
    <button class="btn btnDelete" type="button">Remove</button>
    </div>
 `
cartRow.innerHTML = cartRowContent
cartItems.append(cartRow)
cartRow.querySelectorAll('.btnDelete')[0].addEventListener('click', deleteItem)
cartRow.querySelectorAll('.cartQuantityInput')[0].addEventListener('change', quantityChanged)
}


function deleteItem(myEvent)
{
let btnClicked = myEvent.target
btnClicked.parentElement.parentElement.remove()
updateCart()
}

function quantityChanged(myEvent)
{
    let input=myEvent.target

    if(isNaN(input.value) || input.value <=0)
    {
        input.value = 1
    }
    updateCart()
}

function addToCartClicked(myEvent)
{
    let button= myEvent.target
    let itemInShop= button.parentElement.parentElement
    let title= itemInShop.querySelectorAll('.shopItemTitle')[0].innerText
    let price= itemInShop.querySelectorAll('.shopItemPrice')[0].innerText
    let img = itemInShop.querySelectorAll('.shopItemFoto')[0].src
    addToCart(title, price, img)
    updateCart()
}

function updateCart()
{
    let cartItems= document.querySelectorAll('.cartItems')[0]
    let cartRows= cartItems.querySelectorAll('.cartRow')
    let sum= 0
    for(let i=0; i<cartRows.length; i++)
    {
        let cartRow=cartRows[i]
        let elementPrice = cartRow.querySelectorAll('.cartPrice')[0]
        let elemntQuantity= cartRow.querySelectorAll('.cartQuantityInput')[0]

        let price= parseFloat(elementPrice.innerText)
        let quantity=elemntQuantity.value
        sum=sum+(price * quantity)
    }
    sum= Math.round(sum * 100) / 100
    document.querySelectorAll('.cartHowMuch')[0].innerText= sum+' $'
}