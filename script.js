// ======================================================
// HELPERS
// ======================================================

const $ = id => document.getElementById(id);

const API_URL =
    "http://localhost:8080/productos";

let filaEditando = null;
let filaUsuarioEditando = null;
let filaPedidoEditando = null;

const paginaActual =
    window.location.pathname;


// ======================================================
// LOCAL STORAGE
// ======================================================

function obtenerUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];
}

function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}

function obtenerPedidos() {

    return JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];
}

function guardarPedidos(pedidos) {

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );
}


// ======================================================
// ROLES
// ======================================================

function obtenerRol() {

    return localStorage.getItem("rol");
}

function tieneRol(rol) {

    return obtenerRol() === rol;
}


// ======================================================
// SESION
// ======================================================

function verificarSesion() {

    const sesion =
        localStorage.getItem("sesion");

    if (

        !sesion &&

        !paginaActual.includes("login") &&

        !paginaActual.includes("registro") &&

        !paginaActual.includes("recuperar")
    ) {

        window.location.href =
            "login.html";
    }
}


// ======================================================
// CREAR ADMIN
// ======================================================

function crearAdminInicial() {

    let usuarios =
        obtenerUsuarios();

    let existeAdmin =
        usuarios.find(
            usuario =>
            usuario.correo ===
            "admin@polofit.com"
        );

    if (!existeAdmin) {

        usuarios.push({

            id: 1,

            nombre: "Administrador",

            correo: "admin@polofit.com",

            clave: "12345",

            rol: "Admin"
        });

        guardarUsuarios(usuarios);
    }
}


// ======================================================
// LOGIN
// ======================================================

function login() {

    let correo =
        $("correo")?.value.trim();

    let clave =
        $("clave")?.value.trim();

    let usuarios =
        obtenerUsuarios();

    let usuario =
        usuarios.find(u =>

            u.correo === correo &&
            u.clave === clave
        );

    if (!usuario) {

        alert(
            "Correo o contraseña incorrectos"
        );

        return;
    }

    localStorage.setItem(
        "sesion",
        "activa"
    );

    localStorage.setItem(
        "rol",
        usuario.rol
    );

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuario)
    );

    window.location.href =
        "index.html";
}


// ======================================================
// REGISTRO
// ======================================================

function registrarUsuario() {

    let nombre =
        $("nombreRegistro")?.value.trim();

    let correo =
        $("correoRegistro")?.value.trim();

    let clave =
        $("claveRegistro")?.value.trim();

    let confirmar =
        $("confirmarClave")?.value.trim();

    if (

        !nombre ||
        !correo ||
        !clave ||
        !confirmar
    ) {

        alert(
            "Complete todos los campos"
        );

        return;
    }

    if (clave !== confirmar) {

        alert(
            "Las contraseñas no coinciden"
        );

        return;
    }

    let usuarios =
        obtenerUsuarios();

    let existe =
        usuarios.find(
            u => u.correo === correo
        );

    if (existe) {

        alert(
            "Ese correo ya existe"
        );

        return;
    }

    usuarios.push({

        id: Date.now(),

        nombre,

        correo,

        clave,

        rol: "Vendedor"
    });

    guardarUsuarios(usuarios);

    alert(
        "Cuenta creada correctamente"
    );

    window.location.href =
        "login.html";
}


// ======================================================
// RECUPERAR
// ======================================================

function recuperarClave() {

    let correo =
        $("correoRecuperacion")
        ?.value.trim();

    if (!correo) {

        alert(
            "Ingrese un correo"
        );

        return;
    }

    let usuarios =
        obtenerUsuarios();

    let usuario =
        usuarios.find(
            u => u.correo === correo
        );

    if (!usuario) {

        alert(
            "Correo no encontrado"
        );

        return;
    }

    alert(
        `Tu contraseña es: ${usuario.clave}`
    );
}


// ======================================================
// CERRAR SESION
// ======================================================

function cerrarSesion() {

    localStorage.removeItem("sesion");

    localStorage.removeItem("rol");

    localStorage.removeItem(
        "usuarioActivo"
    );

    window.location.href =
        "login.html";
}


// ======================================================
// MOSTRAR USUARIO
// ======================================================

function mostrarUsuarioActivo() {

    let contenedor =
        $("usuarioActivo");

    if (!contenedor) return;

    let usuario =
        JSON.parse(
            localStorage.getItem(
                "usuarioActivo"
            )
        );

    if (!usuario) return;

    contenedor.innerHTML = `

        <div class="usuario-box">

            👤 ${usuario.nombre}

            <span>
                (${usuario.rol})
            </span>

        </div>
    `;
}


