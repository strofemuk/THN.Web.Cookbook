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
                }, function (error) {
                    self.$scope.error = error;
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
            function AddRecipeController($scope, $window, service) {
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
                }, function (error) {
                    self.$scope.error = error;
                });
            };
            return PrintRecipeController;
        }());
        Controllers.PrintRecipeController = PrintRecipeController;
        var DeleteRecipeController = (function () {
            function DeleteRecipeController($scope, $routeParams, $window, service) {
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
                };
                self.init();
            }
            DeleteRecipeController.prototype.init = function () {
                var self = this;
                self.service.readRecipe(self.$routeParams.id)
                    .then(function (data) {
                    self.$scope.recipe = data;
                }, function (error) {
                    self.$scope.error = error;
                });
            };
            return DeleteRecipeController;
        }());
        Controllers.DeleteRecipeController = DeleteRecipeController;
        var EditRecipeController = (function () {
            function EditRecipeController($scope, $routeParams, $window, service) {
                var self = this;
                self.$scope = $scope;
                self.service = service;
                self.$routeParams = $routeParams;
                self.$window = $window;
                self.$scope.updateRecipe = function () {
                    self.service.updateRecipe(self.$scope.recipe)
                        .then(function (data) {
                        self.$window.location.href = "/Home/CookbookTs";
                    }, function (error) {
                        self.$scope.error = error;
                    });
                };
                self.$scope.addNote = function () {
                    self.service.addNote(self.$scope.newNote)
                        .then(function (data) {
                        self.initNewNote();
                        self.$window.location.href = "/Home/CookbookTs";
                    }, function (error) {
                        self.$scope.error = error;
                    });
                };
                self.init();
            }
            EditRecipeController.prototype.init = function () {
                var self = this;
                self.initNewNote();
                self.service.readRecipe(self.$routeParams.id)
                    .then(function (data) {
                    self.$scope.recipe = data;
                    self.$scope.newNote.recipeFk = self.$scope.recipe.recipeId;
                }, function (error) {
                    self.$scope.error = error;
                });
                self.$scope.categories = CookbookTs.CatagoryHelper.categories;
            };
            EditRecipeController.prototype.initNewNote = function () {
                var self = this;
                self.$scope.newNote = {
                    noteType: 0,
                    text: '',
                    date: new Date().toDateString(),
                    recipeFk: 0
                };
            };
            return EditRecipeController;
        }());
        Controllers.EditRecipeController = EditRecipeController;
    })(Controllers = CookbookTs.Controllers || (CookbookTs.Controllers = {}));
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=Controllers.js.map