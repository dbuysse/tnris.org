'use strict';

var _ = require('lodash');
var debug = require('debug')('tnris-site');
var del = require('del');
var each = require('metalsmith-each');
var extend = require('extend');
var fs = require('fs');
var gulp = require('gulp');
var gulp_front_matter = require('gulp-front-matter');
var gulpif = require('gulp-if');
var gulpsmith = require('gulpsmith');
var lazypipe = require('lazypipe');
var markdown = require('metalsmith-markdown');
var marked = require('marked');
var metadata = require('metalsmith-metadata');
var minifyCss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var paginate = require('metalsmith-paginate');
var path = require('path');
var permalinks = require('metalsmith-permalinks');
var replace = require('metalsmith-replace');
var sass = require('gulp-ruby-sass');
var scapegoat = require('scapegoat');
var scsslint = require('gulp-scss-lint');
var sitemap = require('metalsmith-sitemap');
var swig = require('swig');
var templates = require('metalsmith-templates');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var vinylPaths = require('vinyl-paths');
var webserver = require('gulp-webserver');

var autodate = require('./metalsmith-autodate');
var based = require('./metalsmith-based');
var collector = require('./metalsmith-collector');
var crossref = require('./metalsmith-crossref');
var csv = require('./metalsmith-csv');
var metadata = require('metalsmith-metadata');

var production = false;

// turn off caching swig templates - so changes will propagate if re-run by a
// watch task
swig.setDefaults({
  cache: false,
  loader: swig.loaders.fs(__dirname + '/templates'),
  locals: {
    validateLink: validateLink
  }
});

swig.setFilter('find', function (collection, key) {
  return _.find(collection, key);
});

// patch swig groupBy filter so it doesn't mutate lists - this is a temporary
// workaround until patch makes its way into a swig release.
// See: https://github.com/paularmstrong/swig/pull/524
swig.setFilter('groupBy', function (input, key) {
  if (!_.isArray(input)) {
    return input;
  }
  var out = {};

  _.each(input, function (value) {
    if (!value.hasOwnProperty(key)) {
      return;
    }

    var keyname = value[key],
      newValue = _.cloneDeep(value);
    delete newValue[key];

    if (!out[keyname]) {
      out[keyname] = [];
    }

    out[keyname].push(newValue);
  });

  return out;
});

swig.setFilter('sortBy', function (input, key) {
  return _.sortBy(input, key);
});

swig.setFilter('urlize', function(input) {
  return urlize(input);
});

function parseCSV(options) {
  var name = options.name;
  var path = options.path;
  var urlDir = options.urlDir || options.name;
  var template = options.template;
  var filenameKeys = options.filenameKeys;
  var splitKeys = options.splitKeys || [];

  return csv(path, function parser (data, files, metalsmith) {
    metalsmith.data[name] = metalsmith.data[name] || [];

    var obj = metalsmith.data[name];

    _.map(splitKeys, function(key) {
      if (data[key]) {
        data[key] = data[key]
          .split(',')
          .map(function (s) {
            return s.trim();
          });
      }
    });

    var urlKeys = _.map(filenameKeys, function(key) {
      var urlized = urlize(data[key]);
      data['urlized_' + key] = urlized;
      return urlized;
    });

    data.filename = [urlDir].concat(urlKeys).join('/') + '.md';
    data._collector_ignore = true;

    var file = files[data.filename];
    if (file) {
      file = extend(file, data);
    } else {
      file = extend(data, {
        template: template,
        contents: new Buffer('')
      });
    }

    if (options.additional) {
      file = options.additional(file);
    }
    if (options.contentsKey) {
      file.contents = file[options.contentsKey];
    }
    if (options.titleKey) {
      file.title = file[options.titleKey];
    }
   
    //add a stats object to each file based on the stats of the source csv file
    //the stats objects are used by the sitemap plugin
    file.stats = fs.statSync(path);
    debug(file.stats);

    if (files[data.filename]) {
      console.log("WARNING: Page '" + data.filename + "' generated from " + options.path + ", but it already exists. This indicates a likely url collision and/or overwriting an existing page.");
    }
    files[data.filename] = file;

    obj.push(file);
  });
}