// ======================================================
// MODALES
// ======================================================

function abrirModal(id) {

    $(id).classList.add("activo");
}

function cerrarModal(id) {

    $(id).classList.remove("activo");
}


// ======================================================
// PERMISOS
// ======================================================

function aplicarPermisos() {

    let rol =
        obtenerRol();

    let botonesAgregar =
        document.querySelectorAll(
            ".btn-agregar"
        );

    botonesAgregar.forEach(btn => {

        if (

            rol === "Vendedor" &&

            (
                paginaActual.includes(
                    "inventario"
                ) ||

                paginaActual.includes(
                    "usuarios"
                )
            )
        ) {

            btn.style.display = "none";
        }

        if (

            rol === "Bodega" &&

            paginaActual.includes(
                "usuarios"
            )
        ) {

            btn.style.display = "none";
        }
    });

    if (

        rol !== "Admin" &&

        paginaActual.includes(
            "usuarios"
        )
    ) {

        let contenido =
            document.querySelector(
                ".main"
            );

        contenido.innerHTML = `

            <h1>
                Acceso denegado
            </h1>

            <p class="subtitle">

                No tienes permisos
                para acceder aquí

            </p>
        `;
    }
}


// ======================================================
// DASHBOARD
// ======================================================

async function cargarDashboard() {

    try {

        let respuesta =
            await fetch(API_URL);

        let productos =
            await respuesta.json();

        if ($("totalProductos")) {

            $("totalProductos").innerText =
                productos.length;
        }

        let categorias =
            [...new Set(
                productos.map(
                    p => p.categoria
                )
            )];

        if ($("totalCategorias")) {

            $("totalCategorias").innerText =
                categorias.length;
        }

        let pedidos =
            obtenerPedidos();

        if ($("totalPedidos")) {

            $("totalPedidos").innerText =
                pedidos.length;
        }

    } catch(error) {

        console.error(error);
    }
}


// ======================================================
// RESUMEN INVENTARIO
// ======================================================

async function cargarResumenInventario() {

    try {

        let respuesta =
            await fetch(API_URL);

        let productos =
            await respuesta.json();

        let tabla =
            $("tablaResumen");

        if (!tabla) return;

        let html = `

            <div class="row header">

                <span>Producto</span>

                <span>Precio</span>

                <span>Stock</span>

                <span>Categoría</span>

            </div>
        `;

        productos.forEach(producto => {

            html += `

                <div class="row">

                    <span>
                        ${producto.nombre}
                    </span>

                    <span>
                        $${producto.precio}
                    </span>

                    <span>
                        ${producto.stock}
                    </span>

                    <span>
                        ${producto.categoria}
                    </span>

                </div>
            `;
        });

        tabla.innerHTML = html;

    } catch(error) {

        console.error(error);
    }
}


// ======================================================
// BUSCAR PRODUCTOS
// ======================================================

function buscarProductos() {

    let input =
        $("buscadorProductos");

    if (!input) return;

    let filtro =
        input.value.toLowerCase();

    let filas =
        document.querySelectorAll(
            "#tablaResumen .row"
        );

    filas.forEach((fila, index) => {

        if (index === 0) return;

        let texto =
            fila.innerText.toLowerCase();

        fila.style.display =
            texto.includes(filtro)
            ? "grid"
            : "none";
    });
}


// ======================================================
// LIMPIAR PRODUCTO
// ======================================================

function limpiarCampos() {

    $("nombreProducto").value = "";

    $("precioProducto").value = "";

    $("stockProducto").value = "";

    $("categoriaProducto")
        .selectedIndex = 0;
}


// ======================================================
// MODAL PRODUCTO
// ======================================================

function abrirModalProducto(
    modo = "nuevo"
) {

    if (tieneRol("Vendedor")) {

        alert("No tienes permisos");

        return;
    }

    abrirModal("modalProducto");

    if (modo === "editar") {

        $("tituloModal").innerText =
            "EDITAR PRODUCTO";

    } else {

        $("tituloModal").innerText =
            "NUEVO PRODUCTO";

        filaEditando = null;

        limpiarCampos();
    }
}


// ======================================================
// GUARDAR PRODUCTO
// ======================================================

