
using Cars.Application.Abstractions;
using Cars.Contracts.Auth;
using Cars.Domain.Entities;
using Cars.Shared.Common;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Cars.Application.Features.Users.LoginUser;

public class LoginUserHandler : IRequestHandler<LoginUserCommand, Result<LoginResponse>>
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    
    public LoginUserHandler(UserManager<AppUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }
    
    public async Task<Result<LoginResponse>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user == null)
        {
            return Result<LoginResponse>.Failure("Invalid email or password");
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

        if (!isPasswordValid)
        {
            return Result<LoginResponse>.Failure("Invalid email or password");
        }

        var token = await _tokenService.CreateTokenAsync(user);

        var roles = await _userManager.GetRolesAsync(user);
        
        return Result<LoginResponse>.Success(new LoginResponse(user.Id, user.UserName!, user.Email, token, roles.ToArray()));
    }
}