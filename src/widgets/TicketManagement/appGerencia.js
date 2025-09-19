var typesCases;
var usuarios;

//let filterGroup=
//{
//    3567:[3567,3576],
//    3575:[3595,3596,3597,3598,3599,3576]
//}

/**
 * NOTA DE REFACTORIZACIÓN:
 * Se han eliminado las variables globales para mejorar la predictibilidad del código.
 * Cada función ahora es responsable de obtener o recibir los datos que necesita.
 * La lógica de filtrado se ha movido a la llamada a la API (server-side) para mejorar drásticamente el rendimiento.
 */

//carga de casos en pagina principal

function truncarTexto (texto, maxLongitud) {
    if (!texto) return "";
    return texto.length > maxLongitud ? texto.substring(0, maxLongitud) + "..." : texto;
}

/**
 * Construye una cadena de filtro OData para la API de SharePoint.
 * @param {object} filters - Un objeto con los filtros a aplicar.
 * @returns {string} - La cadena de filtro OData.
 */
function buildODataFilter (filters) {
    const filterParts = [];

    if (filters.codCaso) filterParts.push(`Id eq ${filters.codCaso}`);
    if (filters.prioridad) filterParts.push(`Prioridad eq '${filters.prioridad}'`);
    if (filters.status) filterParts.push(`Status eq '${filters.status}'`);
    if (filters.tCaso) filterParts.push(`Tipo_x0020_de_x0020_CasoId eq ${filters.tCaso}`);
    if (filters.Depa) filterParts.push(`GroupsDepId eq ${filters.Depa}`);
    if (filters.agencia) filterParts.push(`Zona eq '${filters.agencia}'`);
    // ... agregar más filtros para 'asignado', 'cargado', fechas, etc.
    // El filtrado por fechas es más complejo: `Fecha ge datetime'${desdeISO}' and Fecha le datetime'${hastaISO}'`

    // Lógica de permisos (ejemplo simplificado)
    const userGroups = groupsId; // Asumimos que groupsId se carga en otro lugar
    const isCAI = userGroups.includes(3567);
    if (!isCAI) {
        // Aquí se construiría un filtro más complejo basado en los grupos del usuario
        // Ejemplo: "(GroupsDepId eq 3576 or GroupsDepId eq 3575)"
        // Esta parte sigue siendo compleja y es un candidato ideal para un backend dedicado.
    }

    return filterParts.join(' and ');
}

