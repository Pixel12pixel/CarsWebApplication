
namespace Cars.Contracts.Auth;

public record ResetPasswordRequest(string Email, string Token, string Password);