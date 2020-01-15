// src/components/Profile.js
import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import axios from "axios";
import {useAuth0} from "../react-auth0-spa";

const DoASurvey = () => {
  var surveyJSON = {
    "pages": [
     {
      "name": "page2",
      "elements": [
       {
        "type": "rating",
        "name": "question2",
        "title": "Whats the biggest number here?"
       },
       {
        "type": "rating",
        "name": "question3",
        "title": "Whats the  smallest number here?"
       },
       {
        "type": "rating",
        "name": "question4",
        "title": "Whats the most middle number?"
       }
      ]
     }
    ]
   }

   const {user} = useAuth0();
   localStorage.setItem('userEmail', user.email)

   const sendDataToServer = (survey) => {
    //send Ajax request to your web server.
    // JSON.stringify(survey.data);
    axios.post("http://localhost:5000/doasurvey", {
      data: survey.data,
      email: user.email
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

}

  return (
    <div>
            <Survey.Survey json={ surveyJSON } onComplete={ sendDataToServer } />
    </div>
  );
};

export default DoASurvey;