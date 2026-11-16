
using Cars.Contracts.Auth;
using Cars.Domain.Entities;
using Cars.Shared.Common;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Cars.Application.Features.Users.ResetPassword;

public class ResetPasswordHandler : IRequestHandler<ResetPasswordCommand, Result<ResetPasswordResponse>>
{
    private readonly UserManager<AppUser> _userManager;
    
    public ResetPasswordHandler(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }
    
    public async Task<Result<ResetPasswordResponse>> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user == null)
        {
            return Result<ResetPasswordResponse>.Failure("User not found");
        }
        
        var decodedToken = System.Text.Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Token));
        
        var result = await _userManager.ResetPasswordAsync(user, decodedToken, request.Password);
        
        if (!result.Succeeded)
        {
            return Result<ResetPasswordResponse>.Failure("Failed to reset password");
        }
        
        return Result<ResetPasswordResponse>.Success(new ResetPasswordResponse("Password reset successfully"));
    }
}