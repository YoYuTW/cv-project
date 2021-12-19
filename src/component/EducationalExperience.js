import React, { Component } from 'react';
import uniqid from 'uniqid';
import Overview from './Overview';
import './EducationalExperience.css';

class EducationalExperience extends Component {
  constructor(){
    super();

    this.state = {
      educationalExp: {
        schoolName: '',
        degree: '',
        startDate: '',
        endDate: '',
        id: uniqid(),
      },
      experiences: [],
    };

    this.editExp = this.editExp.bind(this);

    this.deleteExp = this.deleteExp.bind(this);
  };

  consoleState = () => {

  }

  expandInput = () => {
    const addBtn = document.querySelector('button[name="addEducationalExp"]');
    const form = document.querySelector('#newEducationalExperience');
    form.removeAttribute('style');
    addBtn.setAttribute('style', 'display: none');
  };

  handleChangeName = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      educationalExp: {
        ...prevState.educationalExp,
        schoolName: e.target.value,       
      }
    }));
  };

  handleChangeDegree = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      educationalExp: {
        ...prevState.educationalExp,
        degree: e.target.value,         
      }
    }));
  };

  handleChangeStartDate = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      educationalExp: {
        ...prevState.educationalExp,
        startDate: e.target.value,             
      }
    }));
  };

  handleChangeEndDate = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      educationalExp: {
        ...prevState.educationalExp,
        endDate: e.target.value,             
      }
    }));
  };    

  _checkValidity = () => {
    const form = document.querySelector('#newEducationalExperience');
    return form.checkValidity();
  };

  onSubmitExp = (e) => {
    e.preventDefault();
    if (!this._checkValidity()){
      alert('not finish!');
      return
    };

    this.setState({
      experiences: this.state.experiences.concat(this.state.educationalExp),
      educationalExp: {
        schoolName: '',
        degree: '',
        startDate: '',
        endDate: '',
        id: uniqid(),
      }
    });
    this._hidingSubmit();
  };

  cancelSubmit = (e) => {
    e.preventDefault();
    this.setState({
      educationalExp: {
        schoolName: '',
        degree: '',
        startDate: '',
        endDate: '',
      }
    });
    this._hidingSubmit();
  };

  _hidingSubmit = () => {
    const addBtn = document.querySelector('button[name="addEducationalExp"]');
    const form = document.querySelector('#newEducationalExperience');
    addBtn.removeAttribute('style');
    form.reset();
    form.setAttribute('style', 'display: none');
  };

  editExp = (e) => {
    if (document.querySelector('#editing')){
      return
    };
    const target = e.target;
    let input = document.createElement('input');

    if (Array.from(target.classList).indexOf('schoolName') >= 0){
      input.setAttribute('type', 'text');
      input.classList.add('schoolName');
      input.required = true;
    }
    else if (Array.from(target.classList).indexOf('degree') >= 0){
      input.setAttribute('type', 'text');
      input.classList.add('degree');
      input.required = true;
    }
    else if (Array.from(target.classList).indexOf('startDate') >= 0){
      input.setAttribute('type', 'date');
      input.classList.add('startDate');
      input.required = true;
    }
    else if (Array.from(target.classList).indexOf('endDate') >= 0){
      input.setAttribute('type', 'date');
      input.classList.add('endDate');
    }
    else return;

    input.value = target.textContent;
    input.id = 'editing';
    target.parentNode.replaceChild(input, target);
    document.querySelector('button[name="saveEducationalExp"]').removeAttribute('style');
  };

  saveExp = (e) => {
    let target = document.querySelector('#editing');
    if (!target){
      return
    }
    if (e._reactName === 'onClick'){
      const stateArray = this.state.experiences;
      const keyArray = stateArray.map(k => k.id);
      const id = target.parentNode.parentNode.id;
      const index = keyArray.indexOf(id);
      stateArray[index][target.classList[0]] = target.value;
      console.log(stateArray);
      this.setState({
        experiences: stateArray,
      });
      let newli = document.createElement('li');
      newli.classList.add(target.classList[0]);
      newli.textContent = target.value;
      target.replaceWith(newli);
      document.querySelector('button[name="saveEducationalExp"]').setAttribute('style', 'display:none');
    }
  };

  deleteExp = (e) => {
    e.preventDefault();

    if (!window.confirm('Are you sure to delete this?')){
      return
    };

    let currentState = this.state.experiences;
    let expToDelete = e.target.parentNode;
    let keyArray = currentState.map(k => k.id);
    let index = keyArray.indexOf(expToDelete.id);
    currentState.splice(index, 1);
    this.setState({
      experiences: currentState,
    });
  };
  
  render() {
    return (
      <div>
        <button onClick={this.expandInput} name="addEducationalExp">＋ Educational Experience</button>
        <button onClick={this.saveExp} name="saveEducationalExp" style={{display: 'none'}}>Save</button>
        <form id='newEducationalExperience' style={{display: 'none'}} onSubmit={this.onSubmitExp} autoComplete='off'>
          <h1>Hi</h1>
          <input required
            name='schoolName'
            placeholder='School Name'
            type='text'
            onChange={this.handleChangeName} />
          <br />
          <input required
            name='title'
            placeholder='Degree'
            type='text'
            onChange={this.handleChangeDegree} />
          <br />
          <input required
            name='startDate'
            placeholder='Start Date'
            type='date'
            onChange={this.handleChangeStartDate} />
          <br />
          <input
            name='endDate'
            placeholder='End Date'
            type='date'
            onChange={this.handleChangeEndDate} />
          <br />
          <div id='btn'>
            <button type='submit' onClick={this.onSubmitExp}>Submit</button>
            <button type='button' onClick={this.cancelSubmit}>Cancel</button>
          </div>
        </form>
        <div id="EducationalExp">
          <Overview array={this.state.experiences} prop={['schoolName', 'degree', 'startDate', 'endDate']} edit={this.editExp} delete={this.deleteExp}/>
        </div>
      </div>
    )        
  };

};

export default EducationalExperience;