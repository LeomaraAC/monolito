import {Sequelize} from 'sequelize-typescript';

const initSequelize = async (models: any[]) => {
    const sequelize = new Sequelize({
        logging: false,
        dialect: 'sqlite',
        storage: ':memory:',
        sync: {force: true}
    });

    await sequelize.addModels(models);
    await sequelize.sync();
    return sequelize;
};

export {
    initSequelize
};
