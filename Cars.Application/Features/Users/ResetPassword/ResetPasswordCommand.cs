
using Cars.Contracts.Auth;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Users.ResetPassword;

public record ResetPasswordCommand(string Email, string Token, string Password) : IRequest<Result<ResetPasswordResponse>>;