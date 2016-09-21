(function() {
  'use strict';

  /**
   * Constructs a new slide menu and adds it to the document.
   * @param {Object} [config] - An object that defines the default config for the slide menu.
   * @param {string} [config.id = slidemenu-(+new Date)] - A unique id for the slide menu.
   * @param {string} [config.size = 300px] - The size of the slide menu.
   * @param {string} [config.position = left] - The position of the slide menu can be top, right, bottom, or left.
   * @param {(node|string)} [config.content] - Adds a DOM Node or HTML String to the slide menu's content.
   * @param {boolean} [config.opacity = false] - Show a semi-transparent overlay when the slide menu is opened.
   * @param {boolean} [config.close_button = false] - Show a close button inside the slide menu when opened. It's recommended that you enable this option if your menu takes up the whole screen.
   * @param {boolean} [config.hide_overflow = false] - Hides the document scroll bar when the slide menu is opened.
   *
   * @param {Object} [config.button] - An object that defines the button config.
   * @param {string} [config.button.open = +] - The open icon for the slide menu button.
   * @param {string} [config.button.close = -] - The close icon for the slide menu button.
   * @param {string} [config.button.tooltip] - The tooltip for the slide menu button.
   * @param {string} [config.button.offset = 35px] - The offset for the slide menu button. It's recommended that you change this for each menu, so that the buttons don't overlap each other.
   */
  var SlideMenu = function (config) {
    if (!config) {
      config = new Object();
    }

    if (!config.id) {
      config.id = 'slidemenu-' + +new Date;
    }

    if (!config.button) {
      config.button = new Object();
    }

    this.offset = new Object(); // offsets for panel and button
    this.offset.button_offset = config.button.offset || '35px';

    // creation of slide menu elements
    var menu = document.createElement('DIV'),
        button = document.createElement('A'),
        overlay = config.opacity ? document.createElement('DIV') : null,
        close = config.close_button ? document.createElement('A') : null,
        frag = document.createDocumentFragment();

    menu.id = config.id;
    menu.className = 'slidemenu-js_menu';
    menu.innerHTML = '<div class="slidemenu-js_content"></div>';

    button.id = config.id + '-button';
    button.className = 'slidemenu-js_button';
    button.title = config.button.tooltip || '';
    button.innerHTML = config.button.open || '+';
    button.dataset.iconOpen = config.button.open || '+';
    button.dataset.iconClose = config.button.close || '-';
    button.dataset.hideOverflow = config.hide_overflow || false;


    /**
     * Adds DOM Nodes or HTML Strings to the slide menu's content.
     * @param {(node|string)} node - A DOM Node or HTML String that's to be added to the slide menu.
     * @param {string} [where = end] - Determines the insertion point of the DOM Node or HTML String. Can be end or begin.
     */
    this.addContent = function (node, where) {
      if (typeof where != 'string') {
        where = 'end';
      } else {
        where = where.toLowerCase();

        if (!{ end : 1, begin : 1 }[where]) {
          where = 'end';
        }
      }

      if (typeof node === 'string') {
        this.content.insertAdjacentHTML(where == 'begin' ? 'afterbegin' : 'beforeend', node);

      } else if (typeof node === 'object' && node.tagName) {

        if (where == 'begin' && this.content.firstChild) {
          this.content.insertBefore(node, this.menu.firstChild);

        } else {
          this.content.appendChild(node);
        }

      } else {
        throw new Error('Parameter 1 of SlideMenu.addContent is not of type "Node" or "String"');
      }

      return this;
    };


    /**
     * Changes the position of the slide menu.
     * @param {string} [pos = left] - The position of the slide menu. Can be top, right, bottom, or left.
     */
    this.position = function (pos) {
      if (typeof pos === 'string') {
        pos = pos.toLowerCase();

        if (!{ top : 1, right : 1, bottom : 1, left : 1 }[pos]) {
          pos = 'left';
        }

      } else {
        pos = 'left';
      }

      this.offset.position = pos; // update offset

      // remove existing styles
      var oldPos = this.button.dataset.menuPosition;

      if (oldPos) {
        this.button.style[pos] = this.button.style[oldPos];
        this.button.style[oldPos] = '';

        this.menu.style[pos] = this.menu.style[oldPos];
        this.menu.style[oldPos] = '';

        this.size(this.menu.dataset.size);
      }

      // update positional class names
      this.menu.className = this.menu.className.replace(/slidemenu-js_position-(?:top|right|bottom|left)/, '') + ' slidemenu-js_position-' + pos;
      this.button.className = this.button.className.replace(/slidemenu-js_position-(?:top|right|bottom|left)/, '') + ' slidemenu-js_position-' + pos;

      this.button.dataset.menuPosition = this.offset.position; // update position dataset

      return this;
    };


    /**
     * Sets the size (height or width ; depends on menu position) of the slide menu.
     * @param {string} [n = 300px] - The size of the slide menu. Can be any valid CSS measurement.
     */
    this.size = function (n) {
      if (typeof n != 'string') {
        n = '300px';
      }

      this.offset.panel = {
        closed : '-' + n,
        opened : '0px'
      };

      this.offset.button = {
        closed : '0px',
        opened : n
      };

      // correct positioning of button and width of menu
      if ({ right : 1, left : 1 }[this.offset.position]) {
        this.menu.style.width = n;
        this.menu.style.height = '';

        this.button.style.top = this.offset.button_offset;
        this.button.style.left = '';
      } else {
        this.menu.style.height = n;
        this.menu.style.width = '';

        this.button.style.left = this.offset.button_offset;
        this.button.style.top = '';
      }

      this.menu.style[this.offset.position] = this.offset.panel[this.button.dataset.state || 'closed'];
      this.button.style[this.offset.position] = this.offset.button[this.button.dataset.state || 'closed'];

      // update datasets
      this.menu.dataset.size = n;
      this.menu.dataset.menuClosed = this.offset.panel.closed;
      this.menu.dataset.menuOpened = this.offset.panel.opened;
      this.button.dataset.menuClosed = this.offset.button.closed;
      this.button.dataset.menuOpened = this.offset.button.opened;
      this.button.dataset.state = this.button.dataset.state || 'closed';

      return this;
    };


    /**
     * Toggles the slide menu.
     */
    this.toggle = function () {
      var that = this.id ? this : this.button,
          menu = document.getElementById( that.id.replace(/-button$/, '') ),
          overlay = document.getElementById( that.id.replace(/-button$/, '-overlay') ),
          position = that.dataset.menuPosition;

      if (/-/.test(menu.style[position])) {
        menu.style[position] = menu.dataset.menuOpened;
        that.style[position] = that.dataset.menuOpened;
        that.innerHTML = that.dataset.iconClose;
        that.dataset.state = 'opened';

        if (overlay) {
          overlay.setAttribute('style', 'visibility:visible;opacity:0.5');
        }

        if (that.dataset.hideOverflow != 'false') {
          document.body.style.overflow = 'hidden';
        }
      } else {
        menu.style[position] = menu.dataset.menuClosed;
        that.style[position] = that.dataset.menuClosed;
        that.innerHTML = that.dataset.iconOpen;
        that.dataset.state = 'closed';

        if (overlay) {
          overlay.setAttribute('style', 'visibility:hidden;');
        }

        if (that.dataset.hideOverflow != 'false') {
          document.body.style.overflow = '';
        }
      }

      return this;
    };


    // assign additional object properties
    this.menu = menu;
    this.button = button;
    this.button.onclick = this.toggle;
    this.content = menu.firstChild;

    this.position(config.position);
    this.size(config.size);

    if (config.content) {
      this.addContent(config.content, 'end');
    }

    // construct remaining slide menu elements and add them to the document
    if (close) {
      close.innerHTML = 'X';
      close.className = 'slidemenu-js_close';
      close.dataset.toggle = config.id + '-button';

      close.onclick = function () {
        var button = document.getElementById(this.dataset.toggle);

        if (button) {
          button.click();
        }
      };

      this.menu.insertBefore(close, this.content);
    }


    if (overlay) {
      overlay.id = config.id + '-overlay';
      overlay.className = 'slidemenu-js_overlay';
      overlay.style.visibility = 'hidden';
      frag.appendChild(overlay);
    }

    frag.appendChild(this.menu);
    frag.appendChild(this.button);
    document.body.appendChild(frag);
  };

  // define SlideMenu globally
  if (!window.SlideMenu) {
    window.SlideMenu = SlideMenu;
  }
}());
