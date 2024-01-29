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
        public int quantidade { get; set; }
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
                    quantidade = faturaInput.quantidade,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
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

    [HttpGet("listarFaturasComInfo")]
    public ActionResult<IEnumerable<object>> ListarFaturasComInfo()
    {
        try
        {
            var faturasComInfo = _dbContext
                .Faturas.Include(f => f.Residuo) // Inclui dados do Resíduo (se houver uma propriedade de navegação chamada Residuo)
                .Include(f => f.Empresa) // Inclui dados da Empresa (se houver uma propriedade de navegação chamada Empresa)
                .Select(
                    f =>
                        new
                        {
                            FaturaId = f.Id,
                            ResiduoNome = f.Residuo != null ? f.Residuo.Nome : string.Empty,
                            EmpresaNome = f.Empresa != null ? f.Empresa.Nome : string.Empty,
                            Quantidade = f.quantidade,
                            EmpresaId = f.EmpresaId,
                            Created_at = f.created_at
                            // Adicione outras propriedades conforme necessário
                        }
                )
                .ToList();

            return Ok(faturasComInfo);
        }
        catch (Exception ex)
        {
            // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
            return StatusCode(
                500,
                new { Message = $"Erro ao recuperar faturas com informações: {ex.Message}" }
            );
        }
    }
}
