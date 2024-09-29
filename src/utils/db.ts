import sql from 'mssql';

const config = {
    server: '', //tên server
    database: '', //tên database
    user: '', //tên user 
    password: '', //mk user
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

export const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to MSSQL');
        return pool;
    } catch (err) {
        console.error('Database connection failed: ', err);
        throw err;
    }
};
