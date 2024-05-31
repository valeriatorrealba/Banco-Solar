const { Pool } = require("pg");

const config = {
    host: "localhost",
    port: 5432,
    database: "bancosolar",
    user: "postgres",
    password: "0000",
};

const pool = new Pool(config);

const agregarUsuario = async(data) => {
    const consulta = {
        text: "insert into usuarios (nombre, balance) values ($1, $2) returning *",
        values: [data.nombre, data.balance]
    }
    const result = await pool.query(consulta)
    return result.rows[0];
}

const mostrarTodosLosUsuarios = async() =>{
    const result = await pool.query("select * from usuarios");
    return result.rows;
}

const editarUsuario = async (id, datos) => {
    const consulta = {
        text: `update usuarios set nombre = $1, balance =$2 WHERE id = '${id}'`,
        values: datos,
    }
    const result = await pool.query(consulta);
    return result;
};

const borrarUsuario = async(id) =>{
    const consulta = {
        text:"delete from usuarios where id = $1 returning *",
        values:[id],
    }
    const result = await pool.query(consulta);
    return result.rows[0];
}
const transferencia = async({emisor, receptor, monto}) => {

    const cuentaEmisor = {
        text: "update usuarios set balance = balance - $1 where id = $2 returning *",
        values: [monto, emisor]
    };
    const cuentaReceptor = {
        text: "update usuarios set balance = balance + $1 where id = $2 returning *",
        values: [monto, receptor]
    }
    const transaccion = {
        text : "insert into transferencias (emisor, receptor, monto, fecha) values ($1,$2,$3, current_timestamp) returning * ",
        values: [emisor, receptor, monto],
    };
    
    try{
        await pool.query("BEGIN");
        const result = await pool.query(transaccion);
        await pool.query(cuentaEmisor);
        await pool.query(cuentaReceptor);
        await pool.query("COMMIT");
        console.log("Transacción realizada con exito 🤞");
        console.log("Última transacción: ", result.rows[0]);
    } catch (error){
        await pool.query("ROLLBACK");
        throw error
    };
};

const mostrarTransferencias = async() =>{
    const result = await pool.query("select * from transferencias");
    //console.log(result.rows);
    return result.rows;
}

module.exports = { agregarUsuario, mostrarTodosLosUsuarios, editarUsuario, borrarUsuario, transferencia, mostrarTransferencias};
