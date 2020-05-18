import React from "react";

import { Column } from "dakota-2-portal/src/styles/global";

import {
  DocumentCard,
  DocumentIcon,
  DocumentName,
  DocumentSize,
  DocumentDownload,
  DocumentDownloadIcon,
  DocumentCardWrapper
 } from "./styles";

 export interface IDocument {
  id: string | number;
  name: string;
  size?: string;
  projectNumber: string;
  reportType: number;
}

interface IProps {
  document: IDocument,
  onDownloadDocument: (reportType: number) => void;
}

 export default ({
   document,
   onDownloadDocument
 }: IProps) => (
   <DocumentCardWrapper onPress={() => onDownloadDocument(document.reportType)}>
    <DocumentCard>
      <DocumentIcon name="assignment"/>
      <Column flex={1}>
        <DocumentName>{ document.name }</DocumentName>
        { document.size ? <DocumentSize>{ document.size }</DocumentSize> : <></>}
        { document.projectNumber ? <DocumentSize>{ document.projectNumber }</DocumentSize> : <></>}
      </Column>
      <DocumentDownload onPress={() => onDownloadDocument(document.reportType)}>
        <DocumentDownloadIcon name="file-download"/>
      </DocumentDownload>
    </DocumentCard>
  </DocumentCardWrapper>
 );