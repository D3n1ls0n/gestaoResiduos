using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MailController : ControllerBase
{
    [HttpPost("sendemail")]
    public async Task<IActionResult> ForgotPassword([FromBody] EmailRequest emailRequest)
    {
        try
        {
            // http://localhost:5000/api/mail/sendemail --------- ROTA
            // Configurações do cliente SMTP para o Outlook
            using (var client = new SmtpClient("smtp-mail.outlook.com"))
            {
                client.Port = 587;
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;

                // Autenticação
                client.Credentials = new NetworkCredential(
                    "limpo.horizonte_@outlook.com",
                    "105Denis"
                );

                /* client.Credentials = new NetworkCredential(
                    "denilson47joao@outlook.com",
                    "105Denis"
                ); */

                // Criar e-mail
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("limpo.horizonte_@outlook.com"),
                    Subject = "Assunto do E-mail",
                    Body = "Conteudo do E-mail",
                    IsBodyHtml = true
                };

                // Adicionar destinatário
                mailMessage.To.Add(emailRequest.Email);

                //mailMessage.To.Add("denilson105joao@gmail.com");


                // Enviar e-mail
                await client.SendMailAsync(mailMessage); 

                // Aguardar 5 segundos antes de enviar o próximo e-mail
                await Task.Delay(TimeSpan.FromSeconds(4));

                Console.WriteLine(emailRequest.Email);
                return Ok(new { Message = "E-mail enviado com sucesso." });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = $"Erro ao enviar e-mail: {ex.Message}" });
        }
    }
}

public class EmailRequest
{
    public string Email { get; set; }

    public EmailRequest()
    {
        Email = string.Empty; // ou outro valor padrão
    }
}



/* using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class MailController : ControllerBase
{
   [HttpGet]
   public IActionResult Get()
   {
       return Ok(new { Message = "AAAAAAAAAAAAAAAA!" });
   }
   
} */
