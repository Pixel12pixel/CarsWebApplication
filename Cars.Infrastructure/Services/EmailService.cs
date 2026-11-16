
using Cars.Application.Abstractions;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit;

namespace Cars.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;
    
    public EmailService(IOptions<EmailSettings> emailSettings)
    {
        _settings = emailSettings.Value;
    }
    
    public async Task SendEmailAsync(string to, string subject, string htmlBody)
    {
        var message = new MimeMessage();
        message.From.Add(
            new MailboxAddress(
                _settings.FromName, 
                _settings.FromEmail));
        
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;
        
        message.Body = new BodyBuilder
        {
            HtmlBody = htmlBody,
            }.ToMessageBody();
        
        using var client = new SmtpClient();
        
        await client.ConnectAsync(
            _settings.Host,
            _settings.Port,
            SecureSocketOptions.StartTls);
        
        await client.AuthenticateAsync(
            _settings.Username,
            _settings.Password);
        
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}