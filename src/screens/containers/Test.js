import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Test() {
  const [data, setData] = React.useState("Not Found");

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        delay={1000}
        onUpdate={(err, result) => {
          if (result) {
            setData(result.text);
            //console.log(result.text);
          } else {
            setData("Not Found");
            //console.log(err);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
}

export default Test;
