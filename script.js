const searchBox=document.querySelector('.searchBox')
const searchBtn=document.querySelector('.searchBtn')
const recipeContainer=document.querySelector('.recipe-container')
const recipeDetailContent=document.querySelector('.recipe-detail-content')
const recipeCloseBtn=document.querySelector('.recipe-close-btn')

// function to get recipe
const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>"
    //these try catch is used when user randomly type the word and if it not present we have to show not present
    try{
const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response= await data.json();

recipeContainer.innerHTML="" //we are make the wording given in the main section to empty
response.meals.forEach(meal =>{
    // console.log(meal); in loop all value will print
    //here we are create div with the class name of recipe
    const recipeDiv=document.createElement('div')
    recipeDiv.classList.add('recipe')
    //this strmealthumb is in the array of meals that contain image
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button=document.createElement('button')
    button.textContent="View Recipe"
    recipeDiv.appendChild(button)

    // Adding eventlistener to recipe button
    button.addEventListener('click',()=>{
        openRecipePopup(meal); //we pass meal because it container all info about that meal link
    })
    recipeContainer.appendChild(recipeDiv)
})
    }catch(error){
        recipeContainer.innerHTML="<h2>Error in Fetching Recipes...</h2>"
 
    }
// console.log(response.meals[0]);
}
//for showing popup
//function to fetch ingredients and measurement

const fetchIngredients=(mealss)=>{
    // console.log(meal);
    let ingredientsList="";

    for(let i=1;i<=20;i++){
const ingredient=mealss[`strIngredient${i}`];
// console.log(ingredient);
if(ingredient){
    const measure=mealss[`strMeasure${i}`];
    ingredientsList +=`<li>${measure} ${ingredient}</li>`
}
else{
    break;
}
    }
    return ingredientsList;
}

const openRecipePopup=(meal)=>{
recipeDetailContent.innerHTML=`
<h2 class="recipeName">${meal.strMeal}</h2>
<h3>Ingredients:</h3>
<ul class="ingredientList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
    </div>

`
recipeDetailContent.parentElement.style.display="block"
}
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display="none"
})
searchBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    const searchInput=searchBox.value.trim()
    // if you click search btn it will randomly show 25 recipe to prevent ths we give this
    if(!searchInput){
recipeContainer.innerHTML=`<h2>Type the meal you want to search box.</h2>`
return;
    }
    // console.log("Button Clicked");
    fetchRecipes(searchInput);
})
