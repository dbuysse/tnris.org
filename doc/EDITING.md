# Editing tnris.org

This page documents our workflow for making simple edits or adding new articles
to [tnris.org](http://tnris.org). This should get you up to speed if you want to
do something like write a new article, or fix a typo.


## Prelude: get yourself set up on github

First thing you'll need to do is get set up with an account on github:

  - [Register](https://github.com/join) an account if you don't already have
    one. Choose the free plan.
  - Bug someone on the IS team to get your permissions set up - they'll need
    your github username.


## Markdown files

Most of the pages of our site are written in a simple text format called
[markdown](https://help.github.com/articles/markdown-basics/) that provides a
simple syntax for things like headings, links and referencing images.

You can find the current set of markdown files in the
[/content/markdown](https://github.com/TNRIS/tnris.org/tree/master/content/markdown)
section of our repository. Each `.md` file corresponds to a page on our website.
The webpage URL is generated from the file name and path. Some examples of how
this works:

 - The about page: [http://tnris.org/about/](http://tnris.org/about/) is generated from the
   [about.md](https://github.com/TNRIS/tnris.org/blob/master/content/markdown/about.md)
   file.
 - The GIO article found at
   [http://tnris.org/geographic-information-office/2015-01-08/data-sharing-for-the-state-of-texas/](http://tnris.org/geographic-information-office/2015-01-08/data-sharing-for-the-state-of-texas/)
   is generated from the
   [/geographic-information-office/2015-01-08-data-sharing-for-the-state-of-texas.md](https://github.com/TNRIS/tnris.org/blob/master/content/markdown/geographic-information-office/2015-01-08-data-sharing-for-the-state-of-texas.md)
   file.

Note that file names beginning with a date (yyyy-mm-dd) will get incorporated
into the url.


## Workflow

A step-by-step workflow for making changes.

### Sign in

Sign in to github (if you're not signed in, there will be a "Sign in" button in
the top right corner).


### Create a new branch

Branches are how we keep different sets of changes separate. They give us a
chance to do things like review changes or work on a draft version of an article
without publishing it to the main site.

Create a new branch for your change(s). Choose a branch name that will be unique
and refers to the change you're trying to make.

![Animated .gif of creating a new branch](tnris-org-create-branch.gif?raw=true)


## Editing a file

Editing an existing file is pretty simple from github. Then you can edit any
file by clicking the edit icon near the top right of the file viewer. Hit the
"Commit changes" button at the bottom when you're done.

![Animated .gif of entering edit mode](edit-file.gif?raw=true)
