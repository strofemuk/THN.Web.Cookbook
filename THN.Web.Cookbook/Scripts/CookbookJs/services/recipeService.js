app.factory('recipeService', function ($http) {
    return {
        createRecipe: function (recipe) {
            return $http.post('/api/Recipes/', recipe);
        },
        getRecipes: function ()  {
            return $http.get('/api/Recipes/');
        },
        getRecipe: function(id) {
            return $http.get('/api/Recipes/' + id)
        },
        updateRecipe: function (recipe) {
            return $http.put('/api/Recipes/' + recipe.recipeId, recipe);
        },
        deleteRecipe: function (condemnedId) {
            return $http.delete('/api/Recipes/' + condemnedId);
        },
        addNote: function (note) {
            return $http.post('/api/RecipeNotes/',note);
        },
        getNotes: function (id) {
            return $http.get('/api/RecipeNotes/' + id);
        }
    }
});