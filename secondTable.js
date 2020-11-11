//postgresql connection
const Pool =require('pg').Pool  // const {Pool} = require('pg') ayni sey
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'MealR',
    password:'*'
})

//select meals

const getRecipes =(request,response) => {
    pool.query('SELECT * FROM recipes ORDER BY id ASC ', (error,results)=> {
        if(error){
            throw error
        }
    
        response.status(200).json(results.rows)
    })
}

// get single row

const getRecipeById =(request,response) => {
    const id =parseInt(request.params.id)

    pool.query('SELECT * FROM recipes WHERE id = $1',[id],(error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//post adding new user

const createRecipe =(request,response) => {
    const { meal_id ,quantitiy,unit,ingredient }  = request.body

    pool.query('INSERT INTO recipes (meal_id ,quantitiy,unit,ingredient ) VALUES ($1 ,$2 ,$3 ,$4 )',[meal_id ,quantitiy,unit,ingredient],(error,results) => {
        if(error){
            throw error
        }
        response.status(201).send(`Recipe added with ID: ${result.insertId}`)
    })


}

//put updated data in exiting meal

const updateRecipe =(request,response) => {
    const id= parseInt(request.params.id)
    const { meal_id ,quantitiy,unit,ingredient  } =request.body

    pool.query(
        'UPDATE recipes SET meal_id = $1 , quantitiy = $2 ,unit = $3 ,ingredient = $4  WHERE id = $5 ',
        [ meal_id ,quantitiy, unit ,ingredient ],
        (error,results) => {
            if(error) {
                throw error 
        }
        response.status(200).send(`Recipe modified with ID: ${id}`)
        }  
    )

}


const deleteRecipe = (request,response) => {
    const id=parseInt(request.params.id)
    pool.query('DELETE FROM recipes WHERE id =$1',[id] ,(error ,results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Recipe deleted with ID: ${id}`)

    })
}

//to access these functions from index.js we ll need to export them
module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }


