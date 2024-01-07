public class Municipio
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public int ProvinciaId { get; set; }

    // Relacionamento com Provincia
   public Provincia Provincia { get; set; }

       public Municipio()
    {
        Provincia = new Provincia();
    }
}
