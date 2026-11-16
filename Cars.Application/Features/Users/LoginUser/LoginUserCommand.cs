
using Cars.Contracts.Auth;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Users.LoginUser;

public record LoginUserCommand(string Email, string Password) : IRequest<Result<LoginResponse>>;