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
    /*  [HttpGet("lista")]
     public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
     {
         try
         {
             var clientes = await _dbContext.Clientes.ToListAsync();
             return Ok(clientes);
         }
         catch (Exception)
         {
             // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
             return StatusCode(500, "Erro ao recuperar clientes do banco de dados.");
         }
     }
  */


    /* Get Cliente */
   /*  [HttpGet("lista")]
    public async Task<ActionResult<IEnumerable<object>>> GetClientes()
    {
        try
        {
            var clientes = await _dbContext
                .Clientes.Where(c => !c.IsDeleted)
                .OrderByDescending(c => c.Id)
                .Join(
                    _dbContext.Bairros,
                    cliente => cliente.BairroId,
                    bairro => bairro.Id,
                    (cliente, bairro) =>
                        new
                        {
                            cliente.Id,
                            cliente.Nome,
                            cliente.Sobrenome,
                            cliente.BairroId,
                            cliente.Telefone,
                            cliente.Contribuinte,
                            cliente.created_at,
                            cliente.updated_at,
                            cliente.Email,
                            cliente.IsActive,
                            cliente.IsDeleted,
                            BairroNome = bairro.Nome,
                            // Adicione outras propriedades conforme necessário
                        }
                )
                .ToListAsync();

            return Ok(clientes);
        }
        catch (Exception)
        {
            // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
            return StatusCode(500, "Erro ao recuperar clientes do banco de dados.");
        }
    } */



[HttpGet("lista")]
public async Task<ActionResult<IEnumerable<object>>> GetClientesComUsuarios()
{
    try
    {
        var clientesComUsuarios = await _dbContext
            .Clientes
            .Where(c => !c.IsDeleted)
            .OrderByDescending(c => c.Id)
            .Join(
                _dbContext.Bairros,
                cliente => cliente.BairroId,
                bairro => bairro.Id,
                (cliente, bairro) =>
                    new
                    {
                        cliente.Id,
                        cliente.Nome,
                        cliente.Sobrenome,
                        cliente.BairroId,
                        cliente.Telefone,
                        cliente.Contribuinte,
                        cliente.created_at,
                        cliente.updated_at,
                        cliente.Email,
                        cliente.IsActive,
                        cliente.IsDeleted,
                        BairroNome = bairro.Nome,
                        // Adicione outras propriedades conforme necessário
                    }
            )
            .GroupJoin(
                _dbContext.User_,
                cliente => cliente.Id,
                user => user.cliente_id,
                (cliente, usuarios) =>
                    new
                    {
                        cliente.Id,
                        cliente.Nome,
                        cliente.Sobrenome,
                        cliente.BairroId,
                        cliente.Telefone,
                        cliente.Contribuinte,
                        cliente.created_at,
                        cliente.updated_at,
                        cliente.Email,
                        cliente.IsActive,
                        cliente.IsDeleted,
                        cliente.BairroNome,
                        Usuarios = usuarios
                            .Where(u => !u.is_delete)
                            .Select(u =>
                                new
                                {
                                    u.id,
                                    u.username,
                                    // Adicione outras propriedades do usuário conforme necessário
                                }
                            )
                            .ToList(),
                        // Adicione outras propriedades conforme necessário
                    }
            )
            .ToListAsync();

        return Ok(clientesComUsuarios);
    }
    catch (Exception)
    {
        // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
        return StatusCode(500, "Erro ao recuperar clientes com usuários do banco de dados.");
    }
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
                Email = clienteInput.Email,
                created_at = DateTime.Now,
                updated_at = DateTime.Now,
            };

            _dbContext.Entry(novoCliente).State = EntityState.Modified;

            // Adicione o novo cliente ao contexto e salve as alterações no banco de dados
            _dbContext.Clientes.Add(novoCliente);
            await _dbContext.SaveChangesAsync();

            return Ok(novoCliente);

            // Retorna o cliente recém-criado
            //    return CreatedAtAction(nameof(GetClientes), new { id = novoCliente.Id }, novoCliente);
        }
        return BadRequest(ModelState);
    }

    /* Método para actualizar o cliente ---- rota http://localhost:5000/api/cliente/18 */
    [HttpPut("{id}")]
    public async Task<ActionResult<Cliente>> EditarCliente(int id, [FromBody] Cliente clienteInput)
    {
        try
        {
            var clienteExistente = await _dbContext.Clientes.FindAsync(id);

            if (clienteExistente == null)
            {
                return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
            }

            // Atualizar os campos do cliente existente
            clienteExistente.Nome = clienteInput.Nome;
            clienteExistente.BairroId = clienteInput.BairroId;
            clienteExistente.Sobrenome = clienteInput.Sobrenome;
            clienteExistente.Telefone = clienteInput.Telefone;
            clienteExistente.Contribuinte = clienteInput.Contribuinte;
            clienteExistente.Email = clienteInput.Email;
            clienteExistente.updated_at = DateTime.Now;

            // Marcar como modificado
            _dbContext.Entry(clienteExistente).State = EntityState.Modified;

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            return Ok(clienteExistente); // Retorna os detalhes do cliente atualizado
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao editar o cliente no banco de dados.");
        }
    }

    /* Método para actualizar o cliente ---- rota http://localhost:5000/api/cliente/delete/18 */
    [HttpPatch("delete/{id}")]
    public async Task<ActionResult<Cliente>> DeleteCliente(int id)
    {
        try
        {
            var clienteExistente = await _dbContext.Clientes.FindAsync(id);

            if (clienteExistente == null)
            {
                return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
            }

            // Atualizar os campos do cliente existente
            clienteExistente.IsDeleted = true;

            // Marcar como modificado
            _dbContext.Entry(clienteExistente).State = EntityState.Modified;

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            return Ok(clienteExistente); // Retorna os detalhes do cliente atualizado
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao eliminar o cliente no banco de dados.");
        }
    }
}
