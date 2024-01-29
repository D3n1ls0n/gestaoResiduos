public class Fatura
{
    public int Id { get; set; }
    public decimal quantidade { get; set; }
    public int ResiduoId { get; set; }
    public int EmpresaId { get; set; }
    public DateTime created_at { get; set; }
    public DateTime updated_at { get; set; }

    // Relacionamentos
    public Residuo? Residuo { get; set; }
    public Empresa? Empresa { get; set; }

     /* public Fatura()
    {
        Residuo = new Residuo();
        Empresa = new Empresa();
    } */
}
