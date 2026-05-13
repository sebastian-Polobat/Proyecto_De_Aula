package com.tuapp.demo.service;

import com.tuapp.demo.dto.usuario.UsuarioRequestDTO;
import com.tuapp.demo.dto.usuario.UsuarioResponseDTO;
import com.tuapp.demo.exception.BadRequestException;
import com.tuapp.demo.exception.ResourceNotFoundException;
import com.tuapp.demo.model.Usuario;
import com.tuapp.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    // Crear usuario
    public UsuarioResponseDTO crear(UsuarioRequestDTO dto) {
        validar(dto);

        Usuario usuario = new Usuario(null, dto.getNombre(), dto.getCorreo(), dto.getEdad());
        Usuario guardado = repository.guardar(usuario);

        return toResponseDTO(guardado);
    }

    // Listar todos
    public List<UsuarioResponseDTO> listar() {
        return repository.listar()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Buscar por id
    public UsuarioResponseDTO buscarPorId(Long id) {
        Usuario usuario = repository.buscarPorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        return toResponseDTO(usuario);
    }

    // Actualizar
    public UsuarioResponseDTO actualizar(Long id, UsuarioRequestDTO dto) {
        validar(dto);

        if (repository.buscarPorId(id).isEmpty()) {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }

        Usuario usuario = new Usuario(id, dto.getNombre(), dto.getCorreo(), dto.getEdad());
        Usuario actualizado = repository.actualizar(id, usuario);

        return toResponseDTO(actualizado);
    }

    // Eliminar
    public void eliminar(Long id) {
        if (repository.buscarPorId(id).isEmpty()) {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }
        repository.eliminar(id);
    }

    // Validaciones
    private void validar(UsuarioRequestDTO dto) {
        if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
            throw new BadRequestException("El nombre no puede estar vacío");
        }
        if (dto.getCorreo() == null || !dto.getCorreo().contains("@")) {
            throw new BadRequestException("Correo inválido");
        }
        if (dto.getEdad() <= 0) {
            throw new BadRequestException("Edad debe ser mayor a 0");
        }
    }

    // Conversión a DTO
    private UsuarioResponseDTO toResponseDTO(Usuario usuario) {
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo(),
                usuario.getEdad()
        );
    }
}