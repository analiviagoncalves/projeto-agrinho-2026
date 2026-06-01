package com.agrinho2026.model;

public class Pilar {
    private Long id;
    private String titulo;
    private String descricao;
    private String icone; // Nome do ícone do Lucide (ex: "cpu", "sprout")
    private String categoria; // "tecnologia", "agricultura" ou "sustentabilidade"

    // Construtor Padrão
    public Pilar() {}

    // Construtor Completo
    public Pilar(Long id, String titulo, String descricao, String icone, String categoria) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.icone = icone;
        this.categoria = categoria;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getIcone() { return icone; }
    public void setIcone(String icone) { this.icone = icone; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
}