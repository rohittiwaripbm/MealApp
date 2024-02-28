
let mealsArray = JSON.parse(localStorage.getItem('myArray'));
let loadingSectionParentElement = document.querySelector('.loader');
let displayDishElement = document.getElementById('wrapperpage')
let mealsdata;
let deleteButtons = [];
let mealDataArray = [];
let arr = [];


let wrapperElement = document.getElementById('wrapperpage');

async function getMeals() {

    openLoader();
    for (let i of mealsArray) {
        i = Number(i);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`);
        mealsdata = await response.json();

        mealDataArray.push(mealsdata);

    }
    displayMeals(mealDataArray);
    closeLoader();
}
function displayMeals(mealData) {

    for(let j of mealData)
    {
    let meal = j.meals
    for (let i of meal) {

        let cardDetails = `
    <div class="cards">
    <div class="imageClass">
        <img src=${i.strMealThumb} alt="">
    </div>
    <div class="textArea">
        <div class="mealName">
            <h2>${i.strMeal}</h2>
        </div>
        <div class="instruction">
            <h3>${i.strInstructions}</h3>
        </div>
    </div>
    <div class="buttonArea">
        <button value=${i.idMeal} class="DeleteButton">Delete</button>
    </div>
</div>  ` ;
        wrapperElement.insertAdjacentHTML('beforeend', cardDetails);
    }
}

    deleteButtons = document.querySelectorAll('.DeleteButton');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            arr = [];
            for(let i of mealsArray)
            {
                if(i==event.target.value)
                {
                    continue;
                }
                arr.push(i);

            }
            event.target.closest('.cards').remove();
            mealsArray = arr;
            localStorage.setItem('myArray', JSON.stringify(mealsArray));
            console.log(arr)
        });
    });

}

getMeals();


function openLoader() {
    displayDishElement.style.opacity = 0.3;
    loadingSectionParentElement.style.visibility = 'visible'

}

function closeLoader() {
    displayDishElement.style.opacity = 1;
    loadingSectionParentElement.style.visibility = 'hidden';
}


