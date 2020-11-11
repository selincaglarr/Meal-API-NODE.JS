//postgresql connection
const Pool =require('pg').Pool  // const {Pool} = require('pg') ayni sey
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'MealR',
    password:'*',
    port: 5432,
})

//select meals

const getMeals =(request,response) => {
    pool.query('SELECT * FROM meals ORDER BY id ASC ', (error,result)=> {
        if(error){
            throw error
        }
     
        response.status(200).json(results.rows)
    })
}

// get single row

const getMealById =(request,response) => {
    const id =parseInt(request.params.id)

    pool.query('SELECT * FROM meals WHERE id = $1',[id],(error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//post adding new user

const createMeal =(request,response) => {
    const { meal_name ,directions  ,Cooking_time ,Serves }  = request.body

    pool.query('INSERT INTO meals (meal_name ,directions  ,Cooking_time ,Serves   ) VALUES ($1 ,$2 ,$3 ,$4)',[meal_name ,directions  ,Cooking_time ,Serves   ],(error,results) => {
        if(error){
            throw error
        }
        response.status(201).send(`Meal added with ID: ${result.insertId}`)
    })


}

//put updated data in exiting meal

const updateMeal =(request,response) => {
    const id= parseInt(request.params.id)
    const { meal_name ,directions  ,Cooking_time ,Serves  } =request.body

    pool.query(
        'UPDATE meals SET meal_name = $1 ,directions =$2 ,Cooking_time =$3 ,Serves=$4   WHERE id = $5 ',
        [ meal_name ,directions  ,Cooking_time ,Serves  ,id ],
        (error,results) => {
            if(error) {
                throw error 
        }
        response.status(200).send(`Meal modified with ID: ${id}`)
        }  
    )

}


const deleteMeal = (request,response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM meals WHERE id =$1',[id] ,(error ,results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Meal deleted with ID: ${id}`)

    })
}

//to access these functions from index.js we ll need to export them
module.exports = {
    getMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
  }
