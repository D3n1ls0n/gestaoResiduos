public class Empresa
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? Telefone { get; set; }
    public string? Email { get; set; }
    public int BairroId { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }

    // Relacionamento com Bairro
    public Bairro Bairro { get; set; }

     public Empresa()
    {
        Bairro = new Bairro();
    }
}
