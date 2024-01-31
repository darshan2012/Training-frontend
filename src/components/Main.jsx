import Table from "react-bootstrap/Table";
import React from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
function Main() {
  return (
    <>
      <Container className="mt-5">
        {/* <h1 className="text-center">Index</h1> */}
        <Table bordered hover>
          <thead>
            <tr style={{ fontSize: "2em" }}>
              <th>Weeks</th>
              <th>Name</th>
              <th style={{ width: "400px" }}>Problem Statement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width={200} rowSpan={4}>
                Week 1
              </td>
            </tr>
            <tr>
              <td width={200}>
                <Link to={"/form-html-css"}>Hetal </Link>
              </td>
              <td>
                <ul>
                  <li>Create a form using html, css and bootstrap</li>
                  <li>
                    explore the tools and technology like,
                    javascript,bootstrap,mui,git,postman.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={"/openai"}>Aditya Joshi</Link>
              </td>
              <td>
                <ul>
                  <li>
                    Create a mern app as chat assistant which has chatGPT
                    integration using openai api
                  </li>
                  <li>
                    Also explore the difference between normalized and
                    denormalized data
                  </li>
                  <li>
                    Explore the topics like Partitioning, Indexing, Views,
                    aggregation with chart using chart tools.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={"/user/login"}>Aditya Jain</Link>
              </td>
              <td>
                <ul>
                  <li>
                    Handle the Backend Side of the user form and also file
                    upload using multer,
                  </li>
                  <li>
                    Explore the error handling, folder structure in node js.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td rowSpan={3}>Week 2</td>
            </tr>
            <tr>
              <td>
                <Link to={"/user/login"}>Mihir</Link>
              </td>

              <td>
                <ul>
                  <li>Create a form in react using the react-hook-form.</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={"/user/"}>JD</Link>
              </td>
              <td>
                <ul>
                  <li>
                    In the form created previously in the task of mihir and
                    aditya add the state, district and company dependencies such
                    that if the state is selected the districts of that states
                    should be displayed and when the district is selected
                    company of the that state and district should be displayed.
                  </li>
                  <li>
                    Create a editable table which shows the user work details.
                  </li>
                  <li>
                    Now create the chart using chartjs using the user's work
                    detail data
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td rowSpan={3}>Week 3</td>
            </tr>
            <tr>
              <td>
                <Link to={"/user/"}>Romin</Link>
              </td>
              <td>
                <ul>
                  <li>
                    Explore aggregation and write queries of aggregation for
                    practice.
                  </li>
                  <li>
                    while creating the chart in JD's task use aggregation to get
                    the chart data.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={"/random-image"}>Sarkar</Link>
              </td>
              <td>
                <ul>
                  <li>
                    Upload the image from the react and send it in the node
                    using server api
                  </li>
                  <li>
                    then send that image to the python script in the python
                    script convert image to black & white form and into the
                    base64,
                  </li>
                  <li>
                    store this base64 image to mongodb database then display the
                    image on the react frontend
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Main;
