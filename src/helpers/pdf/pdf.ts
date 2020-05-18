import RNHTMLtoPDF from "react-native-html-to-pdf";
import _get from "lodash/get";
import { downloadFile, readFile } from "react-native-fs";
import FileViewer from "react-native-file-viewer";

import fileHelper, { MEDIA_URL } from "dakota-2-portal/src/helpers/fileHelpers";
import { IReport, ICard, IQuestion, QuestionEnum } from "components/Form/models";
import { LOCAL_FILE_PATH } from "constants/."
import { getAuthHeaders } from "helpers/common";

import { parseFieldValue } from '../common';
import { IProjectCard } from 'components/ProjectCard/models';
import { complexIcon, logo } from "./constants";

import styles from "./styles";

class PDF {
  _report: IReport
  _project: IProjectCard | {};

  constructor(report: IReport, project: IProjectCard | {}) {
    this._report = report;
    this._project = project
  }

  async generate() {
    const documentNumber = _get(this._report, "documentNumber");
    // if(documentNumber) {
    //   this._downloadDocument(documentNumber);
    // } else {
      const html = `
        <html>
          <head>
            ${styles}
          </head>
          <body>
            ${await this._generateReport()}
          </body>
        </html>
      `;
    //   const projectNumber = _get(this._project, "projectNumber");
    //   const fileName = `${projectNumber}_${this._report.title.replace(/ /g, '')}`;
    //   const pdf = await RNHTMLtoPDF.convert({ html, fileName, directory: "Documents" })
    //   const key = await this._uploadGeneratedPdf(pdf, fileName)
    //   return key;
    // }
  }

  async _uploadGeneratedPdf(pdf: any, fileName: string) {
    const info = {
      entityName: "Report",
      fieldName: ""
    }

    const file = {
      fileName,
      uri: pdf.filePath,
      type: "application/pdf"
    }

    const { key } = await fileHelper.uploadFile({ file, info });
    return key;
  }

