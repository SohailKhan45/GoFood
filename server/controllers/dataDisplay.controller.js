

const displayFoodData = (req, res) => {
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {  
        console.log('Some error occured', error)
    }
}

module.exports = {
    displayFoodData,
}