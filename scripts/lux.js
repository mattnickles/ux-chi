import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import svgSprite from 'gulp-svg-sprite';
import header from 'gulp-header';

const componentsFolder = path.join(__dirname, '..', 'src', 'lux', 'components');
const utilitiesFolder = path.join(__dirname, '..', 'src', 'lux', 'utilities');
const iconsFolder = path.join(__dirname, '..', 'src', 'lux', 'assets', 'icons');
const copyright = `/* Lux and its documentation are released under the terms of the MIT license.
In addition, Lux uses several 3rd-party libraries,
a list of which can be viewed in the package.json file.
Please review each of their license and user agreements, as well. */`;

const foundationFolders = [
  'fonts',
  'reset',
  'typography'
].map(item =>
  path.join(__dirname, '..', 'src', 'lux', 'foundations', item));
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(file => fs.statSync(path.join(dir, file)).isDirectory());
}

function getComponentNamesToInclude(names) {
  let components = getFolders(componentsFolder);

  if (names.indexOf('all') === -1) {
    components = components.filter(file => names.indexOf(file) !== -1);
  }

  return components;
}

export function buildCss({ names = ['all'], dest = 'dist', assetsPath = '/' }) {
  const componentFolders = getComponentNamesToInclude(names)
    .map(name => `${path.join(componentsFolder, name)}`);

  return gulp.src(
    path.join(__dirname, '..', 'src', 'lux', 'index.scss')
  )
    .pipe(plumber())
    .pipe(sass({
      includePaths: [
        'node_modules',
        path.join(__dirname, '..', 'src', 'lux')
      ],
      outputstyle: 'expanded'
    }))
    .pipe(postcss([
      require('autoprefixer')({
        browsers: ['last 2 versions', 'ie >= 10']
      }),
      require('postcss-svg')({
        dirs: [iconsFolder]
      }),
      require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
        zindex: false
      })
    ]))
    .pipe(header(`${copyright} \n`))
    .pipe(concat('lux.css'))
    .pipe(gulp.dest(dest));
}

export function buildSprite({ dest = 'dist' }) {
  var config = {
    shape: {
      transform: []
    },
    mode: {
      symbol: {
        sprite: 'lux-icons',
        dest: 'sprite',
        example: true
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
      namespaceIDs: false,
      namespaceClassnames: false,
      dimensionAttributes: false
    }
  };

  return gulp.src('./src/lux/components/icons/svg/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest(dest));
}

export function copyAssets({ names = ['all'], dest = 'dist' }) {
  const componentFolders = getComponentNamesToInclude(names)
    .map(name => `${path.join(componentsFolder, name)}`);

  return gulp.src(
    foundationFolders
      .concat(componentFolders)
      .concat(utilitiesFolder)
      .map(folder => `${path.join(folder, '**', '!(*.scss)')}`)
  )
    .pipe(header(`${copyright} \n`))
    .pipe(gulp.dest(dest));
}

export function build({ names = ['all'], dest = 'dist', assetsPath = '/' }) {
  buildCss({ names, dest, assetsPath });
  buildSprite({ dest });
  copyAssets({ names, dest });
}
