import { colors } from "dakota-2-portal/src/themes";

const styles = `
  <style>
    body {
      background-color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      padding: 24px 24px;
      margin: 0;
      color: #555;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
    }

    div {
      box-sizing: border-box;
    }

    .header {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    .header-logo {
      height: 80px;
    }

    .header-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      margin: 20px 0;
    }

    .header-info > img {
      margin-right: 10px;
    }

    .main-title {
      padding: 20px 0;
    }

    .card {
      padding: 6px 0px 20px;
      border-radius: 6px;
      background-color: white;
      border: 1px solid #ddd;
      padding: 10px;
    }

    .card:not(:last-child) {
      margin-bottom: 40px;
    }
    .section:not(:last-child) {
      margin-bottom: 20px;
    }

    .section {
      padding: 10px 0;
    }

    .container {
      display: flex;
      /* justify-content: space-between; */
      align-items: flex-start;
      /* margin-bottom: 10px; */
      padding: 20px 0;
      border-bottom: 1px solid #f6f5f0;
    }

    .main-container {
      border-bottom: 0;
    }

    .title {
      flex: 0.5;
      font-size: 14px;
    }

    .subtitle {
      font-size: 12px;
      color: gray;
    }

    .value {
      flex: 0.5;
      padding-left: 40px;
    }

    .card-title {
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: 18px;
      border-bottom: 1px solid #f6f5f0;
    }

    .image {
      width: 100%;
      height: auto;
    }

    .radio-label {
      display: inline-flex;
      align-items: center;
      margin-right: 12px;
    }

    .radio {
      margin-right: 4px;
    }

    .textarea {
      padding: 10px;
      width: 300px;
      height: 140px;
      resize: none;
      border-radius: 4px;
      border-color: #ddd;
      color: #555;
      font-size: 14px;
    }

    .price-title-wrapper {
      margin-right: 10px;
    }

    .price-value-wrapper {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }

    .total-value {
      display: block;
      padding-right: 12px;
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      text-align: right;
      word-spacing: 4px;
      background-color: #f6f5f0;
    }

    .date-svg {
      margin-right: 6px;
      width: 14px;
      height: 14px;
      fill: gray;
    }

    /* custom checkbox styles */
    .checkbox-label {
      display: inline-flex;
      position: relative;
      padding-left: 23px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      margin-right: 12px;
    }

    .checkbox-label .checkbox {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 18px;
      width: 18px;
      background-color: #eee;
    }

    .checkbox-label:hover .checkbox ~ .checkmark {
      background-color: #ccc;
    }

    .checkbox-label .checkbox:checked ~ .checkmark {
      background-color: #8DB321;
    }

    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    .checkbox-label .checkbox:checked ~ .checkmark:after {
      display: block;
    }

    .checkbox-label .checkmark:after {
      left: 6px;
      top: 1px;
      width: 4px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    /* custom radio styles */
    .radio-label {
      display: inline-flex;
      position: relative;
      padding-left: 23px;
      /* margin-bottom: 12px; */
      cursor: pointer;
      /* font-size: 22px; */
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .radio {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .radio-checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 18px;
      width: 18px;
      background-color: #eee;
      border-radius: 50%;
    }

    .radio-label:hover .radio ~ .radio-checkmark {
      background-color: #ccc;
    }

    .radio-label .radio:checked ~ .radio-checkmark {
      background-color: #8DB321;
    }

    .radio-checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    .radio-label .radio:checked ~ .radio-checkmark:after {
      display: block;
    }

    .radio-label .radio-checkmark:after {
      top: 6px;
      left: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: white;
    }
  </style>
`;

export default styles;
