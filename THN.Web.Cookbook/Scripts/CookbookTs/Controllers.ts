/// <include "/scripts/typeings/angularjs/angular.d.ts" />
/// <include "/scripts/typeings/jquery/jquery.d.ts" />
/// <include "/scripts/typeings/angularjs/angular-route.d.ts" />

/// <reference path="Models.ts" />
/// <reference path="Services.ts" />

module CookbookTs.Controllers {
    export class ListController {
        private $scope: Models.RecipeListScope;
        private service: Services.RecipeService;

        constructor($scope: Models.RecipeListScope, service: Services.RecipeService) {
            var self = this;

            self.$scope = $scope;
            self.service = service;

            self.init();
        }

        private init(): void {
            var self = this;
            this.service.readRecipes()
                .then(function (data) {
                    self.$scope.recipes = data;
                    if (self.$scope.recipes) {
                        for (var item of self.$scope.recipes) {
                            //item.catString = self.$scope.categories[item.category + 1].label;
                        };
                    };
                });
        };



    }
}
