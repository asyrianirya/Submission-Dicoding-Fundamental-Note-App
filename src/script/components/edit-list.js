import Utils from "./utils.js";

class EditList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _script = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._script = document.createElement("script");
    this._script.type = "module";
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
            padding: 10px;
            margin: 20px;
        }
        .edit-container {
          margin: 20px;
          position: relative;
        }
        .form-container {
          display: flex;
          position: absolute;
          background-color: rgba(0, 255, 255,50);
          padding: 10px;
          border-radius: 10px 10px 10px 10px;
          border: 1px solid black;
          display: none;
          width: 100%;
          max-width: 50vw;
          z-index: 100;
        }
          label {
           flex: 1;
          }

        form {
          display: flex;
          flex-direction: column;
        }
          
        button {
          padding: 10px;
          margin: 5px;
          border-radius: 10px 10px 10px 10px;
          border: 1px solid black;
          background-color: aqua;
          transition: background-color 0.2s;
          text-decoration: none;
        }

        .input-note {
          display: flex;
          flex-direction: column;
        }

        .input-note-label {
          display: flex;
          flex-direction: row;
        }

        button:hover {
            background-color: rgb(36, 142, 168);
        }
        .input-container {
          display: flex;
          flex-direction: column;
          align-items: start;
        }

        button:active {
            background-color: rgb(0, 145, 182);
        }
        .judulNoteFeedback,
        .isiNoteFeedback {
          color: red;
        }
        .invalid {
          border: 2px solid red;
        }
        textarea {
        resize: vertical;
        max-height: 5rem
        }
        .backStage{
          display: none;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          position: fixed;
          background-size: cover;
          background-color: rgba(0,0,0,0.2);
          z-index = 99;
        }
        `;
  }

  get _textNote() {
    return this._shadowRoot.querySelector("#judul-note");
  }

  get _formContainer() {
    return this._shadowRoot.getElementById("form");
  }

  get _backStage(){
    return this._shadowRoot.querySelector(".backStage");
  }


  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.appendChild(this._script);
    this._shadowRoot.innerHTML += `
        <div class="edit-container">
            <div class="action-container">
                <button id="edit">EDIT</button>
            </div>
            <div class="backStage"></div>
            <div id="form" class="form-container">
                <form>
                <div class="title">
                  <h1>INPUT BARU</h1>
                  </div>
                      <div class="input-note-title input-note">
                          <div class="input-note-label">
                            <label for="judul-note">Masukan Judul catatan anda:</label><span class="judul-note-word">0/0</span>
                          </div>
                          <input minlength="8" maxlength="50" name="Judul Catatan" type="text" id="judul-note" required>
                          <p class="judulNoteFeedback"></p>
                      </div>
                      <div class="input-note-content input-note">
                          <div class="input-note-label">
                            <label for="isi-note">Masukan Isi catatan anda:</label><span class="isi-note-word">0/0</span>
                          </div>
                          <textarea minlength="10" maxlength="200" name="Isi Catatan" type="text" id="isi-note" required row="60" col="auto"></textarea>
                          <p class="isiNoteFeedback"></p>
                      </div>
                  <button id="submit-note" type="submit">+</button>
                </form>
            </div>
        </div>

        `;
    const editButton = this._shadowRoot.getElementById("edit");
    const backStage = this._shadowRoot.querySelector(".backStage");

    const formContainer = this._shadowRoot.getElementById("form");
    const submitNote = this._shadowRoot.getElementById("submit-note");

    const judulNote = this._shadowRoot.getElementById("judul-note");
    const judulNoteWord = this._shadowRoot.querySelector(".judul-note-word");
    const judulNoteFeedback = this._shadowRoot.querySelector(".judulNoteFeedback");

    const isiNote = this._shadowRoot.getElementById("isi-note");
    const isiNoteFeedback = this._shadowRoot.querySelector(".isiNoteFeedback");
    const isiNoteWord = this._shadowRoot.querySelector(".isi-note-word");

    editButton.addEventListener("click", () => {
      Utils.toggleHideElement(formContainer);
      Utils.showElement(backStage);
    });

    backStage.addEventListener('click' ,() => {
      Utils.hideElement(backStage);
      Utils.hideElement(formContainer);
    })

    const validateInput = (
      inputElement,
      feedbackElement,
      minLength,
      maxLength,
      wordElement = null
    ) => {
      inputElement.addEventListener("input", (event) => {
        const inputValue = inputElement.value.trim();
        const currentLength = inputElement.value.length;
        if (wordElement) {
          wordElement.innerHTML = `${currentLength}/${maxLength}`;
        }

        if (!inputValue) {
          inputElement.classList.add("invalid");
          feedbackElement.textContent = `Masukkan ${inputElement.name} terlebih dahulu`;
        } else if (minLength && currentLength < minLength) {
          inputElement.classList.add("invalid");
          feedbackElement.textContent = `Masukkan karakter setidaknya lebih dari ${minLength}`;
        } else if (maxLength && currentLength > maxLength) {
          inputElement.classList.add("invalid");
          feedbackElement.textContent = `Karakter jangan lebih dari ${maxLength}`;
        } else {
          inputElement.classList.remove("invalid");
          feedbackElement.textContent = "";
        }
      });
    };

    const judulNoteMinLength = parseInt(
      Utils.getElementAttribute(judulNote, "minlength")
    );
    const judulNoteMaxLength = parseInt(
      Utils.getElementAttribute(judulNote, "maxlength")
    );
    judulNoteWord.innerHTML = `0/${judulNoteMaxLength}`;
    const isiNoteMinLength = parseInt(
      Utils.getElementAttribute(isiNote, "minlength")
    );
    const isiNoteMaxLength = parseInt(
      Utils.getElementAttribute(isiNote, "maxlength")
    );
    isiNoteWord.innerHTML = `0/${isiNoteMaxLength}`;

    validateInput(
      judulNote,
      judulNoteFeedback,
      judulNoteMinLength,
      judulNoteMaxLength,
      judulNoteWord
    );
    validateInput(
      isiNote,
      isiNoteFeedback,
      isiNoteMinLength,
      isiNoteMaxLength,
      isiNoteWord
    );

    submitNote.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }
}

customElements.define("edit-list", EditList);
