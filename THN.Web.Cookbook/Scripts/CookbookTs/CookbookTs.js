/// <reference path="Models.ts" />
/// <reference path="Services.ts" />
/// <reference path="Controllers.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
var CookbookTs;
(function (CookbookTs) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider
                .when("/Home/CookbookTs", { controller: "CookbookTs.Controllers.RecipeController", templateUrl: "/Views/Home/CookbookTs.cshtml", controllerAs: "recipeController" });
            $routeProvider
                .otherwise({ redirectTo: "/Home/CookbookTs" });
        };
        Routes.$inject = ["$routeProvider"];
        return Routes;
    }());
    CookbookTs.Routes = Routes;
    var Config = (function () {
        function Config($routeProvider, $locationProvider) {
            $routeProvider
                .when("/Home/CookbookTs", { templateUrl: "/Scripts/CookbookTs/views/RecipeList.html", controller: "CookbookTs.Controllers.ListController" })
                .when("/Home/CookbookTs/add", { templateUrl: "/Scripts/CookbookTs/views/AddRecipe.html", controller: "CookbookTs.Controllers.AddRecipeController" })
                .when("/Home/CookbookTs/print/:id", { templateUrl: "/Scripts/CookbookTs/views/PrintRecipe.html", controller: "CookbookTs.Controllers.PrintRecipeController" })
                .when("/Home/CookbookTs/delete/:id", { templateUrl: "/Scripts/CookbookTs/views/ConfirmDelete.html", controller: "CookbookTs.Controllers.DeleteRecipeController" })
                .when("/Home/CookbookTs/edit/:id", { templateUrl: "/Scripts/CookbookTs/views/EditRecipe.html", controller: "CookbookTs.Controllers.EditRecipeController" });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
        return Config;
    }());
    CookbookTs.Config = Config;
    Config.$inject = ['$routeProvider', '$locationProvider'];
    var CatagoryHelper = (function () {
        function CatagoryHelper() {
        }
        CatagoryHelper.categories = [
            { label: 'Choose a category', value: -1 },
            { label: 'Bread', value: 0 },
            { label: 'Main Course', value: 1 },
            { label: 'Desert', value: 2 },
            { label: 'Side Dish', value: 3 },
            { label: 'Wine', value: 4 },
            { label: 'Misc.', value: 5 }
        ];
        CatagoryHelper.GetString = function (categoryNumber) {
            return this.categories[categoryNumber + 1].label;
        };
        CatagoryHelper.GetValue = function (categoryName) {
            for (var _i = 0, _a = this.categories; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.label === categoryName) {
                    return c.value;
                }
            }
        };
        return CatagoryHelper;
    }());
    CookbookTs.CatagoryHelper = CatagoryHelper;
    var app = angular.module('CookbookTs', ['ngRoute']);
    app.config(Config);
    app.service("CookbookTs.Services.RecipeService", ["$http", "$q", CookbookTs.Services.RecipeService]);
    app.controller("CookbookTs.Controllers.ListController", ["$scope", "CookbookTs.Services.RecipeService", CookbookTs.Controllers.ListController]);
    app.controller("CookbookTs.Controllers.AddRecipeController", ["$scope", "$window", "CookbookTs.Services.RecipeService", CookbookTs.Controllers.AddRecipeController]);
    app.controller("CookbookTs.Controllers.EditRecipeController", ["$scope", "$routeParams", "$window", "CookbookTs.Services.RecipeService", CookbookTs.Controllers.EditRecipeController]);
    app.controller("CookbookTs.Controllers.DeleteRecipeController", ["$scope", "$routeParams", "$window", "CookbookTs.Services.RecipeService", CookbookTs.Controllers.DeleteRecipeController]);
    app.controller("CookbookTs.Controllers.PrintRecipeController", ["$scope", "$routeParams", "CookbookTs.Services.RecipeService", CookbookTs.Controllers.PrintRecipeController]);
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=CookbookTs.js.map