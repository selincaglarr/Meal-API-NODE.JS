const express =require ('express')
const bodyParser =require('body-parser')
const app = express()
//to get exported func from queries.js
const db = require('./firstTable')
const dbb = require('./secondTable')
const port = 3001

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)



//return some json
app.get('/',(request,response) => {
    response.json({ info : 'Node.js ,Express ,and Postgres API'})

})

//http request
app.get('./meals', db.getMeals)
app.get('/meals/:id', db.getMealById)
app.post('/meals', db.createMeal)
app.put('/meals/:id', db.updateMeal)
app.delete('/meals/:id', db.deleteMeal)


app.get('./recipes', dbb.getRecipes)
app.get('/recipes/:id', dbb.getRecipeById)
app.post('/recipes', dbb.createRecipe)
app.put('/recipes/:id', dbb.updateRecipe)
app.delete('/recipes/:id', dbb.deleteRecipe)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
