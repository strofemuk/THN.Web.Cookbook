/// <include "/scripts/typeings/angularjs/angular.d.ts" />
/// <include "/scripts/typeings/jquery/jquery.d.ts" />
/// <include "/scripts/typeings/angularjs/angular-route.d.ts" />
/// <reference path="Models.ts" />
/// <reference path="Services.ts" />
var CookbookTs;
(function (CookbookTs) {
    var Controllers;
    (function (Controllers) {
        var ListController = (function () {
            function ListController($scope, service) {
                var self = this;
                self.$scope = $scope;
                self.service = service;
                self.init();
            }
            ListController.prototype.init = function () {
                //fill the list
                var self = this;
                this.service.readRecipes()
                    .then(function (data) {
                    self.$scope.theRecipeList = data;
                });
                //set the initial sort type and sort direction 
                self.$scope.sortColumn = 'title';
                self.$scope.sortAsc = false;
            };
            ;
            return ListController;
        }());
        Controllers.ListController = ListController;
        var AddRecipeController = (function () {
            function AddRecipeController($scope, $location, service) {
                var self = this;
                self.$scope = $scope;
                self.service = service;
                self.$location = $location;
                self.$scope.saveRecipe = function () {
                    self.service.createRecipe(self.$scope.recipe)
                        .then(function (data) {
                        self.$location.url("/Home/CookbookTs");
                    });
                };
                self.init();
            }
            AddRecipeController.prototype.init = function () {
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
            };
            return AddRecipeController;
        }());
        Controllers.AddRecipeController = AddRecipeController;
        var PrintRecipeController = (function () {
            function PrintRecipeController($scope, $routeParams, service) {
                var self = this;
                self.$scope = $scope;
                self.service = service;
                self.$routeParams = $routeParams;
                self.init();
            }
            PrintRecipeController.prototype.init = function () {
                var self = this;
                self.service.readRecipe(self.$routeParams.id)
                    .then(function (data) {
                    self.$scope.recipe = data;
                });
            };
            return PrintRecipeController;
        }());
        Controllers.PrintRecipeController = PrintRecipeController;
        var DeleteRecipeController = (function () {
            function DeleteRecipeController($scope, $routeParams, $location, service) {
                var self = this;
                self.$scope = $scope;
                self.service = service;
                self.$routeParams = $routeParams;
                self.$location = $location;
                self.$scope.deleteRecipe = function () {
                    self.service.deleteRecipe(self.$scope.recipe.recipeId)
                        .then(function (data) {
                        self.$location.url("/Home/CookbookTs");
                    });
                };
                self.init();
            }
            DeleteRecipeController.prototype.init = function () {
                var self = this;
                self.service.readRecipe(self.$routeParams.id)
                    .then(function (data) {
                    self.$scope.recipe = data;
                });
            };
            return DeleteRecipeController;
        }());
        Controllers.DeleteRecipeController = DeleteRecipeController;
        var EditRecipeController = (function () {
            function EditRecipeController($scope, $routeParams, $location, service) {
                var self = this;
                self.$scope = $scope;
                self.service = service;
                self.$routeParams = $routeParams;
                self.$location = $location;
                self.$scope.updateRecipe = function () {
                    self.service.updateRecipe(self.$scope.recipe)
                        .then(function (data) {
                        self.$location.url("/Home/CookbookTs");
                    });
                };
                self.$scope.addNote = function () {
                    self.service.addNote(self.$scope.newNote)
                        .then(function (data) {
                        self.$location.url('/Home/CookbookTs');
                    });
                };
                self.init();
            }
            EditRecipeController.prototype.init = function () {
                var self = this;
                self.service.readRecipe(self.$routeParams.id)
                    .then(function (data) {
                    self.$scope.recipe = data;
                });
                self.$scope.categories = CookbookTs.CatagoryHelper.categories;
            };
            return EditRecipeController;
        }());
        Controllers.EditRecipeController = EditRecipeController;
    })(Controllers = CookbookTs.Controllers || (CookbookTs.Controllers = {}));
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=Controllers.js.map