package com.tuapp.demo.service;

import com.tuapp.demo.dto.producto.ProductoRequestDTO;
import com.tuapp.demo.dto.producto.ProductoResponseDTO;
import com.tuapp.demo.exception.BadRequestException;
import com.tuapp.demo.exception.ResourceNotFoundException;
import com.tuapp.demo.model.Producto;
import com.tuapp.demo.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    // CREAR
    public ProductoResponseDTO crear(ProductoRequestDTO dto) {

        validar(dto);

        Producto producto = new Producto(
                null,
                dto.getNombre(),
                dto.getPrecio(),
                dto.getStock(),
                dto.getCategoria()
        );

        Producto guardado = repository.guardar(producto);

        return toResponseDTO(guardado);
    }

    // LISTAR
    public List<ProductoResponseDTO> listar() {

        return repository.listar()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    // BUSCAR POR ID
    public ProductoResponseDTO buscarPorId(Long id) {

        Producto producto = repository.buscarPorId(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Producto no encontrado"));

        return toResponseDTO(producto);
    }

    // ACTUALIZAR
    public ProductoResponseDTO actualizar(Long id, ProductoRequestDTO dto) {

        validar(dto);

        if (repository.buscarPorId(id).isEmpty()) {

            throw new ResourceNotFoundException("Producto no encontrado");
        }

        Producto producto = new Producto(
                id,
                dto.getNombre(),
                dto.getPrecio(),
                dto.getStock(),
                dto.getCategoria()
        );

        Producto actualizado = repository.actualizar(id, producto);

        return toResponseDTO(actualizado);
    }

    // ELIMINAR
    public void eliminar(Long id) {

        if (repository.buscarPorId(id).isEmpty()) {

            throw new ResourceNotFoundException("Producto no encontrado");
        }

        repository.eliminar(id);
    }

    // VALIDACIONES
    private void validar(ProductoRequestDTO dto) {

        if (dto.getNombre() == null || dto.getNombre().isEmpty()) {

            throw new BadRequestException("Nombre no puede estar vacío");
        }

        if (dto.getPrecio() <= 0) {

            throw new BadRequestException("Precio debe ser mayor a 0");
        }

        if (dto.getStock() < 0) {

            throw new BadRequestException("Stock no puede ser negativo");
        }
    }

    // CONVERTIR A RESPONSE DTO
    private ProductoResponseDTO toResponseDTO(Producto producto) {

        return new ProductoResponseDTO(
                producto.getId(),
                producto.getNombre(),
                producto.getCategoria(),
                producto.getPrecio(),
                producto.getStock()
        );
    }
}