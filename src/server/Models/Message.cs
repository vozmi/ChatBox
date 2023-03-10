using System.ComponentModel.DataAnnotations;

namespace ChatBox.Server.Models;
public class Message
{
    [Required]
    public string Body { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    public DateTime Sent { get; set; }
}