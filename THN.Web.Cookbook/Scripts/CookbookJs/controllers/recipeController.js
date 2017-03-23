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
        recipeId : 0,
        title: '',
        category: -1,
        source: '',
        instructions: '',
        notes: []
    };

    $scope.currentNote = {
        noteOnly: false,
        doAgain: false,
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
    
    //get all recipes and assign them to $scope.recipes
    $scope.getAll = function () {
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

    //post recipe to web api service 
    
    $scope.displayRecipe = function (recipeToShow) {
        if (recipeToShow) {
            var promise = recipeService.getRecipe(recipeToShow.recipeId);
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
                    $scope.error = "There was an error fetching a recipe.  Error: " + error.message;
                }
            );
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

    $scope.addRecipe = function () {
        $scope.addMode = true;
        $scope.editMode = false;
        $scope.displayRecipe();
    };

    $scope.saveNewRecipe = function () {
        var promise = recipeService.createRecipe($scope.currentRecipe)
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
                $scope.getAll();
            },
            function (error) {
                $scope.error = "There was an error when saving the recipeddd. Error: " + error.data.message;
                $('#recipeDialog').modal('hide');
            }
        );
    };

    $scope.editRecipe = function (recipe) {
        $scope.addMode = false;
        $scope.editMode = true;
        $scope.displayRecipe(recipe);
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
                $scope.getAll();
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
                    $scope.getAll();
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
                $scope.noteOnly = false;
                $scope.doAgain = false;
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

    $scope.printRecipe = function (recipeToPrint) {
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

    $scope.getAll();

}]);






