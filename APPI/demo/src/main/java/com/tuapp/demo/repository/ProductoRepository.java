package com.tuapp.demo.repository;

import com.tuapp.demo.model.Producto;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ProductoRepository {

    private Map<Long, Producto> productos = new HashMap<>();
    private Long contadorId = 1L;

    // Guardar
    public Producto guardar(Producto producto) {
        producto.setId(contadorId++);
        productos.put(producto.getId(), producto);
        return producto;
    }

    // Listar todos
    public List<Producto> listar() {
        return new ArrayList<>(productos.values());
    }

    // Buscar por id
    public Optional<Producto> buscarPorId(Long id) {
        return Optional.ofNullable(productos.get(id));
    }

    // Actualizar
    public Producto actualizar(Long id, Producto producto) {
        producto.setId(id);
        productos.put(id, producto);
        return producto;
    }

    // Eliminar
    public void eliminar(Long id) {
        productos.remove(id);
    }
}