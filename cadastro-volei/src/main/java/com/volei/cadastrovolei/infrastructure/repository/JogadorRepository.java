package com.volei.cadastrovolei.infrastructure.repository;

import com.volei.cadastrovolei.infrastructure.entitys.Jogador;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JogadorRepository extends JpaRepository<Jogador, Integer> {
    Optional<Jogador> findByNome(String nome);

    @Transactional
    void deleteByNome(String nome);
}