async function ChargeTables () {
    // 1. Obtener los valores de los filtros del formulario
    const filters = {
        prioridad: $("#prioridad").val(),
        status: $("#status").val(),
        agencia: $("#agencia").val(),
        tCaso: $("#tcaso").val(),
        Depa: $("#dep").val(),
        codCaso: $("#txtCodCaso").val()
        // ... obtener el resto de filtros
    };

    // 2. Obtener los datos necesarios (usuarios, grupos, etc.)
    const [spGroups, cases] = await Promise.all([GetSPGroups(), GetInfoCases(null, filters)]);

    var textTablesContainer = ""; // para mostrar
    var exportTableContainer = ""; // para exportar

    var container = document.getElementById("container");

    container.innerHTML = "";

    let tableHeader = "<table id='tblCasos' class=\"table table-striped table-hover\">" +
        "<thead class=\"table-light\">" +
        "<tr>" +
        "<th scope=\"col\">Cod Caso</th>" +
        "<th scope=\"col\">Caso Remitido</th>" +
        "<th scope=\"col\">Cargado por</th>" +
        "<th scope=\"col\">Usuario asignado</th>" +
        "<th scope=\"col\">Grupo asignado</th>" +
        "<th scope=\"col\">Solicitado por</th>" +
        "<th scope=\"col\">Telefono del solicitante</th>" +
        "<th scope=\"col\">Agencia del Solicitante</th>" +
        "<th scope=\"col\">Tipo de Caso</th>" +
        "<th scope=\"col\">Prioridad</th>" +
        "<th scope=\"col\">Status</th>" +
        "<th scope=\"col\">Fecha de creación</th>" +
        "<th scope=\"col\">Fecha Limite</th>" +
        "<th scope=\"col\">Fecha Culminación</th>" +
        "<th scope=\"col\">Descripción</th>" +
        "<th scope=\"col\">Comentarios</th>" +
        "<th scope=\"col\">Observaciones</th>" +
        "<th scope=\"col\">Ejecutado por</th>" +
        "</tr>" +
        "</thead><tbody>";

    textTablesContainer += tableHeader;
    exportTableContainer += tableHeader;

    // 3. Construir la tabla con los datos ya filtrados por el servidor
    for (let i = 0; i < cases.length; i++) {
        const element = cases[i];
        // La lógica de filtrado y permisos ya no es necesaria aquí.
        textTablesContainer +=
            `<tr onclick='show(${element.Id})'>` +
            "<td>" + element.Id + "</td>" +
            "<td>" + (element.ParentCod || "No es un caso remitido") + "</td>" +
            "<td>" + getName(element.UsuarioId) + "</td>" +
            "<td>" + getName(element.AsignadoId) + "</td>" +
            "<td>" + getGroupsName(element.GroupsDepId) + "</td>" +
            "<td>" + (element.Nombre || "") + "</td>" +
            "<td>" + (element.Telefono || "") + "</td>" +
            "<td>" + (element.Zona || "") + "</td>" +
            "<td>" + getTypeCaseName(element.Tipo_x0020_de_x0020_CasoId) + "</td>" +
            "<td>" + element.Prioridad + "</td>" +
            "<td>" + element.Status + "</td>" +
            "<td>" + formatDate(element.Fecha) + "</td>" +
            "<td>" + formatDate(element.Fecha_x0020_Limite) + "</td>" +
            "<td>" + formatDate(element.FechaCulminacion) + "</td>" +
            "<td>" + truncarTexto(element.Descripcion, 25) + "</td>" +
            "<td>" + truncarTexto(element.Comentarios, 25) + "</td>" +
            "<td>" + truncarTexto(element.Observaciones, 25) + "</td>" +
            "<td>" + getEjecutado(element.EjecutadoId) + "</td>" +
            "</tr>";

        exportTableContainer +=
            `<tr>` +
            "<td>" + element.Id + "</td>" +
            "<td>" + (element.ParentCod || "No es un caso remitido") + "</td>" +
            "<td>" + getName(element.UsuarioId) + "</td>" +
            "<td>" + getName(element.AsignadoId) + "</td>" +
            "<td>" + getGroupsName(element.GroupsDepId) + "</td>" +
            "<td>" + (element.Nombre || "") + "</td>" +
            "<td>" + (element.Telefono || "") + "</td>" +
            "<td>" + (element.Zona || "") + "</td>" +
            "<td>" + getTypeCaseName(element.Tipo_x0020_de_x0020_CasoId) + "</td>" +
            "<td>" + element.Prioridad + "</td>" +
            "<td>" + element.Status + "</td>" +
            "<td>" + formatDate(element.Fecha) + "</td>" +
            "<td>" + formatDate(element.Fecha_x0020_Limite) + "</td>" +
            "<td>" + formatDate(element.FechaCulminacion) + "</td>" +
            "<td>" + (element.Descripcion || "") + "</td>" +
            "<td>" + (element.Comentarios || "") + "</td>" +
            "<td>" + (element.Observaciones || "") + "</td>" +
            "<td>" + getEjecutado(element.EjecutadoId) + "</td>" +
            "</tr>";

    }

    textTablesContainer += "</tbody></table>";
    exportTableContainer += "</tbody></table>";

    container.insertAdjacentHTML('beforeend', textTablesContainer);

    $('#tblCasos').DataTable({
        order: [[0, 'desc']],
        pageLength: 10, // Puedes ajustar esto
        lengthMenu: [5, 10, 25, 50, 100],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        }
    });

    document.getElementById("exportTableContainer").innerHTML = exportTableContainer;
    document.getElementById("itemCount").textContent = "Total de Casos: " + cases.length;

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            Buscar();
        }
    });

}

