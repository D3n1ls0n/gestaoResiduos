public class Bairro
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public int MunicipioId { get; set; }

    // Relacionamento com Municipio
   public Municipio Municipio { get; set; }
   public Bairro()
    {
        Municipio = new Municipio();
    }
}