async function guardarProducto() {

    let nombre =
        $("nombreProducto")
        .value.trim();

    let categoria =
        $("categoriaProducto")
        .value;

    let precio =
        $("precioProducto")
        .value.trim();

    let stock =
        $("stockProducto")
        .value.trim();

    if (

        !nombre ||
        !precio ||
        !stock ||

        categoria ===
        "Seleccione Categoria"
    ) {

        alert(
            "Complete todos los campos"
        );

        return;
    }

    let producto = {

        nombre,

        categoria,

        precio: parseFloat(precio),

        stock: parseInt(stock)
    };

    try {

        if (filaEditando) {

            let id =
                filaEditando.dataset.id;

            await fetch(
                `${API_URL}/${id}`,
                {

                    method:"PUT",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify(producto)
                }
            );

        } else {

            await fetch(API_URL, {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(producto)
            });
        }

        await cargarProductos();

        await cargarDashboard();

        await cargarResumenInventario();

        limpiarCampos();

        cerrarModal("modalProducto");

        filaEditando = null;

    } catch(error) {

        console.error(error);

        alert(
            "Error conectando con servidor"
        );
    }
}


// ======================================================
// CARGAR PRODUCTOS
// ======================================================

async function cargarProductos() {

    try {

        let respuesta =
            await fetch(API_URL);

        let productos =
            await respuesta.json();

        let tabla =
            $("tablaInventario");

        if (!tabla) return;

        let html = `

            <div class="row header">

                <span>Producto</span>

                <span>Precio</span>

                <span>Stock</span>

                <span>Categoría</span>

                <span>Acción</span>

            </div>
        `;

        productos.forEach(producto => {

            let botones = "";

            if (tieneRol("Admin")) {

                botones = `

                    <button
                        class="btn-tabla editar"
                        onclick="editarProducto(this)"
                    >
                        ✏️
                    </button>

                    <button
                        class="btn-tabla eliminar"
                        onclick="eliminarProducto(${producto.id})"
                    >
                        🗑️
                    </button>
                `;

            } else if (
                tieneRol("Bodega")
            ) {

                botones = `

                    <button
                        class="btn-tabla editar"
                        onclick="editarProducto(this)"
                    >
                        ✏️
                    </button>
                `;

            } else {

                botones =
                    `<span>Solo lectura</span>`;
            }

            html += `

                <div class="row"
                     data-id="${producto.id}">

                    <span>
                        ${producto.nombre}
                    </span>

                    <span>
                        $${producto.precio}
                    </span>

                    <span>
                        ${producto.stock}
                    </span>

                    <span>
                        ${producto.categoria}
                    </span>

                    <span class="acciones">

                        ${botones}

                    </span>

                </div>
            `;
        });

        tabla.innerHTML = html;

    } catch(error) {

        console.error(error);
    }
}


// ======================================================
// EDITAR PRODUCTO
// ======================================================

function editarProducto(btn) {

    filaEditando =
        btn.parentElement.parentElement;

    let datos =
        filaEditando.children;

    $("nombreProducto").value =
        datos[0].innerText;

    $("precioProducto").value =
        datos[1].innerText.replace("$","");

    $("stockProducto").value =
        datos[2].innerText;

    $("categoriaProducto").value =
        datos[3].innerText;

    abrirModalProducto("editar");
}


// ======================================================
// ELIMINAR PRODUCTO
// ======================================================

async function eliminarProducto(id) {

    if (!confirm(
        "¿Eliminar producto?"
    )) return;

    try {

        await fetch(
            `${API_URL}/${id}`,
            {
                method:"DELETE"
            }
        );

        await cargarProductos();

        await cargarDashboard();

        await cargarResumenInventario();

    } catch(error) {

        console.error(error);
    }
}


// ======================================================
// USUARIOS
// ======================================================

function limpiarUsuario() {

    $("nombreUsuario").value = "";

    $("correoUsuario").value = "";

    $("claveUsuario").value = "";

    $("rolUsuario")
        .selectedIndex = 0;
}


// ======================================================
// MODAL USUARIO
// ======================================================

function abrirModalUsuario(
    modo = "nuevo"
) {

    abrirModal("modalUsuario");

    if (modo === "editar") {

        $("tituloModalUsuario")
        .innerText =
        "EDITAR USUARIO";

    } else {

        $("tituloModalUsuario")
        .innerText =
        "NUEVO USUARIO";

        filaUsuarioEditando = null;

        limpiarUsuario();
    }
}


// ======================================================
// GUARDAR USUARIO
// ======================================================

