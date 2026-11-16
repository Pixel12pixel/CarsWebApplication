
namespace Cars.Contracts.Auth;

public record ConfirmEmailRequest(string UserId, string Token);