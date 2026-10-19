
using Cars.Application.Abstractions.Messaging;
using Cars.Application.Features.Cars.AddCar;
using Cars.Application.Features.Cars.CarDetails;
using Cars.Application.Features.Cars.ListCars;
using Cars.Application.Features.Cars.RemoveCar;
using Cars.Application.Features.Cars.UpdateCar;
using Cars.Contracts.Cars;
using Microsoft.AspNetCore.Mvc;

namespace Cars.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly IMediator _mediator;
    
    public CarsController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetCars()
    {
        var query = new ListCarsQuery();
        var response = await _mediator.Send(query);
        if (response.IsSuccess)
        {
            return Ok(response.Value);
        }
        else
        {
            return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
        }
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCarById([FromRoute] string id)
    {
        try
        {
            var query = new GetCarDetailsQuery(Guid.Parse(id));
            var response = await _mediator.Send(query);
            if (response.IsSuccess)
            {
                return Ok(response.Value);
            }
            else
            {
                return NotFound(response.Error);
            }
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
        
        
    }
    
    [HttpPost]
    public async Task<IActionResult> AddCar([FromBody] AddCarRequest request)
    {
        var addCarCommand = new AddCarCommand(
            request.Brand,
            request.Model,
            request.DoorsNumber,
            request.LuggageCapacity,
            request.EngineCapacity,
            request.FuelType,
            request.ProductionDate,
            request.AverageFuelConsumption
        );
        var response = await _mediator.Send(addCarCommand);
        if (response.IsSuccess)
        {
            return Ok(response.Value);
        }
        else
        {
            return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
        }
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCar([FromRoute] string id, [FromBody] UpdateCarRequest request)
    {
        try
        {
            var updateCarCommand = new UpdateCarCommand(
                Guid.Parse(id),
                request.Brand,
                request.Model,
                request.DoorsNumber,
                request.LuggageCapacity,
                request.EngineCapacity,
                request.FuelType,
                request.ProductionDate,
                request.AverageFuelConsumption
            );
            
            var response = await _mediator.Send(updateCarCommand);
            if (response.IsSuccess)
            {
                return Ok(response.Value);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
            }
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
        
        
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar([FromRoute] string id)
    {
        try
        {
            var deleteCarCommand = new RemoveCarCommand(Guid.Parse(id));
            var response = await _mediator.Send(deleteCarCommand);
            if (response.IsSuccess)
            {
                return Ok(response.Value);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, response.Error);
            }
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
        
        
    }
}