function guardarUsuario() {

    let nombre =
        $("nombreUsuario")
        .value.trim();

    let correo =
        $("correoUsuario")
        .value.trim();

    let clave =
        $("claveUsuario")
        .value.trim();

    let rol =
        $("rolUsuario").value;

    if (

        !nombre ||
        !correo ||
        !clave ||

        rol === "Seleccione Rol"
    ) {

        alert(
            "Complete todos los campos"
        );

        return;
    }

    let usuarios =
        obtenerUsuarios();

    if (filaUsuarioEditando) {

        let id =
            filaUsuarioEditando.dataset.id;

        usuarios = usuarios.map(usuario => {

            if (usuario.id == id) {

                return {

                    id,

                    nombre,

                    correo,

                    clave,

                    rol
                };
            }

            return usuario;
        });

    } else {

        usuarios.push({

            id: Date.now(),

            nombre,

            correo,

            clave,

            rol
        });
    }

    guardarUsuarios(usuarios);

    cargarUsuarios();

    limpiarUsuario();

    cerrarModal("modalUsuario");
}


// ======================================================
// CARGAR USUARIOS
// ======================================================

function cargarUsuarios() {

    let tabla =
        $("tablaUsuarios");

    if (!tabla) return;

    let usuarios =
        obtenerUsuarios();

    let html = `

        <div class="row header">

            <span>Nombre</span>

            <span>Correo</span>

            <span>Rol</span>

            <span>Acción</span>

        </div>
    `;

    usuarios.forEach(usuario => {

        html += `

            <div class="row"
                 data-id="${usuario.id}">

                <span>
                    ${usuario.nombre}
                </span>

                <span>
                    ${usuario.correo}
                </span>

                <span>
                    ${usuario.rol}
                </span>

                <span class="acciones">

                    <button
                        class="btn-tabla editar"
                        onclick="editarUsuario(this)"
                    >
                        ✏️
                    </button>

                    <button
                        class="btn-tabla eliminar"
                        onclick="eliminarUsuario(${usuario.id})"
                    >
                        🗑️
                    </button>

                </span>

            </div>
        `;
    });

    tabla.innerHTML = html;
}


// ======================================================
// EDITAR USUARIO
// ======================================================

function editarUsuario(btn) {

    filaUsuarioEditando =
        btn.parentElement.parentElement;

    let id =
        filaUsuarioEditando.dataset.id;

    let usuarios =
        obtenerUsuarios();

    let usuario =
        usuarios.find(
            u => u.id == id
        );

    $("nombreUsuario").value =
        usuario.nombre;

    $("correoUsuario").value =
        usuario.correo;

    $("claveUsuario").value =
        usuario.clave;

    $("rolUsuario").value =
        usuario.rol;

    abrirModalUsuario("editar");
}


// ======================================================
// ELIMINAR USUARIO
// ======================================================

function eliminarUsuario(id) {

    let usuarios =
        obtenerUsuarios();

    usuarios =
        usuarios.filter(
            u => u.id != id
        );

    guardarUsuarios(usuarios);

    cargarUsuarios();
}


// ======================================================
// PEDIDOS
// ======================================================

async function abrirModalPedido() {

    abrirModal("modalPedido");

    let select =
        $("productoPedido");

    if (!select) return;

    try {

        let respuesta =
            await fetch(API_URL);

        let productos =
            await respuesta.json();

        select.innerHTML = "";

        productos.forEach(producto => {

            select.innerHTML += `

                <option
                    value="${producto.precio}"
                >

                    ${producto.nombre}

                </option>
            `;
        });

    } catch(error) {

        console.error(error);
    }
}


// ======================================================
// CALCULAR TOTAL
// ======================================================

function calcularTotalPedido() {

    let precio =
        $("productoPedido")?.value;

    let cantidad =
        $("cantidadPedido")?.value;

    if (!precio || !cantidad) {

        $("totalPedido").value = "";

        return;
    }

    $("totalPedido").value =
        precio * cantidad;
}


// ======================================================
// GUARDAR PEDIDO
// ======================================================

function guardarPedido() {

    let cliente =
        $("clientePedido")
        .value.trim();

    let producto =
        $("productoPedido")
        .selectedOptions[0]
        .text;

    let cantidad =
        $("cantidadPedido")
        .value;

    let total =
        $("totalPedido")
        .value;

    if (

        !cliente ||
        !cantidad ||
        !total
    ) {

        alert(
            "Complete todos los campos"
        );

        return;
    }

    let pedidos =
        obtenerPedidos();

    pedidos.push({

        id: Date.now(),

        cliente,

        producto,

        cantidad,

        total
    });

    guardarPedidos(pedidos);

    cargarPedidos();

    cargarDashboard();

    cerrarModal("modalPedido");

    $("clientePedido").value = "";

    $("cantidadPedido").value = "";

    $("totalPedido").value = "";
}


// ======================================================
// CARGAR PEDIDOS
// ======================================================

