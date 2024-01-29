using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
            var token = GerarToken(loginModel.Username!);
            user!.token = token;
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
public string GerarToken(string username)
{
    var tokenHandler = new JwtSecurityTokenHandler();

    // Gere uma chave com 256 bits
    var key = new byte[32]; // 32 bytes * 8 bits/byte = 256 bits
    using (var rng = RandomNumberGenerator.Create())
    {
        rng.GetBytes(key);
    }

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[] { new Claim("username", username) }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature
        )
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}


    private async Task<User_?> ObterDadosUsuario(string username)
    {
        return await _dbContext.User_.FirstOrDefaultAsync(u => u.username == username);
    }

[HttpPut("edit/{id}")]
public async Task<ActionResult<User_>> EditUser(int id, User_ updatedUser)
{
    try
    {
        // Verifique se o ID fornecido corresponde a um usuário existente
        var existingUser = await _dbContext.User_.FindAsync(id);
        if (existingUser == null)
        {
            return NotFound(new { Message = "Usuário não encontrado." });
        }

        // Atualize as propriedades do usuário existente
        existingUser.username = updatedUser.username;
        // Outras propriedades que você deseja atualizar

        // Se uma nova senha foi fornecida, atualize-a
        if (!string.IsNullOrEmpty(updatedUser.password))
        {
            existingUser.password = HashPassword(updatedUser.password);
        }

        // Atualize a data de modificação
        existingUser.updated_at = DateTime.Now;

        // Salve as mudanças no banco de dados
        await _dbContext.SaveChangesAsync();

        // Retorne o usuário atualizado
        return Ok(existingUser);
    }
    catch (Exception ex)
    {
        // Se ocorrer um erro, retorne um código de status 500 (Erro interno do servidor)
        return StatusCode(500, new { Message = $"Erro ao editar usuário: {ex.Message}" });
    }
}


}
