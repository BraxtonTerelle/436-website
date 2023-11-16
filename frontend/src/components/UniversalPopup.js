function UniversalPopup({ visible, children }) {
  if (!visible) {
    return <></>;
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      {children}
    </div>
  );
}

export default UniversalPopup;
