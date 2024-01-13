using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private static List<Product> _products = new List<Product>
    {
        new Product { Id = 1, Name = "Product A", Price = 19.99m },
        new Product { Id = 2, Name = "Product B", Price = 29.99m }
    };

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_products);
    }


//Pesquisa o produto por ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Product product)
    {
        product.Id = _products.Count + 1;
        _products.Add(product);

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }
}
