using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ResiduoController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public ResiduoController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    //Get Residuos http://localhost:5000/api/residuo/lista
    [HttpGet("tipo/listar")]
    public async Task<ActionResult<IEnumerable<Residuo>>> GetTipoResiduos()
    {
        try
        {
            var residuos = await _dbContext.TipoResiduos.ToListAsync();

            return Ok(residuos);
        }
        catch (Exception)
        {
            // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
            return StatusCode(500, "Erro ao recuperar resíduos do banco de dados.");
        }
    }

    [HttpGet("listar")]
    public async Task<ActionResult<IEnumerable<object>>> GetResiduos()
    {
        try
        {
            var residuos = await _dbContext
                .Residuos.Where(r => !r.IsDeleted)
                .OrderByDescending(r => r.Id)
                .Join(
                    _dbContext.TipoResiduos,
                    residuo => residuo.TipoResiduoId,
                    tipoResiduo => tipoResiduo.Id,
                    (residuo, tipoResiduo) => new { Residuo = residuo, TipoResiduo = tipoResiduo }
                )
                .Join(
                    _dbContext.Clientes,
                    result => result.Residuo.ClienteId,
                    cliente => cliente.Id,
                    (result, cliente) =>
                        new
                        {
                            result.Residuo.Id,
                            result.Residuo.Nome,
                            result.Residuo.ClienteId,
                            result.Residuo,
                            result.Residuo.created_at,
                            result.Residuo.updated_at,
                            result.Residuo.TipoResiduoId,
                            result.Residuo.IsDeleted,
                            TipoResiduoNome = result.TipoResiduo.Nome,
                            ClienteNome = cliente.Nome,
                            ClienteSobrenome = cliente.Sobrenome,
                            ClienteEmail = cliente.Email,
                            // Adicione outras propriedades conforme necessário
                        }
                )
                .ToListAsync();

            return Ok(residuos);
        }
        catch (Exception)
        {
            // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
            return StatusCode(500, "Erro ao recuperar resíduos do banco de dados.");
        }
    }

    //rota: http://localhost:5000/api/register
    [HttpPost("register")]
    public async Task<ActionResult<Residuo>> CreateResiduo([FromBody] Residuo residuoInput)
    {
        Console.WriteLine(1);

        if (ModelState.IsValid)
        {
            // Crie uma instância do modelo Cliente com os dados recebidos
            var novoResiduo = new Residuo
            {
                Nome = residuoInput.Nome,
                TipoResiduoId = residuoInput.TipoResiduoId,
                ClienteId = residuoInput.ClienteId,
                created_at = DateTime.Now,
                updated_at = DateTime.Now,
            };

            _dbContext.Entry(novoResiduo).State = EntityState.Modified;

            // Adicione o novo cliente ao contexto e salve as alterações no banco de dados
            _dbContext.Residuos.Add(novoResiduo);
            await _dbContext.SaveChangesAsync();

            return Ok(novoResiduo);
        }
        return BadRequest(ModelState);
    }

    //rota: http://localhost:5000/api/residuo/1
    [HttpPut("{id}")]
    public async Task<ActionResult<Residuo>> EditarResiduo(int id, [FromBody] Residuo residuoInput)
    {
        try
        {
            var residuoExistente = await _dbContext.Residuos.FindAsync(id);

            if (residuoExistente == null)
            {
                return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
            }

            // Atualizar os campos do cliente existente
            residuoExistente.Nome = residuoInput.Nome;
            residuoExistente.TipoResiduoId = residuoInput.TipoResiduoId;
            residuoExistente.ClienteId = residuoInput.ClienteId;
            residuoExistente.created_at = DateTime.Now;
            residuoExistente.updated_at = DateTime.Now;

            // Marcar como modificado
            _dbContext.Entry(residuoExistente).State = EntityState.Modified;

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            return Ok(residuoExistente); // Retorna os detalhes do cliente atualizado
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao editar o resíduo no banco de dados.");
        }
    }

    [HttpPatch("delete/{id}")]
    public async Task<ActionResult<Cliente>> DeleteResiduo(int id)
    {
        try
        {
            var ResiduoExistente = await _dbContext.Residuos.FindAsync(id);

            if (ResiduoExistente == null)
            {
                return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
            }

            // Atualizar os campos do cliente existente
            ResiduoExistente.IsDeleted = true;

            // Marcar como modificado
            _dbContext.Entry(ResiduoExistente).State = EntityState.Modified;

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            return Ok(ResiduoExistente); // Retorna os detalhes do cliente atualizado
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao eliminar o cliente no banco de dados.");
        }
    }
}
