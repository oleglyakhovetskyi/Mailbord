using System.ComponentModel.DataAnnotations;

namespace Mailbord.Data.RepoModels
{
    public class Message
    {
        [Required]
        public string Subject { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string MessageBody { get; set; }
    }
}