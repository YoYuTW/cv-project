import React, { Component } from 'react';
import EducationalExperience from './component/EducationalExperience';
import GeneralInformation from './component/GeneralInformation';
import PracticeExperience from './component/PracticalExperience';

class App extends Component {
  constructor(){
    super();

    this.state = {

    };
  };

  render(){
    return (
      <div>
        <GeneralInformation />
        <EducationalExperience />
        <PracticeExperience />
      </div>
    );
  };
}

export default App;