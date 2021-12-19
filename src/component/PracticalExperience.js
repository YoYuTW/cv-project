import React, { Component } from 'react';
import uniqid from 'uniqid';
import Overview from './Overview';

class PracticeExperience extends Component {
  constructor(){
    super();

    this.state = {
      practiceExp: {
        companyName: '',
        positionTitle: '',
        mainTask: '',
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
    const addBtn = document.querySelector('button[name="addPracticeExp"]');
    const form = document.querySelector('#newPracticeExperience');
    form.removeAttribute('style');
    addBtn.setAttribute('style', 'display: none');
  };

  handleChangeName = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      practiceExp: {
        ...prevState.practiceExp,
        companyName: e.target.value,       
      }
    }));
  };

  handleChangeTitle = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      practiceExp: {
        ...prevState.practiceExp,
        positionTitle: e.target.value,         
      }
    }));
  };

  handleChangeMainTask = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      practiceExp: {
        ...prevState.practiceExp,
        mainTask: e.target.value,             
      }
    }));
  };

  handleChangeStartDate = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      practiceExp: {
        ...prevState.practiceExp,
        startDate: e.target.value,             
      }
    }));
  };

  handleChangeEndDate = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      practiceExp: {
        ...prevState.practiceExp,
        endDate: e.target.value,             
      }
    }));
  };    

  _checkValidity = () => {
    const form = document.querySelector('#newPracticeExperience');
    return form.checkValidity();
  };

  onSubmitExp = (e) => {
    e.preventDefault();
    if (!this._checkValidity()){
      alert('not finish!');
      return
    };

    this.setState({
      experiences: this.state.experiences.concat(this.state.practiceExp),
      practiceExp: {
        companyName: '',
        positionTitle: '',
        mainTask: '',
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
      practiceExp: {
        companyName: '',
        positionTitle: '',
        mainTask: '',
        startDate: '',
        endDate: '',
        id: uniqid(), 
      }
    });
    this._hidingSubmit();
  };

  _hidingSubmit = () => {
    const addBtn = document.querySelector('button[name="addPracticeExp"]');
    const form = document.querySelector('#newPracticeExperience');
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

    if (Array.from(target.classList).indexOf('companyName') >= 0){
      input.setAttribute('type', 'text');
      input.classList.add('companyName');
      input.required = true;
    }
    else if (Array.from(target.classList).indexOf('positionTitle') >= 0){
      input.setAttribute('type', 'text');
      input.classList.add('positionTitle');
      input.required = true;
    }
    else if (Array.from(target.classList).indexOf('mainTask') >= 0){
      input.setAttribute('type', 'text');
      input.classList.add('mainTask');
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
    document.querySelector('button[name="savePracticeExp"]').removeAttribute('style');
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
      document.querySelector('button[name="savePracticeExp"]').setAttribute('style', 'display:none');
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
        <button onClick={this.expandInput} name="addPracticeExp">＋ Practice Experience</button>
        <button onClick={this.saveExp} name="savePracticeExp" style={{display: 'none'}}>Save</button>
        <form id='newPracticeExperience' style={{display: 'none'}} onSubmit={this.onSubmitExp} autoComplete='off'>
          <h1>Hi</h1>
          <input required
            name='companyName'
            placeholder='Company Name'
            type='text'
            onChange={this.handleChangeName} />
          <br />
          <input required
            name='title'
            placeholder='Title'
            type='text'
            onChange={this.handleChangeTitle} />
          <br />
          <input required
            name='mainTask'
            placeholder='Main Task'
            type='text'
            onChange={this.handleChangeMainTask} />
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
        <div id="practiceExp">
          <Overview array={this.state.experiences} prop={['companyName', 'positionTitle', 'mainTask', 'startDate', 'endDate']} edit={this.editExp} delete={this.deleteExp}/>
        </div>
      </div>
    )        
  };

};

export default PracticeExperience;