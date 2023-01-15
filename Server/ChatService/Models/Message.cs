using System.ComponentModel.DataAnnotations;

namespace ChatService.Models;
public class Message
{
    [Required]
    public string Body { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    public DateTime Sent { get; set; }
}