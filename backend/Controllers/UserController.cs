using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationContext _dbContext;

    public UserController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("add")]
    public async Task<ActionResult<User_>> CreateUser(User_ newUser)
    {
        try
        {
            // Defina as propriedades de created_at e updated_at
            newUser.created_at = DateTime.Now;
            newUser.updated_at = DateTime.Now;
            _dbContext.Entry(newUser).State = EntityState.Modified;

            // Crie um hash seguro para a senha
            newUser.password = HashPassword(newUser.password);
            // Adicione o novo usuário ao contexto
            _dbContext.User_.Add(newUser);

            // Salve as mudanças no banco de dados
            await _dbContext.SaveChangesAsync();

            // Retorne o novo usuário criado
            return Ok(newUser);
        }
        catch (Exception ex)
        {
            // Se ocorrer um erro, retorne um código de status 500 (Erro interno do servidor)
            return StatusCode(500, new { Message = $"Erro ao criar usuário: {ex.Message}" });
        }
    }

    [NonAction]
    private string? HashPassword(string? password)
    {
        using (var sha256 = SHA256.Create())
        {
            // Converta a senha em bytes
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password!);

            // Calcule o hash
            byte[] hashBytes = sha256.ComputeHash(passwordBytes);

            // Converta o hash de volta para uma string hexadecimal
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginModel loginModel)
    {
        try
        {
            // Autentique o usuário assincronamente
            var isAuthenticated = await AutenticarUsuario(
                loginModel.Username!,
                loginModel.Password!
            );
            Console.WriteLine("Autenticação" + isAuthenticated);

            if (!isAuthenticated)
            {
                // Retorne o status de Não Autorizado se a autenticação falhar
                return Unauthorized();
            }

            var user = await ObterDadosUsuario(loginModel.Username!);

            // Remova a senha dos dados do usuário antes de retornar
            user!.password = null;

            // Gere e retorne um token assincronamente
            var token = await GerarToken(loginModel.Username!);
            return Ok(user);
        }
        catch (Exception ex)
        {
            // Trate exceções
            return StatusCode(500, new { Message = $"Erro durante o login: {ex.Message}" });
        }
    }

    [NonAction]
    public async Task<bool> AutenticarUsuario(string username, string password)
    {
        // Consulte o banco de dados ou qualquer outro local para obter as credenciais
        var usuario = await _dbContext.User_.FirstOrDefaultAsync(u => u.username == username);

        // Verifique se o usuário existe e a senha corresponde
        if (usuario != null && VerificarSenhaHash(password, usuario.password))
        {
            // Credenciais válidas
            return true;
        }

        // Credenciais inválidas
        return false;
    }

    [NonAction]
    private bool VerificarSenhaHash(string? password, string? hashedPassword)
    {
        if (password == null || hashedPassword == null)
        {
            return false; // Senha ou hash nulos não são válidos
        }

        using (var sha256 = SHA256.Create())
        {
            // Converta a senha em bytes
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            // Calcule o hash
            byte[] hashBytes = sha256.ComputeHash(passwordBytes);

            // Converta o hash de volta para uma string hexadecimal
            string hashedInput = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            // Compare o hash gerado com o hash armazenado
            return hashedInput == hashedPassword;
        }
    }

    [NonAction]
    public async Task<string> GerarToken(string username)
    {
        // Lógica de geração de token assíncrona aqui

        // Exemplo simples de lógica assíncrona
        await Task.Delay(500); // Simula uma operação assíncrona

        // Retorne o token gerado
        return "seu_token_gerado";
    }

    private async Task<User_?> ObterDadosUsuario(string username)
    {
        return await _dbContext.User_.FirstOrDefaultAsync(u => u.username == username);
    }
}