function cargarPedidos() {

    let tabla =
        $("tablaPedidos");

    if (!tabla) return;

    let pedidos =
        obtenerPedidos();

    let html = `

        <div class="row header">

            <span>Cliente</span>

            <span>Producto</span>

            <span>Cantidad</span>

            <span>Total</span>

            <span>Acción</span>

        </div>
    `;

    pedidos.forEach(pedido => {

        html += `

            <div class="row">

                <span>
                    ${pedido.cliente}
                </span>

                <span>
                    ${pedido.producto}
                </span>

                <span>
                    ${pedido.cantidad}
                </span>

                <span>
                    $${pedido.total}
                </span>

                <span class="acciones">

                    <button
                        class="btn-tabla eliminar"
                        onclick="eliminarPedido(${pedido.id})"
                    >
                        🗑️
                    </button>

                </span>

            </div>
        `;
    });

    tabla.innerHTML = html;
}


// ======================================================
// ELIMINAR PEDIDO
// ======================================================

function eliminarPedido(id) {

    let pedidos =
        obtenerPedidos();

    pedidos =
        pedidos.filter(
            p => p.id != id
        );

    guardarPedidos(pedidos);

    cargarPedidos();

    cargarDashboard();
}


// ======================================================
// CLICK FUERA MODAL
// ======================================================

window.addEventListener(
    "click",
    function(e){

        if (
            e.target === $("modalProducto")
        ) {

            cerrarModal("modalProducto");
        }

        if (
            e.target === $("modalUsuario")
        ) {

            cerrarModal("modalUsuario");
        }

        if (
            e.target === $("modalPedido")
        ) {

            cerrarModal("modalPedido");
        }
    }
);


// ======================================================
// CARGA INICIAL
// ======================================================

window.onload = function() {

    crearAdminInicial();

    verificarSesion();

    aplicarPermisos();

    mostrarUsuarioActivo();

    if ($("tablaInventario")) {

        cargarProductos();
    }

    if ($("tablaUsuarios")) {

        cargarUsuarios();
    }

    if ($("tablaPedidos")) {

        cargarPedidos();
    }

    cargarDashboard();

    cargarResumenInventario();
};




// ======================================================
// GENERAR PRODUCTOS AUTOMATICOS
// ======================================================

async function generarProductosDemo() {

    const productos = [

        {
            nombre: "Camiseta Nike Pro",
            categoria: "Camisas",
            precio: 120000,
            stock: 15
        },

        {
            nombre: "Sudadera Adidas",
            categoria: "Camisas",
            precio: 180000,
            stock: 8
        },

        {
            nombre: "Jogger Deportivo",
            categoria: "Pantalones",
            precio: 95000,
            stock: 20
        },

        {
            nombre: "Pantalón Cargo",
            categoria: "Pantalones",
            precio: 130000,
            stock: 12
        },

        {
            nombre: "Tenis Air Max",
            categoria: "Calzado",
            precio: 350000,
            stock: 6
        },

        {
            nombre: "Tenis Running Pro",
            categoria: "Calzado",
            precio: 280000,
            stock: 10
        },

        {
            nombre: "Gorra Negra",
            categoria: "Accesorios",
            precio: 45000,
            stock: 30
        },

        {
            nombre: "Bolso Deportivo",
            categoria: "Accesorios",
            precio: 110000,
            stock: 9
        },

        {
            nombre: "Camiseta Oversize",
            categoria: "Camisas",
            precio: 89000,
            stock: 14
        },

        {
            nombre: "Short Deportivo",
            categoria: "Pantalones",
            precio: 70000,
            stock: 18
        },

        {
            nombre: "Chaqueta Impermeable",
            categoria: "Camisas",
            precio: 210000,
            stock: 5
        },

        {
            nombre: "Medias Nike",
            categoria: "Accesorios",
            precio: 25000,
            stock: 40
        },

        {
            nombre: "Guantes Gym",
            categoria: "Accesorios",
            precio: 38000,
            stock: 16
        },

        {
            nombre: "Tenis Urban Street",
            categoria: "Calzado",
            precio: 320000,
            stock: 7
        },

        {
            nombre: "Polo Deportivo",
            categoria: "Camisas",
            precio: 99000,
            stock: 13
        }

    ];

    try {

        for (const producto of productos) {

            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(producto)
            });
        }

        alert(
            "Productos creados correctamente"
        );

        cargarProductos();

        cargarDashboard();

        cargarResumenInventario();

    } catch(error) {

        console.error(error);

        alert(
            "Error creando productos"
        );
    }
}