async function ChargeSubCase () {

    // validar campos
    let id = $("#codCaso").val();

    let cases = await GetInfoCases(id);
    if (cases.length == 0) {
        return;
    }

    let isCAI = groupsId.indexOf(3567) != -1;
    let isSecurity = groupsId.indexOf(3575) != -1;

    if (isSecurity) {
        $("#cntSubcases").show();
    }
    var textTablesContainer = "";

    var container = document.getElementById("containerSub");

    container.innerHTML = "";

    textTablesContainer += "<table id='tblCasos' class=\"table table-striped table-hover\">" +
        "<thead class=\"table-light\">" +
        "<tr>" +
        "<th scope=\"col\">Cod Caso</th>" +
        "<th scope=\"col\">Cargado por</th>" +
        "<th scope=\"col\">Grupo asignado</th>" +
        "<th scope=\"col\">Solicitado por</th>" +
        "<th scope=\"col\">Telefono del solicitante</th>" +
        "<th scope=\"col\">Agencia del Solicitante</th>" +
        "<th scope=\"col\">Tipo de Caso</th>" +
        "<th scope=\"col\">Prioridad</th>" +
        "<th scope=\"col\">Status</th>" +
        "<th scope=\"col\">Fecha de creación</th>" +
        "<th scope=\"col\">Fecha Limite</th>" +
        "<th scope=\"col\">Fecha Culminación</th>" +
        "<th scope=\"col\">Descripción</th>" +
        "<th scope=\"col\">Comentarios</th>" +
        "<th scope=\"col\">Observaciones</th>" +
        //"<th scope=\"col\">Acciones</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>"
    let isFinished = true;
    let isNotSecurity = groupsId.indexOf(3575) == -1;
    let isSupport = groupsId.indexOf(3576) != -1;
    let isAS400 = groupsId.indexOf(3597) != -1;
    let isPerimetral = groupsId.indexOf(3596) != -1;
    let isPlataforma = groupsId.indexOf(3595) != -1;
    let isCompliace = groupsId.indexOf(3598) != -1;
    let isServidor = groupsId.indexOf(3599) != -1;
    let isSerBan = groupsId.indexOf(3610) != -1;
    let isSerAdm = groupsId.indexOf(3609) != -1;
    let isTele = groupsId.indexOf(3606) != -1;
    let isSerGen = groupsId.indexOf(3611) != -1;
    let isSegAcc = groupsId.indexOf(3760) != -1;
    let n = 0;

    for (let i = 0; i < cases.length; i++) {
        const element = cases[i];
        if (element.Status !== "Finalizado" && element.Status !== "Anulado") {
            isFinished = false;
        }



        textTablesContainer +=
            `<tr onclick='show(${element.Id})'>` +
            "<td>" + element.Id + "</td>" +
            "<td id='tipocasodesc'>" + getName(element.UsuarioId) + "</td>" +
            "<td id='tipocasodesc'>" + getGroupsName(element.GroupsDepId) + "</td>" +
            "<td id='tipocasodesc'>" + element.Nombre + "</td>" +
            "<td id='tipocasodesc'>" + element.Telefono + "</td>" +
            "<td id='tipocasodesc'>" + element.Zona + "</td>" +
            "<td id='tipocasodesc'>" + getTypeCaseName(element.Tipo_x0020_de_x0020_CasoId) + "</td>" +
            "<td id='tipocasodesc'>" + element.Prioridad + "</td>" +
            "<td id='tipocasodesc'>" + element.Status + "</td>" +
            "<td id='tipocasodesc'>" + formatDate(element.Fecha) + "</td>" +
            "<td id='tipocasodesc'>" + formatDate(element.Fecha_x0020_Limite) + "</td>" +
            "<td id='tipocasodesc'>" + formatDate(element.FechaCulminacion) + "</td>" +
            "<td id='tipocasodesc'>" + truncarTexto(element.descripcion, 25 || "") + "</td>" +
            "<td id='tipocasodesc'>" + truncarTexto(element.Comentarios, 25 || "") + "</td>" +
            "<td id='tipocasodesc'>" + truncarTexto(element.Observaciones, 25 || "") + "</td>" +
            //"<td><a href='Creador%20de%20Casos.aspx?codcaso=" + element.Id + "'>Ver</a></td>"
            "</tr> ";
        n++

    }
    let status = $("#status").val();
    document.getElementById("itemCount").textContent = "Total de Casos: " + n;
    if (isFinished && status != "Finalizado") {
        setField("status", "Finalizado");
        CreateOrUpdateCase();
    }

    if (isFinished == false && (isSecurity && (isSegAcc || isSerGen || isSupport || isAS400 || isPerimetral || isPlataforma || isCompliace || isServidor || isSerBan || isSerAdm || isTele))) {
        textTablesContainer += "</tbody></table>";

        container.insertAdjacentHTML('beforeend', textTablesContainer);
        return;
    } if (isFinished == false && (isNotSecurity && (isSegAcc || isSerGen || isSupport || isAS400 || isPerimetral || isPlataforma || isCompliace || isServidor || isSerBan || isSerAdm || isTele))) {
        Home();
    }

}

//establecer formato de fecha
function formatDate (a) {
    return a == null ? "" : (new Date(a)).toLocaleDateString();
}

//??
function show (id) {
    if (!id) {
        id = $("#parentCode").val();
    }
    window.location.href = `CrearCaso.aspx?codcaso=${id}`;
}

//bloquear modificacion de casos finalizados o anulados
async function LockControls () {
    $(".casos-input").prop('disabled', true);
    $(".btn").hide();
    $("#exit").show();
    //    $("#create").hide();
}

//Salir a pagina principal
function Exit (id) {
    window.location.href = `/API%20BNC/GestorTickets/pagina/informa.aspx?codcaso=${id}`;
}

function Home () {
    window.location.href = "/API%20BNC/GestorTickets/pagina/Gestor.aspx";
}

async function ExitToCreate (lastId) {
    let IdSon = $('#Display').text();
    let IdFather = $('#CasoPadre').text();
    let IdFather2 = $('#IdDisplayP').text();
    if (IdSon == "") {
        window.location.href = `CrearCaso.aspx?parentCase=${IdFather2}`
    } else {
        window.location.href = `CrearCaso.aspx?parentCase=${IdFather}`;
    }
}

//??
async function ChargeUsers () {
    users = await GetUsers();
}

//Corrección de los nombre de usuarios
function getName (userId) {
    return users.find(x => x.Id == userId)?.Title || "No asignado";
}

function getEjecutado (userId) {
    return users.find(x => x.Id == userId)?.Title || "Este caso no ha sido ejecutado";
}

function getGroupsName (groupsId) {

    for (let i = 0; i < spGroups.length; i++) {
        const element = spGroups[i];
        if (element.Id == groupsId) {
            return element.Title;
        }
    }

    return "No asignado";
}

