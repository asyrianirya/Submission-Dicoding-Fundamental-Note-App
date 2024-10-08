import Utils from "./utils.js";

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _emptyType = false;
  _notesColor = "#FFFA99";
  _note = {};

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _commonStyle = `
        :host {
          display: block;
          border-radius: 20px;
          
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
          overflow: hidden;
          transition: border-radius 0.5s;
          height: 100%;
        }
        .card {
          padding: 1rem;
        }
        :host(:hover){
          border-radius: 20px 20px 0px 20px;
        }
        .note-info {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .note-info__title h2 {
        }
        .note-info__description p {
        }
        .note-info__created-at {
        }
        .note-info__archived{
          justify-self: end;
        }
  `;

  _updateStyle() {
    this._style.textContent =
      this._commonStyle +
      `
        :host {
          background-color: ${this._notesColor};
        }
      `;
  }

  _updateStyleEmptyBox() {
    this._style.textContent =
      this._commonStyle +
      `
      :host {
        background-color: lightgray;
        transition: background-color 0.5s;
      }
      :host(:hover){
        background-color: aqua;
      }
      .card-empty {
        font-size: 72px;
        text-align: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        color: gray;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      .card-empty(:hover) {
      }
    `;
  }
  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    this._note.id
      ? (this._shadowRoot.innerHTML += `
        <div class="card ${this._emptyType ? "nonetype" : ""}">
          <div class="note-info">
            <input type="hidden" id="${this._note.id || ""}" name="${ this._note.id || "" }" value="${this._note.id || ""}">
            <div class="note-info__title">
              <h2>${this._note.title || ""}</h2>
            </div>
            <div class="note-info__description">
              <p>${this._note.body || ""}</p>
            </div>
            <div class="note-info__created-at">
              <p>${this._note.createdAt || ""}</p>
            </div>
            <div class="note-info__archived">
              <p>${this._note.archived ? "DIARSIPKAN" : "TIDAK DIARSIPKAN"}</p>
            </div>
          </div>
        </div>
      `)
      : this._updateStyleEmptyBox();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="card-empty">+</div>
      `;
    const emptyCard = this._shadowRoot.querySelector(".card-empty");

    const editListElement = document.querySelector("edit-list");
    const textNoteElement = editListElement._textNote;
    const backStage = editListElement._backStage;
    const formContainer = editListElement._formContainer;

    emptyCard.addEventListener("click", (event) => {
      event.preventDefault();
      Utils.showElement(backStage);
      Utils.showElement(formContainer);
      textNoteElement.focus();
    });
  }
}

customElements.define("note-item", NoteItem);
