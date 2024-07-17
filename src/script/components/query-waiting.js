class QueryWaiting extends HTMLElement {
  _shadowRoot = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._style = document.createElement("style");

    this.render();
  }
  _emptyContent(){
    this._shadowRoot.innerHTML = "";
  }
  render(){
    this._emptyContent();
    
    this._shadowRoot.innerHTML += `
    <div class="placeholder query-waiting">Fetching data...</div>
    `
  }
}
customElements.define("query-waiting", QueryWaiting);