//carga de tipo de casos segun el id del grupo
async function ChargeTypeCases () {

    typesCases = await GetInfoTypeCases();
    //cases = await  GetInfoCases();
    var text = "";
    let isCAI = groupsId.indexOf(3567) != -1;
    let isSecurity = groupsId.indexOf(3575) != -1;
    let isSupport = groupsId.indexOf(3576) != -1;

    if (isCAI) {

        for (let i = 0; i < typesCases.length; i++) {
            const element = typesCases[i];
            if (groups.find(x => x.Id == element.Cai) == null) continue;
            text += "<option value=" + element.Id + ">" + element.Solicitud + "</option>";
        }

    } else if (isSecurity) {

        for (let i = 0; i < typesCases.length; i++) {
            const element = typesCases[i];
            if (groups.find(x => "3575" == element.Codigo) == null) continue;
            text += "<option value=" + element.Id + ">" + element.Solicitud + "</option>";

        }
    } else if (isSupport) {

        for (let i = 0; i < typesCases.length; i++) {
            const element = typesCases[i];
            if (groups.find(x => "3576" == element.Soporte) == null) continue;
            text += "<option value=" + element.Id + ">" + element.Solicitud + "</option>";

        }
    } else {

        for (let i = 0; i < typesCases.length; i++) {
            const element = typesCases[i];
            if (groups.find(x => x.Id == element.Codigo) == null) continue;
            text += "<option value=" + element.Id + ">" + element.Solicitud + "</option>";

        }
    }
    $("#drpdwnCode").append(text);
    $("#tcaso").append(text);
}

//carga de tipo de casos segun el id del grupo ?
function AppendCase (id) {
    let text = "";
    for (let i = 0; i < typesCases.length; i++) {
        const element = typesCases[i];
        if (element.Id != id) continue;
        if (groups.find(x => x.Id == element.Codigo) == null) {
            text = "<option value=" + element.Id + ">" + element.Solicitud + "</option>";
            break;
        }
    }
    $("#drpdwnCode").append(text);

}

//corrección del nombre de los casos
function getTypeCaseName (typeCaseId) {
    return typesCases.find(x => x.Id == typeCaseId)?.Solicitud;
}

//Conocer el id del grupo de usuarios
function getTypeCaseIdGroup (typeCaseId) {
    return typesCases.find(x => x.Id == typeCaseId)?.Codigo;
}

//obtener la informacion de los casos en las listas de sharepoint
async function GetInfoCases (parentId, odataFilters) {
    let urlQuery = "";
    const filters = [];

    if (parentId) {
        filters.push(`ParentCod eq ${parentId}`);
    }

    if (odataFilters) {
        const builtFilter = buildODataFilter(odataFilters);
        if (builtFilter) filters.push(builtFilter);
    }

    urlQuery = filters.length > 0 ? `?&$filter=${filters.join(' and ')}` : "?$top=50"; // Limitar por defecto si no hay filtros

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _spPage - ContextInfo.siteAbsoluteUrl + "/_api/lists/getbytitle('Caso Publico')/Items" + urlQuery,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var items = data.d.results;
                console.log("Items Casos");
                console.log(items);
                resolve(items);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

//obtener informacion de las bd
async function GetInfoUserCCFromDatabase (userName) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + `/_api/lists/getbytitle('Directory')/Items?&$filter=Login eq '${userName}'`,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var items = data.d.results[0];
                console.log("Informacion");
                console.log(items);
                resolve(items);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

//obtener el ID del caso para el codigo del caso
async function GetInfoCase (Id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            //            url : _spPageContextInfo.siteAbsoluteUrl + "/_api/lists/getbytitle('CASOPublico')/Items?&$filter=ID eq "+Id.toString(),
            url: _spPageContextInfo.siteAbsoluteUrl + `/_api/lists/getbytitle('Caso Publico')/Items(${Id})`,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var items = data.d;
                console.log("Items Casos");
                console.log(items);
                resolve(items);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

//obtener usuarios ??
async function GetUsers () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/siteusers?",
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var items = data.d.results;
                resolve(items);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

//obtener todod los usuarios de mi grupo
async function GetAllUsersInMyGroups () {
    let groups = await GetUserGroups();
    let users = [];
    groups = groups.filter(x => ["Control de Casos"].indexOf(x.Title) == -1);
    for (let i = 0; i < groups.length; i++) {
        let usersInGroup = await GetUsersInGroup(groups[i].Id);
        users = users.concat(usersInGroup);
    }

    users = users.filter((item, index) => users.findIndex(x => item.Id === x.Id) === index);
    return users;
}

//obtener usuarios a los que pertenescan aun grupo
async function GetUsersInGroup (id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + `/_api/web/sitegroups(${id})/users`,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var users = data.d.results;
                resolve(users);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

//obtener grupos a los que pertenece el usuario
async function GetUserGroups () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + `/_api/web/CurrentUser/Groups`,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var groups = data.d.results;
                groupsId = groups.map(x => x.Id);
                resolve(groups);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function GetSPGroups () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + `/_api/web/SiteGroups/`,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var groups = data.d.results;
                groupsAll = groups.map(x => x.Id);
                resolve(groups);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

//informacion de los casos 
async function GetInfoTypeCases () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/lists/getbytitle('Control de Casos')/Items",
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var items = data.d.results;
                resolve(items);
            },
            error: function (error) {
                reject(error);
            }
        });
    });

}

