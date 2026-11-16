
using Cars.Application.Abstractions;
using Cars.Contracts.Auth;
using Cars.Domain.Entities;
using Cars.Shared.Common;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;


namespace Cars.Application.Features.Users.RegisterUser;

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, Result<RegisterResponse>>
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<RegisterUserHandler> _logger;
    private readonly IEmailService _emailService; 
    
    public RegisterUserHandler(UserManager<AppUser> userManager, ITokenService tokenService, IConfiguration configuration, ILogger<RegisterUserHandler> logger, IEmailService emailService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _configuration = configuration;
        _logger = logger;
        _emailService = emailService;
    }
    
    public async Task<Result<RegisterResponse>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = new AppUser
            {
                UserName = request.Username,
                Email = request.Email
            };
        
        var result = await _userManager.CreateAsync(user, request.Password);
        
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            return Result<RegisterResponse>.Failure("User registration failed");
        }
        
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        
        var encodedToken = WebEncoders.Base64UrlEncode(System.Text.Encoding.UTF8.GetBytes(token));
        
        var clientBaseUrl = _configuration["Client:BaseUrl"]
            ?? throw new InvalidOperationException("Client base URL is not configured.");
        
        var confirmationUrl = $"{clientBaseUrl}/confirm-email"
         + $"?userId={Uri.EscapeDataString(user.Id)}"
         + $"&token={Uri.EscapeDataString(encodedToken)}";
        
        await _emailService.SendEmailAsync(user.Email, "Confirm your email", $"Please confirm your email by clicking <a href='{confirmationUrl}'>here</a>.");
        
        //_logger.LogWarning("Email confirmation URL: {ConfirmationUrl}", confirmationUrl);
        
        return Result<RegisterResponse>.Success(new RegisterResponse
            {
                
            }
        );
    }
}