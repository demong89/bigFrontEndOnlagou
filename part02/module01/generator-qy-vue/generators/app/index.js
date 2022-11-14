const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting() {
        console.log('123');
        
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'your project name',
                default: this.appname
            }
        ]).then(answers => {
            this.answers = answers
        })
    }
    writing() {
        const templates = [
            'README.md',
            'package.json',
            'babel.config.js',
            '.gitignore',
            'public/favicon.ico',
            'public/index.html', 
            'src/App.vue', 
            'src/main.js', 
            'src/assets/logo.png', 
            'src/components/HelloWorld.vue'
        ]

        templates.forEach(item => {
            this.fs.copyTpl(this.templatePath(item), this.destinationPath(item), this.answers)
        })
    }
}