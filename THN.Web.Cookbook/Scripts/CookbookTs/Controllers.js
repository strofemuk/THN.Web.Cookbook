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
                var self = this;
                this.service.readRecipes()
                    .then(function (data) {
                    self.$scope.recipes = data;
                });
            };
            ;
            return ListController;
        }());
        Controllers.ListController = ListController;
    })(Controllers = CookbookTs.Controllers || (CookbookTs.Controllers = {}));
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=Controllers.js.map