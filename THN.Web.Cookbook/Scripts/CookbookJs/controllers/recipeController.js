var app = angular.module('recipeModule',['ui.bootstrap']);

app.controller('recipeController', ['$scope', 'recipeService', function ($scope, recipeService) {

    $scope.addMode = false;
    $scope.editMode = false;
    $scope.showNotes = false;
    $scope.printMode = false;
    $scope.searchTitle = '';
    $scope.sortType = 'title'
    $scope.sortAsc = false;
    $scope.recipes = [];
    $scope.dialog = document.getElementById('recipeDialog');
    $scope.error = '';

    $scope.currentRecipe = {
        rowVersion: '',
        recipeId: 0,
        title: '',
        category: -1,
        source: '',
        instructions: '',
        notes: []
    };

    $scope.currentNote = {
        noteType: 0,
        text: '',
        date: new Date().toDateString(),
        recipeFk: 0
    };

    $scope.categories = [
        { label: 'Choose a category', value: -1 },
        { label: 'Bread', value: 0 },
        { label: 'Main Course', value: 1 },
        { label: 'Desert', value: 2 },
        { label: 'Side Dish', value: 3 },
        { label: 'Wine', value: 4 },
        { label: 'Misc.', value: 5 }
    ];
    
    $scope.getRecipeList = function () {
        var promise = recipeService.getRecipes();
        promise.then(
            function (message) {
                $scope.recipes = message.data;
                //fill the catString with category labels. Doing it this way
                //and binding to catString means the search filter will look through
                //categories as well.
                if ($scope.recipes) {
                    for (index = 0; index < $scope.recipes.length; ++index) {
                        $scope.recipes[index].catString = $scope.categories[$scope.recipes[index].category + 1].label;
                    };
                };
            },
            function (error) {
                $scope.error = "There was an error while loading recipes! Error: " + error.message;
            }
        );
    };

    $scope.populateRecipeForm = function (recipeToShow) {
        if (recipeToShow) {
            $scope.readRecipe(recipeToShow.recipeId);
        } else {
            $scope.currentRecipe.recipeId = '';
            $scope.currentRecipe.title = '';
            $scope.currentRecipe.source = '';
            $scope.currentRecipe.category = -1;
            $scope.currentRecipe.instructions = '';
            $scope.currentRecipe.notes = [];

        };
        $('#recipeDialog').modal('show');
    };

    $scope.createRecipe = function () {
        //The post function doesn't need Notes or RecipeId.
        //In fact including RecipeId causes and a null error.
        //So, we translate currentRecipe into a smaller newRecipe.
        var newRecipe = {
            title: $scope.currentRecipe.title,
            category: $scope.currentRecipe.category,
            source: $scope.currentRecipe.source,
            instructions: $scope.currentRecipe.instructions
        };
        var promise = recipeService.createRecipe(newRecipe)
        promise.then(
            function (message) {
                $('#recipeDialog').modal('hide');
                $scope.addMode = false;
                $scope.currentRecipe = {
                    title: '',
                    category: -1,
                    source: '',
                    instructions: ''
                };
                $scope.getRecipeList();
            },
            function (error) {
                $scope.error = "There was an error when saving the recipeddd. Error: " + error.data.message;
                $('#recipeDialog').modal('hide');
            }
        );
    };

    $scope.readRecipe = function(recipeId) {
        var promise = recipeService.getRecipe(recipeId);
        promise.then(
            function (message) {
                $scope.currentRecipe.rowVersion = message.data.rowVersion;
                $scope.currentRecipe.recipeId = message.data.recipeId;
                $scope.currentRecipe.title = message.data.title;
                $scope.currentRecipe.source = message.data.source;
                $scope.currentRecipe.category = message.data.category;
                $scope.currentRecipe.instructions = message.data.instructions;
                $scope.currentRecipe.notes = message.data.notes;
            },
            function (error) {
                $scope.error = "There was an error fetching a recipe.  Error: " + error.message;
            }
        );
    };

    $scope.updateRecipe = function () {
        var promise = recipeService.updateRecipe($scope.currentRecipe);
        promise.then(
            function (message) {
                $('#recipeDialog').modal('hide');
                $scope.editMode = false;
                $scope.currentRecipe = {
                    title: '',
                    category: -1,
                    source: '',
                    instructions: ''
                };
                $scope.getRecipeList();
            },
            function (error) {
                $scope.error = "There was an error when updating the recipe. Error: " + error.data.message;
                $('#recipeDialog').modal('hide');
            }
        );
    };

    $scope.deleteRecipe = function (id) {
        if (window.confirm("Are you sure?")) {
            var promise = recipeService.deleteRecipe(id)
            promise.then(
                function (message) {
                    $scope.getRecipeList();
                },
                function (error) {
                    $scope.error = "There was an error while deleting a recipe! Error: " + error.data.message;
                }
            );
        };
    };

    $scope.addNote = function () {
        $scope.currentNote.recipefk = $scope.currentRecipe.recipeId;
        var promise = recipeService.addNote($scope.currentNote);
        promise.then(
            function (message) {
                $scope.currentNote.date = new Date().toDateString();
                $scope.currentNote.text = '';
                $scope.noteType = 0;
                var promise = recipeService.getRecipe($scope.currentRecipe.recipeId);
                promise.then(
                    function (message) {
                        $scope.currentRecipe.recipeId = message.data.recipeId;
                        $scope.currentRecipe.title = message.data.title;
                        $scope.currentRecipe.source = message.data.source;
                        $scope.currentRecipe.category = message.data.category;
                        $scope.currentRecipe.instructions = message.data.instructions;
                        $scope.currentRecipe.notes = message.data.notes;
                    },
                    function (error) {
                        $scope.error = "There was an error repopulating notes after adding the note. Error: " + error.data.message;
                        $('#recipeDialog').modal('hide');
                    }
                );
            },
            function (error) {
                $scope.error = "There was an error adding the note. Error: " + error.data.message;
                $('#recipeDialog').modal('hide');
            }
        );
    }

    $scope.showAddRecipe = function () {
        $scope.addMode = true;
        $scope.editMode = false;
        $scope.displayRecipe();
    };

    $scope.showEditRecipe = function (recipe) {
        $scope.addMode = false;
        $scope.editMode = true;
        $scope.populateRecipeForm(recipe);
    };

    $scope.showPrintRecipe = function (recipeToPrint) {
        var promise = recipeService.getRecipe(recipeToPrint.recipeId)
        promise.then(
            function (message) {
                $scope.currentRecipe.recipeId = message.data.recipeId;
                $scope.currentRecipe.title = message.data.title;
                $scope.currentRecipe.source = message.data.source;
                $scope.currentRecipe.category = message.data.category;
                $scope.currentRecipe.instructions = message.data.instructions;
                $scope.currentRecipe.notes = message.data.notes;
                $scope.printMode = true;
            },
            function (error) {
                $scope.error = "There was an error fetching a recipe.  Error: " + error.data.message;
            }
        );
    }

    $scope.showDialog = function () {
        return ($scope.editMode || $scope.addMode);
    }

    $scope.getRecipeList();

}]);






