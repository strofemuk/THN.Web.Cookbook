using System.ComponentModel.DataAnnotations;

public enum CategoryEnum
{
    Bread,
    [Display(Name = "Main Course")]
    Main_Course,
    Desert,
    [Display(Name = "Side Dish")]
    Side_Dish,
    Wine,
    Misc
}