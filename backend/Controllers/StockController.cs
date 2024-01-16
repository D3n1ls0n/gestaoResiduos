using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class StockController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public StockController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

/*     [HttpGet("lista")]
    public async Task<ActionResult<IEnumerable<StockExistente>>> GetStock()
    {
        try
        {
            var stock = await _dbContext.StockExistents.ToListAsync();
            return Ok(stock);
        }
        catch (Exception)
        {
            // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
            return StatusCode(500, "Erro ao recuperar stock do banco de dados.");
        }
    } */



    [HttpGet("lista")]
public async Task<ActionResult<IEnumerable<object>>> GetStock()
{
    try
    {
        var stock = await _dbContext.StockExistents
            .Join(
                _dbContext.Residuos,
                stock => stock.ResiduoId,
                residuo => residuo.Id,
                (stock, residuo) => new
                {
                    StockId = stock.Id,
                    stock.ResiduoId,
                    stock.Quantidade,
                    ResiduoNome = residuo.Nome,  // Adicione outras propriedades conforme necessário
                }
            )
            .ToListAsync();

        return Ok(stock);
    }
    catch (Exception)
    {
        // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
        return StatusCode(500, "Erro ao recuperar estoque do banco de dados.");
    }
}


    [HttpPost("register")]
public async Task<ActionResult<StockExistente>> CreateStock([FromBody] StockExistente stockInput)
{
    Console.WriteLine(1);

    if (ModelState.IsValid)
    {
        // Verifica se o resíduo já existe na tabela StockExistents
        var existingStock = await _dbContext.StockExistents
            .FirstOrDefaultAsync(s => s.ResiduoId == stockInput.ResiduoId);

        if (existingStock != null)
        {
            // Se o resíduo já existir, faz o somatório da quantidade
            existingStock.Quantidade += stockInput.Quantidade;
            _dbContext.Entry(existingStock).State = EntityState.Modified;
        }
        else
        {
            // Se o resíduo não existir, cria uma nova entrada na tabela StockExistents
            var novoStock = new StockExistente
            {
                ResiduoId = stockInput.ResiduoId,
                Quantidade = stockInput.Quantidade,
            };

            _dbContext.Entry(novoStock).State = EntityState.Modified;
            _dbContext.StockExistents.Add(novoStock);
        }

        // Salva as alterações no banco de dados
        await _dbContext.SaveChangesAsync();

        return Ok(existingStock ?? stockInput);
    }

    return BadRequest(ModelState);
}

}
