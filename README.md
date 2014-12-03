# site-mockup

Mockups for tnris.org redesign


## Requirements

  - ruby
  - sass (`gem install sass`)
  - nodejs
  - gulp (`npm install -g gulp`)
  - bower (`npm install -g bower`)


## Setup

Make sure the required software is installed. Then run `npm install` from the
`./site-mockup` directory, followed by `bower install`.


## Usage

Run `gulp` command from the `./site-mockup` directory. Then visit
[http://localhost:8080/index.html](http://localhost:8080/index.html) to see the page. Any files in the `scss`
directory that end in `.scss` will be converted to corresponding file in the
`css` directory. For example `scss/custom.scss` -> `css/custom.css`
