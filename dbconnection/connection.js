const knex=require('knex')({
    client:"mysql",
    connection:{
        host:"localhost",
        user:"root",
        database:"Blog_App",
        password:"aniket@123"
    }
})
knex.schema.createTable('users',(table)=>{
    table.increments('id').primary()
    table.string('name')
    table.string('gmail').unique().notNullable()
    table.string('password').unique().notNullable()
    table.string('mobile_number').unique()

}).then((result) => {
    console.log('users table create successfuly..........');   
}).catch((err) => {
    console.log('users table allready exist...............');
    
});


knex.schema.createTable('BlogPosts',(table)=>{
    table.increments('id').primary()
    table.string('Title')
    table.string('Discription')
    table.integer('UserId').notNullable()
})
.then((result) => {
    console.log('Blog table created successufly................');   
}).catch((err) => {
    console.log('Blog table allready exists..............');
    
});


knex.schema.createTable('LikeDisLike',(table)=>{
    table.increments('id').primary()
    table.integer('User_Id').unsigned().notNullable()
    table.integer('Post_Id').notNullable()
    table.boolean("Like")
    table.foreign('User_Id').references('users.id')
    table.foreign('Post_Id').references('BlogPosts.id')
})
.then((result) => {
    console.log('Like table created successfuly................');
}).catch((err) => {
    // console.log(err);
    console.log('Like table allready exist..........');
});
module.exports = knex