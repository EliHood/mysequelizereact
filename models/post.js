module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    post_content: DataTypes.STRING,
    username:  DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {  foreignKey: 'userId',  targetKey: 'id' });
    // foreign key id will attach a postId to the likes table. 
    Post.hasMany(models.Likes, {  foreignKey: 'postId', targetKey: 'id',  onDelete: 'CASCADE' });
  };
  return Post;
};