/// <reference path="Models.ts" />
/// <reference path="Services.ts" />
/// <reference path="Controllers.ts" />

/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />

module CookbookTs {
    export class Routes {

        static $inject = ["$routeProvider"];

        static configureRoutes($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/Home/CookbookTs", { controller: "CookbookTs.Controllers.RecipeController", templateUrl: "/Views/Home/CookbookTs.cshtml", controllerAs: "recipeController" });
            $routeProvider
                .otherwise({ redirectTo: "/Home/CookbookTs" });
        }
    }

    export class Config {
        constructor($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
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
    }
    Config.$inject = ['$routeProvider', '$locationProvider'];

    export class CatagoryHelper {
        static categories = [
            { label: 'Choose a category', value: -1 },
            { label: 'Bread', value: 0 },
            { label: 'Main Course', value: 1 },
            { label: 'Desert', value: 2 },
            { label: 'Side Dish', value: 3 },
            { label: 'Wine', value: 4 },
            { label: 'Misc.', value: 5 }
        ];

        static GetString = function (categoryNumber: number): string {
            return this.categories[categoryNumber+1].label;
        }

        static GetValue = function (categoryName: string): string {
            for (var c of this.categories) {
                if (c.label === categoryName) {
                    return c.value;
                }
            }
        }
    }


    var app = angular.module('CookbookTs', ['ngRoute']);
    app.config(Config);
    app.service("CookbookTs.Services.RecipeService", ["$http", "$q", Services.RecipeService]);
    app.controller("CookbookTs.Controllers.ListController", ["$scope", "CookbookTs.Services.RecipeService", Controllers.ListController]);
    app.controller("CookbookTs.Controllers.AddRecipeController", ["$scope", "$window", "CookbookTs.Services.RecipeService", Controllers.AddRecipeController]);
    app.controller("CookbookTs.Controllers.EditRecipeController", ["$scope", "$routeParams", "$window", "CookbookTs.Services.RecipeService", Controllers.EditRecipeController]);
    app.controller("CookbookTs.Controllers.DeleteRecipeController", ["$scope", "$routeParams", "$window", "CookbookTs.Services.RecipeService", Controllers.DeleteRecipeController]);
    app.controller("CookbookTs.Controllers.PrintRecipeController", ["$scope", "$routeParams", "CookbookTs.Services.RecipeService", Controllers.PrintRecipeController]);

}
