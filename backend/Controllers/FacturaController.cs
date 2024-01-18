using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class FacturaController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public FacturaController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    /* [HttpPost("gerarFaturas")]
    public async Task<ActionResult<Fatura>> CreateFat([FromBody] Fatura faturaInput)
    {
        Console.WriteLine(1);

        if (ModelState.IsValid)
        {
            // Crie uma instância do modelo Cliente com os dados recebidos
            var novaFatura = new Fatura
            {
                ResiduoId = faturaInput.ResiduoId,
                EmpresaId = faturaInput.EmpresaId,
            };

            _dbContext.Entry(novaFatura).State = EntityState.Modified;

            // Adicione o novo cliente ao contexto e salve as alterações no banco de dados
            _dbContext.Faturas.Add(novaFatura);
            await _dbContext.SaveChangesAsync();

            return Ok(novaFatura);
        }
        return BadRequest(ModelState);
    } */



    public class FaturaInputModel
    {
        public int ResiduoId { get; set; }
        public int EmpresaId { get; set; }
    }

    [HttpPost("gerarFaturas__")]
    public async Task<ActionResult<IEnumerable<Fatura>>> CreateFaturas(
        [FromBody] List<FaturaInputModel> faturaInputs
    )
    {
        // Desativa o rastreamento automático de mudanças
        _dbContext.ChangeTracker.AutoDetectChangesEnabled = false;

        if (ModelState.IsValid)
        {
            var novasFaturas = new List<Fatura>();

            foreach (var faturaInput in faturaInputs)
            {
                var novaFatura = new Fatura
                {
                    ResiduoId = faturaInput.ResiduoId,
                    EmpresaId = faturaInput.EmpresaId,
                };

                // Anexa a nova fatura ao contexto
                _dbContext.Faturas.Attach(novaFatura);

                novasFaturas.Add(novaFatura);
            }

            await _dbContext.SaveChangesAsync();

            return Ok(novasFaturas);
        }

        // Ativa o rastreamento automático de mudanças antes de retornar
        _dbContext.ChangeTracker.AutoDetectChangesEnabled = true;

        return BadRequest(ModelState);
    }
}
