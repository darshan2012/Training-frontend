import React from "react";
import { Link } from "react-router-dom";

function FooterComp() {
  return (
    <>
      <hr />
      <footer className="d-flex footer">
        <p className="col-6 text-muted text-center">© All rights reserved</p>
        {/* <p> */}
        <Link
          className="col-6 text-center"
          target="_blank"
          to="https://blushing-gambler-7cb.notion.site/Training-Documentation-ac40f9471022426da347acc7549185b7"
        >
          Documentation
        </Link>
        {/* </p> */}
      </footer>
    </>
  );
}

export default FooterComp;
