using System.ComponentModel.DataAnnotations;

public enum NoteTypeEnum
{
    [Display(Name="Note Only")]
    NoteOnly = 0,
    [Display(Name="Do Again")]
    DoAgain = 1,
    [Display(Name ="NOT Do Again")]
    NotDoAgain = 2
}