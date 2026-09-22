package com.volei.cadastrovolei.business;

import com.volei.cadastrovolei.infrastructure.entitys.Jogador;
import com.volei.cadastrovolei.infrastructure.repository.JogadorRepository;
import org.springframework.stereotype.Service;


@Service

public class JogadorService {

    private final JogadorRepository repository;

    public JogadorService(JogadorRepository repository) {
        this.repository = repository;
    }

    public void salvarJogador(Jogador jogador) {
        repository.saveAndFlush(jogador);
    }

    public Jogador buscarJogadorPorNome(String nome) {
        return repository.findByNome(nome).orElseThrow(
                () -> new RuntimeException("Nome não encontrado")
        );
    }

    public void deletarJogadorPorNome(String nome){
        repository.deleteByNome(nome);
    }

    public void atualizarJogadorPorId(Integer id, Jogador jogador) {
        Jogador jogadorEntity = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Jogador não encontrado")
        );

        Jogador jogadorAtualizado = Jogador.builder()
                .nome(jogador.getNome() != null ? jogador.getNome() :
                        jogadorEntity.getNome())
                .idade(jogador.getIdade() != null ? jogador.getIdade() :
                        jogadorEntity.getIdade())
                .posicao(jogador.getPosicao() != null ? jogador.getPosicao() :
                        jogadorEntity.getPosicao())
                .time(jogador.getTime() != null ? jogador.getTime() :
                        jogadorEntity.getTime())
                .id(jogadorEntity.getId())
                .build();

        repository.saveAndFlush(jogadorAtualizado);
    }
}
