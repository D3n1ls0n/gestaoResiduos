using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public ClienteController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    /* Get Cliente */
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Bairro>>> GetClientes()
    {
        var clientes = await _dbContext.Clientes.ToListAsync();
        return Ok(clientes);
    }

    [HttpPost("register")]
    public async Task<ActionResult<Cliente>> CreateCliente([FromBody] Cliente clienteInput)
    {
Console.WriteLine(1);

        if (ModelState.IsValid)
        {
            // Crie uma instância do modelo Cliente com os dados recebidos
            var novoCliente = new Cliente
            {
                Nome = clienteInput.Nome,
                BairroId = clienteInput.BairroId,
                Sobrenome = clienteInput.Sobrenome,
                Telefone = clienteInput.Telefone,
                Contribuinte = clienteInput.Contribuinte,
                Email = clienteInput.Email
            };
            
            _dbContext.Entry(novoCliente).State = EntityState.Modified;

            // Adicione o novo cliente ao contexto e salve as alterações no banco de dados
            _dbContext.Clientes.Add(novoCliente);
            await _dbContext.SaveChangesAsync();

            // Retorna o cliente recém-criado
            return CreatedAtAction(nameof(GetClientes), new { id = novoCliente.Id }, novoCliente);
        }
        return BadRequest(ModelState);
    }
}