function urlize(str) {
  return str.trim().toLowerCase().replace(/[\(\)]/g, '').replace(/\W/g, '-').replace(/-+/g, '-');
}

function urlPath(str) {
  return str.replace(path.sep, '/');
}

function validateLink(str, crossref, filename) {
  if (!str) {
    console.log('WARNING: ', "Invalid link: from " + filename);
    return '#';
  }
  var ref = urlPath(str);
  if (!crossref[ref]) {
    console.log('WARNING: ', "Invalid link: " + str + " (" + ref + ") from " + filename);
    return '#';
  }
  return crossref[ref];
}

var dirs = {
  dist: './.dist',
  content: './content',
  scss: './scss',
  static: 'static',
  tmp: './.tmp',
  templates: './templates'
};

dirs.markdown = path.join(dirs.content, 'markdown');
dirs.bower = path.join(dirs.static, 'bower_components');

var paths = {
  catalog: dirs.content + '/data-catalog.csv',
  content: dirs.content + '/**/*',
  javascript: [dirs.static + '/**/*.js', '!' + path.join(dirs.bower, '**/*.js')],
  markdown: dirs.markdown + '/**/*.md',
  scss: dirs.scss + '/**/*.scss',
  static: [dirs.static + '/**/*', '!' + path.join(dirs.bower, 'bootstrap-sass-official/**'), '!' + path.join(dirs.bower, 'bourbon/**')],
  templates: dirs.templates + '/**/*',
  variables: dirs.content + '/variables.yaml'
};

gulp.task('default', ['dist-dev', 'watch', 'webserver']);
gulp.task('dev-prod', ['dist', 'watch', 'webserver']);

gulp.task('watch', function () {
  gulp.watch(paths.content, ['dist-metal']);
  gulp.watch(paths.scss, ['dist-scss']);
  gulp.watch(paths.templates, ['dist-metal']);
  gulp.watch(paths.javascript, ['dist-static']);
});

