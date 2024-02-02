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
              {/* <th>Link</th> */}
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
              {/* <td>tast - documentation</td> */}
              <td>
                <ul>
                  <li>Create a form using html, css and bootstrap</li>
                  <li>
                    Explore various tools and technologies like JavaScript,
                    Bootstrap, MUI, Git, and Postman.
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
                    Create a MERN app as a chat assistant that integrates
                    ChatGPT using the OpenAI API.
                  </li>
                  <li>
                    Also, explore the difference between normalized and
                    denormalized data.
                  </li>
                  <li>
                    Explore topics such as partitioning, indexing, views,
                    aggregation, and their visualization through Chart.js.
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
                    Handle the backend side of the user form and file upload
                    using multer.
                  </li>
                  <li>
                    Explore error handling and folder structure in Node.js.
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
                  <li>
                    Create a form in React using the react-hook-form library.
                  </li>
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
                    In the previously created form by Mihir and Aditya, add the
                    dependencies for state, district, and company. When a state
                    is selected, the corresponding districts should be
                    displayed. When a district is selected, the companies of
                    that state and district should be displayed.
                  </li>
                  <li>
                    Create an editable table that shows the user's work details.
                  </li>
                  <li>
                    Use Chart.js to create a chart that displays the total
                    working hours of each company using the work detail data of
                    the user. Additionally, the chart should have the ability to
                    be filtered by state, district, and month combination.
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
                    Explore aggregation and practice writing queries for
                    aggregation.
                  </li>
                  <li>
                    When creating the chart in JD's task, use aggregation to
                    retrieve the chart data.
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
                    Upload the image from the React application and send it to
                    the server API using Node.js.
                  </li>
                  <li>
                    Then, send the image to the Python script. The Python script
                    will convert the image to black and white and encode it into
                    base64 format.
                  </li>
                  <li>
                    Store this base64 image in the MongoDB database and display
                    the image on the React frontend.
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
