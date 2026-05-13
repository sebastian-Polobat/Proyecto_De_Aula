package com.tuapp.demo.controller;

import com.tuapp.demo.dto.producto.ProductoRequestDTO;
import com.tuapp.demo.dto.producto.ProductoResponseDTO;
import com.tuapp.demo.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @PostMapping
    public ProductoResponseDTO crear(@RequestBody ProductoRequestDTO dto) {
        return service.crear(dto);
    }

    @GetMapping
    public List<ProductoResponseDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ProductoResponseDTO obtener(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public ProductoResponseDTO actualizar(@PathVariable Long id,
                                          @RequestBody ProductoRequestDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}