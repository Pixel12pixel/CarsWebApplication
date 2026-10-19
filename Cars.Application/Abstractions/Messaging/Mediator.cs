
using Microsoft.Extensions.DependencyInjection;

namespace Cars.Application.Abstractions.Messaging;

public sealed class Mediator : IMediator
{
    private readonly IServiceProvider _serviceProvider;

    public Mediator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task<TResponse> Send<TResponse>(
        IRequest<TResponse> request,
        CancellationToken cancellationToken = default)
    {
        var requestType = request.GetType();

        var handlerType = typeof(IRequestHandler<,>)
            .MakeGenericType(requestType, typeof(TResponse));

        var handler = _serviceProvider
            .GetRequiredService(handlerType);

        var handleMethod = handlerType.GetMethod(
            nameof(IRequestHandler<IRequest<TResponse>, TResponse>.Handle))!;

        var task = (Task<TResponse>)handleMethod.Invoke(
            handler,
            new object[] { request, cancellationToken })!;

        return await task;
    }
}