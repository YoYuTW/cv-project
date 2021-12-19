import React, { Component } from 'react';
import uniqid from 'uniqid';
import Overview from './Overview';

class GeneralInformation extends Component {
  constructor(){
    super();

    this.state = {
      generalinfo: {
        name: '',
        email: '',
        phone: '',
        id: uniqid(),
      },
      infos: [],
    };
  };

  //-----

  expandInput = () => {
    const addBtn = document.querySelector('button[name="addGeneralInfo"]');
    const form = document.querySelector('#newGeneralInfo');
    form.removeAttribute('style');
    addBtn.setAttribute('style', 'display: none');
  };

  handleChangeName = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      generalinfo: {
        ...prevState.generalinfo,
        name: e.target.value,       
      }
    }));
  };

  handleChangeEmail = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      generalinfo: {
        ...prevState.generalinfo,
        email: e.target.value,         
      }
    }));
  };

  handleChangePhoneNumber = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      generalinfo: {
        ...prevState.generalinfo,
        phone: e.target.value,             
      }
    }));
  };

  _checkValidity = () => {
    const form = document.querySelector('#newGeneralInfo');
    return form.checkValidity();
  };

  onSubmitInfo = (e) => {
    e.preventDefault();
    if (!this._checkValidity()){
      alert('not finish!');
      return
    };

    this.setState({
      infos: this.state.infos.concat(this.state.generalinfo),
      generalinfo: {
        name: '',
        email: '',
        phone: '',
        id: uniqid(),
      }
    });
    this._hidingSubmit();
  };

  cancelSubmit = (e) => {
    e.preventDefault();
    this.setState({
      generalinfo: {
        name: '',
        email: '',
        phone: '',
        id: uniqid(),
      }
    });
    this._hidingSubmit();
  };

  _hidingSubmit = () => {
    const addBtn = document.querySelector('button[name="addGeneralInfo"]');
    const form = document.querySelector('#newGeneralInfo');
    addBtn.removeAttribute('style');
    form.reset();
    form.setAttribute('style', 'display: none');
  };

  editInfo = (e) => {
    if (document.querySelector('#editing')){
      return
    };
    const target = e.target;
    let input = document.createElement('input');

    if (Array.from(target.classList).indexOf('name') >= 0){
      input.setAttribute('type', 'text');
      input.classList.add('name');
    }
    else if (Array.from(target.classList).indexOf('email') >= 0){
      input.setAttribute('type', 'email');
      input.classList.add('email');
    }
    else if (Array.from(target.classList).indexOf('phone') >= 0){
      input.setAttribute('type', 'tel');
      input.classList.add('phone');
    }
    else return;

    input.value = target.textContent;
    input.required = true;
    input.id = 'editing';
    target.parentNode.replaceChild(input, target);
    document.querySelector('button[name="saveGeneralInfo"]').removeAttribute('style');
  };

  saveInfo = (e) => {
    let target = document.querySelector('#editing');
    if (!target){
      return
    }
    if (e._reactName === 'onClick'){
      const stateArray = this.state.infos;
      const keyArray = stateArray.map(k => k.id);
      const id = target.parentNode.parentNode.id;
      const index = keyArray.indexOf(id);
      stateArray[index][target.classList[0]] = target.value;
      console.log(stateArray);
      this.setState({
        infos: stateArray,
      });
      let newli = document.createElement('li');
      newli.classList.add(target.classList[0]);
      newli.textContent = target.value;
      target.parentNode.replaceChild(newli, target);
      document.querySelector('button[name="saveGeneralInfo"]').setAttribute('style', 'display:none');
    }
  };

  deleteInfo = (e) => {
    e.preventDefault();

    if (!window.confirm('Are you sure to delete this?')){
      return
    };

    let currentState = this.state.infos;
    let infoToDelete = e.target.parentNode;
    let keyArray = currentState.map(k => k.id);
    let index = keyArray.indexOf(infoToDelete.id);
    currentState.splice(index, 1);
    this.setState({
      infos: currentState,
    });
  };
  
  //-----

  render() {
    return (
      <div>
        <button onClick={this.expandInput} name="addGeneralInfo">＋ General Informtion</button>
        <button onClick={this.saveInfo} name="saveGeneralInfo" style={{display: 'none'}}>Save</button>
        <form id='newGeneralInfo' style={{display: 'none'}} onSubmit={this.onSubmitInfo} autoComplete='off'>
          <h1>Hi</h1>
          <input required
            name='name'
            placeholder='Name'
            type='text'
            onChange={this.handleChangeName} />
          <br />
          <input required
            name='email'
            placeholder='Email'
            type='email'
            onChange={this.handleChangeEmail} />
          <br />
          <input required
            name='phone'
            placeholder='Phone Number'
            type='tel'
            onChange={this.handleChangePhoneNumber} />
          <br />
          <div id='btn'>
            <button type='submit' onClick={this.onSubmitInfo}>Submit</button>
            <button type='button' onClick={this.cancelSubmit}>Cancel</button>
          </div>
        </form>
        <div id="exp">
          <Overview array={this.state.infos} prop={['name', 'email', 'phone']} edit={this.editInfo} delete={this.deleteInfo}/>
        </div>
      </div>
    )
  };
};

export default GeneralInformation;