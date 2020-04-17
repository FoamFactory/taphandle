# taphandle
A behavior-based event delegation library designed for [FoamFactory](foamfactory.io).

## Introduction
### Basis
This library is based off of scripts included with the
[USWDS](https://github.com/uswds/uswds), which is, in turn, based off of
[receptor](https://github.com/shawnbot/receptor). A careful observer will notice
scripts in the [behavior/actions/old](behavior/actions/old) and
[behaviors/components/old](behavior/components/old) directories that contain
behavior present in USWDS that aren't currently implemented in `taphandle`.  

A valid acceptance test for the 1.0.0 release would be that the USWDS's behavior
delegation code could be completely replaced with `taphandle`.

### Motivation
> What is an event delegation library?

Event delegation is a method of taking individual elements, listening for events
on those elements, and then "bubbling up" those events to a higher-level object
so that client code can simply tell the delegate what selectors to listen for,
and what behavior should be applied to each selector.

> Why would you create another event delegation library?

In the development of FoamFactory, we found that we needed slightly different
behaviors than were provided by existing event delegation libraries. Moreover,
existing event delegation libraries were too general - meaning that they
required a lot of code to specify exactly what you want to do. `taphandle`, by
contrast, requires very little code - sometimes even just a single line!

## Installation
### Configuration
`taphandle` makes use of [Github Packages](https://github.com/features/packages)
to deploy, so you will need to add the following to an `.npmrc` file located in
your project directory:

```
@foamfactory:registry=https://npm.pkg.github.com/OWNER
registry="https://registry.npmjs.org/"
```

Alternatively, you can add the following to a `.yarnrc` file:
```
"@foamfactory:registry" "https://npm.pkg.github.com/"
registry "https://registry.npmjs.org/"
```

### Install `taphandle`
To install `taphandle`, you can then use the following `npm` command:

```
npm install --save @foamfactory/taphandle
```

Alternatively, you can use `yarn`:

```
yarn add @foamfactory/taphandle
```

## Usage
### Prefixes
To utilize all of the behaviors in `taphandle`, you first will need to choose a
prefix. This prefix will need to be added to the elements in the DOM that you
want to be affected by `taphandle`.

For example, if you chose the prefix `MyPrefix`, then the following password
visibility button would be handled by `taphandle`:

```
<input type="password" id="text-field-password" value="password" placeholder="" class="">
<i id="eye-icon" class="fa fa-fw fa-eye field-icon MyPrefix-show_password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>'
```

Note that in the above example, the behavior that is being delegated is actually
the `<i>` element, rather than the password input itself, but they work as a
team, since the event that's delegated really should affect the `<input>`
element, but it's being applied (clicked) on the `<i>` element.

### Importing into a Node Module
Once you've chosen a prefix, you can enable all component event delegation by
executing the following in your node module:

```
import  { ComponentBehaviors } from '@foamfactory/taphandle';

// Replace PREFIX with your chosen prefix
ComponentBehaviors.getInstance(PREFIX);
```

### Using the Web-Based Build
`taphandle` also provides a browserified version of itself, called
`index-web.js`, that you can copy directly from the `lib/` directory of the
`master` branch of the `taphandle` [repository](https://github.com/FoamFactory/taphandle/blob/master/lib/index-web.js), by using the above import statement and
`browserify`-ing your scripts yourself, or by importing directly using:

```
<script src="./node_modules/@foamfactory/taphandle/lib/index-web.js"></script>
```

You can then use the following code to initialize `ComponentBehaviors` within
your web application:

```
<!-- It's recommended that you put this after the DOM has been loaded, so at the
     bottom of your .html file, just before the </body> tag. -->
<script>
  taphandle.ComponentBehaviors.getInstance(PREFIX);
</script>
```

### Skipping auto-validation for a specific element
Sometimes, you might want to skip the validation for a specific element. To
achieve this, you can add the `data-skipautovalidation="true"` attribute to your
HTML element, and `taphandle` will not validate that form element.

```
<!-- taphandle will not validate the following password field -->
<input type="password" id="text-field-password" value="password" placeholder="" class="" data-skipautovalidation="true">
<i id="eye-icon" class="fa fa-fw fa-eye field-icon MyPrefix-show_password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>'
```