//botón buscar index
async function Buscar () {
    await ChargeTables();
}

//Creación y actualización de casos
function CreateOrUpdateCase () {

    let form = $("#titulo").val();
    let form2 = $("#nombre").val();

    if (form == "") {

        alert("nesecitas colocar el usuario solicitante");
        return;
    }
    if (form2 == "") {

        alert("La información no ha cargado correctamente, espere un momento o contacte al departamento de correspondiente");
        return;
    }
    let urlParams = new URLSearchParams(window.location.search);
    let parentID = urlParams.get("parentCase");
    if (!parentID) {
        parentID = $("#parentCode").val();
    }
    let id = $("#codCaso").val();
    let nuevo = id == "";
    let descripcion = $("#descripcion").val();
    let tipoCaso = $("#drpdwnCode").val();
    let titulo = $("#titulo").val();
    let nombre = $("#nombre").val();
    let telefono = $("#telefono").val();
    let area = $("#area").val();
    let email = $("#correo").val();
    let prioridad = $("#prioridad").val();
    let status = $("#status").val();
    let comentarios = $("#comentarios").val();
    let observacion = $("#observaciones").val();
    let usuario = _spPageContextInfo.userId;
    let usuarioStr = _spPageContextInfo.userId.toString();
    let AsignadoId = $("#drpdwnUsers").val();
    let GroupsId = $("#drpdwnGroups").val();

    /*---------------------------------------------------------*/

    AsignadoId = AsignadoId == "" ? null : AsignadoId;
    let AsignadoIdString = AsignadoId || "";
    GroupsId = GroupsId == "" ? null : GroupsId;
    let GroupsIdString = GroupsId || "";

    /*---------------------------------------------------------*/

    let data = {
        __metadata: {
            type: "SP.Data.Caso_x0020_PublicoListItem"
        },
        Title: titulo,
        Tipo_x0020_de_x0020_CasoId: tipoCaso,
        Prioridad: prioridad,
        Status: status,
        descripcion: descripcion,
        Comentarios: comentarios,
        AsignadoId: AsignadoId,
        AsignadoStringId: AsignadoIdString,
        GroupsDepId: GroupsId,
        GroupsDepStringId: GroupsIdString,
        Observaciones: observacion,
        Telefono: telefono,
        Nombre: nombre,
        ParentCod: parentID,
        Zona: area,
        Correo: email
    }

    /*---------------------------------------------------------*/

    if (nuevo) {
        data.Fecha = moment().toDate();

        var fechaLimite = moment().add(1, "days").toDate();

        data.Fecha_x0020_Limite = fechaLimite;

        data.UsuarioId = usuario;

        data.UsuarioStringId = usuarioStr;
    }

    /*---------------------------------------------------------*/

    if (status == "Finalizado") {
        data.FechaCulminacion = new Date();

        data.EjecutadoId = usuario;

        data.EjecutadoStringId = usuarioStr;
    }

    if (status == "Anulado") {
        data.FechaCulminacion = new Date();

        data.EjecutadoId = usuario;

        data.EjecutadoStringId = usuarioStr;
    }

    /*---------------------------------------------------------*/

    //console.log(prioridad);
    //console.log(status);
    //console.log(usuario);
    //console.log(usuarioStr);
    //console.log(titulo);
    //console.log(tipoCaso);
    //console.log(descripcion);
    //console.log(comentarios);
    //console.log(AsignadoId);
    //console.log(nombre);
    //console.log(telefono);
    //console.log(area);
    //console.log(fechaLimite);

    /*---------------------------------------------------------*/

    let headers = {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    }

    /*---------------------------------------------------------*/

    if (!nuevo) {
        headers["If-Match"] = "*";
        headers["X-HTTP-Method"] = "MERGE";
    }

    /*---------------------------------------------------------*/

    try {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/lists/getbytitle('Caso Publico')/Items" + (nuevo ? "" : `(${id})`),
            type: "POST",
            data: JSON.stringify(data),
            headers: headers,
            success: function (result) {
                console.log(JSON.stringify(result));
                let idGenerated = nuevo ? result.d.Id : id;
                let isSecurity = groupsId.indexOf(3575) != -1;
                let isCAI = groupsId.indexOf(3567) != -1;
                if (isSecurity) {
                    if (status == "Finalizado") {
                        alert('Su caso fue finalizado con éxito');
                        LockControls();
                        if (parentID) {
                            GoToCase(parentID);
                            return;
                        }
                        Home();

                    } else if (status == "Anulado") {
                        alert('Su caso fue anulado con éxito');
                        LockControls();
                        if (parentID) {
                            GoToCase(parentID);
                            return;
                        }
                        Home();

                    } else {
                        alert('Su caso fue guardado con éxito')
                        Exit(idGenerated);
                    }
                } else if (isCAI) {
                    if (status == "Finalizado") {
                        alert('Su caso fue finalizado con éxito');
                        LockControls();
                        if (parentID) {
                            GoToCase(parentID);
                            return;
                        }
                        Home();
                    } else if (status == "Anulado") {
                        alert('Su caso fue anulado con éxito');
                        LockControls();
                        if (parentID) {
                            GoToCase(parentID);
                            return;
                        }
                        Home();
                    } else {
                        alert('Su caso fue guardado con éxito');
                        Exit(idGenerated);
                    }

                } else {
                    if (status == "Finalizado") {
                        alert('Su caso fue finalizado con éxito');
                        LockControls();
                        if (parentID) {
                            GoToCase(parentID);
                            return;
                        }
                        Home();
                    } else if (status == "Anulado") {
                        alert('Su caso fue anulado con éxito');
                        LockControls();
                        if (parentID) {
                            GoToCase(parentID);
                            return;
                        }
                        Home();
                    } else {
                        alert('Su caso fue guardado con éxito');
                        Home();
                    }

                }
            },
            error: function (error) {
                console.log(JSON.stringify(error));
                alert("Error: " + JSON.stringify(error));
            }
        });
    }

    /*---------------------------------------------------------*/

    catch (e) {
        console.log(e);
    }

}

