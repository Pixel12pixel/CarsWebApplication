
using Cars.Contracts.Auth;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Users.ConfirmEmail;

public record ConfirmEmailCommand(string UserId, string Token) : IRequest<Result<ConfirmEmailResponse>>;
