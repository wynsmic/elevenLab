export const comment = (sequelize, Sequelize) => {
    return sequelize.define("astronaut", {
      ticket_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      }
    });
  };
