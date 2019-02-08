module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    post_content: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {  foreignKey: 'userId',  targetKey: 'id' });
  };
  return Post;
};