using Microsoft.AspNetCore.Mvc;
using System;

[ApiController]
[Route("api/[controller]")]
public class MinhaMensagemController : ControllerBase
{
    [HttpGet]
    public ActionResult<string> Get()
    {
        return "Bem-vindo à Minha API!";
    }
}
