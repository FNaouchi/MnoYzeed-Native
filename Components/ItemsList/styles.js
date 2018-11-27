import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 15,
    marginLeft: 16,

    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  top: {
    marginLeft: 0,
    backgroundColor: "#ffffcc"
  },
  middleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center"
  },
  transparent: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    flexDirection: "row"
  },
  addIcon: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white"
  },
  item: {
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    opacity: 1
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,

    opacity: 0.5,
    backgroundColor: "black",
    height: "100%",
    width: "100%"
  },
  transparent: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    flexDirection: "row"
  },
  thumbnail: {
    backgroundColor: "white",
    opacity: 1
  },
  background: {
    height: "100%",
    width: null,
    flex: 1
  },
  listitem: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    flexDirection: "row",
    height: 180
  }
});

export default styles;
