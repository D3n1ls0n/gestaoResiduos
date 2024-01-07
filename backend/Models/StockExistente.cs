public class StockExistente
{
    public int Id { get; set; }
    public int ResiduoId { get; set; }
    public int Quantidade { get; set; }
    public bool IsDisponivel { get; set; }

    // Relacionamento
    public Residuo Residuo { get; set; }

    public StockExistente()
    {
        Residuo = new Residuo();
    }
}
