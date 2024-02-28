let mealName = document.getElementById('mealName');
let mealImage = document.getElementById('images');
let mealInstruction = document.getElementById('mealInstruction');
let displayDishElement = document.getElementById('wrapperPage');
let loadingSectionParentElement = document.querySelector('.loader');

async function getMeal() {
    const urlParams = new URLSearchParams(window.location.search);
    let mealId = urlParams.get('mealId');

    openLoader();
    try {
        // Construct the complete URL including protocol and domain name
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let mealData = await response.json();

        // Access the meal details from the mealData object
        mealName.innerHTML = mealData.meals[0].strMeal;
        mealImage.setAttribute("src", mealData.meals[0].strMealThumb )
        // let mealImage = mealData.meals[0].strMealThumb;
        mealInstruction.innerHTML = mealData.meals[0].strInstructions;
        // let mealInstruction = mealData.meals[0].strInstructions;

        console.log(mealName, mealImage, mealInstruction);
        // console.log(mealData)
        
        // You can now use mealName, mealImage, and mealInstruction as needed
        
    } catch (error) {
        console.log("Something went wrong:", error);
    }

    closeLoader();
}

getMeal();

function openLoader() {
    displayDishElement.style.opacity = 0.3;
    loadingSectionParentElement.style.visibility = 'visible'

}

function closeLoader() {
    displayDishElement.style.opacity = 1;
    loadingSectionParentElement.style.visibility = 'hidden';
}