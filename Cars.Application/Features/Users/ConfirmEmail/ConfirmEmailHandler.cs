
using System.Text;
using Cars.Contracts.Auth;
using Cars.Domain.Entities;
using Cars.Shared.Common;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Cars.Application.Features.Users.ConfirmEmail;

public class ConfirmEmailHandler : IRequestHandler<ConfirmEmailCommand, Result<ConfirmEmailResponse>>
{
    private readonly UserManager<AppUser> _userManager;
    
    public ConfirmEmailHandler(UserManager<AppUser> userManager) => _userManager = userManager;
    
    
    public async Task<Result<ConfirmEmailResponse>> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.UserId);
        
        if (user == null)
        {
            return Result<ConfirmEmailResponse>.Failure("User not found");
        }

        string decodedToken;

        try
        {
            decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Token));
        }
        catch 
        {
            return Result<ConfirmEmailResponse>.Failure("Invalid token");
        }
        
        var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
        
        if (!result.Succeeded)
        {
            return Result<ConfirmEmailResponse>.Failure("Email confirmation failed");
        }
        
        return Result<ConfirmEmailResponse>.Success(new ConfirmEmailResponse("Email confirmed successfully"));
    }
}