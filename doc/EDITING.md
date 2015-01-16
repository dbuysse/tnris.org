# Editing tnris.org

This page documents our workflow for making simple edits or adding new articles
to [tnris.org](http://tnris.org). This should get you up to speed if you want to
do something like write a new article, or fix a typo.


## Prelude: get yourself set up on github

First thing you'll need to do is get set up with an account on github:

  - [Register](https://github.com/join) an account if you don't already have
    one. Choose the free plan.
  - Bug someone on the IS team to get your permissions set up - they will need
    to know your github username.


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


## Front matter

At the top of any file is a section for special variables, called front
matter. Front matter is enclosed in two lines that contain just `---`. It looks
like this:

```
---
title: 2015 Statewide Orthoimagery Project
template: 2015-ortho-page.html
mainimage: images/statewide-orthoimagery/ortho_flag_lg.jpg
status_image: images/statewide-orthoimagery/weekly-updates/statusimage-jan8.jpg
status_image_preview: images/statewide-orthoimagery/weekly-updates/statusimage-jan8-sm.jpg
status_date: January 8th, 2015
abstract:
    A collaborative initiative to capture high-quality, leaf-off imagery for the entire state, slated for public release in Winter 2015.
---
```

Every page will need to have `title` and `template` defined, but a lot of pages
will have additional variables as well. The `title` should be pretty short - is
used for things like displaying the name of the page in search engine results.
The `template` is tells the site which of the templates to use to generate the
full HTML for the page. Templates are found in the `templates/` directory,
but in most cases you won't need to worry about editing templates.


# Workflow

A step-by-step workflow for making changes from github.

## Sign in

Sign in to github (if you are not signed in, there will be a "Sign in" button in
the top right corner).


## [Create a new branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/#creating-a-branch)

Branches are how we keep different sets of changes separate. They give us a
chance to do things like review changes or work on a draft version of an article
without publishing it to the main site.

Create a new branch for your change(s). Choose a branch name that will be unique
and refers to the change you are trying to make.

![Animated .gif of creating a new branch](tnris-org-create-branch.gif?raw=true)


## [Editing a file](https://help.github.com/articles/editing-files-in-your-repository/) 

Editing an existing file is pretty simple from github. You can edit any file by
clicking the edit icon near the top right of the file viewer. Hit the "Commit
changes" button at the bottom when you are done.

![Animated .gif of entering edit mode](edit-file.gif?raw=true)


## [Adding a new file](https://help.github.com/articles/creating-new-files/)

If the page you want to create doesn't already exist, then just make a new file
for it.

It's probably best to copy the front matter from another similar page - for
example: if you are adding a news article, find another news article and use
its front matter as a starting point.


![Animated .gif of adding a new file](add-file.gif?raw=true)



## [Pull request](https://help.github.com/articles/creating-a-pull-request/)

When you are ready to publish your changes, make a pull request. A pull request
will alert everyone that your changes are good to go.

![Animated .gif of creating a pull request](pull-request.gif?raw=true)
