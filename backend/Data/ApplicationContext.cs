using System.Globalization;
using Microsoft.EntityFrameworkCore;

public class ApplicationContext : DbContext
{
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
{
    Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture;
        Thread.CurrentThread.CurrentUICulture = CultureInfo.InvariantCulture;
}

    public DbSet<Empresa> Empresas { get; set; }
    public DbSet<Residuo> Residuos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Fatura> Faturas { get; set; }
    public DbSet<StockExistente> StockExistents { get; set; }
    public DbSet<TipoResiduo> TipoResiduos { get; set; }
    public DbSet<Recompensa> Recompensas { get; set; }
    public DbSet<TipoRecompensa> TipoRecompensas { get; set; }
    public DbSet<Provincia> Provincias { get; set; }
    public DbSet<Municipio> Municipios { get; set; }
    public DbSet<Bairro> Bairros { get; set; }
    public DbSet<User_> User_ { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer("Server=ITGAOWK115\\SQL_SERVER;Database=GestaoResiduo;User Id=sa;Password=105Denis;TrustServerCertificate=True;");
    }
    
    public void SeedData()
    {
        // Adiciona dados aleatórios para testes
        AddTestData();
    }

    private void AddTestData()
    {
        // Adicione dados aleatórios para cada tabela
        SeedEmpresas();
        SeedTipoResiduos();
        SeedClientes();
        SeedMunicipios();
        SeedBairros();
        SeedProvincias();
        SeedTipoRecompensas();
        SeedRecompensas();
        SeedResiduos();
        SeedStockExistents();
        SeedFaturas();
    }

    private void SeedEmpresas()
    {
        Empresas.Add(new Empresa { Nome = "Elisal", Telefone = "924585658", Email = "elisal@example.com", BairroId = 1, IsActive = true, IsDeleted = false });
        Empresas.Add(new Empresa { Nome = "Vista", Telefone = "922535647", Email = "vista@example.com", BairroId = 2, IsActive = true, IsDeleted = false });
        // Adicione mais empresas conforme necessário
    }

    private void SeedTipoResiduos()
    {
        TipoResiduos.Add(new TipoResiduo { Nome = "Plástico", Descricao = "Reíduos plásticos" });
        TipoResiduos.Add(new TipoResiduo { Nome = "Vidro", Descricao = "Reíduos de vidro" });
        // Adicione mais tipos de resíduos conforme necessário
    }

    private void SeedClientes()
    {
        Clientes.Add(new Cliente { Nome = "Denilson", Sobrenome = "Belarmino", BairroId = 1, Telefone = "923554458", Contribuinte = "123456789", Email = "denilson105joao@gmail.com", IsActive = true, IsDeleted = false });
        Clientes.Add(new Cliente { Nome = "Késsio", Sobrenome = "Simão", BairroId = 2, Telefone = "927654321", Contribuinte = "987654321", Email = "kessio.simao@gmail.com", IsActive = true, IsDeleted = false });
        // Adicione mais clientes conforme necessário
    }

    private void SeedMunicipios()
    {
        Municipios.Add(new Municipio { Nome = "Cazenga", ProvinciaId = 1 });
        Municipios.Add(new Municipio { Nome = "Viana", ProvinciaId = 1 });
        // Adicione mais municípios conforme necessário
    }

    private void SeedBairros()
    {
        Bairros.Add(new Bairro { Nome = "Vila Flor", MunicipioId = 1 });
        Bairros.Add(new Bairro { Nome = "Vila Chinesa", MunicipioId = 2 });
        // Adicione mais bairros conforme necessário
    }

    private void SeedProvincias()
    {
        Provincias.Add(new Provincia { Nome = "Luanda" });
        Provincias.Add(new Provincia { Nome = "Benguela" });
        // Adicione mais províncias conforme necessário
    }

    private void SeedTipoRecompensas()
    {
        TipoRecompensas.Add(new TipoRecompensa { Nome = "Dinheiro", Descricao = "Valores monetários" });
        TipoRecompensas.Add(new TipoRecompensa { Nome = "Artigo", Descricao = "Bens ou produtos" });
        // Adicione mais tipos de recompensas conforme necessário
    }

    private void SeedRecompensas()
    {
        Recompensas.Add(new Recompensa { TipoRecompensaId = 1, ClienteId = 1, Nome = "Dinheiro", Descricao = "Valores monetários" });
        Recompensas.Add(new Recompensa { TipoRecompensaId = 2, ClienteId = 2, Nome = "Artigo", Descricao = "Bens ou produtos" });
        // Adicione mais recompensas conforme necessário
    }

    private void SeedResiduos()
    {
        Residuos.Add(new Residuo { Nome = "Bidãos", TipoResiduoId = 1, IsDeleted = false, ClienteId = 1, IsActive = true });
        Residuos.Add(new Residuo { Nome = "Garrafas", TipoResiduoId = 2, IsDeleted = false, ClienteId = 2, IsActive = true });
        // Adicione mais resíduos conforme necessário
    }

    private void SeedStockExistents()
    {
        StockExistents.Add(new StockExistente { ResiduoId = 1, Quantidade = 100, IsDisponivel = true });
        StockExistents.Add(new StockExistente { ResiduoId = 2, Quantidade = 150, IsDisponivel = true });
        // Adicione mais stocks existentes conforme necessário
    }

    private void SeedFaturas()
    {
        Faturas.Add(new Fatura { ResiduoId = 1, EmpresaId = 1 });
        Faturas.Add(new Fatura { ResiduoId = 2, EmpresaId = 2 });
        // Adicione mais faturas conforme necessário
    }
}
