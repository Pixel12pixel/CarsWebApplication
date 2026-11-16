
namespace Cars.Contracts.Auth;

public record LoginResponse(string id, string userName, string email, string token, string[] roles);