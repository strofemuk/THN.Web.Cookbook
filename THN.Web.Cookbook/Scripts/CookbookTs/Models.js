var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CookbookTs;
(function (CookbookTs) {
    var Models;
    (function (Models) {
        var RecipeListItem = (function () {
            function RecipeListItem() {
            }
            return RecipeListItem;
        }());
        Models.RecipeListItem = RecipeListItem;
        var Recipe = (function (_super) {
            __extends(Recipe, _super);
            function Recipe() {
                _super.apply(this, arguments);
            }
            return Recipe;
        }(RecipeListItem));
        Models.Recipe = Recipe;
        var RecipeAndNotes = (function (_super) {
            __extends(RecipeAndNotes, _super);
            function RecipeAndNotes() {
                _super.apply(this, arguments);
            }
            return RecipeAndNotes;
        }(Recipe));
        Models.RecipeAndNotes = RecipeAndNotes;
        var RecipeNote = (function () {
            function RecipeNote() {
            }
            return RecipeNote;
        }());
        Models.RecipeNote = RecipeNote;
    })(Models = CookbookTs.Models || (CookbookTs.Models = {}));
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=Models.js.map