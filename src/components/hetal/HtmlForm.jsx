import React from "react";
import "./form.css";
function HtmlForm() {
  return (
    <div className="main">
      <div class="container">
        <div class="title">Registration Form</div>
        <hr />
        <div class="content">
          <form action="#">
            <div class="user-details">
              <div class="input-box">
                <span class="details">Full Name</span>
                <input type="text" placeholder="Enter your name" required />
              </div>

              <div class="input-box">
                <span class="details">Username</span>
                <input type="text" placeholder="Enter your username" required />
              </div>

              <div class="input-box">
                <span class="details">Email</span>
                <input type="text" placeholder="Enter your email" required />
              </div>

              <div class="input-box">
                <span class="details">Password</span>
                <input type="text" placeholder="Enter your password" required />
              </div>

              <div class="input-box">
                <span class="details">Confirm Password</span>
                <input
                  type="text"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div class="input-box">
                <span class="details">Date of birth</span>
                <input type="date" name="dob" required />
              </div>
            </div>

            <div class="button-container">
              <div class="button">
                <input type="submit" value="Register" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HtmlForm;
