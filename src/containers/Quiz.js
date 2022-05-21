import React, { Component } from 'react';
import questionsJson from '../questions.json';

import Difficulty from '../components/Difficulty/difficulty';

class Quiz extends Component {
  constructor(props) {
    super(props);

    const options = this.makeOptions(questionsJson[0].incorrect_answers.concat(questionsJson[0].correct_answer));
    this.state = {
      questions: questionsJson,
      currentIndex: 0,
      currentOptions: options,
      correctNo: 0,
      incorrectNo: 0,
      answer: null,
    };
  }

  getDecodeURI(txt) {
    return decodeURIComponent(txt);
  }

  makeOptions = (options) => {
    let rndArray = [];
    const len = options.length;
    for (let i = 0; i < len; i++) {
      const rnd = Math.floor(Math.random() * options.length);
      rndArray.push(options[rnd]);
      options.splice(rnd, 1);
    }
    return rndArray;
  }

  nextQuestion = () => {
    if (this.state.currentIndex + 1 > this.state.questions.length) return;
    const nxtObj = this.state.questions[this.state.currentIndex + 1];
    const options = this.makeOptions(
      nxtObj.incorrect_answers.concat(nxtObj.correct_answer));
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      currentOptions: options,
      answer: null,
    });
  }

  submitAnswer = (index) => {
    if (this.state.answer != null) return;
    const ans = this.state.currentOptions[index];
    let correct = this.state.correctNo;
    let incorrect = this.state.incorrectNo;
    if (ans === this.state.questions[this.state.currentIndex].correct_answer) {
      correct++;
    } else {
      incorrect++;
    }
    this.setState({
      answer: index,
      correctNo: correct,
      incorrectNo: incorrect,
    });
  }

  render() {
    const currentQuesObj = this.state.questions[this.state.currentIndex];
    let msg = '';

    const ansIndex = this.state.answer;
    let optionsColor = [
      { bg: '#e5e5e5', txt: 'black' },
      { bg: '#e5e5e5', txt: 'black' },
      { bg: '#e5e5e5', txt: 'black' },
      { bg: '#e5e5e5', txt: 'black' },
    ];
    if (ansIndex !== null) {
      const len = this.state.currentOptions.length;
      for (let i = 0; i < len; i++) {
        if (ansIndex === i) {
          optionsColor[i].bg = 'black';
          optionsColor[i].txt = 'white';
        } else if (currentQuesObj.correct_answer === this.state.currentOptions[i]) {
          optionsColor[i].bg = 'white';
        }
      }

      if (currentQuesObj.correct_answer === this.state.currentOptions[ansIndex]) {
        msg = 'Correct!';
      } else if (currentQuesObj.correct_answer !== this.state.currentOptions[ansIndex]) {
        msg = 'Sorry!';
      }
    }

    const totalQues = this.state.questions.length;

    return (
      <div style={{ maxWidth: '450px', margin: 'auto' }}>
        <div className="progress" style={{ height: '0.8rem' }}>
          <div className="progress-bar" role="progressbar" style={{ width: 5 * (this.state.currentIndex + 1) + '%', backgroundColor: '#a7a7a7' }} aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: '1.4rem' }}>Question {this.state.currentIndex + 1} of {totalQues}</div>
          <div style={{ fontSize: '0.8rem', color: '#717171' }}>{this.getDecodeURI(currentQuesObj.category)}</div>
          <Difficulty type={currentQuesObj.difficulty} />
          <div style={{ margin: '1.5rem 0rem' }}>
            {this.getDecodeURI(currentQuesObj.question)}
          </div>
          <div>
            <div className='d-flex justify-content-between'>
              <button className='option' style={{ backgroundColor: optionsColor[0].bg, color: optionsColor[0].txt }}
                onClick={() => this.submitAnswer(0)}>{this.getDecodeURI(this.state.currentOptions[0])}</button>
              <button className='option' style={{ backgroundColor: optionsColor[1].bg, color: optionsColor[1].txt }}
                onClick={() => this.submitAnswer(1)}>{this.getDecodeURI(this.state.currentOptions[1])}</button>
            </div>
            <div className='d-flex justify-content-between' style={{ marginTop: currentQuesObj.type === 'multiple' ? '1.5rem' : '0rem' }}>
              {currentQuesObj.type === 'multiple' ? <button className='option' style={{ backgroundColor: optionsColor[2].bg, color: optionsColor[2].txt }}
                onClick={() => this.submitAnswer(2)}>{this.getDecodeURI(this.state.currentOptions[2])}</button> : ''}
              {currentQuesObj.type === 'multiple' ? <button className='option' style={{ backgroundColor: optionsColor[3].bg, color: optionsColor[3].txt }}
                onClick={() => this.submitAnswer(3)}>{this.getDecodeURI(this.state.currentOptions[3])}</button> : ''}
            </div>
          </div>
          <div className='mt-5 text-center fs-3 fw-500'>
            {msg}
          </div>
          <div className='text-center'>
            {ansIndex !== null ? <button className='nextBtn' onClick={this.nextQuestion}>Next Question</button> : ''}
          </div>
          <div>
            <div className='d-flex justify-content-between' style={{fontSize: '0.8rem'}}>
              <div>Score: {this.state.correctNo*5}%</div>
              <div>Max Score: 100%</div>
            </div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style={{backgroundColor: 'black', width: 5*this.state.correctNo+'%'}} aria-valuemin="0" aria-valuemax="100"></div>
              <div class="progress-bar" role="progressbar" style={{backgroundColor: '#a7a7a7', width: 5*this.state.incorrectNo+'%'}} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

}

export default Quiz;