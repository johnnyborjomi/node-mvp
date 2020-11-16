async function start() {
    try {
        console.log(chalk.yellow(`Connecting to DB: ${config.DB_NAME}`))
        await sequelize.sync();

    
    } catch(e) {
        console.log(e);
    }
}