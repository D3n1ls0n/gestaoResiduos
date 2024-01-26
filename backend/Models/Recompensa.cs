public class Recompensa
{
    public int Id { get; set; }
    public int TipoRecompensaId { get; set; }
    public int ClienteId { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public DateTime? created_at { get; set; }
    public DateTime? updated_at { get; set; }

    // Relacionamentos
    public TipoRecompensa TipoRecompensa { get; set; }
    public Cliente Cliente { get; set; }

     public Recompensa()
    {
        TipoRecompensa = new TipoRecompensa();
        Cliente = new Cliente();
    }
}
