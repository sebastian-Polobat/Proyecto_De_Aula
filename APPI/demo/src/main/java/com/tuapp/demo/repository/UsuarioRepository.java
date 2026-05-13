package com.tuapp.demo.repository;

import com.tuapp.demo.model.Usuario;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UsuarioRepository {

    private Map<Long, Usuario> usuarios = new HashMap<>();
    private Long contadorId = 1L;

    // Guardar
    public Usuario guardar(Usuario usuario) {
        usuario.setId(contadorId++);
        usuarios.put(usuario.getId(), usuario);
        return usuario;
    }

    // Listar todos
    public List<Usuario> listar() {
        return new ArrayList<>(usuarios.values());
    }

    // Buscar por id
    public Optional<Usuario> buscarPorId(Long id) {
        return Optional.ofNullable(usuarios.get(id));
    }

    // Actualizar
    public Usuario actualizar(Long id, Usuario usuario) {
        usuario.setId(id);
        usuarios.put(id, usuario);
        return usuario;
    }

    // Eliminar
    public void eliminar(Long id) {
        usuarios.remove(id);
    }
}