gulp.task('webserver', ['dist-dev'],  function() {
  gulp.src(dirs.dist)
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('dist', ['dist-production']);
gulp.task('dist-dev', ['dist-fonts', 'dist-metal', 'dist-scss', 'dist-static']);
gulp.task('dist-production', ['set-production', 'dist-dev', 'dist-useref', 'dist-production-sitemap']);

gulp.task('set-production', function () {
  production = true;
});

gulp.task('dist-fonts', function () {
  return gulp.src(path.join(dirs.static, 'bower_components', 'bootstrap', 'fonts', '*'))
    .pipe(gulp.dest(path.join(dirs.dist, 'fonts')));
});

gulp.task('dist-metal', function () {
  return gulp.src([
    paths.markdown,
    paths.variables
  ])
    .pipe(gulp_front_matter()).on("data", function(file) {
        _.assign(file, file.frontMatter);
        delete file.frontMatter;
      })
    .pipe(
      gulpsmith()
        .use(parseCSV({
          name: 'catalog',
          path: 'content/data-catalog.csv',
          urlDir: 'data-catalog',
          template: 'data-catalog-entry.html',
          filenameKeys: ['category', 'name'],
          splitKeys: ['tags'],
          contentsKey: 'description',
          titleKey: 'name',
          additional: function (file) {
            var image_name = file['urlized_name'].replace(/-/g, '_');
            var base = 'images/data-catalog/' + file['urlized_category'] + '/' + image_name;

            var image_types = [
              {
                name: 'thumb',
                suffix: '_th',
                always: true
              }, {
                name: 'overview_image',
                suffix: '_overview',
                always: true
              }, {
                name: 'status_map',
                suffix: '_status',
                always: false
              }, {
                name: 'detail_image',
                suffix: '_detail',
                always: false
              }, {
                name: 'urban_image',
                suffix: '_urban',
                always: false
              }, {
                name: 'natural_image',
                suffix: '_natural',
                always: false
              }
            ];

            _.each(image_types, function (image_type) {
              var filename = base + image_type.suffix + '.jpg';

              var staticPath = dirs.static + '/' + filename;
              var exists = fs.existsSync(staticPath);

              if (exists) {
                file[image_type.name + '_url'] = filename;
              } else if (image_type.always) {
                console.log("Warning: Could not find required image for data catalog entry - " + staticPath);
              }
            });

            return file;
          }
        }))
        .use(parseCSV({
          name: 'training',
          path: 'content/training.csv',
          template: 'training-entry.html',
          filenameKeys: ['class_title', 'url_date'],
          contentsKey: 'description',
          titleKey: 'class_title'
        }))
        .use(metadata({
          variables: 'variables.yaml'
        }))
        .use(each(function(file, filename) {
          file.preserved = filename.slice(0, -1 * path.extname(filename).length);
          file.id = file.preserved.replace(/\//g, '-');
          if (file.id[0].match(/\d/)) {
            file.id = '_' + file.id;
          }
        }))
        .use(autodate('YYYY-MM-DD'))
        .use(collector({
          pattern: '*.md',
          ignore: ['training']
        }))
        .use(paginate({
          perPage: 10,
          path: 'updates'
        }))
        .use(each(function(file) {
          file.contents = '{%- import "_macros.html" as m -%}\n' + file.contents;
        }))
        .use(markdown({
          renderer: (function () {
              var renderer = new marked.Renderer();
              var re = /^(.*:.*|\/\/)/;

              var originalLink = renderer.link;
              renderer.link = function newLink(href, title, text) {
                if (!href.match(re)) {
                  href = "{{m.link('" + href + "', path + '.md')}}";
                }
                return originalLink.apply(renderer, [href, title, text]);
              };

              return renderer;
            }()),
          smartypants: false
        }))
        .use(each(function(file) {
          file.urlEnd = file.withoutDate || file.preserved;
        }))
        .use(permalinks({
          pattern: ':collection/:date/:urlEnd',
          date: 'YYYY-MM-DD'
        }))
        .use(crossref({
          include: {
            'data-download': '/data-download/'
          },
          includeDirs: {
            'static/documents': 'documents',
            'static/images': 'images'
          }
        }))
        .use(based())
        .use(replace({
          contents: function(contents) {
            var str = contents.toString()
              .replace(/{{.+?}}/g, scapegoat.unescape)
              .replace(/{#.+?#}/g, scapegoat.unescape)
              .replace(/{%.+?%}/g, scapegoat.unescape);
            return new Buffer(str);
          }
        }))
        .use(templates({
          engine: 'swig',
          inPlace: true
        }))
        .use(templates({
          engine: 'swig'
        }))
        .use(sitemap({
          hostname: 'http://tnris.org'
        }))
      )
    .pipe(gulpif(production, gulp.dest(dirs.tmp), gulp.dest(dirs.dist)));
});

gulp.task('dist-production-sitemap', ['dist-metal'], function () {
  var sitemap_file = path.join(dirs.tmp, 'sitemap.xml');
  return gulp.src(sitemap_file)
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('dist-scss', function () {
  return gulp.src(paths.scss)
    .pipe(gulpif(!production, scsslint()))
    .pipe(sass())
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(gulp.dest(dirs.tmp + '/css'));
});

gulp.task('dist-static', function () {
  return gulp.src(paths.static)
    .pipe(gulpif(production, gulp.dest(dirs.tmp)))
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('dist-useref', ['dist-metal', 'dist-scss', 'dist-static'], function () {
  var assets = useref.assets();

  var jsCompress = lazypipe()
    .pipe(ngAnnotate)
    .pipe(uglify);

  return gulp.src(dirs.tmp + '/**/index.html')
      .pipe(assets)
      .pipe(gulpif('*.min.js', jsCompress()))
      .pipe(gulpif('*.min.css', minifyCss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(dirs.dist));
});

gulp.task('clean', ['clean-dist']);

gulp.task('clean-dist', function() {
  return gulp.src([dirs.dist, dirs.tmp, '.sass-cache/'])
    .pipe(vinylPaths(del));
});
