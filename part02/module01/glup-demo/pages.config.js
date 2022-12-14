module.exports = {
    data:{
        menus:[
            {
                name:'m1'
            }
        ]
    },
    build:{
        src:'src',
        dist:'dist',
        temp:'release',
        public:'public',
        paths:{
          styles:'assets/style/*.scss',
          scripts:'assets/scripts/*.js',
          pages:'*.html',
          images:'assets/images/**',
          fonts:'assets/font/**'
        }
      }
}