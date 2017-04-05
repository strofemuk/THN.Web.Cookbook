/// <reference path="Models.ts" />
var CookbookTs;
(function (CookbookTs) {
    var Services;
    (function (Services) {
        var RecipeService = (function () {
            function RecipeService($http, $q) {
                this.createRecipe = function (recipe) {
                    var self = this;
                    var deferred = self.q.defer();
                    self.http.post('/api/Recipes/', recipe)
                        .then(function (result) {
                        deferred.resolve();
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred;
                };
                this.readRecipes = function (fetchFromService) {
                    var self = this;
                    if (fetchFromService) {
                        return getRecipesFromService();
                    }
                    else {
                        if (self.recipeListCache !== undefined) {
                            return self.recipeListCache;
                        }
                        else {
                            return getRecipesFromService();
                        }
                    }
                    function getRecipesFromService() {
                        var deferred = self.q.defer();
                        self.http.get('/api/recipes/')
                            .then(function (result) {
                            self.recipeListCache = new Array();
                            for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                                var item = _a[_i];
                                var listItem = {
                                    title: '',
                                    recipeId: 0,
                                    category: -1,
                                    categoryText: ''
                                };
                                listItem.title = item.title;
                                listItem.recipeId = item.recipeId;
                                listItem.category = item.category;
                                listItem.categoryText = CookbookTs.CatagoryHelper.GetString(item.category);
                                self.recipeListCache.push(listItem);
                            }
                            deferred.resolve(self.recipeListCache);
                        }, function (error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }
                };
                this.readRecipe = function (id) {
                    var self = this;
                    var deferred = self.q.defer();
                    self.http.get('/api/Recipes/' + id)
                        .then(function (result) {
                        deferred.resolve(result.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.updateRecipe = function (recipe) {
                    return this.http.put('/api/Recipes/' + recipe.recipeId, recipe);
                };
                this.deleteRecipe = function (condemnedId) {
                    return this.http.delete('/api/Recipes/' + condemnedId);
                };
                this.addNote = function (note) {
                    return this.http.post('/api/RecipeNotes/', note);
                };
                this.getNotes = function (id) {
                    return this.http.get('/api/RecipeNotes/' + id);
                };
                this.http = $http;
                this.q = $q;
            }
            RecipeService.$inject = ["$http"];
            return RecipeService;
        }());
        Services.RecipeService = RecipeService;
    })(Services = CookbookTs.Services || (CookbookTs.Services = {}));
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=Services.js.map