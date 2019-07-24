class FileListPlugin {
    apply(compiler){
        compiler.hooks.emit.tapAsync('FileListPlugin',(compilation,callback)=>{
            var fileList = 'In this build:\n\n'
        console.log('In this build')
            for(var filename in compilation.assets){
                fileList += '- '+filename + '\n'
            }

            compilation.assets['filelist.md'] = {
                source:function(){
                    return fileList
                },
                size:function(){
                    return fileList.length
                }
            }
            callback()
        })
    }
}

module.exports = FileListPlugin