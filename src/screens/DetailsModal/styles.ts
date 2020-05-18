import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import { colors, } from "dakota-2-portal/src/themes";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";

const { height: screenHeight } = Dimensions.get("window");

const detailsStyles = (isPortrait: boolean) => StyleSheet.create({
  // common start
  alignedRight: {
    justifyContent: "flex-end"
  },
  // common end
  // modal start
  container: {
    flex: 1,
    flexDirection: "row",
    overflow: "visible",
    minHeight: screenHeight
  },
  containerLeft: {
    flex: isPortrait ? 0.5 : 0.68,
    paddingHorizontal: 35,
    paddingVertical: 40,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.lavender,
    overflow: "visible"
  },
  containerRight: {
    flex: isPortrait ? 0.5 : 0.32,
    paddingHorizontal: 35,
    paddingVertical: 40
  },
  // modal end
  // reports card start
  reportsCardWrapper: {
    marginTop: 5,
    marginBottom: 5,
  },
  reportsCard: {
    paddingHorizontal: 19,
    paddingVertical: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    shadowOffset:{  width: 1,  height: 2,  },
    shadowColor: 'rgba(0,0,0,.8)',
    shadowOpacity: 0.2,
    flex: 1
  },
  reportsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: isPortrait ? 0 : 1,
    flexWrap: "wrap",
  },
  reportsInnerContainer: {
    flexDirection: isPortrait ? "column" : "row",
    paddingTop: isPortrait ? 10 : 0,
    alignItems: isPortrait ? "flex-start": "center",
    justifyContent: "flex-end"
  },
  reportsIcon: {
    width: 29,
    height: 33,
    borderRadius: 6,
    marginRight: 19,
    backgroundColor: colors.venetianRed // temporarily specified background-color
  },
  reportsText: {
    color: colors.echoBlue
  },
  reportsButtonStyles: {
    width: 113,
    marginTop: isPortrait ? 10 : 0
  },
  // reports card end
  // details section start
  detailsContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 32
  },
  detailsInfo: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 350,
    marginBottom: isPortrait ? 20 : 0
  },
  infoRow: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  infoTitle: {
    flex: 0.4,
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  infoDescription: {
    flex: 0.6,
    lineHeight: 19,
    fontWeight: "500"
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    flex: 1,
    borderRadius: 6,
    overflow: "hidden",
    height: 200
  },
  imageButtonsWrapper: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: colors.eastBay
  },
  imagePreview: {
    width: "100%",
    resizeMode: "cover",
    height: 200
  },
  imageButton: {
    borderRadius: 0,
    flex: 1,
    justifyContent: "center",
    height: 50,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  imageButtonDisabledTextStyles: {
    color: colors.stormGrey,
    fontSize: 12
  },
  // details section start
  // status card start
  statusButtonsContainer: {
    width: 106,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButtonIcon: {
    marginRight: 0
  },
  statusButton: {
    width: 48,
    height: 36
  },
  statusCard: {
    paddingVertical: 16,
    paddingLeft: 26,
    paddingRight: 10,
    alignItems: "stretch",
    marginBottom: 12
  },
  dateUpdated: {
    marginRight: 10,
    color: colors.echoBlue
  },
  // status card end
  // finance card start
  financeCard: {
    paddingVertical: 16,
    paddingHorizontal: 26,
    marginTop: 10
  },
  financeField: {
    width: 130,
  },
  warningIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: colors.persimmon,
    fontSize: 22
  },
  deltaIcon: {
    fontSize: sizePresets.medium.fontSize
  },
  // finance card end
  documentenButton: {
    width: "100%",
    height: 65
  }
});

export default detailsStyles;
