# site-mockup

Mockups for tnris.org redesign


## Requirements

 - ruby
 - sass (`gem install sass`)
 - nodejs
 - gulp (`npm install -g gulp`)
 - bower (`npm install -g bower`)


## Setup

Make sure the required software is installed. Then from the root directory of
this repository:

 - run `npm install`
 - run `bower install`


## Usage

Run `gulp` command from the `./site-mockup` directory. Then visit
[http://localhost:8000/index.html](http://localhost:8000/index.html) to see the
page. Any files in the `scss` directory that end in `.scss` will be converted to
corresponding file in the `css` directory. For example `scss/tnris.scss` ->
`css/tnris.css`
