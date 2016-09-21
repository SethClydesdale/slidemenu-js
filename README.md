# SlideMenu-JS
What is SlideMenu-JS ? SlideMenu-JS is a constructor for creating side menus in JavaScript with ease. It's written natively, so you don't have to worry about using any libaries ! Plus it comes with a couple of handy methods for manipulating your menus. See the table of contents below to learn more about using this constructor.

**Table of Contents**
- [SlideMenu-JS Demo](#slidemenu-js-demo)
- [Installing SlideMenu-JS](#installing-slidemenu-js)
- [Using SlideMenu-JS](#using-slidemenu-js)
 - [SlideMenu Configuration](#slidemenu-configuration)
 - [SlideMenu Methods](#slidemenu-methods)


## SlideMenu-JS Demo

Before installing SlideMenu-JS, you should see if it has what you're looking for ! You can view a demo of SlideMenu-JS in action by [**clicking here**](https://jsfiddle.net/SethC95/sx4dpa75/). If you like what you see, then feel free to install SlideMenu-JS on your website by reading the next section ! 


## Installing SlideMenu-JS

To install SlideMenu-JS, you need only install two files in the `<head>` section of your website. The two files you need to install are as follows.

1. [**slidemenu.js**](https://github.com/SethClydesdale/slidemenu-js/blob/master/slidemenu.js) which defines SlideMenu in the global name space.
2. [**slidemenu.css**](https://github.com/SethClydesdale/slidemenu-js/blob/master/slidemenu.css) for the style and smoothness of the side menus.

Once the necessary files are installed, you're ready to create some side menus ! See the next section to learn how to use the constructor.


## Using SlideMenu-JS

SlideMenu-JS, once installed, defines a new constructor in the global namespace called SlideMenu. To create a new side menu, you simply need to write `new SlideMenu()` like this :
```javascript
var myMenu = new SlideMenu();
```

This of course will only give you a blank side menu. To completely customize your side menu, you must pass along a configuration object, like this :
```javascript
var myMenu = new SlideMenu({
  id : 'myAwesomeMenu',
  size : '300px',
  position : 'left',
  content : '<h1>myMenu</h1>'+
            '<p>Hello world ! How do you like my new menu ?</p>',

  opacity : false,
  close_button : false,
  hide_overflow : false,

  button : {
    open : '+',
    close : '-',
    tooltip : 'Toggle slide menu',
    offset : '35px'
  }
});
```

This will create a menu that's more customized which also contains default HTML content, so you're not left with an empty menu. Please see the table below for an explanation on each property in the config object.

### SlideMenu Configuration
The configuration object is optional, but useful if you want to initialize your side menu with custom settings.

#### General Configuration
This section concerns the general appearnace of the menu.

| property | type | description |
| :--------| :--- | :---------- |
| **id** | `string` | A unique id for the slide menu. Use this option to give your menus unique ids, so that you can customize them individually. |
| **size** | `string` | The size of the slide menu. You can use [any CSS measurement](http://www.w3schools.com/cssref/css_units.asp) to set the size of your side menu. |
| **position** | `string` | The position of the slide menu. The valid values you can use are : `top`, `right`, `bottom`, and `left`.
| **content** | `string`, `node` | Adds a DOM Node or HTML String to the side menu's content. |
| **opacity** | `boolean` | Show a semi-transparent overlay when the slide menu is opened. |
| **close_button** | `boolean` | Show a close button inside the slide menu when opened. It's recommended that you enable this option if your menu takes up the whole screen. |
| **hide_overflow** | `boolean` | Hides the document scroll bar when the slide menu is opened. |

#### Button Configuration
This section concerns the general appearance of the menu button. The button config uses another object inside the configuration object called "button" :
```javascript
var myMenu = new SlideMenu({
  button : {
    open : '🙂',
    close : '☹',
    tooltip : 'Toggle',
    offset : '60px'
  }
});
```

See the table below for more information on the properties in the button object.

| property | type | description |
| :--------| :--- | :---------- |
| **open** | `string` | The open icon for the side menu button. |
| **close** | `string` | The close icon for the side menu button. |
| **tooltip** | `string` | The tooltip for the side menu button. |
| **offset** | `string` | The offset for the side menu button. It's recommended that you change this for each menu, so that the buttons of different side menus don't overlap each other. Like **size** you can use any CSS measurement. |

These are all the initial configuration options that you can currently set. See the next section for information on the methods provided by the SlideMenu constructor.

### SlideMenu Methods
If you cached your SlideMenu to a variable, you can utilize some methods which aid you in manipulating the menu. For the porition of this section, we'll be using `myMenu` as our variable.
```javascript
var myMenu = new SlideMenu();
```

**Methods**
- [addContent()](#addcontentnode-where)
- [position()](#positionpos)
- [size()](#sizen)
- [toggle()](#toggle)

#### addContent(node, where)
This method is used for adding DOM Nodes or HTML strings to the slide menu's content.

##### Examples
```javascript
myMenu.addContent('Hello world', 'end'); // HTML String

// DOM Node
var p = document.createElement('P');
p.innerHTML = 'foobar';

myMenu.addContent(p, 'begin');
```

##### Syntax
```javascript
myMenu.addContent(node, where); 
```

##### Parameters
| Parameter | type | Description |
| :-------- | :--- | :---------- |
| **node** | `string`, `node` | A DOM Node or HTML String that's to be added to the side menu. |
| **where** | `string` | Determines the insertion point of the DOM Node or HTML String. Valid values are `end` and `begin`. |


#### position(pos)
Changes the position of the slide menu.

##### Examples
```javascript
myMenu.position('top');
myMenu.position('right');
myMenu.position('bottom');
myMenu.position('left');
```

##### Syntax
```javascript
myMenu.position(pos);
```

##### Parameters
| Parameter | type | Description |
| :-------- | :--- | :---------- |
| **pos** | `string` | The position of the side menu. Can be top, right, bottom, or left. |


#### size(n)
Sets the size (height or width ; depends on menu position) of the slide menu.

##### Examples
```javascript
myMenu.size('200px');
myMenu.size('100%');
```

##### Syntax
```javascript
myMenu.size(n);
```

##### Parameters
| Parameter | type | Description |
| :-------- | :--- | :---------- |
| **n** | `string` | The size of the side menu. Can be any valid CSS measurement. |


#### toggle()
Toggles the state of the side menu ; opens or closes it.

##### Syntax
```javascript
myMenu.toggle();
```
