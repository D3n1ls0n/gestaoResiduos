using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class EmpresaController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public EmpresaController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }



    [HttpGet("lista")]
    public async Task<ActionResult<IEnumerable<object>>> GetEmpresas()
    {
        try
        {
            var empresas = await _dbContext
                .Empresas.Where(c => !c.IsDeleted)
                .OrderByDescending(c => c.Id)
                .Join(
                    _dbContext.Bairros,
                    empresas => empresas.BairroId,
                    bairro => bairro.Id,
                    (empresas, bairro) =>
                        new
                        {
                            empresas.Id,
                            empresas.Nome,
                            empresas.Telefone,
                            empresas.Email,
                            empresas.IsActive,
                            empresas.IsDeleted,
                            empresas.BairroId,
                            BairroNome = bairro.Nome,
                            // Adicione outras propriedades conforme necessário
                        }
                )
                .ToListAsync();

            return Ok(empresas);
        }
        catch (Exception)
        {
            // Logue a exceção, e retorne um StatusCode 500 ou outra resposta apropriada
            return StatusCode(500, "Erro ao recuperar clientes do banco de dados.");
        }
    }



[HttpPost("register")]
    public async Task<ActionResult<Empresa>> CreateEmpresa([FromBody] Empresa empresaInput)
    {
        Console.WriteLine(1);

        if (ModelState.IsValid)
        {
            // Crie uma instância do modelo Cliente com os dados recebidos
            var novaEmpresa = new Empresa
            {
                Nome = empresaInput.Nome,
                Telefone = empresaInput.Telefone,
                Email = empresaInput.Email,
                BairroId = empresaInput.BairroId,
            };

            _dbContext.Entry(novaEmpresa).State = EntityState.Modified;

            // Adicione o novo cliente ao contexto e salve as alterações no banco de dados
            _dbContext.Empresas.Add(novaEmpresa);
            await _dbContext.SaveChangesAsync();

            return Ok(novaEmpresa);

            // Retorna o cliente recém-criado
            //    return CreatedAtAction(nameof(GetClientes), new { id = novoCliente.Id }, novoCliente);
        }
        return BadRequest(ModelState);
    }


 [HttpPut("{id}")]
    public async Task<ActionResult<Empresa>> EditarEmpresa(int id, [FromBody] Empresa empresaInput)
    {
        try
        {
            var empresaExistente = await _dbContext.Empresas.FindAsync(id);

            if (empresaExistente == null)
            {
                return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
            }

            // Atualizar os campos do cliente existente
            empresaExistente.Nome = empresaInput.Nome;
            empresaExistente.BairroId = empresaInput.BairroId;
            empresaExistente.Telefone = empresaInput.Telefone;
            empresaExistente.Email = empresaInput.Email;


            // Marcar como modificado
            _dbContext.Entry(empresaExistente).State = EntityState.Modified;

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            return Ok(empresaExistente); // Retorna os detalhes do cliente atualizado
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao editar o cliente no banco de dados.");
        }
    }

[HttpPatch("delete/{id}")]
    public async Task<ActionResult<Empresa>> DeleteEmpresa(int id)
    {
        try
        {
            var empresaExistente = await _dbContext.Empresas.FindAsync(id);

            if (empresaExistente == null)
            {
                return NotFound(); // Retorna 404 Not Found se o cliente não for encontrado
            }

            // Atualizar os campos do cliente existente
            empresaExistente.IsDeleted = true;
           

            // Marcar como modificado
            _dbContext.Entry(empresaExistente).State = EntityState.Modified;

            // Salve as alterações no banco de dados
            await _dbContext.SaveChangesAsync();

            return Ok(empresaExistente); // Retorna os detalhes do cliente atualizado
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao eliminar o cliente no banco de dados.");
        }
    }



}
