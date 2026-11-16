
using Cars.Contracts.Auth;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Users.ForgotPassword;

public record ForgotPasswordCommand(string Email) : IRequest<Result<ForgotPasswordResponse>>;