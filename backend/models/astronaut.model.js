export const astronaut = (sequelize, Sequelize) => {
    return sequelize.define("astronaut", {
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      picture_url: {
        type: Sequelize.STRING
      }
    });
  };