  async _imageToBase64(imagePath: string) {
    const img = imagePath.replace(/\//g, "_");
    const filePath = `${LOCAL_FILE_PATH}/${img}`;
    const options = {
      headers: await getAuthHeaders(),
      fromUrl: `${MEDIA_URL}/${imagePath}`,
      progressInterval: 100,
      toFile: filePath
    }

    const { promise } = await downloadFile(options);
    const res = await promise;

    if(res.statusCode < 400) {
      const base64 = await readFile(`${filePath}`, "base64");
      return base64;
    }
    return "";
  }

  async _downloadDocument(docNumber: string) {
    const projectNumber = _get(this._project, "projectNumber");
    const fileName = `${projectNumber}_${this._report.title}`;
    const path = docNumber.includes("Report/") ? docNumber : `/document/${docNumber}.pdf`;
    const options = {
      headers: await getAuthHeaders(),
      fromUrl: `${MEDIA_URL}/${path}`,
      progressInterval: 100,
      toFile: `${LOCAL_FILE_PATH}/${fileName}.pdf`
    }

    const { promise } = await downloadFile(options);
    const res = await promise;
    if(res.statusCode < 400) {
      this._openGeneratedPdf(fileName);
    }
  }

  _openGeneratedPdf(fileName: string) {
    const localFile = `${LOCAL_FILE_PATH}/${fileName}.pdf`;
    FileViewer.open(localFile)
  }

  _generateHeader() {
    const complexCode = _get(this._project, "complexCode");
    const location = _get(this._project, "location");
    const city = _get(this._project, "city");
    return `
      <div class="header">
        <img src="${logo}" class="header-logo"/>
        <div class="header-info">
          <img src="${complexIcon}"/>
          <div>Complex ${complexCode} - ${city}, ${location}</div>
        </div>
      </div>`;
  }

  async _generateReport() {
    const { title, cards } = this._report;
    let result = "";
    result += this._generateHeader();
    result += this._generateTitle(title);
    const cardsValues:string[] = await Promise.all(cards.map(async card => await this._generateCard(card)));
    result += cardsValues.join("");

    return result;
  }

  _generateTitle(title: string) {
    return `<h2 class="main-title">${title}</h2>`;
  }

  _generateSubTitle(subtitle: string) {
    return `<h4>${subtitle}</h4>`;
  }

  async _generateCard(card: ICard) {
    const { title, sections } = card;
    let result = "";
    result += `
      <div class="card">
        <h4 class="card-title">${title}</h4>
        ${(await Promise.all(sections.map(async section => `
          <div class="section">
            <h4>${section.title}</h4>
            ${(await Promise.all(section.questions.map(async (question, i) => await this._generateItem(question, i)))).join("")}
          </div>
        `))).join("")}
      </div>
    `;

    return result;
  }

  async _generateItem({ subQuestions = [], ...question }: IQuestion, i: number) {
    const questionLayout = await this._generateCardItem({ ...question, hasSubQuestions: !!subQuestions.length }, i);
    const subQuestionsLayout = subQuestions.length
      ? (await Promise.all(subQuestions.map(async (subQuestion, i) => await this._generateCardItem(subQuestion, i)))).join("\n")
      : ``;

    return `
      ${questionLayout}
      ${subQuestionsLayout}
    `;
  }

  async _generateCardItem(question: IQuestion, i: number) {
    if (question.type === QuestionEnum.SIGNATURE) {
      return this._getSignatureOption(question);
    }

    if (question.type === QuestionEnum.INFO) {
      return this._getInfoOption(question);
    }

    if (question.type === QuestionEnum.RADIO) {
      return this._getRadioOption(question, i);
    }

    if (question.type === QuestionEnum.PHOTO_REPORT) {
      return await this._getImageOption(question);
    }

    if (question.type === QuestionEnum.TEXT) {
      return this._getTextOption(question);
    }

    if (question.type === QuestionEnum.DROPDOWN) {
      return this._getDropdownOption(question);
    }

    if (question.type === QuestionEnum.PRICE) {
      return this._getPriceOption(question);
    }

    if (question.type === QuestionEnum.DATE) {
      return this._getDateOption(question);
    }

    if (question.type === QuestionEnum.CHECKBOX) {
      return this._getCheckboxOption(question, i);
    }

    return `<div>Error</div>`;
  }

  _getInfoOption({ text, value, hasSubQuestions }: IQuestion) {
    const val = parseFieldValue(value.replace(/'/g, '"'));
    const className = hasSubQuestions ? "container main-container" : "container";
    return `
      <div class="${className}">
        <span class="title">${text}</span>
        <span class="value">${val}</span>
      </div>
    `;
  }

  _getDropdownOption({ text, value, hasSubQuestions }: IQuestion) {
    const { value: selectedValue, options } = JSON.parse(value.replace(/'/g, '"'));
    const option = options.find(option => option.value === selectedValue);
    const label = _get(option, "label", "");
    const className = hasSubQuestions ? "container main-container" : "container";
    return `
      <div class="${className}">
        <span class="title">${text}</span>
        <span class="value">${label}</span>
      </div>
    `;
  }

  async _getImageOption({ text, value, hasSubQuestions }: IQuestion) {
    const { reports } = JSON.parse(value.replace(/'/g, '"'));
    const className = hasSubQuestions ? "container main-container" : "container";

    const result = await Promise.all(reports.map(async ({ text: textValue, image }) => {
      const img = image.substring(MEDIA_URL.length, image.length);
      const base64Image = await this._imageToBase64(img);
      return `
        <div class="${className}">
          <div class="value">
            <img src="data:image/png;base64,${base64Image}" height='200px'/>
          </div>
          <div class="value">
            <p>${text}</p>
            <textarea class="textarea" cols="12">${textValue}</textarea>
          </div>
        </div>
      `
    }));

    return result.join('')
  }

  _getSignatureOption({ text, value }) {
    if(!value.length) {
      return "";
    }

    const parsedValue = value.replace(/'/g, "");

    return `
      <div>
        <h2 class="title">${text}</h2>
        <h4 class="subtitle">* alle gegevens zijn zorgvuldig gecontroleerd</h4>
        <img src="data:image/png;base64,${parsedValue}" width="100%" />
      </div>
    `;
  }

  _getRadioOption({ text, value, hasSubQuestions }: IQuestion, i) {
    const { value: selectedValue, options } = JSON.parse(value.replace(/'/g, `"`));
    const className = hasSubQuestions ? "container main-container" : "container";
    return `
      <div class="${className}">
        <span class="title">${text}</span>
        <div class="value">
          ${options
            .map(({ title, value: optionValue }) => `
              <label class="radio-label">
                <input type="radio" value="${optionValue}" name="${text}_${i+1}_${title}" ${selectedValue === optionValue ? `checked` : ""} class="radio" />
                <span>${title}</span>
                <span class="radio-checkmark"></span>
              </label>
            `)
            .join("")
          }
        </div>
      </div>
    `;
  }

  _getCheckboxOption({ text, value, hasSubQuestions }: IQuestion, i) {
    const { value: selectedValues, options } = JSON.parse(value.replace(/'/g, `"`));
    const className = hasSubQuestions ? "container main-container" : "container";
    return `
      <div class="${className}">
        <span class="title">${text}</span>
        <div class="value">
          ${options
            .map(({ label, value: optionValue }) => `
              <label class="checkbox-label">
                <input type="checkbox" value="${optionValue}" name="checkbox_${text}_${i+1}_${label}" ${selectedValues.some(v => v.value === optionValue) ? `checked` : ""} class="checkbox" />
                <span>${label}</span>
                <span class="checkmark"></span>
              </label>
            `)
            .join("")
          }
        </div>
      </div>
    `;
  }

  _getTextOption({ text, value, hasSubQuestions }: IQuestion) {
    const { values: options } = JSON.parse(value.replace(/'/g, '"'));
    const className = hasSubQuestions ? "container main-container" : "container";
    return options.map(option => `
      <div class="${className}">
        <span class="title">${text}</span>
        <div class="value">
          <textarea class="textarea" rows="8">${option.text}</textarea>
        </div>
      </div>
    `).join("");
  }

  _getPriceOption({ text, value, hasSubQuestions }: IQuestion) {
    const {
      hasTotalColumn,
      hasDescriptionField,
      values: price
    } = JSON.parse(value.replace(/'/g, '"'));
    const totalPrice = price.reduce((acc, { price: priceValue }) => acc + Number(value), 0);
    const className = hasSubQuestions ? "container main-container" : "container";

    return `
      ${price.map(({ price: priceValue, description }) => `
        <div class="${className}">
          <div class="price-title-wrapper">
            <span class="title">${text}</span>
            ${hasDescriptionField ? `<span class="subtitle">Max 250 tekens</span>` : ""}
          </div>
          <textarea class="textarea" rows="8">${description}</textarea>
          <div class="price-value-wrapper">
            <span>€</span>
            <span class="value">${priceValue}</span>
          </div>
        </div>
      `).join("")}
      ${hasTotalColumn ? `<span class="total-value">Totaal €${totalPrice}</span>` : ""}
    `;
  }

  _getDateOption({ text, value, hasSubQuestions }: IQuestion) {
    const className = hasSubQuestions ? "container main-container" : "container";
    return `
      <div class="${className}">
        <span class="title">${text}</span>
        <span class="value">
          <svg class="date-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="36.447px" height="36.447px" viewBox="0 0 36.447 36.447" xml:space="preserve">
            <g>
              <path d="M30.224,3.948h-1.098V2.75c0-1.517-1.197-2.75-2.67-2.75c-1.474,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75    c0-1.517-1.197-2.75-2.67-2.75c-1.473,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75c0-1.517-1.197-2.75-2.67-2.75    c-1.473,0-2.67,1.233-2.67,2.75v1.197H6.224c-2.343,0-4.25,1.907-4.25,4.25v24c0,2.343,1.907,4.25,4.25,4.25h24    c2.344,0,4.25-1.907,4.25-4.25v-24C34.474,5.855,32.567,3.948,30.224,3.948z M25.286,2.75c0-0.689,0.525-1.25,1.17-1.25    c0.646,0,1.17,0.561,1.17,1.25v4.896c0,0.689-0.524,1.25-1.17,1.25c-0.645,0-1.17-0.561-1.17-1.25V2.75z M17.206,2.75    c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25v4.896c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25V2.75z M9.125,2.75    c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25v4.896c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25V2.75z     M31.974,32.198c0,0.965-0.785,1.75-1.75,1.75h-24c-0.965,0-1.75-0.785-1.75-1.75v-22h27.5V32.198z"/>
              <rect x="6.724" y="14.626" width="4.595" height="4.089"/>
              <rect x="12.857" y="14.626" width="4.596" height="4.089"/>
              <rect x="18.995" y="14.626" width="4.595" height="4.089"/>
              <rect x="25.128" y="14.626" width="4.596" height="4.089"/>
              <rect x="6.724" y="20.084" width="4.595" height="4.086"/>
              <rect x="12.857" y="20.084" width="4.596" height="4.086"/>
              <rect x="18.995" y="20.084" width="4.595" height="4.086"/>
              <rect x="25.128" y="20.084" width="4.596" height="4.086"/>
              <rect x="6.724" y="25.54" width="4.595" height="4.086"/>
              <rect x="12.857" y="25.54" width="4.596" height="4.086"/>
              <rect x="18.995" y="25.54" width="4.595" height="4.086"/>
              <rect x="25.128" y="25.54" width="4.596" height="4.086"/>
            </g>
          </svg>
          ${value}
        </span>
      </div>
    `;
  }
}

export default PDF;
