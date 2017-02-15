using System.ComponentModel.DataAnnotations;

namespace Mailbord.Data.RepoModels
{
    public class Profile
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public string Password { get; set; }

        public string Image { get; set;}

        [Required]
        public string UserName { get; set; }

    }
}