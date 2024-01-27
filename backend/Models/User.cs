public class User_
{
    public int id { get; set; }
    public string? username { get; set; }
    public int cliente_id { get; set; }
    public bool is_delete { get; set; }
    public int empresa_id { get; set; }
    public DateTime created_at { get; set; }
    public DateTime updated_at { get; set; }
    public string? password { get; set; }
    public string? token { get; set; }
    public bool? is_superadmin { get; set; }

    // Relacionamentos
    public Cliente? Cliente { get; set; }
    public Empresa? Empresa { get; set; }
}

/* public class Cliente
{
    public int Id { get; set; }
    // Outras propriedades do Cliente
}

public class Empresa
{
    public int Id { get; set; }
    // Outras propriedades da Empresa
} */