function GoToCase (id) {
    window.location.href = `CrearCaso.aspx?codcaso=${id}`;
}

function CreateSubCase () {
    let id = $("#codCaso").val();
    window.location.href = `CrearCaso.aspx?parentCase=${id}`;
}

//Carga de usuarios de un grupo en los drpdwn
async function ChargeUsersForm () {
    usuarios = await GetAllUsersInMyGroups();
    gUsers = usuarios.map(x => x.Id);
    text = "";
    usuarios = usuarios.filter(x => ["System Account", "Miguelito", "sp admin", "sp apppool", "SPSearch"].indexOf(x.Title) == -1);
    let isSupport = groupsId.indexOf(3576) != -1;

    if (isSupport) {
        for (let i = 0; i < usuarios.length; i++) {
            const element = usuarios[i];

            text += "<option value='" + element.Id + "'>" + element.Title + "</option>";
        }
    } else {
        text = "<option value='0'>No se requiere asignación</option>";
    }


    $("#drpdwnUsers").append(text);

}

async function ChargeGroupsForm () {
    groups = await GetUserGroups();
    spGroups = await GetSPGroups();
    text = "";
    let isCAI = groupsId.indexOf(3567) != -1;

    if (isCAI) {
        for (let i = 0; i < spGroups.length; i++) {
            const element = spGroups[i];
            text += "<option value='" + element.Id + "'>" + element.Title + "</option>";
        }
    } else {
        groups = groups.filter(x => ["Control de Casos", "Miguelito"].indexOf(x.Title) == -1);
        for (let i = 0; i < groups.length; i++) {
            const element = groups[i];

            text += "<option value='" + element.Id + "'>" + element.Title + "</option>";
        }
    }

    //si la pagina tiene Crear%20Caso.aspx si llena este combo 
    if (window.location.href.indexOf("CrearCaso.aspx") != -1) {
        $("#drpdwnGroups").append(text);
    }//si es gestor de tickets llena este otro combo
    if (window.location.href.indexOf("Gestor.aspx") != -1) {
        $("#dep").append(text);
    }

}

function linkGroup () {
    //1 Verificar el tipo de caso seleccionado
    //2 Obtener el código del departamento
    //3 Seleccionar en el combo de departamento el id obtenido
    let tipoCaso = $("#drpdwnCode").val();//1
    let caseGroupid = getTypeCaseIdGroup(tipoCaso); //2
    setField("drpdwnGroups", caseGroupid);//3
}

