
using Cars.Contracts.Auth;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Users.RegisterUser;

public record RegisterUserCommand(string Username, string Email, string Password) : IRequest<Result<RegisterResponse>>;