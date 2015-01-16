# Building tnris.org

If you are looking for information on how to get set up to build tnris.org then
you're in the right place.

## Requirements

First, make sure these things are installed:

 - ruby
 - sass (`gem install sass`)
 - scss-lint (`gem install scss-lint`)
 - nodejs
 - gulp (`npm install -g gulp`)
 - bower (`npm install -g bower`)


## Setup

To get the build and front-end dependences, run these commands from base
directory of the repository:

 - `npm install`
 - `bower install`

Also install the [EditorConfig plugin](http://editorconfig.org/#download) for
your text editor of choice. EditorConfig helps us maintain stuff like consistent
spacing and tabbing across source files.

## Usage

Run `gulp` command from the base directory of the repository. Then visit
[http://localhost:8000/](http://localhost:8000/) to see the page. Any files in
the `scss` directory that end in `.scss` will be converted to corresponding file
in the `css` directory. For example `scss/tnris.scss` -> `css/tnris.css`