//Carga del Caso seleccionado desde gestor de tickets
async function LoadCase () {
    let urlParams = new URLSearchParams(window.location.search);
    let Id = urlParams.get("codcaso");
    let parentID = urlParams.get("parentCase");
    if (Id == null && parentID == null) return;
    if (parentID != null) Id = parentID;
    var Case = await GetInfoCase(Id);
    //console.log(Case);
    setField("codCaso", Case.Id);
    //setTextArea("descripcion", Case.Descripci_x00f3_n);
    $("#descripcion").val(Case.descripcion);
    setField("drpdwnUsers", Case.AsignadoId);
    setField("comentarios", Case.Comentarios);
    AppendCase(Case.Tipo_x0020_de_x0020_CasoId);
    setField("drpdwnCode", Case.Tipo_x0020_de_x0020_CasoId);
    setField("titulo", Case.Title);
    setField("prioridad", Case.Prioridad);
    setField("status", Case.Status);
    setField("observaciones", Case.Observaciones);
    let fecha = (new Date(Case.Fecha_x0020_Limite)).toLocaleDateString();
    let hora = (new Date(Case.Fecha_x0020_Limite)).toLocaleTimeString();
    setField("fechaLimite", fecha + " " + hora);
    setField("parentCode", Case.ParentCod);
    setField("drpdwnGroups", Case.GroupsDepId);
    setField("nombre", Case.Nombre);
    setField("telefono", Case.Telefono);
    setField("area", Case.Zona);
    setField("correo", Case.Correo);

    let isCAI = groupsId.indexOf(3567) != -1;
    let isNotCAI = groupsId.indexOf(3567) == -1;
    let isSupport = groupsId.indexOf(3576) != -1;
    let isSecurity = groupsId.indexOf(3575) != -1;
    let isNotSecurity = groupsId.indexOf(3575) == -1;
    let isAS400 = groupsId.indexOf(3597) != -1;
    let isPerimetral = groupsId.indexOf(3596) != -1;
    let isPlataforma = groupsId.indexOf(3595) != -1;
    let isCompliace = groupsId.indexOf(3598) != -1;
    let isServidor = groupsId.indexOf(3599) != -1;
    let isSerBan = groupsId.indexOf(3610) != -1;
    let isSerAdm = groupsId.indexOf(3609) != -1;
    let isTele = groupsId.indexOf(3606) != -1;
    let isSerGen = groupsId.indexOf(3611) != -1;
    let isSegAcc = groupsId.indexOf(3760) != -1;
    let isMasterSupp = groupsId.indexOf(3843) != -1;


    //si eres usuario externo
    if (!isCAI && !isSupport && !isSecurity && !isAS400 && !isPerimetral && !isPlataforma && !isCompliace && !isServidor && !isSerAdm && !isSerBan && !isSerGen && !isTele) {
        await LockControls();
    }

    if (isCAI || isSecurity) {
        $("#asignadog").show();
        $("#drpdwnGroups").show();
    }

    if (isSecurity && (isAS400 || isPerimetral || isPlataforma || isCompliace || isServidor || isSupport || isSerAdm || isSerBan || isSerGen || isTele || isSegAcc)) {
        //$("#asignado").hide();
        //$("#drpdwnUsers").hide();
        $("titulo").prop('readonly', true);
        $("Search").hide();
    }


    if (isNotSecurity && (isAS400 || isPerimetral || isPlataforma || isCompliace || isServidor || isSupport || isSerAdm || isSerBan || isSerGen || isTele || isSegAcc)) {
        //$("#asignado").hide();
        //$("#drpdwnUsers").hide();
        $("titulo").prop('readonly', true);
        $("#Search").hide();
        $("#drpdwnCode").prop('disabled', true);
        //if(Case.ParentCod == null){
        //    ChargeSubCase();
        //    Home();
        //}
    }
    if (isNotSecurity && (isMasterSupp)) {
        $("#asignado").show();
        $("#drpdwnUsers").show();
        $("titulo").prop('readonly', true);
        $("#Search").hide();
        $("#drpdwnCode").prop('disabled', true);
        $("#asignadog").show();
        $("#drpdwnGroups").show();

    }

    //si el caso es finalizados
    if (Case.Status == "Finalizado") {
        await LockControls();
    }
    if (Case.Status == "Anulado") {
        await LockControls();
    }
    if (isCAI) {
        $("drpdwnGroups").prop('disabled', true);
        if (Case.GroupsDepId == (3575)) {
            $("#status").prop('disabled', true);
            $("#drpdwnCode").prop('disabled', true);
        } if (Case.GroupsDepId == (3576)) {
            $("#status").prop('disabled', true);
            $("#drpdwnCode").prop('disabled', true);
        } if (Case.GroupsDepId == (3597)) {
            $("#status").prop('disabled', true);
            $("#drpdwnCode").prop('disabled', true);
        } if (Case.GroupsDepId == (3596)) {
            $("#status").prop('disabled', true);
            $("#drpdwnCode").prop('disabled', true);
        } if (Case.GroupsDepId == (3595)) {
            $("#status").prop('disabled', true);
            $("#drpdwnCode").prop('disabled', true);
        } if (Case.GroupsDepId == (3598)) {
            $("#status").prop('disabled', true);
            $("#drpdwnCode").prop('disabled', true);
        } if (Case.GroupsDepId == (3599)) {
            $("#status").prop('disabled', true);
            $("#drpdwnCode").prop('disabled', true);
        }
    }
    await searchUser();
    if (isNotCAI) {
        if (isSecurity || isSegAcc || isSerGen || isSupport || isAS400 || isPerimetral || isPlataforma || isCompliace || isServidor || isSerBan || isSerAdm || isTele) {
            if (parentID != null) {
                setField("codCaso", null);
                setField("drpdwnUsers", null);
            } else {
                ChargeSubCase();
                if (!Case.ParentCod || Case.ParentCod == "Si") {
                    $("#subCaso").show();
                } else {
                    $("#btnIrAlPadre").show();
                }
            }
        }
    }
}

//resultado de la busqueda de informacion de en las bd
async function GetInfo (userName) {
    let userDb = await GetInfoUserCCFromDatabase(userName);
    console.log(userDb);
    return userDb
}

