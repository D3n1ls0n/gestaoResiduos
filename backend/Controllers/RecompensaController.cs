using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class RecompensaController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public RecompensaController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("lista")]
    public async Task<ActionResult<IEnumerable<object>>> GetRecompensas()
    {
        try
        {
            var recompensas = await _dbContext
                .Recompensas.OrderByDescending(r => r.Id)
                .Join(
                    _dbContext.TipoRecompensas,
                    recompensa => recompensa.TipoRecompensaId,
                    tipoRecompensa => tipoRecompensa.Id,
                    (recompensa, tipoRecompensa) =>
                        new { recompensas = recompensa, tipo = tipoRecompensa }
                )
                .Join(
                    _dbContext.Clientes,
                    result => result.recompensas.ClienteId,
                    cliente => cliente.Id,
                    (result, cliente) =>
                        new
                        {
                            result.recompensas.Id,
                            result.recompensas.Nome,
                            result.recompensas.Descricao,
                            result.recompensas.TipoRecompensaId,
                            tipoRecompensa = result.tipo.Nome,
                            clienteNome = cliente.Nome,
                            clienteTelefone = cliente.Telefone,
                            clienteSobrenome = cliente.Sobrenome,
                            clienteEmail = cliente.Email,
                        }
                )
                .ToListAsync();

            /*    new
               {
                   recompensa.Id,
                   recompensa.Nome,
                   recompensa.Descricao,
                   recompensa.TipoRecompensaId,
                   recompensa.ClienteId,
                   tipoReconpens = tipoRecompensa.Nome,
                   // Adicione outras propriedades conforme necessário
               }
           )
           .ToListAsync(); */

            return Ok(recompensas);
        }
        catch (Exception)
        {
            // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
            return StatusCode(500, "Erro ao recuperar clientes do banco de dados.");
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<Cliente>> CreateRecompensa([FromBody] Recompensa recompensaInput)
    {
        Console.WriteLine(1);

        if (ModelState.IsValid)
        {
            // Crie uma instância do modelo Cliente com os dados recebidos
            var novaRecompensa = new Recompensa
            {
                TipoRecompensaId = recompensaInput.TipoRecompensaId,
                ClienteId = recompensaInput.ClienteId,
                Nome = recompensaInput.Nome,
                Descricao = recompensaInput.Descricao,
            };

            _dbContext.Entry(novaRecompensa).State = EntityState.Modified;

            // Adicione o novo cliente ao contexto e salve as alterações no banco de dados
            _dbContext.Recompensas.Add(novaRecompensa);
            await _dbContext.SaveChangesAsync();

            return Ok(novaRecompensa);

            // Retorna o cliente recém-criado
            //    return CreatedAtAction(nameof(GetClientes), new { id = novoCliente.Id }, novoCliente);
        }
        return BadRequest(ModelState); 
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Cliente>> EditarCliente(
        int id,
        [FromBody] Recompensa recompensaInput
    )
    {
        try
        {
            var recompensaExistente = await _dbContext.Recompensas.FindAsync(id);

            if (recompensaExistente == null)
            {
                return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
            }

            // Atualizar os campos do cliente existente
            recompensaExistente.TipoRecompensaId = recompensaInput.TipoRecompensaId;
            recompensaExistente.ClienteId = recompensaInput.ClienteId;
            recompensaExistente.Nome = recompensaInput.Nome;
            recompensaExistente.Descricao = recompensaInput.Descricao;

            // Marcar como modificado
            _dbContext.Entry(recompensaExistente).State = EntityState.Modified;

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            return Ok(recompensaExistente); // Retorna os detalhes do cliente atualizado
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao editar o cliente no banco de dados.");
        }
    }
}
