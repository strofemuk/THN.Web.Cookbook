/// <include "/scripts/typeings/angularjs/angular.d.ts" />
/// <include "/scripts/typeings/jquery/jquery.d.ts" />
/// <include "/scripts/typeings/angularjs/angular-route.d.ts" />

/// <reference path="Models.ts" />
/// <reference path="Services.ts" />

module CookbookTs.Controllers {
    export class ListController {
        private $scope: Models.IRecipeListScope;
        private service: Services.RecipeService;

        constructor($scope: Models.IRecipeListScope, service: Services.RecipeService) {
            var self = this;

            self.$scope = $scope;
            self.service = service;

            self.init();
        }

        private init(): void {

            //fill the list
            var self = this;
            this.service.readRecipes()
                .then(function (data) {
                    self.$scope.theRecipeList = data;
                }, function (error) {
                    self.$scope.error = error;
                });

            //set the initial sort type and sort direction 
            self.$scope.sortColumn = 'title';
            self.$scope.sortAsc = false;
        };



    }

    export class AddRecipeController {
        private $scope: Models.IAddRecipeScope;
        private service: Services.RecipeService;
        private $window: ng.IWindowService;

        constructor($scope: Models.IAddRecipeScope, $window: ng.IWindowService, service: Services.RecipeService) {
            var self = this;

            self.$scope = $scope;
            self.service = service;
            self.$window = $window;

            self.$scope.saveRecipe = function () {
                self.service.createRecipe(self.$scope.recipe)
                    .then(function (data) {
                        self.$window.location.href = "/Home/CookbookTs";
                    }, function (error) {
                        self.$scope.error = error;
                    });
            }

            self.init();
        }

        private init(): void {
            var self = this;

            self.$scope.categories = CookbookTs.CatagoryHelper.categories;
            self.$scope.recipe = {
                recipeId: 0,
                rowVersion: '',
                title: '',
                source: '',
                instructions: '',
                category: -1,
                categoryText: ''
            };
        }
    }

    export class PrintRecipeController {
        private $scope: Models.IScopeWithRecipeAndNotes;
        private service: Services.RecipeService;
        private $routeParams: Models.IRecipeRouteParams;

        constructor($scope: Models.IScopeWithRecipeAndNotes, $routeParams: Models.IRecipeRouteParams, service: Services.RecipeService) {
            var self = this;

            self.$scope = $scope;
            self.service = service;
            self.$routeParams = $routeParams;

            self.init();
        }

        private init(): void {
            var self = this;
            self.service.readRecipe( self.$routeParams.id )
                .then(function (data) {
                    self.$scope.recipe = data;
                }, function (error) {
                    self.$scope.error = error;
                });

        }
    }

    export class DeleteRecipeController {
        private $scope: Models.IDeleteRecipeScope;
        private service: Services.RecipeService;
        private $routeParams: Models.IRecipeRouteParams;
        private $window: ng.IWindowService;

        constructor($scope: Models.IDeleteRecipeScope, $routeParams: Models.IRecipeRouteParams, $window: ng.IWindowService, service: Services.RecipeService) {
            var self = this;

            self.$scope = $scope;
            self.service = service;
            self.$routeParams = $routeParams;
            self.$window = $window;

            self.$scope.deleteRecipe = function () {
                self.service.deleteRecipe(self.$scope.recipe.recipeId)
                    .then(function (data) {
                        self.$window.location.href = "/Home/CookbookTs";
                    }, function (error) {
                        self.$scope.error = error;
                    });
            }

            self.init();
        }

        private init(): void {
            var self = this;
            self.service.readRecipe(self.$routeParams.id)
                .then(function (data) {
                    self.$scope.recipe = data;
                }, function (error) {
                    self.$scope.error = error;
                });

        }
    }

    export class EditRecipeController {
        private $scope: Models.IEditRecipeScope;
        private service: Services.RecipeService;
        private $routeParams: Models.IRecipeRouteParams;
        private $window: ng.IWindowService;

        constructor($scope: Models.IEditRecipeScope, $routeParams: Models.IRecipeRouteParams, $window: ng.IWindowService, service: Services.RecipeService) {
            var self = this;
            
            self.$scope = $scope;
            self.service = service;
            self.$routeParams = $routeParams;
            self.$window = $window;

            
            self.$scope.updateRecipe = function() {
                self.service.updateRecipe(self.$scope.recipe)
                    .then(function (data) {
                        self.$window.location.href = "/Home/CookbookTs";
                    }, function (error) {
                        self.$scope.error = error;
                    });
            };

            self.$scope.addNote = function() {
                self.service.addNote(self.$scope.newNote)
                    .then(function (data) {
                        self.$window.location.href = "/Home/CookbookTs";
                    }, function (error) {
                        self.$scope.error = error;
                    });
            }

            self.init();
        }

        private init(): void {
            var self = this;
            self.service.readRecipe(self.$routeParams.id)
                .then(function (data) {
                    self.$scope.recipe = data;
                }, function (error) {
                    self.$scope.error = error;
                });

            self.$scope.categories = CookbookTs.CatagoryHelper.categories;
        }        
    }
}
