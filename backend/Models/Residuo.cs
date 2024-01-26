public class Residuo
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public int TipoResiduoId { get; set; }
    public bool IsDeleted { get; set; }
    public int ClienteId { get; set; }
    public bool IsActive { get; set; }
    public DateTime? created_at { get; set; }
    public DateTime? updated_at { get; set; }

    // Relacionamentos
    public Cliente Cliente { get; set; }
    public TipoResiduo TipoResiduo { get; set; }

    public Residuo()
    {
        Cliente = new Cliente();
        TipoResiduo = new TipoResiduo();
    }
}