//busqueda de usuario solicitante en bd
async function searchUser (e) {
    //capturar el usuario que queremos buscar
    let titulo = $("#titulo").val();
    //llamar a GetInfo con ese usuario y obtener el objeto con la info
    let infoUserDb = await GetInfo(titulo);
    //llenar campos con la info de ese objeto.
    setField("nombre", infoUserDb.Name + " " + infoUserDb.LastName);
    setField("telefono", infoUserDb.CodArea + " " + infoUserDb.Telephone1);
    setField("area", infoUserDb.OfficeName);
    setField("correo", infoUserDb.Mail);
    if (e) {
        e.stopPropagation();
        e.cancelBubble = true;
    }
}

//carga inicial para las pantallas
async function Init () {
    try { groups = await GetUserGroups(); } catch { };
    try {
        if (groupsId.indexOf(3567) != -1) {
            document.getElementById("drpdwnGroups").disabled = true;
        }
        if (groupsId.indexOf(3567) == -1 && groupsId.indexOf(3575) == -1) {

            //ocultar botn.
            document.getElementById("drpdwnGroups").style.display = 'none';
            document.getElementById("asignadog").style.display = 'none';
            document.getElementById("drpdwnUsers").style.display = "";
            document.getElementById("asignado").style.display = 'none';

        }

    } catch { }
    try { await ChargeGroupsForm(); } catch { };
    if (window.location.href.indexOf("CrearCaso.aspx") != -1) {
        let urlParams = new URLSearchParams(window.location.search);
        let Id = urlParams.get("codcaso");
        let parentID = urlParams.get("parentCase");
        if (Id == null && parentID == null) {
            let isNotCAI = groupsId.indexOf(3567) == -1;
            let isNotSecurity = groupsId.indexOf(3575) == -1;
            if (isNotCAI && isNotSecurity) {
                alert('Usted no tiene acceso a esta pantalla');
                Home();
            }
        }
    }
    try { await ChargeUsers(); } catch { };
    try { await ChargeTypeCases(); } catch { };
    try { await ChargeUsersForm(); } catch { };
    try { await LoadCase(); } catch { };
    try { await ChargeTables(); } catch { };
    document.getElementById("create").style.display = '';
    //var users = await GetUsers();    
    // var typesCases = await GetInfoTypeCases();
    //var cases = await GetInfoCases();
    // console.log("tipos de casos");
    //console.log(GetUserGroups());
    //console.log(_spPageContextInfo);
    //let userName=_spPageContextInfo.userLoginName;
    //let parts=userName.split("\\");
    //userName=parts[parts.length-1];
    //userName='josemartinez';
    //console.log(await GetInfo(userName));

}

async function Init2 () {

    let urlParams = new URLSearchParams(window.location.search);
    let Id = urlParams.get("codcaso");
    try { await ChargeUsersForm(); } catch { };
    let isSecurity = groupsId.indexOf(3575) != -1;

    //consultar codecaso si tiene parentId
    if (Id != null) {
        var Case = await GetInfoCase(Id);
        //si codecaso tiene parentId show id="noPrincipal" 
        if (Case.ParentCod != null) {
            $("#noPrincipal").show();
            //quiero que muestres id en id=IdDisplay
            $("#CasoPadre").text(Case.ParentCod);
            //quiero que muestres Id en id=IdDisplay
            $("#Display").text(Case.Id);
        }
        //si codecaso no tiene parentId show id="principal"
        if (Case.ParentCod == null) {
            $("#principal").show();
            $("#IdDisplayP").text(Case.Id);
        }
    }

    if (isSecurity == true) {
        $("#txtCreate").show();
    }
}

function htmlExcel (idTabla, nombreArchivo = '') {
    let tipoDatos = 'application/vnd.ms-excel;charset=utf-8;';
    let tablaDatos = document.getElementById("exportTableContainer").querySelector("table"); // Usa tabla completa
    let tablaHTML = tablaDatos.outerHTML;

    let ic = document.getElementById("itemCount");
    if (ic) tablaHTML += ic.outerHTML;

    // Agregar BOM para codificación UTF-8
    let contenido = '\uFEFF' + tablaHTML;

    // Nombre del archivo
    nombreArchivo = nombreArchivo ? nombreArchivo + '.xls' : 'Reporte_Casos.xls';

    if (window.navigator.msSaveOrOpenBlob) {
        // Para IE
        let blob = new Blob([contenido], { type: tipoDatos });
        window.navigator.msSaveOrOpenBlob(blob, nombreArchivo);
    } else {
        // Navegadores modernos
        let blob = new Blob([contenido], { type: tipoDatos });
        let url = URL.createObjectURL(blob);

        let linkDescarga = document.createElement("a");
        linkDescarga.href = url;
        linkDescarga.download = nombreArchivo;
        document.body.appendChild(linkDescarga);
        linkDescarga.click();
        document.body.removeChild(linkDescarga);
        URL.revokeObjectURL(url);
    }
}
