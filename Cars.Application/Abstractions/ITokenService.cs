
using Cars.Domain.Entities;

namespace Cars.Application.Abstractions;

public interface ITokenService
{
    Task<string> CreateTokenAsync(AppUser user);
}