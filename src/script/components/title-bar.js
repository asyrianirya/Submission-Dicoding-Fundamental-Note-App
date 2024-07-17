class TitleBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _title = "UNTITLED APP";

  static get observedAttributes() {
    return ["title"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
            display: block;
            background-color: aqua;
            padding: 1.5rem;
            border: 5px solid black;
        }
  
        div {
            padding: 24px 20px;
        }
  
        .brand-name {
            margin: 0;
        
            font-size: 1.7em;
        }
      `;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "title":
        this.title = newValue;
        break;
    }

    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
        <div>
          <h1 class="brand-name">${this._title}</h1>
        </div>
      `;
  }
}

customElements.define("title-bar", TitleBar);
