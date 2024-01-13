using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BairroController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public BairroController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Bairro>>> GetBairros()
    {
        var bairros = await _dbContext.Bairros.ToListAsync();
        return Ok(bairros);
    }
}
