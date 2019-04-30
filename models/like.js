module.exports = function(sequelize, DataTypes) {
  const Like = sequelize.define('Likes', {
    like:{
      type:DataTypes.BOOLEAN,
      allowNull:true
    },
  }, {});
    Like.associate = function(models) {
      // foreign key will attach a userId to the likes table
        Like.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: 'userId',
          targetKey: 'id' 

        })
        
        Like.belongsTo(models.Post, {
          onDelete: 'CASCADE',
          foreignKey: 'postId',
          targetKey: 'id' 
          

        })
    }
  return Like;
}