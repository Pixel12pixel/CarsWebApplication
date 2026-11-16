
using Cars.Application.Abstractions;
using Cars.Application.Features.Users.RegisterUser;
using Cars.Contracts.Auth;
using Cars.Domain.Entities;
using Cars.Shared.Common;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Cars.Application.Features.Users.ForgotPassword;

public class ForgotPasswordHandler : IRequestHandler<ForgotPasswordCommand, Result<ForgotPasswordResponse>>
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IEmailService _emailService;
    private readonly ILogger<RegisterUserHandler> _logger;
    private readonly IConfiguration _configuration;
    
    public ForgotPasswordHandler(UserManager<AppUser> userManager, IEmailService emailService, ILogger<RegisterUserHandler> logger, IConfiguration configuration)
    {
        _userManager = userManager;
        _emailService = emailService;
        _logger = logger;
        _configuration = configuration;
    }
    
    public async Task<Result<ForgotPasswordResponse>> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is not null && user.EmailConfirmed)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            
            var encodedToken = WebEncoders.Base64UrlEncode(System.Text.Encoding.UTF8.GetBytes(token));
            
            var clientBaseUrl = _configuration["Client:BaseUrl"] ?? throw new InvalidOperationException("Client base URL is not configured.");
            
            var resetUrl = $"{clientBaseUrl}/reset-password?email={Uri.EscapeDataString(request.Email)}&token={Uri.EscapeDataString(encodedToken)}";
            
            await _emailService.SendEmailAsync(request.Email, "Password Reset Request", $"Please reset your password by clicking <a href='{resetUrl}'>here</a>.");
            
            //_logger.LogWarning("Password reset requested for email: {Email}. Reset URL: {ResetUrl}", request.Email, resetUrl);
        }
        
        return Result<ForgotPasswordResponse>.Success(new ForgotPasswordResponse("If the email is registered and confirmed, a password reset link has been sent."));
    }
}