public class Fatura
{
    public int Id { get; set; }
    public int ResiduoId { get; set; }
    public int EmpresaId { get; set; }

    // Relacionamentos
    public Residuo Residuo { get; set; }
    public Empresa Empresa { get; set; }

     public Fatura()
    {
        Residuo = new Residuo();
        Empresa = new Empresa();
    }
}
