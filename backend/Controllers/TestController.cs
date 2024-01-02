using Microsoft.AspNetCore.Mvc;
using System;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { Message = "Esta é uma API de teste!" });
    }

    [HttpPost]
    public IActionResult Post([FromBody] string value)
    {
        // Simplesmente retorna o valor recebido no corpo da requisição
        return Ok(new { ReceivedValue = value });
    }

    [HttpGet("currentDateTime")]
    public IActionResult GetCurrentDateTime()
    {
        return Ok(new { CurrentDateTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") });
    }
}
