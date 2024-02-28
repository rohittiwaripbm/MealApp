let displayDishElement = document.getElementById('displayDish')
let searchElement = document.getElementById('searchBar');
let loadingSectionParentElement = document.querySelector('.loader');
let favPageButton = document.getElementById('FavPage');
let favButtonElements;

let favMeals = [];
searchElement.addEventListener('input', function () {
    // console.log("run")
    getMeal(searchElement.value);
});


searchElement.addEventListener('change', () => {
    // console.log('run')
    getMeal(searchElement.value)
})
async function getMeal(val) {

    try {
        if (val.length > 0) {
            openLoader();
            console.log(val)
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`);
            let mealData = await response.json();
            DisplayToCard(mealData);
            closeLoader();
        }
        else {
            openLoader();
            console.log(val)
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
            let mealData = await response.json();

            DisplayToCard(mealData);
            closeLoader();

        }

    } catch (error) {
        openLoader();
        console.log(val)
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
        let mealData = await response.json();

        DisplayToCard(mealData);
        closeLoader();
    }
  

}

function DisplayToCard(mealData) {
    let meals = mealData.meals; 
    displayDishElement.innerHTML = '';
    for (let meal of meals) {
        let cardDetails = `
                <div class="card">
        <a href="detail.html?mealId=${meal.idMeal}" class="card-link">
                
                    <div class="dishImage">
                        <img src=${meal.strMealThumb} alt="">
                    </div>
                    </a>
                    <a href="detail.html?mealId=${meal.idMeal}" class="card-link">
                    <h1 class="dishName">${meal.strMeal}</h1>
                    <p class="dishDesciption">${meal.strInstructions}</p>
                    </a>
                    <div class="buttons">
                        
                        <button value=${meal.idMeal} class = "favButton">Add to Favourite</button>
                    </div>
                </div>
                 `
                 ;
        displayDishElement.insertAdjacentHTML('beforeend', cardDetails);
    }
    favButtonElements = document.querySelectorAll('.favButton');

    favButtonElements.forEach(button => {
        button.addEventListener('click', (event) => {
           
            favMeals.push(event.target.value);
            localStorage.setItem('myArray', JSON.stringify(favMeals));
            button.innerHTML="Added to favourite"
            button.style.color = 'red';
            button.disabled = true;
            
        });
    });
}

getMeal('a');


function openLoader() {
    displayDishElement.style.opacity = 0.3;
    loadingSectionParentElement.style.visibility = 'visible'

}

function closeLoader() {
    displayDishElement.style.opacity = 1;
    loadingSectionParentElement.style.visibility = 'hidden';
}

favPageButton.addEventListener('click', ()=>
{
    console.log(favMeals);
    let favMealsJSON = JSON.stringify(favMeals);
    console.log(favMealsJSON);
    // window.location.href = `favourite.html?favMeals=${favMealsJSON}`;
    window.location.href = `favourite.html`;
})