import React, { Component } from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames'; 

class Quiz extends Component {
constructor(props){
super(props)
let riddle=this.playGame();
let correct = false;
let gameOver=false;

this.state={ riddle, correct, gameOver };
this.renderOptions=this.renderOptions.bind(this);
this.checkResults=this.checkResults.bind(this);
this.playAgain=this.playAgain.bind(this);
   }
   
randomNumber(min, max){
  return Math.floor(Math.random()*(max-min+1))+min;
}
generateRandomOptions(sum){
let resultsArray =[];
let randomNumberArray = [];

while (randomNumberArray.length <=3){
  let randomNumber = this.randomNumber(1,19);
  if(randomNumberArray.indexOf( randomNumber) >-1) continue;
  randomNumberArray.push(randomNumber);
}

for(let i=0; i < 3; i++){
  let addSubtract = this.randomNumber(0,1);
  let result= sum;
  if(addSubtract ===1){//add
  result += randomNumberArray[i];
  resultsArray.push(result);
  }else{//subtract
    result -= randomNumberArray[i];
    resultsArray.push(result);
  }
}
return resultsArray;
}
playGame(){
  let field1 = this.randomNumber(20,40);
  let field2 = this.randomNumber(20,40);
  let result=field1 + field2;
  let resultsArray=this.generateRandomOptions(result);
 resultsArray.push(result);
 resultsArray.sort(function(a,b){return 0.5 -Math.random()})
 
  let riddle = {
    resultsArray:resultsArray,
    field1:field1,
    field2:field2,
    answer:result
    }
   if(this.state && this.state.gameOver){
     this.setState({riddle: riddle});
   }else{
    return riddle;
   }
}
checkResults(option){
  if(this.state.riddle.answer === option){
  
    this.setState({ correct :true, gameOver: true });
  }else{
   
    this.setState({ correct :false, gameOver: true });
  }
}

 renderOptions(){
   return(
    <div className="options">
      {this.state.riddle.resultsArray.map((option, i)=>
     <QuizOptions option={option} key={i} checkResults = {(option)=> this.checkResults(option) }/>
  
      )
      }
      </div>
   );
 } 
 renderMessage(){
   if(this.state.correct){
     return <h3>Correct, Good JOb! Hit the button below to play again</h3>
   }else{
    return <h3>Oops!, Wrong answer! Hit the button below to play again</h3>
   }
 } 
 playAgain(){
   this.setState({correct: false, gameOver: false});
   this.playGame();
 }
render () {
    
return(
<div className="quiz">
<p className="question">What is the sum of
 <span className="text-info"> {this.state.riddle.field1} </span>
  and <span className="text-info"> {this.state.riddle.field2} </span>?</p>
{this.renderOptions()}
<div className={classNames("after",{'hide': !this.state.gameOver},{'wrong animated zoomInDown': !this.state.correct},{'correct animated zoomInDown': this.state.correct})}>
{this.renderMessage()}
</div>
   <div className="play-again">
     <a className="button" onClick={this.playAgain}>Play Again</a>  
   </div> 
</div>
   );
  }
 }
export default Quiz;