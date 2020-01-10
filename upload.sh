#hexo generate --watch
#hexo generate --deploy
#hexo deploy --generate

#hexo clean
#hexo deploy
#https://github.com/birdsofsummer/birdsofsummer.github.io.git
pub(){
    git branch dev
    git add --all
    git commit -m "first commit"
    #git remote add origin https://github.com/birdsofsummer/birdsofsummer.github.io.git
    git push -u origin +dev
}

pub1(){
    hexo generate
    cd public
    #git checkout -b  master
    git branch master
    git add --all
    git commit -m "Initial commit"
    git push -u origin +master
}

init(){
    echo "# birdsofsummer.github.io" >> README.md
    git init
    git add --all
    git checkout -b dev
    git commit -m "first commit"
    git remote add origin https://github.com/birdsofsummer/birdsofsummer.github.io.git
    git push -u origin dev
}

init1(){
    git remote add origin https://github.com/birdsofsummer/birdsofsummer.github.io.git
    git push -u origin master
}

if  [ "$*" = "" ] ;then
    pub
else
    pub1
fi
