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
            var stock = await _dbContext
                .StockExistents.Join(
                    _dbContext.Residuos,
                    stock => stock.ResiduoId,
                    residuo => residuo.Id,
                    (stock, residuo) =>
                        new
                        {
                            StockId = stock.Id,
                            stock.ResiduoId,
                            stock.Quantidade,
                            ResiduoNome = residuo.Nome, // Adicione outras propriedades conforme necessário
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
    public async Task<ActionResult<StockExistente>> CreateStock(
        [FromBody] StockExistente stockInput
    )
    {
        Console.WriteLine(1);

        if (ModelState.IsValid)
        {
            // Verifica se o resíduo já existe na tabela StockExistents
            var existingStock = await _dbContext.StockExistents.FirstOrDefaultAsync(
                s => s.ResiduoId == stockInput.ResiduoId
            );

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

    public class IdInputModel
    {
        public String? Id { get; set; }
    }

    [HttpPut("edit")]
    public async Task<ActionResult<IEnumerable<IdInputModel>>> EditarStock(
        [FromBody] List<IdInputModel> ids
    )
    {
        try
        {
            // Desativa o rastreamento automático de mudanças (se necessário)
            _dbContext.ChangeTracker.AutoDetectChangesEnabled = false;

            foreach (var idInput in ids)
            {
                // Certifique-se de que o Id é válido
                if (idInput != null && int.TryParse(idInput.Id, out int residuoId))
                {
                    var stockExistente = await _dbContext.StockExistents.FirstOrDefaultAsync(
                        se => se.ResiduoId == residuoId
                    );
                    //var stockExistente = await _dbContext.StockExistents.FindAsync(id);

                    if (stockExistente != null)
                    {
                        // Atualize os campos do estoque existente
                        stockExistente.Quantidade = 0;

                        // Marque como modificado
                        _dbContext.Entry(stockExistente).State = EntityState.Modified;
                    }
                }
            }

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            // Ativa o rastreamento automático de mudanças antes de retornar (se necessário)
            _dbContext.ChangeTracker.AutoDetectChangesEnabled = true;

            return Ok(ids);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao atualizar o estoque no banco de dados.");
        }
    }

    /*     [HttpPut("edit")]
        public async Task<ActionResult<StockExistente>> EditarStock(
            int id,
            [FromBody] StockExistente stockInput
        )
        {
            try
            {
                var stockExistente = await _dbContext.StockExistents.FindAsync(id);
    
                if (stockExistente == null)
                {
                    return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
                }
    
                // Atualizar os campos do cliente existente
                stockExistente.Quantidade = 0;
    
                // Marcar como modificado
                _dbContext.Entry(stockExistente).State = EntityState.Modified;
    
                // Salve as alterações no banco de dados
                await _dbContext.SaveChangesAsync();
    
                return Ok(stockExistente); // Retorna os detalhes do cliente atualizado
            }
            catch (Exception)
            {
                return StatusCode(500, "Erro ao actualizar o stock no banco de dados.");
            }
        } */
}
